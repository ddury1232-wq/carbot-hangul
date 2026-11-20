/* =====================================================================
   저장소 · 상태 관리
   - localStorage 자동 저장
   - Firebase 연동 시 실시간 병합(문자별 최신 시간 기준)
   ===================================================================== */
(function () {
  const KEY = 'carbot-hangul-state-v3';
  const SRS_STEPS = [1, 3, 7, 14, 30];

  function defaultState() {
    return {
      v: 3,
      settings: {
        childName: '친구', sound: true, voice: true,
        familyCode: (window.DEFAULT_FAMILY_CODE || ''),
        firebase: Object.assign({}, window.FIREBASE_CONFIG || {}),  // 내장 설정(설정 화면에서 덮어쓰기 가능)
        t: 0
      },
      chars: {},
      gallery: [],
      en: { words: {}, missions: {}, last: 0 },
      stats: { writes: 0, days: {}, streak: 0, lastDay: '' }
    };
  }

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  /* ------------------------------------------------------------------
     업로드 안전장치용 판정
     - isEmptyState: 학습 기록·그림·영어 진행·통계가 하나도 없는 '빈 초기 상태'
       (기본 설정값만 있는 상태. 설정만 바꾼 경우도 내용은 비어 있다고 봅니다.)
     - hasLocalChange: 이 기기에서 실제로 학습·그림·설정을 바꾼 적이 있는지
     - wasCleared: 사용자가 [기록 모두 지우기]로 직접 비운 상태인지
     ------------------------------------------------------------------ */
  function isEmptyState(s) {
    if (!s || typeof s !== 'object') return true;
    const chars = s.chars || {};
    for (const id in chars) {
      const r = chars[id] || {};
      if ((r.steps || 0) > 0 || r.done || (r.chips || 0) > 0 || r.summoned ||
          (r.dex || 0) > 0 || (r.first || 0) > 0 || (r.t || 0) > 0 ||
          ((r.srs && (r.srs.box || 0)) > 0)) return false;
    }
    if ((s.gallery || []).length > 0) return false;
    const en = s.en || {};
    if (Object.keys(en.words || {}).length || Object.keys(en.missions || {}).length) return false;
    const st = s.stats || {};
    if ((st.writes || 0) > 0 || Object.keys(st.days || {}).length) return false;
    return true;
  }

  let changed = false;   // 실제 학습·그림·설정 수정이 있었는지
  let cleared = false;   // 사용자가 직접 [기록 모두 지우기]를 했는지

  let state = load();
  const listeners = [];

  // 주소의 ?code= 값이 있으면 그 가족 코드를 사용
  (function () {
    try {
      const p = new URLSearchParams(location.search);
      const code = p.get('code') || p.get('family');
      if (code && code !== state.settings.familyCode) {
        state.settings.familyCode = code.trim();
        state.settings.t = Date.now();
        try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
      }
    } catch (e) {}
  })();

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaultState();
      const s = JSON.parse(raw);
      const d = defaultState();
      s.settings = Object.assign(d.settings, s.settings || {});
      // 내장된 Firebase 설정을 기본으로 쓰고, 저장된 값이 있으면 덮어쓰기
      s.settings.firebase = Object.assign({}, window.FIREBASE_CONFIG || {}, (s.settings.firebase || {}));
      s.chars = s.chars || {}; s.gallery = s.gallery || []; s.stats = Object.assign(d.stats, s.stats || {});
      s.en = Object.assign({ words: {}, missions: {}, last: 0 }, s.en || {});
      s.en.words = s.en.words || {}; s.en.missions = s.en.missions || {};
      return s;
    } catch (e) { console.warn('load fail', e); return defaultState(); }
  }

  const saveLocal = () => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      // 용량 초과 → 그림 보관함을 줄여서 다시 시도
      console.warn('quota', e);
      state.gallery = state.gallery.slice(0, Math.max(0, Math.floor(state.gallery.length / 2)));
      try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e2) {}
    }
  };

  const pushRemote = U.debounce(() => {
    if (window.CarbotSync && CarbotSync.status === 'online') CarbotSync.pushNow();
  }, 600);

  function emit(reason) { listeners.forEach(fn => { try { fn(state, reason); } catch (e) { console.warn(e); } }); }

  function save(reason) {
    changed = true;
    if (reason === 'reset') cleared = true;
    saveLocal();
    emit(reason || 'save');
    pushRemote();
  }

  /* ---------------- 캐릭터 기록 ---------------- */
  function rec(id) {
    if (!state.chars[id]) {
      state.chars[id] = { t: 0, steps: 0, done: false, chips: 0, summoned: false, dex: 0,
                          srs: { box: 0, due: 0, last: 0 }, first: 0, last: 0 };
    }
    return state.chars[id];
  }
  function learned(id) { const r = state.chars[id]; return !!(r && r.done); }
  function learnedList() {
    return Object.keys(state.chars).filter(id => state.chars[id].done && window.CARBOT_BY_ID[id])
      .map(id => window.CARBOT_BY_ID[id]);
  }
  function dueList(now) {
    const t = now || Date.now();
    return Object.keys(state.chars)
      .filter(id => state.chars[id].done && window.CARBOT_BY_ID[id])
      .filter(id => (state.chars[id].srs.due || 0) <= t)
      .map(id => ({ char: CARBOT_BY_ID[id], rec: state.chars[id] }))
      .sort((a, b) => (a.rec.srs.due || 0) - (b.rec.srs.due || 0));
  }
  function scheduleNext(id) {
    const r = rec(id);
    const box = Math.min((r.srs.box || 0) + 1, SRS_STEPS.length);
    const days = SRS_STEPS[Math.min(box, SRS_STEPS.length) - 1];
    r.srs = { box, last: Date.now(), due: Date.now() + days * 86400000 };
    r.t = Date.now();
  }

  function completeStep(id) {
    const r = rec(id);
    r.steps = Math.min(3, (r.steps || 0) + 1);
    r.last = Date.now(); r.t = Date.now();
    if (!r.first) r.first = Date.now();
    bumpWrite();
    let reward = null;
    if (r.steps >= 3 && !r.done) {
      r.done = true; r.chips = (r.chips || 0) + 1;
      r.srs = { box: 1, last: Date.now(), due: Date.now() + SRS_STEPS[0] * 86400000 };
      reward = { type: 'chip', charId: id };
    } else if (r.done) {
      scheduleNext(id);
      reward = { type: 'review-ok', charId: id };
    }
    save('practice');
    return reward;
  }

  function summon(id) {
    const r = rec(id);
    r.summoned = true; r.dex = (r.dex || 0) + 1; r.t = Date.now();
    save('summon');
  }

  function bumpWrite() {
    const k = U.todayKey();
    state.stats.writes = (state.stats.writes || 0) + 1;
    state.stats.days[k] = (state.stats.days[k] || 0) + 1;
    // 연속일 계산
    let streak = 0; const d = new Date();
    for (let i = 0; i < 400; i++) {
      const key = U.todayKey(d);
      if (state.stats.days[key]) { streak++; d.setDate(d.getDate() - 1); }
      else if (i === 0) { d.setDate(d.getDate() - 1); }
      else break;
    }
    state.stats.streak = streak;
    state.stats.lastDay = k;
  }

  /* ---------------- 그림 보관함 ---------------- */
  function addDrawing(dataUrl, title) {
    state.gallery.unshift({ id: U.uid(), ts: Date.now(), title: title || '내 그림', data: dataUrl });
    state.gallery = state.gallery.slice(0, 40);
    save('gallery');
  }
  function removeDrawing(id) {
    state.gallery = state.gallery.filter(g => g.id !== id);
    save('gallery');
  }

  /* ---------------- 병합 ---------------- */
  function mergeStates(local, remote) {
    if (!remote || typeof remote !== 'object') return local;
    const out = clone(local);
    out.chars = out.chars || {}; remote.chars = remote.chars || {};
    const ids = new Set([...Object.keys(out.chars), ...Object.keys(remote.chars)]);
    ids.forEach(id => {
      const a = out.chars[id], b = remote.chars[id];
      if (!a) out.chars[id] = b;
      else if (!b) {}
      else out.chars[id] = (b.t || 0) > (a.t || 0) ? b : a;
    });
    // 보관함: id 기준 합집합
    const byId = {};
    [...(out.gallery || []), ...(remote.gallery || [])].forEach(g => {
      if (!g || !g.id) return;
      if (!byId[g.id] || (g.ts || 0) > (byId[g.id].ts || 0)) byId[g.id] = g;
    });
    out.gallery = Object.values(byId).sort((a, b) => b.ts - a.ts).slice(0, 40);
    // 영어 파닉스 진행도: 단어별 최신 시간 우선 + 리더스 읽음 합집합
    out.en = out.en || { words: {}, missions: {}, last: 0 };
    out.en.words = out.en.words || {};
    Object.keys(remote.en && remote.en.words || {}).forEach(id => {
      const a = out.en.words[id], b = (remote.en.words || {})[id];
      if (!a) out.en.words[id] = b;
      else if (b && (b.t || 0) > (a.t || 0)) out.en.words[id] = b;
    });
    out.en.missions = Object.assign({}, out.en.missions || {}, (remote.en && remote.en.missions) || {});
    out.en.last = Math.max(out.en.last || 0, (remote.en && remote.en.last) || 0);
    // 설정: 더 최근 것
    if ((remote.settings || {}).t > (out.settings.t || 0)) {
      out.settings = Object.assign({}, out.settings, remote.settings);
    } else if ((remote.settings || {}).familyCode && !out.settings.familyCode) {
      out.settings.familyCode = remote.settings.familyCode;
    }
    // 통계
    const rs = remote.stats || {};
    out.stats.writes = Math.max(out.stats.writes || 0, rs.writes || 0);
    const days = Object.assign({}, out.stats.days || {});
    Object.keys(rs.days || {}).forEach(k => { days[k] = Math.max(days[k] || 0, rs.days[k] || 0); });
    out.stats.days = days;
    // 연속일 재계산
    let streak = 0; const d = new Date();
    for (let i = 0; i < 400; i++) {
      const key = U.todayKey(d);
      if (days[key]) { streak++; d.setDate(d.getDate() - 1); }
      else if (i === 0) { d.setDate(d.getDate() - 1); }
      else break;
    }
    out.stats.streak = Math.max(streak, out.stats.streak || 0);
    return out;
  }

  function applyRemote(remote) {
    const merged = mergeStates(state, remote);
    const before = JSON.stringify(state.chars) + JSON.stringify(state.gallery) + JSON.stringify(state.en);
    state = merged;
    const after = JSON.stringify(state.chars) + JSON.stringify(state.gallery) + JSON.stringify(state.en);
    saveLocal();
    emit('remote');
    if (before !== after) pushRemote();
  }

  const Store = {
    get state() { return state; },
    set state(v) { state = v; },
    SRS_STEPS,
    save, rec, learned, learnedList, dueList, scheduleNext, completeStep, summon,
    addDrawing, removeDrawing, applyRemote, mergeStates,
    isEmptyState,
    hasLocalChange() { return changed; },
    wasCleared() { return cleared; },
    onChange(fn) { listeners.push(fn); },
    settings() { return state.settings; },
    setSettings(patch) {
      state.settings = Object.assign({}, state.settings, patch, { t: Date.now() });
      save('settings');
    },
    chips() {
      return Object.keys(state.chars).filter(id => (state.chars[id].chips || 0) > 0)
        .map(id => ({ char: CARBOT_BY_ID[id], rec: state.chars[id] })).filter(x => x.char);
    },
    dexList() {
      return Object.keys(state.chars).filter(id => state.chars[id].done && CARBOT_BY_ID[id]).map(id => CARBOT_BY_ID[id]);
    },
    exportState() { return clone(state); },
    importState(obj) {
      state = mergeStates(defaultState(), obj);
      state.settings.firebase = state.settings.firebase || {};
      save('import');
    },
    exportCode() {
      const payload = { v: 3, chars: state.chars, gallery: state.gallery.slice(0, 8), en: state.en, settings: Object.assign({}, state.settings, { firebase: {} }), stats: state.stats };
      const json = JSON.stringify(payload);
      return btoa(unescape(encodeURIComponent(json)));
    },
    importCode(code) {
      try {
        const json = decodeURIComponent(escape(atob(code.trim())));
        const obj = JSON.parse(json);
        // 설정의 firebase 값은 이 기기 것을 유지
        const fb = state.settings.firebase, fc = state.settings.familyCode;
        state = mergeStates(defaultState(), obj);
        state.settings.firebase = fb; state.settings.familyCode = fc;
        save('import');
        return true;
      } catch (e) { console.warn(e); return false; }
    },
    reset() {
      const s = defaultState();
      s.settings.firebase = state.settings.firebase;
      s.settings.familyCode = state.settings.familyCode;
      s.settings.childName = state.settings.childName;
      state = s;
      save('reset');
    },
    renderSyncDot() {
      const dot = document.getElementById('syncDot');
      if (!dot) return;
      dot.className = 'sync-dot' + (CarbotSync.status === 'online' ? ' on' : CarbotSync.status === 'error' ? ' err' : '');
      dot.title = CarbotSync.status === 'online' ? '가족 기기와 실시간 연결됨' :
                  CarbotSync.status === 'error' ? '연결 오류' : '이 기기에만 저장 중';
    },
    initSync() {
      const s = state.settings;
      CarbotSync.onRemote = (remote) => applyRemote(remote);
      CarbotSync.onStatus = () => {
        this.renderSyncDot();
        const el = document.getElementById('syncStatusText');
        if (el) el.textContent = '상태: ' + statusText(CarbotSync.status);
      };
      this.renderSyncDot();
      if (s.familyCode && s.firebase && s.firebase.databaseURL) {
        CarbotSync.connect({ firebase: s.firebase, familyCode: s.familyCode });
      }
    }
  };

  function statusText(s) {
    return s === 'online' ? '가족 기기와 실시간 연동 중 ☁️'
      : s === 'connecting' ? '연결하는 중…'
      : s === 'error' ? '연결 오류 (설정을 확인해 주세요)'
      : '이 기기에만 저장 중';
  }
  Store.statusText = statusText;

  window.Store = Store;
})();
