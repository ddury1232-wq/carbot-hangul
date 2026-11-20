/* =====================================================================
   영어 추가 4종
   ① 🎧 소리 듣고 고르기 — 원어민 발음(en-US)을 듣고 알맞은 그림·단어 카드 고르기
      (최소대립쌍 cap↔cape … + 단계·유닛별 단어 + 사이트 워드) · 🖼️ 그림 힌트 ON/OFF
   ② ⭐ 사이트 워드 — 리더스 빈출 낱말 카드(레벨별 탐색 · 듣기 · 따라쓰기 · 찾기 놀이)
   ③ 🧩 리더스 문장 블록 맞추기 — 리더스의 6문장을 1번 → 2번 → … 순서로
   ④ 🔁 영어 누적 복습 — 한글과 같은 1·3·7·14·30일 간격(복습 탭과 연동)
   진행도는 모두 state.en 안에 저장되고 실시간 동기화·내보내기에 함께 실려요.
   ===================================================================== */
(function () {
  const $ = U.$;
  const $$ = U.$$;

  const SCREENS = ['enPractice', 'enReward', 'enReader', 'enQuiz', 'enSight'];

  /* 듣고 고르기 퀴즈 상태 */
  const Q = { round: 'pair', unit: '', list: [], idx: 0, right: 0, wrong: 0, answered: false, cur: null, review: false, timer: 0, token: 0 };
  /* 문장 블록 상태 */
  const BLK = { mission: null, idx: 0, total: 0, tokens: [], picked: [], bank: [], solved: false };
  /* 사이트 워드 레벨 */
  const S = { level: 'sw1' };

  /* ------------------------------------------------------------------
     도우미
     ------------------------------------------------------------------ */
  function speak(text, opt) {
    if (window.English && English.speakEN) {
      return English.speakEN(text, Object.assign({ silent: true }, opt || {}));
    }
    return null;
  }
  function info(id, kind) {
    if (kind === 'sight') return EN_SIGHT_BY_ID[id] || { id: id, w: id, ko: '', emoji: '⭐' };
    return EN_WORD_BY_ID[id] || EN_SIGHT_BY_ID[id] || { id: id, w: id, ko: '', emoji: '🔤' };
  }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function showOnly(id) {
    SCREENS.forEach(s => { const el = $('#' + s); if (el) el.classList.add('hidden'); });
    const home = $('#enHome'); if (home) home.classList.add('hidden');
    const el = $('#' + id); if (el) el.classList.remove('hidden');
    document.body.classList.add('in-en');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function backHome() {
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    clearTimeout(Q.timer);
    SCREENS.forEach(s => { const el = $('#' + s); if (el) el.classList.add('hidden'); });
    English.showList();
  }

  /* ------------------------------------------------------------------
     진행도 요약
     ------------------------------------------------------------------ */
  function quizStats() {
    const q = (Store.state.en && Store.state.en.quiz && Store.state.en.quiz.q) || {};
    let solved = 0;
    EN_QUIZ.forEach(x => { const r = q[x.id]; if (r && (r.ok || 0) > 0) solved++; });
    return { solved: solved, total: EN_QUIZ.length };
  }
  function sightStats() {
    const m = (Store.state.en && Store.state.en.sight && Store.state.en.sight.words) || {};
    let done = 0;
    EN_SIGHT.forEach(s => { if (m[s.id] && m[s.id].done) done++; });
    return { done: done, total: EN_SIGHT.length };
  }
  function blockStats() {
    const b = (Store.state.en && Store.state.en.blocks) || {};
    let done = 0, sentences = 0;
    EN_MISSIONS.forEach(m => {
      const r = Store.normalizeBlock(b[m.id], m.id);
      if (r.done) done++;
      sentences += (r.list || []).length;
    });
    return { done: done, total: EN_MISSIONS.length, sentences: sentences, sentencesTotal: EN_TOTAL_SENTENCES };
  }
  function enDue() { return Store.enDueList(); }

  /* ------------------------------------------------------------------
     영어 홈: 오늘의 복습 + 두 코너 카드
     ------------------------------------------------------------------ */
  function renderHome() {
    const qs = quizStats(), ss = sightStats(), bs = blockStats();
    const ql = $('#enQuizStat');
    if (ql) ql.textContent = qs.solved ? '맞힌 문제 ' + qs.solved + ' / ' + qs.total : '단·장모음 구별 퀴즈';
    const sl = $('#enSightStat');
    if (sl) sl.textContent = ss.done ? ss.done + ' / ' + ss.total + ' 낱말 익혔어요' : '리더스 빈출 낱말 카드';
    const bl = $('#enBlockStat');
    if (bl) bl.textContent = bs.done + ' / ' + bs.total;
    const bt = $('#enBlockSentenceStat');
    if (bt) bt.textContent = bs.sentences + ' / ' + bs.sentencesTotal + '문장';
    renderToday();
  }

  function renderToday() {
    const txt = $('#enTodayText'), chips = $('#enTodayChips'), btn = $('#enBtnEnReview');
    if (!txt) return;
    const due = enDue();
    if (!due.length) {
      txt.textContent = '지금은 복습할 영어 낱말이 없어요';
      if (chips) chips.innerHTML = '';
      if (btn) { btn.disabled = true; btn.textContent = '오늘은 다 했어요'; }
      return;
    }
    txt.textContent = '오늘 다시 만날 영어 낱말 ' + due.length + '개';
    if (btn) { btn.disabled = false; btn.textContent = '복습 시작'; }
    if (!chips) return;
    chips.innerHTML = '';
    due.slice(0, 10).forEach(d => {
      const w = info(d.id, d.kind);
      const b = U.el('button', 'et-chip');
      b.innerHTML = (d.kind === 'sight' ? '⭐' : '🔤') + '<b>' + w.w + '</b>';
      b.addEventListener('click', () => { U.click(); speak(w.w); });
      chips.appendChild(b);
    });
    if (due.length > 10) {
      const more = U.el('span', 'et-more', '+' + (due.length - 10));
      chips.appendChild(more);
    }
  }

  /* ==================================================================
     ① · ④ 듣고 고르기 퀴즈 / 영어 복습 연습 (같은 화면을 씁니다)
     ================================================================== */
  function foils(ansId, kind, n) {
    const pool = (kind === 'sight' ? EN_SIGHT : EN_WORDS).map(w => w.id).filter(x => x !== ansId);
    return shuffle(pool).slice(0, n);
  }

  function buildQuestions(roundId, unitId) {
    let pool = EN_QUIZ.filter(q => q.round === roundId);
    if (unitId) pool = pool.filter(q => q.unit === unitId);
    else if (roundId !== 'pair' && roundId !== 'sight') {
      // '전체'는 유닛 문제 + 단계 섞기 문제를 모두 씁니다
      pool = EN_QUIZ.filter(q => q.round === roundId);
    }
    return shuffle(pool).slice(0, Math.min(8, pool.length));
  }

  function reviewQuestions(startId) {
    let due = enDue();
    if (startId) {
      const at = due.findIndex(d => d.id === startId);
      if (at > 0) due = due.slice(at).concat(due.slice(0, at));
    }
    return due.slice(0, 10).map(d => {
      const w = info(d.id, d.kind);
      return {
        id: 'rv-' + d.kind + '-' + d.id, round: 'review', kind: d.kind, ans: d.id,
        choices: shuffle([d.id].concat(foils(d.id, d.kind, 2))),
        cue: w.ko || '',
        reviewItem: { kind: d.kind, id: d.id }
      };
    });
  }

  /* 그림 힌트 ON/OFF — state.en.ui.pic 에 저장되어 다음에도 그대로 유지됩니다 */
  function picOn() {
    const ui = (Store.enUi && Store.enUi()) || {};
    return ui.pic !== false;
  }
  function renderPicToggle() {
    const b = $('#enBtnQuizPic');
    if (!b) return;
    const on = picOn();
    b.classList.toggle('on', on);
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
    b.innerHTML = '🖼️ 그림 힌트 <b>' + (on ? 'ON' : 'OFF') + '</b>';
  }

  function renderRounds() {
    const box = $('#enQuizRounds'); if (!box) return;
    if (Q.round === 'review') { box.classList.add('hidden'); renderQuizUnits(); return; }
    box.classList.remove('hidden');
    box.innerHTML = '';
    EN_QUIZ_ROUNDS.forEach(r => {
      const b = U.el('button', 'qr' + (Q.round === r.id ? ' active' : ''));
      b.dataset.round = r.id;
      b.innerHTML = '<span>' + r.emoji + '</span><b>' + r.tag + '</b>';
      b.addEventListener('click', () => { U.click(); openQuiz(r.id); });
      box.appendChild(b);
    });
    renderQuizUnits();
  }

  /* 단계 안의 유닛 탭 — 600문제를 유닛별로 골라 풀 수 있어요 */
  function renderQuizUnits() {
    const box = $('#enQuizUnits'); if (!box) return;
    const step = Q.round;
    if (step === 'review' || step === 'pair' || step === 'sight') { box.classList.add('hidden'); box.innerHTML = ''; return; }
    const units = EN_UNITS.filter(u => u.step === step && EN_QUIZ.some(q => q.unit === u.id));
    if (!units.length) { box.classList.add('hidden'); return; }
    box.classList.remove('hidden');
    box.innerHTML = '';
    const all = U.el('button', 'qu' + (Q.unit ? '' : ' active'), '전체');
    all.dataset.unit = '';
    all.addEventListener('click', () => { U.click(); Q.unit = ''; openQuiz(step); });
    box.appendChild(all);
    units.forEach(u => {
      const b = U.el('button', 'qu' + (Q.unit === u.id ? ' active' : ''), u.title);
      b.dataset.unit = u.id;
      b.addEventListener('click', () => { U.click(); Q.unit = u.id; openQuiz(step); });
      box.appendChild(b);
    });
  }

  function openQuiz(roundId, opt) {
    const o = opt || {};
    Q.review = roundId === 'review';
    Q.round = roundId;
    if (!Q.review) Q.unit = (o.unit != null) ? o.unit : Q.unit || '';
    if (Q.review) Q.unit = '';
    Q.list = o.list || (roundId === 'review' ? reviewQuestions(o.startId) : buildQuestions(roundId, Q.unit));
    if (!Q.list.length) { U.toast('이 코너에는 아직 문제가 없어요'); return; }
    Q.idx = 0; Q.right = 0; Q.wrong = 0; Q.answered = false; Q.cur = null;
    showOnly('enQuiz');
    const play = $('#enQuizPlay'), res = $('#enQuizResult');
    if (play) play.classList.remove('hidden');
    if (res) res.classList.add('hidden');
    renderRounds();
    renderPicToggle();
    renderQuestion();
  }

  function playCurrent() {
    const q = Q.cur; if (!q) return;
    speak(info(q.ans, q.kind).w, { rate: 0.82 });
  }

  function renderQuestion() {
    const q = Q.cur = Q.list[Q.idx];
    if (!q) { finishQuiz(); return; }
    Q.answered = false;
    Q.token++;
    const r = EN_QUIZ_ROUNDS.find(x => x.id === q.round);
    const unit = (EN_UNIT_BY_ID && EN_UNIT_BY_ID[q.unit]) || null;
    const tag = $('#enQuizRound');
    if (tag) tag.textContent = Q.round === 'review' ? '🔁 오늘의 영어 복습'
      : (r ? r.emoji + ' ' + r.tag + ' · ' + (unit ? unit.title : r.title) : '');
    const pr = $('#enQuizProgress');
    if (pr) pr.textContent = (Q.idx + 1) + ' / ' + Q.list.length;
    const bar = $('#enQuizBar');
    if (bar) bar.style.width = Math.round(Q.idx / Q.list.length * 100) + '%';
    const bt = $('#enQuizBarText');
    if (bt) bt.textContent = '맞힌 문제 ' + Q.right;
    const fb = $('#enQuizFeedback'); if (fb) fb.textContent = '';
    const hint = $('#enQuizHint');
    if (hint) hint.textContent = picOn()
      ? '🔊 소리를 잘 듣고 알맞은 카드를 골라요'
      : '🔊 소리와 글자만 보고 골라요 (그림 힌트 OFF)';

    const box = $('#enQuizChoices');
    if (box) {
      box.innerHTML = '';
      box.className = 'quiz-choices' + (q.choices.length === 2 ? ' two' : '') + (picOn() ? '' : ' no-pic');
      q.choices.forEach(id => {
        const w = info(id, q.kind);
        const b = U.el('button', 'quiz-choice');
        b.dataset.w = id;
        b.innerHTML = '<span class="qc-emoji">' + (w.emoji || '🔤') + '</span><b>' + w.w + '</b>';
        b.addEventListener('click', () => { U.click(); answer(id, b); });
        box.appendChild(b);
      });
    }
    const nx = $('#enBtnQuizNext');
    if (nx) {
      nx.disabled = true;
      nx.textContent = (Q.idx + 1 >= Q.list.length) ? '결과 보기 🎉' : '다음 문제 ›';
    }
    renderPicToggle();
    playCurrent();
  }

  function answer(id, btn) {
    const q = Q.cur;
    if (!q || Q.answered) return;
    Q.answered = true;
    const ok = id === q.ans;
    const ansId = q.ans;
    if (btn) btn.classList.add(ok ? 'right' : 'wrong');
    if (!ok) {
      const right = $$('#enQuizChoices .quiz-choice').find(b => b.dataset.w === ansId);
      if (right) right.classList.add('right');
    }
    const w = info(ansId, q.kind);
    const fb = $('#enQuizFeedback');
    if (ok) {
      Q.right++;
      U.beep(940, 0.1, 'sine', 0.05);
      if (fb) fb.textContent = '🎉 맞았어요! ' + w.w + (w.ko ? ' · ' + w.ko : '');
      speak(w.w);
    } else {
      Q.wrong++;
      U.beep(300, 0.16, 'square', 0.05);
      if (fb) fb.textContent = '아쉬워요. 정답은 ' + w.w + (w.ko ? ' · ' + w.ko : '');
      speak(w.w, { rate: 0.78 });
    }
    if (q.reviewItem) Store.enSchedule(q.reviewItem.kind, q.reviewItem.id, ok);
    else Store.enQuizResult(q.id, ok);
    const nx = $('#enBtnQuizNext');
    if (nx) nx.disabled = false;
    const token = ++Q.token;
    clearTimeout(Q.timer);
    Q.timer = setTimeout(() => { if (token === Q.token) nextQuestion(); }, ok ? 1150 : 2100);
  }

  function nextQuestion() {
    clearTimeout(Q.timer);
    if (Q.cur && !Q.answered) return;      // 아직 고르지 않았으면 넘어가지 않아요
    Q.idx++;
    if (Q.idx >= Q.list.length) { finishQuiz(); return; }
    renderQuestion();
  }

  function finishQuiz() {
    const total = Q.list.length || 1;
    const pct = Math.round(Q.right / total * 100);
    const play = $('#enQuizPlay'), res = $('#enQuizResult');
    if (play) play.classList.add('hidden');
    if (res) res.classList.remove('hidden');
    const title = $('#enQuizResultTitle');
    if (title) {
      title.textContent = Q.round === 'review'
        ? (Q.right >= total ? '복습 완벽해요! 🔁' : '오늘의 영어 복습 완료!')
        : pct >= 80 ? '귀가 아주 밝아요! 🎧' : pct >= 50 ? '잘 들었어요!' : '한 번 더 해 볼까요?';
    }
    const sub = $('#enQuizResultSub');
    if (sub) {
      sub.textContent = Q.round === 'review'
        ? total + '개 낱말을 다시 만났어요 · 맞힌 문제 ' + Q.right + ' / ' + total
        : total + '문제 중 ' + Q.right + '문제를 맞혔어요';
    }
    const stars = $('#enQuizStars');
    if (stars) {
      const n = pct >= 90 ? 3 : pct >= 60 ? 2 : 1;
      stars.innerHTML = '<span class="on">⭐</span>'.repeat(n) + '<span>⭐</span>'.repeat(3 - n);
    }
    U.fanfare();
    renderHome();
  }

  /* ==================================================================
     ② 사이트 워드 코너 — 레벨(묶음) 탭
     ================================================================== */
  function openSight() {
    showOnly('enSight');
    renderSight();
  }

  function renderSightLevels() {
    const box = $('#enSightLevels'); if (!box) return;
    box.innerHTML = '';
    EN_SIGHT_LEVELS.forEach(l => {
      const done = EN_SIGHT.filter(s => s.level === l.id && ((Store.state.en.sight.words || {})[s.id] || {}).done).length;
      const b = U.el('button', 'sl' + (S.level === l.id ? ' active' : ''));
      b.dataset.level = l.id;
      b.innerHTML = '<em>' + l.tag + '</em><b>' + l.title + '</b><span>' + done + '/' + (l.count || 0) + '</span>';
      b.addEventListener('click', () => { U.click(); S.level = l.id; renderSight(); });
      box.appendChild(b);
    });
  }

  function renderSight() {
    const st = sightStats();
    const dn = $('#enSightDone'); if (dn) dn.textContent = st.done;
    const tt = $('#enSightTotal'); if (tt) tt.textContent = st.total;
    renderSightLevels();
    const grid = $('#enSightGrid'); if (!grid) return;
    grid.innerHTML = '';
    const words = (Store.state.en && Store.state.en.sight && Store.state.en.sight.words) || {};
    const list = EN_SIGHT.filter(s => s.level === S.level);
    EN_SIGHT.forEach(s => { /* keep reference for older browsers */ });
    list.forEach(s => {
      const rec = words[s.id] || {};
      const card = U.el('div', 'sight-card' + (rec.done ? ' done' : ''));
      const main = U.el('button', 'sc-main');
      main.dataset.w = s.id;
      main.innerHTML = '<span class="sc-emoji">' + (s.emoji || '⭐') + '</span>' +
        '<b>' + s.w + '</b><small>' + s.ko + '</small><em>' + s.ex + '</em>' +
        (rec.done ? '<i class="sc-star">⭐</i>' : '');
      main.addEventListener('click', () => {
        U.click(); speak(s.w);
        U.toast('🔊 ' + s.w + ' · ' + s.ko, 1200);
      });
      const tr = U.el('button', 'sc-trace', '✍️');
      tr.title = s.w + ' 따라쓰기';
      tr.setAttribute('aria-label', s.w + ' 따라쓰기');
      tr.addEventListener('click', () => { U.click(); English.openSightWord(s.id); });
      card.appendChild(main);
      card.appendChild(tr);
      grid.appendChild(card);
    });
    const note = $('#enSightLevelNote');
    if (note) {
      const lv = EN_SIGHT_LEVELS.find(x => x.id === S.level) || {};
      note.textContent = (lv.tag || '') + ' ' + (lv.title || '') + ' · ' + (lv.sub || '') + ' · ' + list.length + '낱말';
    }
  }

  /* ==================================================================
     ③ 리더스 문장 블록 맞추기 — 6문장을 1번 → 2번 → … 순서로
     ================================================================== */
  function missionBlockRec(id) { return Store.normalizeBlock((Store.state.en.blocks || {})[id], id); }

  /* 힌트 문장 — 문장 번호(<b id="enBlockNowLabel">)는 그대로 두고 뒤 문구만 바꿉니다 */
  function setBlockHint(text) {
    const el = $('#enBlockHintText');
    if (el) el.textContent = text;
  }

  function renderBlock(missionId) {
    const wrap = $('#enReaderBlock'); if (!wrap) return;
    const list = EN_BLOCKS_BY_MISSION[missionId];
    if (!list || !list.length) { wrap.classList.add('hidden'); return; }
    wrap.classList.remove('hidden');
    BLK.mission = missionId;
    BLK.total = list.length;
    const rec = missionBlockRec(missionId);
    BLK.idx = rec.done ? 0 : Math.min(rec.idx, list.length - 1);
    loadBlock();
  }

  function loadBlock() {
    const list = EN_BLOCKS_BY_MISSION[BLK.mission] || [];
    const b = list[BLK.idx];
    if (!b) return;
    const rec = missionBlockRec(BLK.mission);
    BLK.tokens = b.words.map((w, i) => ({ i: i, w: w }));
    BLK.solved = (rec.list || []).indexOf(BLK.idx) >= 0;
    if (BLK.solved) {
      BLK.picked = BLK.tokens.map(t => t.i);
      BLK.bank = [];
    } else {
      BLK.picked = [];
      BLK.bank = shuffle(BLK.tokens);
    }
    renderBlockSteps();
    renderBlockParts();
  }

  function renderBlockSteps() {
    const row = $('#enBlockSteps'); if (!row) return;
    const rec = missionBlockRec(BLK.mission);
    const total = BLK.total || 6;
    row.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const done = (rec.list || []).indexOf(i) >= 0;
      const b = U.el('button', 'rbs' + (done ? ' done' : '') + (i === BLK.idx ? ' now' : ''));
      b.dataset.i = String(i);
      b.textContent = done ? '✓' : String(i + 1);
      b.title = (i + 1) + '번 문장';
      b.addEventListener('click', () => {
        U.click(); BLK.idx = i; loadBlock();
      });
      row.appendChild(b);
    }
    const pr = $('#enBlockProgress');
    if (pr) pr.textContent = (rec.list || []).length + ' / ' + total + '문장';
  }

  function renderBlockParts() {
    const tgt = $('#enBlockTarget'), bank = $('#enBlockBank');
    if (!tgt || !bank) return;
    const label = $('#enBlockNowLabel');
    if (label) label.textContent = (BLK.idx + 1) + '번 문장';
    tgt.innerHTML = ''; bank.innerHTML = '';
    BLK.tokens.forEach((t, i) => {
      const idx = BLK.picked[i];
      const filled = idx != null;
      const el = U.el(filled ? 'button' : 'div', 'rb-slot' + (filled ? ' filled' : ''));
      el.textContent = filled ? BLK.tokens[idx].w : '';
      if (filled) {
        el.addEventListener('click', () => {
          U.click();
          if (BLK.solved) { U.toast('이미 맞춘 문장이에요 👍'); return; }
          const back = BLK.picked.splice(i, 1)[0];
          BLK.bank.push(BLK.tokens[back]);
          renderBlockParts();
          checkBlock(false);
        });
      }
      tgt.appendChild(el);
    });
    BLK.bank.forEach(t => {
      const b = U.el('button', 'rb-bank-word', t.w);
      b.dataset.w = t.w;
      b.addEventListener('click', () => {
        U.click();
        if (BLK.solved) { U.toast('이미 맞춘 문장이에요 👍'); return; }
        if (BLK.picked.length >= BLK.tokens.length) return;
        BLK.picked.push(t.i);
        BLK.bank = BLK.bank.filter(x => x.i !== t.i);
        renderBlockParts();
        checkBlock(true);
      });
      bank.appendChild(b);
    });
    const st = $('#enBlockStatus');
    if (st) {
      st.textContent = BLK.solved ? '✅ 완성!' :
        (BLK.picked.length ? BLK.picked.length + ' / ' + BLK.tokens.length + ' 낱말' : '');
    }
    const nx = $('#enBtnBlockNext');
    if (nx) {
      const rec = missionBlockRec(BLK.mission);
      const next = (rec.list || []).length < (BLK.total || 6);
      nx.disabled = !next;
      nx.textContent = next ? '다음 문장 ›' : '6문장 완성 🎉';
    }
  }

  function checkBlock(auto) {
    if (BLK.picked.length < BLK.tokens.length) return;
    const made = BLK.picked.map(i => BLK.tokens[i].w).join(' ');
    const goal = BLK.tokens.map(t => t.w).join(' ');
    const st = $('#enBlockStatus');
    if (made === goal) {
      BLK.solved = true;
      Store.enBlockDone(BLK.mission, BLK.idx, BLK.total);
      if (st) st.textContent = '🎉 정확해요!';
      setBlockHint(' · 문장을 다 맞췄어요! 소리 내어 한 번 읽어 봐요');
      U.fanfare();
      speak((EN_BLOCKS_BY_MISSION[BLK.mission] || [])[BLK.idx] ? EN_BLOCKS_BY_MISSION[BLK.mission][BLK.idx].sentence : '', { rate: 0.8 });
      renderBlockSteps();
      renderBlockParts();
      English.render();
    } else {
      if (st) st.textContent = '순서가 조금 달라요. 낱말을 눌러 빼고 다시 해 봐요';
      U.beep(300, 0.14, 'square', 0.04);
    }
  }

  function nextBlock() {
    const rec = missionBlockRec(BLK.mission);
    const total = BLK.total || 6;
    if ((rec.list || []).length >= total) { U.toast('🎉 이 리더스의 6문장을 다 맞췄어요!'); return; }
    let next = rec.idx;
    if (next >= total || (rec.list || []).indexOf(next) >= 0) {
      next = 0; while (next < total && (rec.list || []).indexOf(next) >= 0) next++;
    }
    if (next >= total) { U.toast('🎉 6문장을 모두 맞췄어요!'); return; }
    BLK.idx = next;
    setBlockHint(' · 낱말을 순서대로 눌러 문장을 만들어요');
    loadBlock();
  }

  function resetBlock() {
    if (!BLK.mission) return;
    const rec = missionBlockRec(BLK.mission);
    if ((rec.list || []).indexOf(BLK.idx) >= 0) { U.toast('이미 맞춘 문장이에요 👍'); return; }
    BLK.solved = false;
    BLK.picked = [];
    BLK.bank = shuffle(BLK.tokens);
    setBlockHint(' · 낱말을 순서대로 눌러 문장을 만들어요');
    renderBlockParts();
  }

  /* ==================================================================
     ④ 영어 누적 복습 — 복습 탭에서도 씁니다
     ================================================================== */
  function startReview(startId) {
    const due = enDue();
    if (!due.length) { U.toast('오늘 복습할 영어 낱말이 없어요 🌙'); return; }
    const list = reviewQuestions(startId);
    if (!list.length) { U.toast('오늘 복습할 영어 낱말이 없어요 🌙'); return; }
    openQuiz('review', { list: list });
  }
  function reviewInfo() {
    const due = enDue();
    const words = due.filter(d => d.kind === 'words').length;
    const sight = due.filter(d => d.kind === 'sight').length;
    return { due: due, count: due.length, words: words, sight: sight };
  }

  /* ------------------------------------------------------------------
     열려 있는 화면 확인 (탭 이동 때 홈으로 돌리기)
     ------------------------------------------------------------------ */
  function isOpen() {
    return ['enQuiz', 'enSight'].some(id => {
      const el = document.getElementById(id);
      return el && !el.classList.contains('hidden');
    });
  }

  /* ------------------------------------------------------------------
     이벤트
     ------------------------------------------------------------------ */
  function bind() {
    const on = (sel, fn) => { const el = $(sel); if (el && !el.dataset.bound) { el.dataset.bound = '1'; el.addEventListener('click', fn); } };

    on('#enCornerQuiz', () => { U.click(); openQuiz('pair'); });
    on('#enCornerSight', () => { U.click(); openSight(); });
    on('#enBtnEnReview', () => { U.click(); startReview(); });

    on('#enBtnQuizBack', () => { U.click(); backHome(); });
    on('#enBtnQuizReplay', () => { playCurrent(); });
    on('#enBtnQuizPlay', () => { playCurrent(); });
    on('#enBtnQuizNext', nextQuestion);
    on('#enBtnQuizPic', () => {
      U.click();
      const on = !picOn();
      Store.enSetUi({ pic: on });
      renderPicToggle();
      const box = $('#enQuizChoices');
      if (box) box.classList.toggle('no-pic', !on);
      const hint = $('#enQuizHint');
      if (hint) hint.textContent = on
        ? '🔊 소리를 잘 듣고 알맞은 카드를 골라요'
        : '🔊 소리와 글자만 보고 골라요 (그림 힌트 OFF)';
      U.toast(on ? '🖼️ 그림 힌트 ON' : '🖼️ 그림 힌트 OFF · 소리와 글자로만!', 1200);
    });
    on('#enBtnQuizSkip', () => {
      if (!Q.cur) return;
      if (!Q.answered) { Q.answered = true; Q.wrong++; }
      clearTimeout(Q.timer);
      nextQuestion();
    });
    on('#enBtnQuizAgain', () => {
      U.click();
      if (Q.round === 'review') startReview(); else openQuiz(Q.round);
    });
    on('#enBtnQuizToEnglish', () => { U.click(); backHome(); });

    on('#enBtnSightBack', () => { U.click(); backHome(); });
    on('#enBtnSightFind', () => { U.click(); openQuiz('sight'); });

    on('#enBtnBlockHear', () => {
      const list = BLK.mission && EN_BLOCKS_BY_MISSION[BLK.mission];
      if (list && list[BLK.idx]) speak(list[BLK.idx].sentence, { rate: 0.8 });
    });
    on('#enBtnBlockReset', () => { U.click(); resetBlock(); });
    on('#enBtnBlockNext', () => { U.click(); nextBlock(); });
  }

  Store.onChange(() => {
    const home = document.getElementById('enHome');
    if (home && !home.classList.contains('hidden') &&
        document.getElementById('page-english') && document.getElementById('page-english').classList.contains('active')) {
      renderHome();
    }
  });

  window.EnglishExtras = {
    renderHome, renderToday, renderBlock, renderSight, openSight, openQuiz,
    startReview, reviewInfo, isOpen, backHome, bind,
    quizStats, sightStats, blockStats, Q, BLK, S,
    picOn, setPic: (on) => { Store.enSetUi({ pic: on }); renderPicToggle(); }
  };
})();
