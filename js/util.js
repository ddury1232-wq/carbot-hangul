/* 공용 도우미 */
(function () {
  const KO_JAMO = {
    cho: ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'],
    jung: ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'],
    jong: ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ']
  };
  const VERT_VOWEL = new Set([0,1,2,3,4,5,6,7,20]);     // ㅏㅐㅑㅒㅓㅔㅕㅖㅣ
  const HORZ_VOWEL = new Set([8,13,14,17,18]);          // ㅗㅜㅠㅡㅛ
  const MIX_VOWEL  = new Set([9,10,11,12,15,16,19]);    // ㅘㅙㅚㅛㅝㅞㅟㅢ

  function jamoOf(ch) {
    const code = ch.charCodeAt(0);
    if (code < 0xAC00 || code > 0xD7A3) return null;
    const i = code - 0xAC00;
    const cho = Math.floor(i / 588), jung = Math.floor((i % 588) / 28), jong = i % 28;
    return { cho: KO_JAMO.cho[cho], jung: KO_JAMO.jung[jung], jong: KO_JAMO.jong[jong] || '',
             choIdx: cho, jungIdx: jung, jongIdx: jong };
  }
  function vowelShape(jungIdx) {
    if (VERT_VOWEL.has(jungIdx)) return 'v';
    if (HORZ_VOWEL.has(jungIdx)) return 'h';
    return 'm';
  }

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  let toastTimer = null;
  function toast(msg, ms) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), ms || 1800);
  }

  // ---- 소리 (WebAudio 짧은 효과음) ----
  let actx = null;
  function audio() {
    if (!actx) { try { actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { actx = null; } }
    return actx;
  }
  function beep(freq, dur, type, gain) {
    if (!Store.state.settings.sound) return;
    const ctx = audio(); if (!ctx) return;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type || 'sine'; o.frequency.value = freq;
    g.gain.value = gain == null ? 0.06 : gain;
    o.connect(g); g.connect(ctx.destination);
    const t = ctx.currentTime;
    g.gain.setValueAtTime(g.gain.value, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.start(t); o.stop(t + dur + 0.02);
  }
  function fanfare() {
    [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => beep(f, 0.22, 'triangle', 0.07), i * 110));
  }
  function click() { beep(660, 0.06, 'square', 0.03); }

  // ---- 말하기 ----
  let koVoice = null;
  function pickVoice() {
    if (!('speechSynthesis' in window)) return null;
    const vs = speechSynthesis.getVoices() || [];
    koVoice = vs.find(v => v.lang === 'ko-KR') || vs.find(v => (v.lang || '').startsWith('ko')) || null;
    return koVoice;
  }
  if ('speechSynthesis' in window) {
    pickVoice();
    speechSynthesis.onvoiceschanged = pickVoice;
  }
  function speak(text, opts) {
    if (!('speechSynthesis' in window)) { toast('이 브라우저는 읽어주기를 지원하지 않아요'); return null; }
    const o = opts || {};
    if (!Store.state.settings.voice && !o.force) return null;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ko-KR'; u.rate = o.rate || 0.92; u.pitch = o.pitch || 1.05;
    if (koVoice) u.voice = koVoice;
    if (o.onboundary) u.onboundary = o.onboundary;
    if (o.onend) u.onend = o.onend;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
    return u;
  }
  function stopSpeak() { if ('speechSynthesis' in window) speechSynthesis.cancel(); }

  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function todayKey(d) {
    const t = d ? new Date(d) : new Date();
    return t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, '0') + '-' + String(t.getDate()).padStart(2, '0');
  }
  function daysBetween(a, b) { return Math.round((b - a) / 86400000); }
  function fmtDate(ts) {
    const d = new Date(ts);
    return (d.getMonth() + 1) + '월 ' + d.getDate() + '일';
  }
  function el(tag, cls, html) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function debounce(fn, ms) {
    let t; return function () { const a = arguments, s = this; clearTimeout(t); t = setTimeout(() => fn.apply(s, a), ms); };
  }
  /* 받침에 맞는 조사 고르기: josa('호프', ['을','를']) → '를' */
  function josa(word, pair) {
    const w = String(word || '').trim();
    const last = w.slice(-1);
    const j = jamoOf(last);
    return j && j.jong ? pair[0] : pair[1];
  }

  window.U = { $, $$, toast, josa, beep, fanfare, click, speak, stopSpeak, pickVoice,
               uid, todayKey, daysBetween, fmtDate, el, debounce, jamoOf, vowelShape, KO_JAMO };
})();
