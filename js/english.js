/* =====================================================================
   카봇 영어 출동 미션 · 화면
   ---------------------------------------------------------------------
   영어 암호(파닉스 단어)를 4선 노트에 3번(따라쓰기 1 + 혼자쓰기 2) 쓰면
   ⚡ 에너지 코어 1개 → 4개마다 카봇 리더스 미션(6줄) 1개 해금
   ===================================================================== */
(function () {
  const $ = U.$;

  const E = {
    step: 's1',
    word: null, stepNo: 1, strokesCount: 0,
    strokes: [], cur: null, drawing: false,
    canvas: null, ctx: null, guideOn: true, passed: false,
    w: 0, h: 0, dpr: 1, fs: 60, baseY: 0, startX: 0, adv: 0,
    mask: null, maskW: 0, maskH: 0, maskTotal: 0,
    mission: null, lineIdx: -1, showGloss: false, readDone: false,
    playing: false
  };

  /* ---------------- 영어 읽어주기 ---------------- */
  let enVoice = null;
  function pickEnVoice() {
    if (!('speechSynthesis' in window)) return null;
    const vs = speechSynthesis.getVoices() || [];
    enVoice = vs.find(v => /^en[-_]US/i.test(v.lang)) || vs.find(v => /^en/i.test(v.lang)) || null;
    return enVoice;
  }
  if ('speechSynthesis' in window) {
    pickEnVoice();
    speechSynthesis.addEventListener && speechSynthesis.addEventListener('voiceschanged', pickEnVoice);
  }
  function speakEN(text, opt) {
    const o = opt || {};
    if (!o.silent && Store.settings && Store.settings().voice === false) return null;
    if (!('speechSynthesis' in window)) {
      if (!o.silent) U.toast('이 브라우저는 영어 읽어주기를 지원하지 않아요');
      return null;
    }
    if (!enVoice) pickEnVoice();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US'; u.rate = o.rate || 0.86; u.pitch = 1.02;
    if (enVoice) u.voice = enVoice;
    if (o.onend) u.onend = o.onend;
    if (o.onstart) u.onstart = o.onstart;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
    return u;
  }
  function stopSpeak() {
    E.playing = false; E.lineIdx = -1;
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    document.querySelectorAll('.rline.now').forEach(el => el.classList.remove('now'));
  }

  /* ---------------- 진행도 ---------------- */
  function enState() {
    const s = Store.state;
    if (!s.en) s.en = { words: {}, missions: {}, last: 0 };
    s.en.words = s.en.words || {}; s.en.missions = s.en.missions || {};
    return s.en;
  }
  function wordRec(id) {
    const en = enState();
    if (!en.words[id]) en.words[id] = { t: 0, done: false, steps: 0 };
    return en.words[id];
  }
  function wordDone(id) { const r = enState().words[id]; return !!(r && r.done); }
  function stepWords(step) { return EN_WORDS.filter(w => w.step === step); }
  function stepCores(step) { return stepWords(step).filter(w => wordDone(w.id)).length; }
  function totalCores() { return EN_WORDS.filter(w => wordDone(w.id)).length; }
  function stepMissions(step) { return EN_MISSIONS.filter(m => m.step === step); }
  function missionUnlocked(m) {
    const list = stepMissions(m.step);
    const idx = list.findIndex(x => x.id === m.id);
    return stepCores(m.step) >= EN_CORES_PER_MISSION * (idx + 1);
  }
  function missionNeed(m) {
    const list = stepMissions(m.step);
    const idx = list.findIndex(x => x.id === m.id);
    return Math.max(0, EN_CORES_PER_MISSION * (idx + 1) - stepCores(m.step));
  }
  function missionRead(id) { return !!(enState().missions[id] && enState().missions[id].read); }

  function completeWord(id) {
    const en = enState();
    const r = wordRec(id);
    const before = stepCores(EN_WORD_BY_ID[id].step);
    r.steps = Math.min(3, (r.steps || 0) + 1);
    r.t = Date.now();
    if (!r.done && r.steps >= 3) r.done = true;
    en.last = Date.now();
    Store.save('en');
    return { wasDone: r.done, coresBefore: before, coresAfter: stepCores(EN_WORD_BY_ID[id].step) };
  }
  function markMissionRead(id) {
    const en = enState();
    en.missions[id] = { read: 1, t: Date.now() };
    en.last = Date.now();
    Store.save('en');
  }

  /* =====================================================================
     목록 화면
     ===================================================================== */
  function render() {
    renderHero();
    renderSteps();
    renderWordGrid();
    renderMissions();
  }

  function renderHero() {
    const el = $('#enCoreTotal'); if (el) el.textContent = totalCores();
    const done = EN_WORDS.filter(w => wordDone(w.id)).length;
    const pct = Math.round(done / EN_WORDS.length * 100);
    const bar = $('#enTotalBar'); if (bar) bar.style.width = pct + '%';
    const txt = $('#enTotalText'); if (txt) txt.textContent = done + ' / ' + EN_WORDS.length + ' 단어 완료';
    const ms = EN_MISSIONS.filter(m => missionRead(m.id)).length;
    const mt = $('#enMissionTotal'); if (mt) mt.textContent = ms;
  }

  function renderSteps() {
    const box = $('#enStepChips'); if (!box) return;
    box.innerHTML = '';
    EN_STEPS.forEach(s => {
      const words = stepWords(s.id);
      const done = stepCores(s.id);
      const btn = U.el('button', 'en-step' + (E.step === s.id ? ' active' : ''));
      btn.style.setProperty('--step-color', s.color);
      btn.innerHTML =
        '<span class="es-emoji">' + s.emoji + '</span>' +
        '<span class="es-body"><em class="es-tag">' + s.tag + '</em>' +
        '<b>' + s.title + '</b>' +
        '<small>' + s.sub + '</small>' +
        '<span class="es-bar"><i style="width:' + Math.round(done / words.length * 100) + '%"></i></span>' +
        '<em class="es-core">⚡ ' + done + ' / ' + words.length + '</em></span>';
      btn.addEventListener('click', () => { U.click(); E.step = s.id; render(); });
      box.appendChild(btn);
    });
    const intro = $('#enStepIntro');
    if (intro) {
      const s = EN_STEPS.find(x => x.id === E.step);
      intro.textContent = s.intro;
    }
  }

  function renderWordGrid() {
    const grid = $('#enWordGrid'); if (!grid) return;
    const words = stepWords(E.step);
    const head = $('#enWordCount');
    if (head) head.textContent = words.length + '개 중 ' + stepCores(E.step) + '개 완료';
    grid.innerHTML = '';
    words.forEach(w => {
      const done = wordDone(w.id);
      const r = enState().words[w.id];
      const card = U.el('button', 'en-word' + (done ? ' done' : ''));
      card.innerHTML =
        '<span class="ew-emoji">' + w.emoji + '</span>' +
        (done ? '<span class="ew-core">⚡</span>' : '') +
        '<b class="ew-word">' + w.w + '</b>' +
        '<span class="ew-ko">' + w.ko + '</span>' +
        '<span class="ew-f">' + (w.alt ? w.alt + ' ↔ ' + w.w : w.f) + '</span>' +
        (done && r && r.steps >= 3 ? '' : (r && r.steps > 0 ? '<i class="ew-now">' + r.steps + '/3</i>' : ''));
      card.addEventListener('click', () => { U.click(); openWord(w.id); });
      grid.appendChild(card);
    });
  }

  function renderMissions() {
    const box = $('#enMissionList'); if (!box) return;
    box.innerHTML = '';
    const mts = stepMissions(E.step);
    const cores = stepCores(E.step);
    mts.forEach((m, i) => {
      const unlocked = cores >= EN_CORES_PER_MISSION * (i + 1);
      const read = missionRead(m.id);
      const c = CARBOT_BY_ID[m.carbot] || { name: '카봇', img: '' };
      const item = U.el('button', 'en-mission' + (unlocked ? '' : ' locked') + (read ? ' read' : ''));
      item.innerHTML =
        '<img src="' + c.img + '" alt="' + c.name + '" loading="lazy">' +
        '<span class="m-body"><b>' + m.title + '</b><small>' + m.ko + ' · ' + c.name + '</small>' +
        '<span class="m-meta">' + (unlocked ? (read ? '⭐ 읽음' : '📖 열림 · 6줄 리더스') : '⚡ ' + missionNeed(m) + '개 더 모으면 열려요') + '</span></span>' +
        '<span class="m-go">' + (unlocked ? '›' : '🔒') + '</span>';
      item.addEventListener('click', () => {
        if (!unlocked) { U.toast('⚡ 에너지 코어 ' + missionNeed(m) + '개를 더 모아요!'); return; }
        U.click(); openReader(m.id);
      });
      box.appendChild(item);
    });
  }

  /* =====================================================================
     단어 쓰기
     ===================================================================== */
  function showList() {
    document.body.classList.remove('in-en');
    $('#enHome').classList.remove('hidden');
    $('#enPractice').classList.add('hidden');
    $('#enReader').classList.add('hidden');
    $('#enReward').classList.add('hidden');
    U.stopSpeak(); stopSpeak();
    render();
  }

  function openWord(id) {
    const w = EN_WORD_BY_ID[id]; if (!w) return;
    E.word = w; E.stepNo = 1; E.strokes = []; E.cur = null; E.passed = false;
    E.guideOn = true;
    $('#enHome').classList.add('hidden');
    $('#enReader').classList.add('hidden');
    $('#enPractice').classList.remove('hidden');
    $('#enReward').classList.add('hidden');
    document.body.classList.add('in-en');

    $('#enWordTitle').textContent = w.w;
    $('#enWordKo').textContent = w.emoji + ' ' + w.ko;
    $('#enWordFocus').textContent = w.alt ? (w.alt + ' ↔ ' + w.w + ' · ' + w.f) : w.f;
    $('#enPracticeName').textContent = w.w;
    const r = enState().words[id];
    E.stepNo = (r && !r.done && r.steps > 0) ? Math.min(3, r.steps + 1) : 1;
    updateStepUI();
    resize();
    setTimeout(resize, 60);
    speakEN(w.w);
    U.speak(w.ko);
    settleMeter();
  }

  function updateStepUI() {
    U.$$('#enStepRow .step').forEach(s => {
      const n = Number(s.dataset.step);
      s.classList.toggle('active', n === E.stepNo);
      s.classList.toggle('done', n < E.stepNo);
    });
    E.guideOn = E.stepNo === 1;
    const gb = $('#enToolGuide'); if (gb) gb.classList.toggle('on', E.guideOn);
    const tip = $('#enCanvasTip');
    if (tip) tip.textContent = E.stepNo === 1 ? '점선 글자를 따라 천천히 써 보세요'
      : E.stepNo === 2 ? '이번엔 점선 없이 혼자!' : '마지막! 한 번 더 써 봐요';
    const btn = $('#enBtnNext');
    if (btn) { btn.disabled = true; btn.textContent = E.stepNo < 3 ? '다음 ›' : '암호 완성! ⚡'; }
    E.passed = false;
  }

  /* ---------------- 4선 노트 캔버스 ---------------- */
  function resize() {
    const wrap = $('#enCanvasWrap'); if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const w = Math.max(280, rect.width);
    const word = E.word ? E.word.w : '';
    const padX = 26;
    // 폭에 맞춰 글자 크기를 정하고, 4선 노트 높이를 글자에 딱 맞춰 잡습니다
    const fitFs = (w - padX * 2) / (Math.max(1, word.length) * 0.62);
    const fs = Math.max(34, Math.min(fitFs, 140));
    const blockH = fs * 0.98;
    const h = Math.round(blockH + 40);
    wrap.style.height = h + 'px';
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const cv = $('#enCanvas');
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    cv.style.width = w + 'px'; cv.style.height = h + 'px';
    E.canvas = cv; E.ctx = cv.getContext('2d');
    E.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    E.w = w; E.h = h; E.dpr = dpr;
    E.fs = fs;
    const totalW = word.length * 0.62 * fs;
    E.adv = 0.62 * fs;
    E.startX = Math.max(padX, (w - totalW) / 2);
    E.topY = 20;
    E.baseY = E.topY + fs * 0.76;
    E.guideTop = E.baseY - fs * 0.76;
    E.guideMid = E.baseY - fs * 0.55;
    E.guideBase = E.baseY;
    E.guideDesc = E.baseY + fs * 0.22;
    buildMask();
    redraw();
  }

  function fontFor(size) {
    return '700 ' + size + 'px "Comic Sans MS","Chalkboard SE","Segoe UI","Trebuchet MS",Arial,sans-serif';
  }

  function buildMask() {
    const scale = 0.25;
    const mw = Math.max(40, Math.round(E.w * scale)), mh = Math.max(30, Math.round(E.h * scale));
    const c = document.createElement('canvas'); c.width = mw; c.height = mh;
    const g = c.getContext('2d');
    g.fillStyle = '#000'; g.textAlign = 'center'; g.textBaseline = 'alphabetic';
    g.font = fontFor(E.fs * scale);
    const word = E.word ? E.word.w : '';
    for (let i = 0; i < word.length; i++) {
      g.fillText(word[i], (E.startX + E.adv * (i + 0.5)) * scale, E.baseY * scale);
    }
    E.mask = g.getImageData(0, 0, mw, mh).data;
    E.maskW = mw; E.maskH = mh; E.maskTotal = 0;
    for (let i = 3; i < E.mask.length; i += 4) if (E.mask[i] > 40) E.maskTotal++;
  }

  function drawNotebook(ctx) {
    const x0 = 10, x1 = E.w - 10;
    ctx.save();
    ctx.lineWidth = 1.6;
    // 위 · 기준선 · 아래선 실선, 가운데 점선
    [['#cfe6f7', E.guideTop], ['#bfe0f5', E.guideBase], ['#e3f1fb', E.guideDesc]].forEach(([col, y]) => {
      ctx.strokeStyle = col; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
    });
    ctx.setLineDash([7, 8]); ctx.strokeStyle = '#a9d3ee';
    ctx.beginPath(); ctx.moveTo(x0, E.guideMid); ctx.lineTo(x1, E.guideMid); ctx.stroke();
    ctx.setLineDash([]);
    // 시작선
    ctx.strokeStyle = '#dcecf8';
    ctx.beginPath(); ctx.moveTo(E.startX - 6, E.guideTop - 4); ctx.lineTo(E.startX - 6, E.guideDesc + 4); ctx.stroke();
    // 왼쪽 여백선
    ctx.strokeStyle = '#ffd7e2';
    ctx.beginPath(); ctx.moveTo(x0 + 12, E.guideTop - 8); ctx.lineTo(x0 + 12, E.guideDesc + 8); ctx.stroke();
    ctx.restore();
  }

  function drawGuide(ctx) {
    const word = E.word ? E.word.w : '';
    ctx.save();
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    ctx.font = fontFor(E.fs);
    for (let i = 0; i < word.length; i++) {
      const x = E.startX + E.adv * (i + 0.5);
      ctx.fillStyle = 'rgba(150,200,235,.20)';
      ctx.fillText(word[i], x, E.baseY);
      ctx.lineJoin = 'round';
      ctx.setLineDash([6, 7]); ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(96,166,214,.55)';
      ctx.strokeText(word[i], x, E.baseY);
      ctx.setLineDash([]);
    }
    ctx.restore();
  }

  function redraw() {
    const ctx = E.ctx; if (!ctx) return;
    ctx.clearRect(0, 0, E.w, E.h);
    drawNotebook(ctx);
    if (E.guideOn) drawGuide(ctx);
    E.strokes.forEach(s => paintStroke(ctx, s));
  }

  function paintStroke(ctx, s) {
    if (!s.pts.length) return;
    ctx.save();
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.globalCompositeOperation = s.erase ? 'destination-out' : 'source-over';
    ctx.strokeStyle = s.color; ctx.lineWidth = s.width;
    ctx.beginPath();
    ctx.moveTo(s.pts[0].x, s.pts[0].y);
    if (s.pts.length === 1) ctx.lineTo(s.pts[0].x + 0.1, s.pts[0].y + 0.1);
    else for (let i = 1; i < s.pts.length; i++) ctx.lineTo(s.pts[i].x, s.pts[i].y);
    ctx.stroke();
    ctx.restore();
  }

  /* ---------------- 입력 ---------------- */
  function pos(e) {
    const r = E.canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }
  function onDown(e) {
    e.preventDefault();
    if (E.canvas.setPointerCapture) { try { E.canvas.setPointerCapture(e.pointerId); } catch (err) {} }
    E.drawing = true;
    const p = pos(e);
    E.cur = { color: '#2f86d8', width: 10, pts: [p] };
    E.strokes.push(E.cur);
    paintStroke(E.ctx, E.cur);
  }
  function onMove(e) {
    if (!E.drawing || !E.cur) return;
    e.preventDefault();
    const p = pos(e);
    const last = E.cur.pts[E.cur.pts.length - 1];
    if (Math.hypot(p.x - last.x, p.y - last.y) < 1.6) return;
    E.cur.pts.push(p);
    const ctx = E.ctx;
    ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.strokeStyle = E.cur.color; ctx.lineWidth = E.cur.width;
    ctx.beginPath(); ctx.moveTo(last.x, last.y); ctx.lineTo(p.x, p.y); ctx.stroke();
    ctx.restore();
  }
  function onUp() {
    if (!E.drawing) return;
    E.drawing = false; E.cur = null;
    measure();
  }

  /* ---------------- 채점 ---------------- */
  function measure() {
    if (!E.mask) return 0;
    const scale = 0.25, mw = E.maskW, mh = E.maskH;
    const c = document.createElement('canvas'); c.width = mw; c.height = mh;
    const g = c.getContext('2d');
    g.save(); g.scale(scale, scale);
    E.strokes.forEach(s => paintStroke(g, s));
    g.restore();
    const ink = g.getImageData(0, 0, mw, mh).data;

    const dil = new Uint8Array(mw * mh);
    for (let y = 0; y < mh; y++) for (let x = 0; x < mw; x++) {
      if (ink[(y * mw + x) * 4 + 3] > 30) dil[y * mw + x] = 1;
    }
    const idx = (x, y) => (y < 0 || y >= mh || x < 0 || x >= mw) ? 0 : dil[y * mw + x];
    const dil2 = dil.slice();
    for (let y = 0; y < mh; y++) for (let x = 0; x < mw; x++) {
      if (idx(x, y)) continue;
      if (idx(x - 1, y) || idx(x + 1, y) || idx(x, y - 1) || idx(x, y + 1) ||
          idx(x - 1, y - 1) || idx(x + 1, y + 1) || idx(x - 1, y + 1) || idx(x + 1, y - 1)) dil2[y * mw + x] = 1;
    }
    let covered = 0, inkPix = 0;
    for (let p = 0, i = 0; p < mw * mh; p++, i += 4) {
      if (E.mask[i + 3] > 40 && dil2[p]) covered++;
      if (ink[i + 3] > 30) inkPix++;
    }
    const cov = E.maskTotal ? covered / E.maskTotal : 0;
    const ratio = E.maskTotal ? inkPix / E.maskTotal : 0;
    const pass = E.stepNo === 1 ? cov >= 0.30 : (ratio >= 0.16 && cov >= 0.08);
    const pct = Math.min(100, Math.round((E.stepNo === 1 ? cov / 0.30 : Math.min(ratio / 0.16, cov / 0.08)) * 100));
    setMeter(pct);
    if (pass && !E.passed) {
      E.passed = true;
      const btn = $('#enBtnNext'); if (btn) btn.disabled = false;
      U.beep(880, 0.1, 'sine', 0.05);
      U.toast('잘 썼어요! 다음으로 넘어가요 👍', 1200);
    } else if (!pass && E.passed) {
      E.passed = false;
      const btn = $('#enBtnNext'); if (btn) btn.disabled = true;
    }
    return pct;
  }

  function setMeter(pct) {
    const f = $('#enMeterFill'), t = $('#enMeterText');
    if (f) f.style.width = Math.max(0, Math.min(100, pct)) + '%';
    if (t) t.textContent = Math.max(0, Math.min(100, pct)) + '%';
  }
  function settleMeter() { setMeter(0); const b = $('#enBtnNext'); if (b) b.disabled = true; }

  /* ---------------- 단계 진행 ---------------- */
  function nextStep() {
    if (!E.passed) { U.toast('조금만 더 써 볼까요? ✍️'); return; }
    const isLast = E.stepNo >= 3;
    const res = completeWord(E.word.id);
    if (!isLast) {
      E.stepNo++; E.strokes = []; E.cur = null;
      updateStepUI(); redraw(); settleMeter();
      U.beep(760, 0.08, 'sine', 0.04);
      speakEN(E.word.w);
      return;
    }
    showReward(res);
  }

  function showReward(res) {
    $('#enPractice').classList.add('hidden');
    const box = $('#enReward');
    box.classList.remove('hidden');
    const w = E.word;
    $('#enRewardWord').textContent = w.w;
    $('#enRewardKo').textContent = w.emoji + ' ' + w.ko;
    $('#enRewardCores').textContent = stepCores(w.step);
    const stepM = stepMissions(w.step);
    const cores = stepCores(w.step);
    const justUnlocked = stepM.filter((m, i) => EN_CORES_PER_MISSION * (i + 1) === cores);
    const remain = EN_CORES_PER_MISSION - (cores % EN_CORES_PER_MISSION);
    $('#enRewardSub').textContent = justUnlocked.length
      ? '⚡ 에너지 코어 ' + EN_CORES_PER_MISSION + '개 완성! 새 리더스 「' + justUnlocked[0].title + '」가 열렸어요!'
      : '⚡ 에너지 코어 +1 · 다음 리더스까지 ' + (remain === EN_CORES_PER_MISSION ? 0 : remain) + '개';
    U.fanfare();
    speakEN(w.w + '! Great job!', { silent: true });
    const go = $('#enBtnGoReader');
    if (go) {
      go.style.display = justUnlocked.length ? '' : 'none';
      go.dataset.mission = justUnlocked.length ? justUnlocked[0].id : '';
    }
    const more = $('#enBtnNextWord');
    if (more) {
      more.style.display = justUnlocked.length ? 'none' : '';
      more.className = justUnlocked.length ? 'btn ghost' : 'btn primary';
    }
    if (go) go.className = 'btn primary';
  }

  /* =====================================================================
     리더스 미션
     ===================================================================== */
  function openReader(id) {
    const m = EN_MISSIONS.find(x => x.id === id); if (!m) return;
    E.mission = m; E.showGloss = false; E.readDone = missionRead(m.id);
    E.step = m.step;
    $('#enHome').classList.add('hidden');
    $('#enPractice').classList.add('hidden');
    $('#enReward').classList.add('hidden');
    $('#enReader').classList.remove('hidden');
    document.body.classList.add('in-en');
    renderReader();
    setTimeout(() => speakMission(0), 220);
  }

  function renderReader() {
    const m = E.mission; if (!m) return;
    const c = CARBOT_BY_ID[m.carbot] || { name: '카봇', img: '' };
    $('#enReaderImg').src = c.img;
    $('#enReaderImg').alt = c.name;
    $('#enReaderTitle').textContent = m.title;
    $('#enReaderKo').textContent = m.ko + ' · ' + c.name;
    $('#enReaderTag').textContent = (EN_STEPS.find(s => s.id === m.step) || {}).tag || '';
    const box = $('#enReaderLines');
    box.innerHTML = '';
    m.lines.forEach((line, i) => {
      const b = U.el('button', 'rline' + (E.lineIdx === i ? ' now' : ''));
      b.dataset.i = String(i);
      b.innerHTML = '<span class="rl-n">' + (i + 1) + '</span><span class="rl-t">' + line + '</span><span class="rl-play">🔊</span>';
      b.addEventListener('click', () => { U.click(); speakMission(i); });
      box.appendChild(b);
    });
    const mark = $('#enBtnReadDone');
    if (mark) {
      mark.textContent = E.readDone ? '⭐ 읽음 완료' : '다 읽었어요! ⭐';
      mark.classList.toggle('done', E.readDone);
    }
    renderGloss();
  }

  function renderGloss() {
    const box = $('#enReaderWords'); if (!box) return;
    const m = E.mission;
    const found = [];
    const seen = new Set();
    (m ? m.lines : []).forEach(line => {
      line.toLowerCase().replace(/[^a-z' -]/g, ' ').split(/[\s-]+/).forEach(w0 => {
        const w = w0.replace(/'/g, '');
        if (!w || seen.has(w)) return;
        const dict = EN_DICT[w] || (EN_WORD_BY_ID[w] ? EN_WORD_BY_ID[w].ko : null);
        if (dict) { seen.add(w); found.push({ w, ko: dict }); }
      });
    });
    box.innerHTML = found.map(x => '<span class="gl"><b>' + x.w + '</b>' + x.ko + '</span>').join('');
    box.classList.toggle('hidden', !E.showGloss);
  }

  function speakMission(startIdx) {
    const m = E.mission; if (!m) return;
    // 읽어주기 꺼짐: 소리 없이 문장 하이라이트만 순서대로 보여 줍니다
    if (Store.settings && Store.settings().voice === false) {
      stopSpeak(); E.playing = true;
      let k = startIdx || 0;
      const tick = () => {
        if (!E.playing || k >= m.lines.length) { E.playing = false; E.lineIdx = -1; document.querySelectorAll('.rline.now').forEach(el => el.classList.remove('now')); return; }
        highlight(k); k++;
        setTimeout(tick, 900);
      };
      tick();
      return;
    }
    if (!('speechSynthesis' in window)) {
      U.toast('이 브라우저는 영어 읽어주기를 지원하지 않아요');
      // 그래도 화면 하이라이트는 보여 줍니다
      highlight(startIdx);
      setTimeout(() => highlight(-1), 1400);
      return;
    }
    E.playing = true;
    let i = startIdx || 0;
    const step = () => {
      if (!E.playing || i >= m.lines.length) {
        E.playing = false;
        E.lineIdx = -1;
        document.querySelectorAll('.rline.now').forEach(el => el.classList.remove('now'));
        if (E.playing === false && i >= m.lines.length && startIdx === 0) {
          const b = $('#enBtnReadDone');
          if (b && !E.readDone) b.classList.add('pulse');
        }
        return;
      }
      highlight(i);
      const u = new SpeechSynthesisUtterance(m.lines[i]);
      u.lang = 'en-US'; u.rate = 0.82; u.pitch = 1.03;
      if (!enVoice) pickEnVoice();
      if (enVoice) u.voice = enVoice;
      u.onend = () => { if (!E.playing) return; i++; setTimeout(step, 260); };
      u.onerror = () => { E.playing = false; E.lineIdx = -1; document.querySelectorAll('.rline.now').forEach(el => el.classList.remove('now')); };
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
    };
    step();
  }

  function highlight(i) {
    E.lineIdx = i;
    document.querySelectorAll('.rline').forEach(el => {
      const on = Number(el.dataset.i) === i;
      el.classList.toggle('now', on);
      if (on) el.classList.add('heard');
    });
  }

  function finishReader() {
    if (!E.mission) return;
    markMissionRead(E.mission.id);
    E.readDone = true;
    const b = $('#enBtnReadDone');
    if (b) { b.textContent = '⭐ 읽음 완료'; b.classList.add('done'); b.classList.remove('pulse'); }
    U.fanfare();
    U.toast('리더스 미션 완료! ⭐', 1600);
    renderMissions(); renderHero();
  }

  /* =====================================================================
     이벤트
     ===================================================================== */
  function bind() {
    const cv = $('#enCanvas');
    if (cv && !cv.dataset.bound) {
      cv.dataset.bound = '1';
      cv.addEventListener('pointerdown', onDown);
      cv.addEventListener('pointermove', onMove);
      cv.addEventListener('pointerup', onUp);
      cv.addEventListener('pointercancel', onUp);
      cv.addEventListener('pointerleave', (e) => { if (E.drawing) onUp(e); });
    }
    $('#enBtnBack') && $('#enBtnBack').addEventListener('click', () => { U.click(); showList(); });
    $('#enBtnSpeak') && $('#enBtnSpeak').addEventListener('click', () => {
      if (!E.word) return;
      speakEN(E.word.w);
      U.speak(E.word.ko);
    });
    $('#enBtnNext') && $('#enBtnNext').addEventListener('click', nextStep);
    $('#enBtnSkip') && $('#enBtnSkip').addEventListener('click', () => {
      if (E.stepNo < 3) {
        E.stepNo++; E.strokes = []; E.cur = null;
        updateStepUI(); redraw(); settleMeter();
      } else {
        const res = completeWord(E.word.id);
        showReward(res);
      }
    });
    $('#enToolUndo') && $('#enToolUndo').addEventListener('click', () => {
      if (!E.strokes.length) return;
      E.strokes.pop(); redraw(); measure();
    });
    $('#enToolClear') && $('#enToolClear').addEventListener('click', () => {
      E.strokes = []; redraw(); settleMeter();
    });
    $('#enToolGuide') && $('#enToolGuide').addEventListener('click', (e) => {
      E.guideOn = !E.guideOn;
      e.currentTarget.classList.toggle('on', E.guideOn);
      redraw();
    });
    $('#enBtnAnother') && $('#enBtnAnother').addEventListener('click', () => { U.click(); showList(); });
    $('#enBtnNextWord') && $('#enBtnNextWord').addEventListener('click', () => {
      U.click();
      const list = stepWords(E.step);
      const cur = list.findIndex(x => x.id === (E.word && E.word.id));
      const next = list[(cur + 1) % list.length];
      if (next) openWord(next.id);
    });
    $('#enBtnGoReader') && $('#enBtnGoReader').addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.mission;
      U.click();
      if (id) openReader(id); else showList();
    });
    $('#enBtnReaderBack') && $('#enBtnReaderBack').addEventListener('click', () => { U.click(); stopSpeak(); showList(); });
    $('#enBtnReadAll') && $('#enBtnReadAll').addEventListener('click', () => { stopSpeak(); speakMission(0); });
    $('#enBtnStopRead') && $('#enBtnStopRead').addEventListener('click', () => { stopSpeak(); });
    $('#enBtnGloss') && $('#enBtnGloss').addEventListener('click', (e) => {
      E.showGloss = !E.showGloss;
      e.currentTarget.classList.toggle('on', E.showGloss);
      renderGloss();
    });
    $('#enBtnReadDone') && $('#enBtnReadDone').addEventListener('click', finishReader);
    window.addEventListener('resize', U.debounce(() => {
      if ($('#enPractice') && !$('#enPractice').classList.contains('hidden')) resize();
    }, 160));
  }

  Store.onChange(() => {
    if (document.getElementById('page-english') && document.getElementById('page-english').classList.contains('active')) {
      if (!$('#enHome').classList.contains('hidden')) render();
    }
  });

  window.English = { render, bind, openWord, openReader, showList, resize, E,
                     cores: totalCores, stepCores, wordDone, missionUnlocked, missionRead };
})();
