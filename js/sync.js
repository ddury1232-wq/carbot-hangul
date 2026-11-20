/* =====================================================================
   동기화 레이어 (모듈형)
   ---------------------------------------------------------------------
   · LocalAdapter  : 이 기기(localStorage)에만 저장 (기본)
   · FirebaseAdapter : Firebase Realtime Database 로 가족 코드별 실시간 동기화
   새 저장소를 붙이고 싶으면 아래 어댑터와 같은 모양(onRemote/publish)만 만들면 됩니다.
   Firebase SDK는 연결할 때만 CDN에서 동적으로 불러옵니다(오프라인에서도 앱은 정상 동작).
   ===================================================================== */
(function () {
  const FB_VERSION = '10.12.2';
  const FB_APP = 'https://www.gstatic.com/firebasejs/' + FB_VERSION + '/firebase-app.js';
  const FB_DB = 'https://www.gstatic.com/firebasejs/' + FB_VERSION + '/firebase-database.js';

  const Sync = {
    status: 'local',        // local | connecting | online | error
    adapter: null,
    onRemote: null,         // (remoteState, meta) => void
    onStatus: null,

    /* ---- 업로드 안전장치 상태 ---- */
    _initialSynced: false,  // 원격 스냅샷을 최초 1회 받아 병합했는지 (이 전에는 절대 업로드 금지)
    _baseAt: 0,             // 마지막으로 병합한 원격 스냅샷의 시각(at)
    _needPush: false,       // 원격이 바뀌어 미뤄 둔 업로드
    _pushTries: 0,
    _pushing: false,
    _gen: 0,                // 연결 세대(끊고 다시 연결할 때 이전 콜백 무시)
    stats: { pushed: 0, blockedInitial: 0, blockedNoChange: 0, blockedEmpty: 0, aborted: 0 },
    setStatus(s, msg) {
      this.status = s;
      if (this.onStatus) this.onStatus(s, msg || '');
      if (window.Store && Store.renderSyncDot) Store.renderSyncDot();
    },

    /* cfg: {firebase:{...}, familyCode:'ABC123'} */
    async connect(cfg) {
      this.disconnect();
      const code = (cfg.familyCode || '').trim();
      const fc = cfg.firebase || {};
      if (!code) { this.setStatus('local', '가족 코드가 없어요'); return false; }
      if (!fc.databaseURL) { this.setStatus('local', 'databaseURL이 없어요'); return false; }
      this.setStatus('connecting', '연결하는 중…');
      const gen = ++this._gen;
      this._initialSynced = false;
      this._baseAt = 0; this._needPush = false; this._pushTries = 0; this._pushing = false;
      try {
        const appMod = await import(FB_APP);
        const dbMod = await import(FB_DB);
        let app = null;
        try { app = appMod.getApp('carbot-hangul'); } catch (e) { app = null; }
        if (app) {
          const cur = (app.options && app.options.databaseURL) || '';
          if (cur !== fc.databaseURL) { try { await appMod.deleteApp(app); } catch (e) {} app = null; }
        }
        if (!app) app = appMod.initializeApp(fc, 'carbot-hangul');
        this._app = app; this._appMod = appMod;
        const db = dbMod.getDatabase(app);
        const path = 'families/' + code.replace(/[.#$/\[\]]/g, '_');
        const ref = dbMod.ref(db, path);

        this._mod = dbMod; this._ref = ref; this._code = code;
        this.adapter = 'firebase';

        // 실시간 수신
        dbMod.onValue(ref, (snap) => {
          if (gen !== this._gen) return;
          const v = snap.val();
          // ① 원격 스냅샷을 먼저 병합하고 나서야 '동기화 준비 완료'로 표시합니다.
          if (v && v.state && this.onRemote) {
            this.onRemote(v.state, { from: 'remote', at: v.at || Date.now() });
          }
          this._baseAt = (v && v.at) || 0;
          this._initialSynced = true;
          if (this.status !== 'online') this.setStatus('online', '실시간 연결됨');
        }, (err) => {
          console.warn('sync error', err);
          this.setStatus('error', '연결 오류: ' + (err && err.message ? err.message : '권한/URL 확인'));
        });

        /* 업로드: 아래 안전장치를 모두 통과할 때만 원격에 씁니다.
           ① 최초 원격 스냅샷을 받아 병합하기 전에는 올리지 않습니다(_initialSynced).
              → 기록이 없는 새 기기가 빈 상태로 클라우드 기록을 덮어쓰는 사고를 막습니다.
           ② 이 기기에서 실제로 학습·그림·설정을 바꾼 적이 없으면 올리지 않습니다.
           ③ 기록이 하나도 없는 빈 상태는 사용자가 직접 지운 경우에만 올립니다. */
        this._push = () => {
          if (!this._ref || gen !== this._gen) return;
          if (!this._initialSynced) { this.stats.blockedInitial++; return; }
          if (!(window.Store && Store.hasLocalChange && Store.hasLocalChange())) { this.stats.blockedNoChange++; return; }
          const local = Store.exportState();
          if (Store.isEmptyState(local) && !(Store.wasCleared && Store.wasCleared())) {
            this.stats.blockedEmpty++;
            return;
          }
          if (this._pushing) { this._needPush = true; return; }

          const target = this._ref;
          const at = Date.now();
          const baseAt = this._baseAt || 0;
          this._pushing = true;
          // ④ 마지막으로 병합한 그 원격 상태일 때만 그대로 올립니다.
          //    그 사이 다른 기기가 바꿨다면 중단하고, 최신 원격을 병합한 뒤 다시 올립니다.
          dbMod.runTransaction(target, (cur) => {
            const curState = cur && cur.state;
            const curAt = (cur && cur.at) || 0;
            if (curState && curAt !== baseAt) return;   // 중단(undefined) → 병합 후 재시도
            return { state: local, at };
          }).then((res) => {
            this._pushing = false;
            if (gen !== this._gen) return;
            if (!res || !res.committed) {
              this.stats.aborted++;
              const cur = (res && res.snapshot && res.snapshot.val && res.snapshot.val()) || null;
              if (cur && cur.state && this.onRemote) {
                this.onRemote(cur.state, { from: 'remote', at: cur.at || Date.now() });
                this._baseAt = cur.at || 0;
              }
              this._pushTries = (this._pushTries || 0) + 1;
              if (this._pushTries <= 3) this._push();
              return;
            }
            this._pushTries = 0;
            this._baseAt = at;
            this.stats.pushed++;
            if (this._needPush) { this._needPush = false; this._push(); }
          }).catch(e => {
            this._pushing = false;
            console.warn('push fail', e);
            this.setStatus('error', '저장 실패: ' + (e && e.message ? e.message : ''));
          });
        };
        // 여기서는 절대 올리지 않습니다. 첫 원격 스냅샷이 도착하면 그때 상태를 병합한 뒤,
        // 이 기기에 실제 기록/설정 변경이 있을 때만 업로드합니다.
        this.setStatus('online', '실시간 연결됨');
        return true;
      } catch (e) {
        console.warn('firebase connect fail', e);
        this.setStatus('error', '연결 실패: ' + (e && e.message ? e.message : String(e)));
        return false;
      }
    },

    disconnect() {
      this._gen++;
      try { if (this._mod && this._ref) this._mod.off(this._ref); } catch (e) {}
      if (this._app && this._appMod) { try { this._appMod.deleteApp(this._app); } catch (e) {} }
      this._app = null; this._appMod = null;
      this._ref = null; this._mod = null; this._push = null; this.adapter = null;
      this._initialSynced = false; this._baseAt = 0; this._needPush = false;
      this._pushTries = 0; this._pushing = false;
      if (this.status !== 'local') this.setStatus('local', '이 기기에만 저장 중');
    },

    publish: null  // connect() 후 Store가 호출
  };

  // 저장이 바뀔 때 호출되는 푸시(디바운스는 Store 쪽에서)
  Sync.pushNow = function () { if (typeof Sync._push === 'function') Sync._push(); };

  window.CarbotSync = Sync;
})();
