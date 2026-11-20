/* 카봇 시계 · 카봇칩 · 도감 */
(function () {
  const $ = U.$, $$ = U.$$;
  let currentChip = null;

  function render() {
    const chips = Store.chips();
    const total = $('#chipTotal'), chipCount = $('#chipCount b');
    if (total) total.textContent = chips.length + '개';
    if (chipCount) chipCount.textContent = chips.length;

    const grid = $('#chipGrid');
    if (grid) {
      grid.innerHTML = '';
      if (!chips.length) {
        grid.innerHTML = '<p class="chip-empty">아직 카봇칩이 없어요. ✏️ 쓰기에서 이름을 쓰면 칩을 받아요!</p>';
      } else {
        chips.forEach(({ char, rec }) => {
          const b = U.el('button', 'chip' + (rec.summoned ? ' used' : ''));
          b.dataset.id = char.id;
          b.innerHTML = '<span class="dot">' + (rec.summoned ? '✨' : '') + '</span>' +
            '<img src="' + char.img + '" alt="' + char.name + '">' +
            '<b>' + char.name + '</b>';
          grid.appendChild(b);
        });
      }
    }
    renderDex();
  }

  function renderDex() {
    const dex = $('#dexGrid'); if (!dex) return;
    const season = $('#dexSeason') ? $('#dexSeason').value : 'all';
    const only = $('#dexOnlyOwned') && $('#dexOnlyOwned').checked;
    let list = CARBOTS.slice();
    if (season !== 'all') list = list.filter(c => c.series === season);
    if (only) list = list.filter(c => Store.learned(c.id));
    dex.innerHTML = '';
    list.forEach(c => {
      const own = Store.learned(c.id);
      const d = U.el('div', 'dex' + (own ? '' : ' locked'));
      d.innerHTML = '<img src="' + c.img + '" alt="' + (own ? c.name : '아직 모르는 카봇') + '" loading="lazy" decoding="async">' +
        '<b>' + (own ? c.name : '???') + '</b>';
      dex.appendChild(d);
    });
    const t = $('#dexTotal');
    if (t) t.textContent = Store.learnedList().length + ' / ' + CARBOTS.length + ' 마리';
  }

  function insert(id) {
    const char = CARBOT_BY_ID[id];
    if (!char) return;
    const rec = Store.state.chars[id];
    if (!rec || !rec.chips) { U.toast('먼저 이름을 쓰면 카봇칩을 받아요!'); return; }
    currentChip = id;

    const slot = $('#watchSlot'), screen = $('#watchScreen'), summon = $('#watchSummon');
    slot.textContent = '🧊';
    screen.textContent = '칩 끼우는 중…';
    U.beep(520, 0.08, 'sine', 0.05);

    setTimeout(() => {
      slot.innerHTML = '<img src="' + char.img + '" style="width:44px;height:44px;object-fit:contain">';
      screen.textContent = char.name + ' 소환!';
      U.fanfare();
      U.speak(char.name + ' 소환!');
      if (summon) {
        summon.innerHTML = '<div class="halo"></div><img src="' + char.img + '" alt="' + char.name + '">';
        requestAnimationFrame(() => summon.classList.add('show'));
      }
      Store.summon(id);
      render();
      U.toast('🎉 ' + char.name + ' 도감 등록!');
    }, 420);
  }

  function focusChip(id) {
    const el = document.querySelector('.chip[data-id="' + id + '"]');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.style.outline = '3px solid #ffd166';
      setTimeout(() => { el.style.outline = ''; }, 1400);
    }
    setTimeout(() => insert(id), 700);
  }

  function bind() {
    const grid = $('#chipGrid');
    if (grid && !grid.dataset.bound) {
      grid.dataset.bound = '1';
      grid.addEventListener('click', e => {
        const c = e.target.closest('.chip'); if (!c) return;
        U.click(); insert(c.dataset.id);
      });
    }
    const ds = $('#dexSeason'); if (ds) ds.addEventListener('change', renderDex);
    const oo = $('#dexOnlyOwned'); if (oo) oo.addEventListener('change', renderDex);
  }

  window.Watch = { render, renderDex, insert, focusChip, bind };
})();
