/* 카봇 스케치북 · 편지지 */
(function () {
  const $ = U.$;
  const COLORS = ['#22384d', '#2f86d8', '#e84a5f', '#ff9f43', '#3fc08a', '#a06bff', '#ff7fa3', '#ffffff'];
  const S = {
    color: '#22384d', size: 6, eraser: false, paper: 'plain',
    strokes: [], cur: null, drawing: false, w: 0, h: 0, bgImg: null, bgName: ''
  };

  function setupCanvas() {
    const wrap = $('#sketchWrap'); if (!wrap) return;
    const w = Math.max(280, wrap.getBoundingClientRect().width);
    const h = Math.max(240, Math.min(window.innerHeight * 0.5, 460));
    wrap.style.height = h + 'px';
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cv = $('#sketchCanvas');
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    cv.style.width = w + 'px'; cv.style.height = h + 'px';
    const ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    S.cv = cv; S.ctx = ctx; S.w = w; S.h = h;
    redraw();
  }

  function paperBackground(ctx) {
    const w = S.w, h = S.h;
    ctx.save();
    ctx.clearRect(0, 0, w, h);
    if (S.paper === 'plain') {
      ctx.fillStyle = '#fffdf7'; ctx.fillRect(0, 0, w, h);
    } else if (S.paper === 'line') {
      ctx.fillStyle = '#fffef9'; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#dbeaf6'; ctx.lineWidth = 1;
      for (let y = 34; y < h; y += 34) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      ctx.strokeStyle = '#ffc9c9';
      ctx.beginPath(); ctx.moveTo(26, 0); ctx.lineTo(26, h); ctx.stroke();
    } else if (S.paper === 'grid') {
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#e6f2fb'; ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 28) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 28) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
    } else if (S.paper === 'space') {
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, '#1b2a4a'); g.addColorStop(1, '#432c66');
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(255,255,255,.85)';
      for (let i = 0; i < 70; i++) {
        const x = Math.random() * w, y = Math.random() * h, r = Math.random() * 1.6 + 0.4;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.font = '40px serif'; ctx.globalAlpha = .5; ctx.fillText('🌙', w - 70, 70); ctx.globalAlpha = 1;
    } else if (S.paper === 'dino') {
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, '#eafff2'); g.addColorStop(1, '#d5f5e6');
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = .18; ctx.font = '34px serif';
      for (let i = 0; i < 12; i++) ctx.fillText('🦕', (i * 97) % w, 60 + ((i * 71) % Math.max(60, h - 40)));
      ctx.globalAlpha = 1;
    } else if (S.paper === 'friend') {
      ctx.fillStyle = '#f4fbff'; ctx.fillRect(0, 0, w, h);
      if (S.bgImg && S.bgImg.complete) {
        const img = S.bgImg;
        const scale = Math.min(w / img.width, h / img.height) * 0.8;
        const iw = img.width * scale, ih = img.height * scale;
        ctx.globalAlpha = .22;
        ctx.drawImage(img, (w - iw) / 2, (h - ih) / 2, iw, ih);
        ctx.globalAlpha = 1;
      }
      ctx.fillStyle = 'rgba(47,134,216,.6)';
      ctx.font = '600 14px sans-serif';
      ctx.fillText(S.bgName || '', 14, h - 14);
    }
    ctx.restore();
  }

  function redraw() {
    const ctx = S.ctx; if (!ctx) return;
    paperBackground(ctx);
    S.strokes.forEach(s => paint(ctx, s));
  }

  function paint(ctx, s) {
    if (!s.pts.length) return;
    ctx.save();
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.globalCompositeOperation = s.eraser ? 'source-over' : 'source-over';
    if (s.eraser) { ctx.strokeStyle = 'rgba(0,0,0,1)'; }
    ctx.strokeStyle = s.color; ctx.lineWidth = s.size;
    ctx.beginPath();
    ctx.moveTo(s.pts[0].x, s.pts[0].y);
    if (s.pts.length === 1) ctx.lineTo(s.pts[0].x + .1, s.pts[0].y + .1);
    else for (let i = 1; i < s.pts.length; i++) ctx.lineTo(s.pts[i].x, s.pts[i].y);
    ctx.stroke();
    ctx.restore();
  }

  function pos(e) {
    const r = S.cv.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }
  let bgSnapshot = null;

  function down(e) {
    e.preventDefault();
    try { S.cv.setPointerCapture(e.pointerId); } catch (err) {}
    S.drawing = true;
    const p = pos(e);
    S.cur = { color: S.eraser ? paperColor() : S.color, size: S.eraser ? S.size * 3 : S.size, eraser: !!S.eraser, pts: [p] };
    S.strokes.push(S.cur);
    paint(S.ctx, S.cur);
  }
  function paperColor() {
    return S.paper === 'space' ? '#1b2a4a' : S.paper === 'dino' ? '#e3f8ec' : '#fffdf7';
  }
  function move(e) {
    if (!S.drawing || !S.cur) return;
    e.preventDefault();
    const p = pos(e);
    const last = S.cur.pts[S.cur.pts.length - 1];
    if (Math.hypot(p.x - last.x, p.y - last.y) < 1.2) return;
    S.cur.pts.push(p);
    const ctx = S.ctx;
    ctx.save();
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.strokeStyle = S.cur.color; ctx.lineWidth = S.cur.size;
    ctx.beginPath(); ctx.moveTo(last.x, last.y); ctx.lineTo(p.x, p.y); ctx.stroke();
    ctx.restore();
  }
  function up() { S.drawing = false; S.cur = null; }

  function toImage(maxW) {
    const cv = S.cv;
    const scale = Math.min(1, (maxW || 720) / cv.width);
    const out = document.createElement('canvas');
    out.width = Math.round(cv.width * scale);
    out.height = Math.round(cv.height * scale);
    out.getContext('2d').drawImage(cv, 0, 0, out.width, out.height);
    return out.toDataURL('image/webp', 0.72);
  }

  function save() {
    const data = toImage(640);
    Store.addDrawing(data, '내 그림 · ' + U.fmtDate(Date.now()));
    renderGallery();
    U.fanfare();
    U.toast('그림을 보관함에 저장했어요 🖼');
  }

  async function share() {
    const data = toImage(900);
    try {
      const blob = await (await fetch(data)).blob();
      const file = new File([blob], 'carbot-sketch.webp', { type: 'image/webp' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: '카봇 스케치' });
        return;
      }
    } catch (e) { console.warn(e); }
    const a = document.createElement('a');
    a.href = data; a.download = 'carbot-sketch.webp';
    a.click();
    U.toast('그림 파일을 내려받았어요');
  }

  function renderGallery() {
    const g = $('#gallery'); if (!g) return;
    const items = Store.state.gallery;
    const cnt = $('#galleryCount'); if (cnt) cnt.textContent = items.length + '장';
    g.innerHTML = '';
    if (!items.length) { g.innerHTML = '<p class="chip-empty">아직 저장한 그림이 없어요. 자유롭게 그려 보세요!</p>'; return; }
    items.forEach(it => {
      const d = U.el('div', 'gitem');
      d.innerHTML = '<img src="' + it.data + '" alt="' + it.title + '"><button class="del" data-del="' + it.id + '">✕</button>';
      d.addEventListener('click', (e) => {
        if (e.target.dataset.del) { Store.removeDrawing(e.target.dataset.del); renderGallery(); return; }
        showBig(it);
      });
      g.appendChild(d);
    });
  }

  function showBig(item) {
    const m = $('#modal'), card = $('#modalCard');
    card.innerHTML = '<h3>' + item.title + '</h3><img src="' + item.data + '" style="width:100%;border-radius:16px">' +
      '<div class="btn-row"><a class="btn ghost" style="text-align:center;text-decoration:none" download="carbot.png" href="' + item.data + '">내려받기</a>' +
      '<button class="btn primary" id="mClose">닫기</button></div>';
    m.classList.remove('hidden');
    $('#mClose').onclick = () => m.classList.add('hidden');
  }

  function setPaper(name) {
    S.paper = name;
    if (name === 'friend') {
      const owned = Store.learnedList();
      const pick = owned.length ? owned[Math.floor(Math.random() * owned.length)] : CARBOTS[Math.floor(Math.random() * CARBOTS.length)];
      S.bgName = pick.name;
      const img = new Image(); img.src = pick.img;
      img.onload = () => { S.bgImg = img; redraw(); };
      S.bgImg = img;
    }
    redraw();
  }

  function bind() {
    const cv = $('#sketchCanvas');
    if (cv && !cv.dataset.bound) {
      cv.dataset.bound = '1';
      cv.addEventListener('pointerdown', down);
      cv.addEventListener('pointermove', move);
      cv.addEventListener('pointerup', up);
      cv.addEventListener('pointercancel', up);
      cv.addEventListener('pointerleave', () => { if (S.drawing) up(); });
    }
    const cr = $('#colorRow');
    if (cr && !cr.dataset.bound) {
      cr.dataset.bound = '1';
      cr.innerHTML = COLORS.map((c, i) => '<button class="swatch' + (i === 0 ? ' active' : '') + '" data-color="' + c + '" style="background:' + c + '"></button>').join('');
      cr.addEventListener('click', e => {
        const b = e.target.closest('.swatch'); if (!b) return;
        S.color = b.dataset.color; S.eraser = false;
        $$update();
      });
    }
    const br = document.querySelector('.brush-row');
    if (br && !br.dataset.bound) {
      br.dataset.bound = '1';
      br.addEventListener('click', e => {
        const b = e.target.closest('.brush'); if (!b) return;
        S.size = Number(b.dataset.size); S.eraser = false;
        $$update();
      });
    }
    const pr = document.querySelector('.paper-row');
    if (pr && !pr.dataset.bound) {
      pr.dataset.bound = '1';
      pr.addEventListener('click', e => {
        const b = e.target.closest('.paper'); if (!b) return;
        setPaper(b.dataset.paper); $$update();
      });
    }
    $('#skErase') && $('#skErase').addEventListener('click', () => { S.eraser = !S.eraser; $$update(); });
    $('#skUndo') && $('#skUndo').addEventListener('click', () => { S.strokes.pop(); redraw(); });
    $('#skClear') && $('#skClear').addEventListener('click', () => { S.strokes = []; redraw(); });
    $('#skSave') && $('#skSave').addEventListener('click', save);
    $('#skShare') && $('#skShare').addEventListener('click', share);
    window.addEventListener('resize', U.debounce(() => { if ($('#page-sketch').classList.contains('active')) setupCanvas(); }, 200));
  }

  function $$update() {
    document.querySelectorAll('.swatch').forEach(s => s.classList.toggle('active', s.dataset.color === S.color && !S.eraser));
    document.querySelectorAll('.brush').forEach(b => b.classList.toggle('active', Number(b.dataset.size) === S.size && !S.eraser));
    document.querySelectorAll('.paper').forEach(p => p.classList.toggle('active', p.dataset.paper === S.paper));
    const e = $('#skErase'); if (e) e.classList.toggle('on', S.eraser);
  }

  window.Sketch = {
    bind, setupCanvas, renderGallery,
    onShow() { setupCanvas(); renderGallery(); }
  };
})();
