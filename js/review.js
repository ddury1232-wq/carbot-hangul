/* 누적 복습 (간격 반복) — 한글 카봇 · 영어 낱말을 함께 보여 줍니다 */
(function () {
  const $ = U.$;
  let scope = 'all';   // all | kr | en

  function enWord(it) {
    if (it.kind === 'sight') return EN_SIGHT_BY_ID[it.id] || { w: it.id, ko: '' };
    return EN_WORD_BY_ID[it.id] || EN_SIGHT_BY_ID[it.id] || { w: it.id, ko: '' };
  }

  function render() {
    const kr = Store.dueList();
    const en = Store.enDueList();
    const total = kr.length + en.length;

    const hero = $('#reviewHeroText');
    if (hero) hero.textContent = total
      ? '한글 카봇 ' + kr.length + '마리 · 영어 낱말 ' + en.length + '개를 다시 만나요!'
      : ((Store.learnedList().length || Object.keys((Store.state.en || {}).words || {}).length)
        ? '오늘 복습은 다 했어요. 내일 또 만나요 🌙'
        : '아직 배운 낱말이 없어요. 먼저 하나 익혀 볼까요?');

    const count = $('#reviewCount');
    if (count) count.textContent = total
      ? '카봇 ' + kr.length + ' · 영어 낱말 ' + en.length + '개 복습할 수 있어요'
      : '오늘 복습할 카드가 없어요';

    const bKr = $('#btnStartReview'), bEn = $('#btnStartEnReview');
    if (bKr) {
      bKr.disabled = !kr.length;
      bKr.textContent = kr.length ? '한글 카봇 복습 (' + kr.length + ')' : '한글 카봇 복습';
    }
    if (bEn) {
      bEn.disabled = !en.length;
      bEn.textContent = en.length ? '영어 낱말 복습 (' + en.length + ')' : '영어 낱말 복습';
    }
    U.$$('#rvSwitch .rv-sw').forEach(b => b.classList.toggle('active', b.dataset.scope === scope));

    const list = $('#reviewList');
    if (!list) return;
    list.innerHTML = '';
    const showKr = scope !== 'en', showEn = scope !== 'kr';
    const krShown = showKr ? kr : [];
    const enShown = showEn ? en : [];

    if (!krShown.length && !enShown.length) {
      const msg = total
        ? '이 종류에는 오늘 복습할 카드가 없어요'
        : (kr.length || Store.learnedList().length ? '복습 카드가 없어요. 새 카봇을 배워 볼까요?' : '✏️ 쓰기에서 첫 카봇을 만나 보세요');
      list.innerHTML = '<p class="chip-empty">' + msg + '</p>';
      return;
    }

    if (krShown.length && enShown.length) list.appendChild(U.el('p', 'rv-group', '✏️ 한글 카봇'));
    krShown.forEach(({ char, rec }) => {
      const d = U.el('div', 'rv');
      d.dataset.id = char.id;
      const box = rec.srs && rec.srs.box ? rec.srs.box : 1;
      d.innerHTML = '<img src="' + char.img + '" alt="">' +
        '<div class="t"><b>' + char.name + '</b><small>' + char.seriesName + ' · 복습 ' + box + '단계</small></div>' +
        '<span class="due">오늘</span>';
      list.appendChild(d);
    });

    if (krShown.length && enShown.length) list.appendChild(U.el('p', 'rv-group', '🔤 영어 낱말'));
    enShown.forEach(it => {
      const w = enWord(it);
      const d = U.el('div', 'rv en-item');
      d.dataset.en = it.kind + ':' + it.id;
      d.innerHTML = '<span class="rv-em">' + (it.kind === 'sight' ? '⭐' : '🔤') + '</span>' +
        '<div class="t"><b>' + w.w + '</b><small>' + (w.ko || (it.kind === 'sight' ? '사이트 워드' : '파닉스 단어')) +
        ' · 영어 복습 ' + it.box + '단계</small></div>' +
        '<span class="due">오늘</span>';
      list.appendChild(d);
    });
  }

  function start() {
    const due = Store.dueList();
    if (!due.length) { U.toast('오늘 복습할 카봇이 없어요 🌙'); return; }
    U.click();
    switchTab('write');
    Writing.renderList();
    setTimeout(() => Writing.open(due[0].char.id, 'review'), 60);
  }

  function startEn(id) {
    if (!window.EnglishExtras) return;
    if (!Store.enDueList().length) { U.toast('오늘 복습할 영어 낱말이 없어요 🌙'); return; }
    U.click();
    switchTab('english');
    setTimeout(() => EnglishExtras.startReview(id), 80);
  }

  function bind() {
    const btn = $('#btnStartReview');
    if (btn) btn.addEventListener('click', start);
    const ben = $('#btnStartEnReview');
    if (ben) ben.addEventListener('click', () => startEn());
    const sw = $('#rvSwitch');
    if (sw && !sw.dataset.bound) {
      sw.dataset.bound = '1';
      sw.addEventListener('click', e => {
        const b = e.target.closest('.rv-sw'); if (!b) return;
        U.click();
        scope = b.dataset.scope || 'all';
        render();
      });
    }
    const list = $('#reviewList');
    if (list && !list.dataset.bound) {
      list.dataset.bound = '1';
      list.addEventListener('click', e => {
        const en = e.target.closest('.rv.en-item');
        if (en) {
          const parts = String(en.dataset.en || '').split(':');
          startEn(parts[1]);
          return;
        }
        const r = e.target.closest('.rv'); if (!r) return;
        U.click();
        switchTab('write');
        setTimeout(() => Writing.open(r.dataset.id, 'review'), 60);
      });
    }
  }

  window.Review = { render, bind, start, startEn };
})();
