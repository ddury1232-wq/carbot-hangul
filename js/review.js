/* 누적 복습 (간격 반복) */
(function () {
  const $ = U.$;

  function render() {
    const due = Store.dueList();
    const all = Store.learnedList();
    const hero = $('#reviewHeroText');
    const count = $('#reviewCount');
    if (hero) hero.textContent = due.length
      ? '오늘 다시 만날 카봇이 ' + due.length + '마리 있어요!'
      : (all.length ? '오늘 복습은 다 했어요. 내일 또 만나요 🌙' : '아직 배운 카봇이 없어요. 먼저 이름을 써 볼까요?');
    if (count) count.textContent = due.length ? due.length + '마리 복습할 수 있어요' : '복습할 카봇이 없어요';

    const list = $('#reviewList');
    if (list) {
      list.innerHTML = '';
      if (!due.length) {
        list.innerHTML = '<p class="chip-empty">' + (all.length ? '복습 카드가 없어요. 새 카봇을 배워 볼까요?' : '✏️ 쓰기에서 첫 카봇을 만나 보세요') + '</p>';
      }
      due.forEach(({ char, rec }) => {
        const d = U.el('div', 'rv');
        d.dataset.id = char.id;
        const box = rec.srs && rec.srs.box ? rec.srs.box : 1;
        d.innerHTML = '<img src="' + char.img + '" alt="">' +
          '<div class="t"><b>' + char.name + '</b><small>' + char.seriesName + ' · ' + '복습 ' + box + '단계</small></div>' +
          '<span class="due">오늘</span>';
        list.appendChild(d);
      });
    }
    const btn = $('#btnStartReview');
    if (btn) btn.disabled = due.length === 0;
  }

  function start() {
    const due = Store.dueList();
    if (!due.length) { U.toast('오늘 복습할 카봇이 없어요 🌙'); return; }
    U.click();
    switchTab('write');
    Writing.renderList();
    setTimeout(() => Writing.open(due[0].char.id, 'review'), 60);
  }

  function bind() {
    const btn = $('#btnStartReview');
    if (btn) btn.addEventListener('click', start);
    const list = $('#reviewList');
    if (list && !list.dataset.bound) {
      list.dataset.bound = '1';
      list.addEventListener('click', e => {
        const r = e.target.closest('.rv'); if (!r) return;
        U.click();
        switchTab('write');
        setTimeout(() => Writing.open(r.dataset.id, 'review'), 60);
      });
    }
  }

  window.Review = { render, bind, start };
})();
