/* =====================================================================
   한글 쓰기 연습
   1) 따라쓰기(점선 가이드) → 2) 혼자쓰기 → 3) 한 번 더 → 카봇칩 획득
   ===================================================================== */
(function () {
  const $ = U.$, $$ = U.$$;

  const W = {
    char: null, mode: 'practice', step: 1, steps: 0,
    strokes: [], cur: null, drawing: false,
    guideOn: true, hintOn: false,
    canvas: null, ctx: null, wrap: null,
    maskData: null, maskW: 0, maskH: 0,
    scale: 1, w: 0, h: 0, cells: [],
    passed: false, tries: 0
  };

  /* ---------- 목록 ---------- */
  function renderList() {
    const grid = $('#charGrid');
    if (!grid) return;
    const lvl = Number($('.lvl.active').dataset.level || 0);
    const season = $('#seasonFilter').value;
    const q = ($('#searchInput').value || '').trim();

    let list = CARBOTS.slice();
    if (lvl) list = list.filter(c => c.level === lvl);
    if (season !== 'all') list = list.filter(c => c.series === season);
    if (q) list = list.filter(c => c.name.replace(/\s/g, '').includes(q.replace(/\s/g, '')));

    const hint = $('#listHint');
    if (hint) hint.textContent = lvl ? LEVEL_INFO[lvl].emoji + ' ' + LEVEL_INFO[lvl].desc + ' · ' + list.length + '마리'
      : '글자 수와 받침으로 난이도를 나눴어요 · 모두 ' + list.length + '마리';

    grid.innerHTML = '';
    if (!list.length) {
      grid.innerHTML = '<p class="chip-empty">찾는 카봇이 없어요. 다른 이름으로 찾아볼까요?</p>';
      return;
    }
    list.forEach(c => {
      const r = Store.state.chars[c.id];
      const done = r && r.done;
      const chip = r && r.chips > 0;
      const card = U.el('button', 'ccard' + (done ? ' done' : ''));
      card.dataset.id = c.id;
      card.innerHTML =
        '<span class="lvl-pill">' + LEVEL_INFO[c.level].emoji + '</span>' +
        (chip ? '<span class="badge">🧊</span>' : done ? '<span class="badge">✅</span>' : '') +
        '<img src="' + c.img + '" alt="' + c.name + '" loading="lazy" decoding="async">' +
        '<div class="nm">' + c.name + '</div>' +
        '<div class="meta">' + c.seriesName + ' · ' + c.syl + '글자</div>';
      grid.appendChild(card);
    });
  }

  function fillSeasonFilter() {
    const sel = $('#seasonFilter'), dex = $('#dexSeason');
    const seasons = [...new Set(CARBOTS.map(c => c.series))]
      .map(s => ({ s, name: (CARBOTS.find(c => c.series === s) || {}).seriesName }))
      .sort((a, b) => (a.s.startsWith('S') ? Number(a.s.slice(1)) : 99) - (b.s.startsWith('S') ? Number(b.s.slice(1)) : 99));
    const html = '<option value="all">모든 시즌</option>' + seasons.map(x => `<option value="${x.s}">${x.name}</option>`).join('');
    if (sel) sel.innerHTML = html;
    if (dex) dex.innerHTML = html;
  }

  /* ---------- 연습 시작 ---------- */
  function open(charId, mode) {
    W.char = CARBOT_BY_ID[charId];
    if (!W.char) return;
    W.mode = mode || 'practice';
    W.step = 1; W.steps = 0; W.strokes = []; W.cur = null; W.passed = false; W.tries = 0;
    W.color = '#2f86d8'; W.penWidth = 8; W.eraser = false;
    W.hintOn = false;

    $('#writeSelect').classList.add('hidden');
    $('#practice').classList.remove('hidden');
    document.body.classList.add('in-practice');
    $('#reward').classList.add('hidden');

    $('#pracTitle').textContent = W.char.name;
    $('#practiceName').textContent = W.char.name;
    const img = $('#pracImg'); img.src = W.char.img; img.alt = W.char.name;
    $('#pracDesc').textContent = W.char.tag || '';

    const tags = [$('#' + 'x') ? '' : '', LEVEL_INFO[W.char.level].emoji + ' ' + LEVEL_INFO[W.char.level].name,
                  W.char.seriesName, W.char.syl + '글자',
                  W.char.fin ? '받침 있음' : '받침 없음', W.char.dbl ? '겹받침' : ''].filter(Boolean);
    $('#pracTags').innerHTML = tags.map(t => '<span>' + t + '</span>').join('');

    // 이전에 쓴 단계 이어서
    const r = Store.state.chars[charId];
    if (mode === 'review') { W.step = 1; }
    else if (r && !r.done && r.steps > 0 && r.steps < 3) {
      W.step = Math.min(3, r.steps + 1);
    }
    updateStepUI();
    resize();
    setTimeout(() => { resize(); }, 60);
    U.speak(W.char.name);
    settleMeter();
  }

  function closeToList() {
    document.body.classList.remove('in-practice');
    $('#practice').classList.add('hidden');
    $('#reward').classList.add('hidden');
    $('#writeSelect').classList.remove('hidden');
    renderList();
    U.stopSpeak();
  }

  function updateStepUI() {
    $$('.step').forEach(s => {
      const n = Number(s.dataset.step);
      s.classList.toggle('active', n === W.step);
      s.classList.toggle('done', n < W.step);
    });
    W.guideOn = W.step === 1;
    const gbtn = $('#toolGuide');
    if (gbtn) gbtn.classList.toggle('on', W.guideOn);
    const tip = $('#canvasTip');
    if (tip) tip.textContent = W.step === 1 ? '점선을 따라 천천히 써 보세요' : (W.step === 2 ? '이번엔 가이드 없이 혼자!' : '마지막! 한 번 더 써 봐요');
    const btn = $('#btnNextStep');
    if (btn) { btn.disabled = true; btn.textContent = W.step < 3 ? '다음 ›' : '완료! 🎉'; }
    W.passed = false;
  }

  /* ---------- 캔버스 ---------- */
  const KFONT = '"Apple SD Gothic Neo","Malgun Gothic","Noto Sans KR",sans-serif';
  const fitCache = {};

  /* 한 음절이 칸 정중앙에 78~82% 크기로 꽉 차도록 글자 크기와 중심을 맞춥니다 */
  function fitFont(ch, cellW, cellH) {
    const key = ch + '|' + Math.round(cellW) + 'x' + Math.round(cellH);
    if (fitCache[key]) return fitCache[key];
    const probe = document.createElement('canvas');
    probe.width = 320; probe.height = 320;
    const g = probe.getContext('2d');
    g.font = '700 100px ' + KFONT;
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillStyle = '#000';
    g.fillText(ch, 160, 160);
    const d = g.getImageData(0, 0, 320, 320).data;
    let x0 = 320, y0 = 320, x1 = 0, y1 = 0;
    for (let y = 0; y < 320; y++) for (let x = 0; x < 320; x++) {
      if (d[(y * 320 + x) * 4 + 3] > 24) {
        if (x < x0) x0 = x; if (x > x1) x1 = x;
        if (y < y0) y0 = y; if (y > y1) y1 = y;
      }
    }
    const iw = Math.max(1, x1 - x0 + 1), ih = Math.max(1, y1 - y0 + 1);
    const fsH = (cellH * 0.80) / (ih / 100);
    const fsW = (cellW * 0.84) / (iw / 100);
    const fs = Math.max(24, Math.min(fsH, fsW));
    // 100px 기준 잉크 중심이 글자 기준점(160,160)에서 얼마나 벗어났는지
    const dx = ((x0 + x1) / 2) - 160;
    const dy = ((y0 + y1) / 2) - 160;
    const out = { fs, dx: dx * fs / 100, dy: dy * fs / 100 };
    fitCache[key] = out;
    return out;
  }

  function resize() {
    const wrap = $('#canvasWrap');
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const w = Math.max(280, rect.width);
    const n = Math.max(1, W.char.syllables.length);
    const padX = 10, padY = 14, padB = 32;
    const gap = n > 3 ? 6 : 10;
    const availW = w - padX * 2 - gap * (n - 1);
    // 글자 칸이 캔버스 높이를 결정합니다 — 위아래 빈 공간 없이 꽉 차게
    const cellW = Math.min(availW / n, 176);
    const cellH = Math.round(cellW * 1.14);
    const h = cellH + padY + padB;
    wrap.style.height = h + 'px';
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const cv = $('#writeCanvas');
    cv.width = Math.round(w * dpr);
    cv.height = Math.round(h * dpr);
    cv.style.width = w + 'px';
    cv.style.height = h + 'px';
    W.canvas = cv; W.ctx = cv.getContext('2d');
    W.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    W.w = w; W.h = h; W.dpr = dpr;
    W.cellW = cellW; W.cellH = cellH; W.gap = gap;
    layoutCells();
    buildMask();
    redraw();
  }

  function layoutCells() {
    const n = Math.max(1, W.char.syllables.length);
    const gap = W.gap, cellW = W.cellW, cellH = W.cellH;
    const totalW = cellW * n + gap * (n - 1);
    const startX = (W.w - totalW) / 2;
    const y = 14;
    W.cells = W.char.syllables.map((ch, i) => {
      const cell = { ch, x: startX + i * (cellW + gap), y, w: cellW, h: cellH, cx: 0, cy: 0, fs: 0, dx: 0, dy: 0 };
      cell.cx = cell.x + cell.w / 2;
      cell.cy = cell.y + cell.h / 2;
      const fit = fitFont(ch, cell.w, cell.h);
      cell.fs = fit.fs; cell.dx = fit.dx; cell.dy = fit.dy;
      cell.gx = cell.cx - fit.dx;   // 잉크가 정확히 칸 중앙에 오는 글자 기준점
      cell.gy = cell.cy - fit.dy;
      return cell;
    });
  }

  function buildMask() {
    // 가이드 글자를 아주 작은 해상도로 그려 두고, 덮인 정도를 잽니다
    const scale = 0.25;
    const mw = Math.max(30, Math.round(W.w * scale)), mh = Math.max(30, Math.round(W.h * scale));
    const c = document.createElement('canvas');
    c.width = mw; c.height = mh;
    const g = c.getContext('2d');
    g.fillStyle = '#000'; g.textAlign = 'center'; g.textBaseline = 'middle';
    W.cells.forEach(cell => {
      g.font = '700 ' + (cell.fs * scale) + 'px "Apple SD Gothic Neo","Malgun Gothic","Noto Sans KR",sans-serif';
      g.fillText(cell.ch, cell.gx * scale, cell.gy * scale);
    });
    W.maskData = g.getImageData(0, 0, mw, mh).data;
    W.maskW = mw; W.maskH = mh;
    W.maskTotal = 0;
    for (let i = 3; i < W.maskData.length; i += 4) if (W.maskData[i] > 40) W.maskTotal++;
  }

  function drawGuide(ctx) {
    ctx.save();
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    W.cells.forEach(cell => {
      ctx.font = '700 ' + cell.fs + 'px ' + KFONT;
      ctx.fillStyle = 'rgba(150,200,235,.22)';
      ctx.fillText(cell.ch, cell.gx, cell.gy);
      ctx.lineJoin = 'round';
      ctx.setLineDash([8, 9]);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(96,166,214,.55)';
      ctx.strokeText(cell.ch, cell.gx, cell.gy);
      ctx.setLineDash([]);
    });
    ctx.restore();
  }

  function drawCells(ctx) {
    ctx.save();
    W.cells.forEach(cell => {
      roundRect(ctx, cell.x, cell.y, cell.w, cell.h, 16);
      ctx.fillStyle = '#fbfdff';
      ctx.fill();
      ctx.strokeStyle = W.step === 1 ? '#dbeeff' : '#cfe6f7';
      ctx.lineWidth = 2;
      ctx.stroke();
      if (W.step > 1) {
        // 가운데 점선 십자 가이드
        ctx.save();
        ctx.setLineDash([4, 6]);
        ctx.strokeStyle = '#eaf4fb';
        ctx.beginPath();
        ctx.moveTo(cell.x + cell.w / 2, cell.y + 8);
        ctx.lineTo(cell.x + cell.w / 2, cell.y + cell.h - 8);
        ctx.moveTo(cell.x + 8, cell.y + cell.h / 2);
        ctx.lineTo(cell.x + cell.w - 8, cell.y + cell.h / 2);
        ctx.stroke();
        ctx.restore();
      }
    });
    ctx.restore();
  }

  /* 획 힌트: 완성된 글자 모양은 그대로 두고, 자모가 시작하는 자리에 작은 번호 배지만 얹습니다 */
  function drawHint(ctx) {
    ctx.save();
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    W.cells.forEach(cell => {
      const j = U.jamoOf(cell.ch);
      if (!j) return;
      const shape = U.vowelShape(j.jungIdx);
      const S = Math.min(cell.w, cell.h);
      const cx = cell.cx, cy = cell.cy;
      const badges = [];
      const m = Math.max(13, S * 0.11);           // 칸 안쪽 여백에 놓아 글자를 가리지 않게
      const c1 = { x: cell.x + m, y: cell.y + m };
      const c2r = { x: cell.x + cell.w - m, y: cell.y + m };
      const c2m = { x: cell.x + cell.w - m, y: cell.cy };
      const c3 = { x: cell.cx, y: cell.y + cell.h - m };
      if (shape === 'v') {
        badges.push({ x: c1.x, y: c1.y, n: 1 });
        badges.push({ x: c2r.x, y: c2r.y, n: 2 });
        if (j.jong) badges.push({ x: c3.x, y: c3.y, n: 3 });
      } else if (shape === 'h') {
        badges.push({ x: cell.x + m, y: cell.y + m, n: 1 });
        badges.push({ x: c2m.x, y: c2m.y, n: 2 });
        if (j.jong) badges.push({ x: c3.x, y: c3.y, n: 3 });
      } else {
        badges.push({ x: c1.x, y: c1.y, n: 1 });
        badges.push({ x: c2m.x, y: c2m.y, n: 2 });
        if (j.jong) badges.push({ x: c3.x, y: c3.y, n: 3 });
      }
      // 글자 위에 살짝 얹는 작은 배지
      badges.forEach(b => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, Math.max(8, S * 0.075), 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,159,67,.92)';
        ctx.fill();
        ctx.lineWidth = 1.5; ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.stroke();
        ctx.fillStyle = '#fff';
        ctx.font = '800 ' + Math.max(9, Math.round(S * 0.085)) + 'px "Apple SD Gothic Neo",sans-serif';
        ctx.fillText(String(b.n), b.x, b.y + 0.5);
      });
    });
    ctx.restore();
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function redraw() {
    const ctx = W.ctx; if (!ctx) return;
    ctx.clearRect(0, 0, W.w, W.h);
    drawCells(ctx);
    if (W.guideOn) drawGuide(ctx);
    if (W.hintOn) drawHint(ctx);
    drawStrokes(ctx);
  }
  function drawStrokes(ctx) {
    W.strokes.forEach(s => paintStroke(ctx, s));
  }
  function paintStroke(ctx, s) {
    if (!s.pts.length) return;
    ctx.save();
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.globalCompositeOperation = s.erase ? 'destination-out' : 'source-over';
    ctx.strokeStyle = s.color; ctx.lineWidth = s.width;
    ctx.beginPath();
    ctx.moveTo(s.pts[0].x, s.pts[0].y);
    if (s.pts.length === 1) { ctx.lineTo(s.pts[0].x + 0.1, s.pts[0].y + 0.1); }
    else for (let i = 1; i < s.pts.length; i++) ctx.lineTo(s.pts[i].x, s.pts[i].y);
    ctx.stroke();
    ctx.restore();
  }

  /* ---------- 입력 ---------- */
  function pos(e) {
    const r = W.canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }
  function onDown(e) {
    e.preventDefault();
    if (W.canvas.setPointerCapture) { try { W.canvas.setPointerCapture(e.pointerId); } catch (err) {} }
    W.drawing = true;
    const p = pos(e);
    const erase = W.eraser;
    W.cur = { color: erase ? '#000' : W.color, width: erase ? 26 : W.penWidth, erase: !!erase, pts: [p] };
    W.strokes.push(W.cur);
    const ctx = W.ctx; ctx.save(); paintStroke(ctx, W.cur); ctx.restore();
  }
  function onMove(e) {
    if (!W.drawing || !W.cur) return;
    e.preventDefault();
    const p = pos(e);
    const last = W.cur.pts[W.cur.pts.length - 1];
    if (Math.hypot(p.x - last.x, p.y - last.y) < 1.6) return;
    W.cur.pts.push(p);
    const ctx = W.ctx;
    ctx.save();
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.globalCompositeOperation = W.cur.erase ? 'destination-out' : 'source-over';
    ctx.strokeStyle = W.cur.color; ctx.lineWidth = W.cur.width;
    ctx.beginPath();
    ctx.moveTo(last.x, last.y); ctx.lineTo(p.x, p.y);
    ctx.stroke();
    ctx.restore();
  }
  function onUp(e) {
    if (!W.drawing) return;
    W.drawing = false; W.cur = null;
    measure();
  }

  /* ---------- 채점 ---------- */
  function measure() {
    if (!W.maskData) return 0;
    const scale = 0.25;
    const mw = W.maskW, mh = W.maskH;
    const c = document.createElement('canvas'); c.width = mw; c.height = mh;
    const g = c.getContext('2d');
    g.save(); g.scale(scale, scale);
    W.strokes.forEach(s => paintStroke(g, s));
    g.restore();
    const ink = g.getImageData(0, 0, mw, mh).data;

    // 잉크 살짝 번지게(±1px) 해서 "가이드 근처에 썼는지" 봄
    const dil = new Uint8Array(mw * mh);
    for (let y = 0; y < mh; y++) for (let x = 0; x < mw; x++) {
      const i = (y * mw + x) * 4 + 3;
      if (ink[i] > 30) { dil[y * mw + x] = 1; }
    }
    const dil2 = dil.slice();
    const idx = (x, y) => (y < 0 || y >= mh || x < 0 || x >= mw) ? 0 : dil[y * mw + x];
    for (let y = 0; y < mh; y++) for (let x = 0; x < mw; x++) {
      if (idx(x, y)) continue;
      if (idx(x - 1, y) || idx(x + 1, y) || idx(x, y - 1) || idx(x, y + 1) || idx(x - 1, y - 1) || idx(x + 1, y + 1)) dil2[y * mw + x] = 1;
    }
    let covered = 0, inkPix = 0;
    for (let i = 0, p = 0; p < mw * mh; p++, i += 4) {
      if (W.maskData[i + 3] > 40 && dil2[p]) covered++;
      if (ink[i + 3] > 30) inkPix++;
    }
    const cov = W.maskTotal ? covered / W.maskTotal : 0;
    const ratio = W.maskTotal ? inkPix / W.maskTotal : 0;
    const pass = W.step === 1 ? cov >= 0.34 : (ratio >= 0.18 && cov >= 0.10);
    const pct = Math.min(100, Math.round((W.step === 1 ? cov / 0.34 : Math.min(ratio / 0.18, cov / 0.10)) * 100));
    setMeter(pct, cov, ratio);
    if (pass && !W.passed) {
      W.passed = true;
      const btn = $('#btnNextStep'); if (btn) btn.disabled = false;
      U.beep(880, 0.1, 'sine', 0.05);
      U.toast('잘 썼어요! 다음으로 넘어가요 👍', 1200);
    } else if (!pass && W.passed) {
      W.passed = false;
      const btn = $('#btnNextStep'); if (btn) btn.disabled = true;
    }
    return pct;
  }

  function setMeter(pct, cov, ratio) {
    const f = $('#meterFill'), t = $('#meterText');
    if (f) f.style.width = Math.max(0, Math.min(100, pct)) + '%';
    if (t) t.textContent = Math.max(0, Math.min(100, pct)) + '%';
  }
  function settleMeter() { setMeter(0); const btn = $('#btnNextStep'); if (btn) btn.disabled = true; }

  /* ---------- 단계 진행 ---------- */
  function nextStep() {
    if (!W.passed) { U.toast('조금만 더 써 볼까요? ✍️'); return; }
    W.steps++;
    const reward = Store.completeStep(W.char.id);

    if (W.mode === 'review') { showReward('review'); return; }
    if (W.step < 3) {
      W.step++;
      W.strokes = []; W.cur = null;
      updateStepUI(); redraw(); settleMeter();
      U.speak(W.char.name);
      U.beep(700, 0.08, 'sine', 0.04);
    } else {
      showReward(reward && reward.type === 'chip' ? 'chip' : 'done');
    }
  }

  function showReward(kind) {
    $('#practice').classList.add('hidden');
    $('#reward').classList.remove('hidden');
    const img = $('#rewardImg'); img.src = W.char.img; img.alt = W.char.name;
    const title = $('#rewardTitle'), text = $('#rewardText'), chipName = $('#rewardChipName');
    chipName.textContent = W.char.name + ' 칩';
    if (kind === 'chip') {
      title.textContent = '카봇칩 획득! 🧊';
      text.textContent = W.char.name + U.josa(W.char.name, ['을', '를']) + ' 멋지게 다 썼어요!';
      U.fanfare();
      U.speak(W.char.name + ' 카봇칩을 얻었어요!');
    } else if (kind === 'review') {
      title.textContent = '복습 완료! 🌟';
      text.textContent = W.char.name + U.josa(W.char.name, ['을', '를']) + ' 다시 만났어요. 기억이 더 오래가요!';
      U.fanfare();
    } else {
      title.textContent = '쓰기 완료! ✨';
      text.textContent = '한 번 더 쓰면 칩을 받아요.';
      U.beep(880, 0.15, 'sine', 0.05);
    }
    const go = $('#btnGoWatch');
    if (go) go.style.display = kind === 'review' ? 'none' : '';
  }

  /* ---------- 붙이기 ---------- */
  function bind() {
    const cv = $('#writeCanvas');
    if (cv && !cv.dataset.bound) {
      cv.dataset.bound = '1';
      cv.addEventListener('pointerdown', onDown);
      cv.addEventListener('pointermove', onMove);
      cv.addEventListener('pointerup', onUp);
      cv.addEventListener('pointercancel', onUp);
      cv.addEventListener('pointerleave', (e) => { if (W.drawing) onUp(e); });
    }
    $('#charGrid') && $('#charGrid').addEventListener('click', e => {
      const c = e.target.closest('.ccard'); if (!c) return;
      U.click();
      open(c.dataset.id, 'practice');
    });
    $$('.lvl').forEach(b => b.addEventListener('click', () => {
      $$('.lvl').forEach(x => x.classList.remove('active'));
      b.classList.add('active'); renderList();
    }));
    $('#seasonFilter') && $('#seasonFilter').addEventListener('change', renderList);
    $('#searchInput') && $('#searchInput').addEventListener('input', U.debounce(renderList, 150));

    $('#btnBackToList') && $('#btnBackToList').addEventListener('click', closeToList);
    $('#btnNextStep') && $('#btnNextStep').addEventListener('click', nextStep);
    $('#btnSkip') && $('#btnSkip').addEventListener('click', () => {
      if (W.mode === 'review') { closeToList(); switchTab('review'); return; }
      if (W.step < 3) { W.step++; W.strokes = []; W.cur = null; updateStepUI(); redraw(); settleMeter(); }
      else showReward('done');
    });
    $('#toolUndo') && $('#toolUndo').addEventListener('click', () => {
      if (!W.strokes.length) return;
      W.strokes.pop(); redraw(); measure();
    });
    $('#toolClear') && $('#toolClear').addEventListener('click', () => {
      W.strokes = []; redraw(); settleMeter();
    });
    $('#toolGuide') && $('#toolGuide').addEventListener('click', (e) => {
      W.guideOn = !W.guideOn;
      e.currentTarget.classList.toggle('on', W.guideOn);
      redraw();
    });
    $('#toolHint') && $('#toolHint').addEventListener('click', (e) => {
      W.hintOn = !W.hintOn;
      e.currentTarget.classList.toggle('on', W.hintOn);
      if (W.hintOn && !W.guideOn) { W.guideOn = true; const g = $('#toolGuide'); if (g) g.classList.add('on'); }
      redraw();
    });
    $('#btnAnother') && $('#btnAnother').addEventListener('click', () => {
      document.body.classList.remove('in-practice');
      $('#reward').classList.add('hidden'); $('#practice').classList.add('hidden');
      const wasReview = W.mode === 'review';
      $('#writeSelect').classList.remove('hidden'); renderList();
      if (wasReview) switchTab('review');
    });
    $('#btnGoWatch') && $('#btnGoWatch').addEventListener('click', () => {
      document.body.classList.remove('in-practice');
      const id = W.char && W.char.id;
      switchTab('watch');
      if (id) setTimeout(() => window.Watch && Watch.focusChip(id), 120);
    });
    $('#btnPracticeMenu') && $('#btnPracticeMenu').addEventListener('click', () => {
      if (!W.char) return;
      U.speak(W.char.name, { force: true });
      U.toast('🔊 ' + W.char.name);
    });
    window.addEventListener('resize', U.debounce(() => {
      if ($('#practice') && !$('#practice').classList.contains('hidden')) { resize(); }
    }, 180));
  }

  window.Writing = { open, renderList, fillSeasonFilter, bind, resize, W };
})();
