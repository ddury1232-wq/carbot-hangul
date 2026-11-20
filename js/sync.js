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
          const v = snap.val();
          if (v && v.state && this.onRemote) {
            this.onRemote(v.state, { from: 'remote', at: v.at || Date.now() });
          }
          if (this.status !== 'online') this.setStatus('online', '실시간 연결됨');
        }, (err) => {
          console.warn('sync error', err);
          this.setStatus('error', '연결 오류: ' + (err && err.message ? err.message : '권한/URL 확인'));
        });

        this._push = () => {
          if (!this._ref) return;
          const state = Store.exportState();
          dbMod.set(this._ref, { state, at: Date.now() }).catch(e => {
            console.warn('push fail', e);
            this.setStatus('error', '저장 실패: ' + (e && e.message ? e.message : ''));
          });
        };
        // 처음 한 번 올려 두기
        this._push();
        this.setStatus('online', '실시간 연결됨');
        return true;
      } catch (e) {
        console.warn('firebase connect fail', e);
        this.setStatus('error', '연결 실패: ' + (e && e.message ? e.message : String(e)));
        return false;
      }
    },

    disconnect() {
      try { if (this._mod && this._ref) this._mod.off(this._ref); } catch (e) {}
      if (this._app && this._appMod) { try { this._appMod.deleteApp(this._app); } catch (e) {} }
      this._app = null; this._appMod = null;
      this._ref = null; this._mod = null; this._push = null; this.adapter = null;
      if (this.status !== 'local') this.setStatus('local', '이 기기에만 저장 중');
    },

    publish: null  // connect() 후 Store가 호출
  };

  // 저장이 바뀔 때 호출되는 푸시(디바운스는 Store 쪽에서)
  Sync.pushNow = function () { if (typeof Sync._push === 'function') Sync._push(); };

  window.CarbotSync = Sync;
})();
