/* 앱 시작 · 탭 이동 · 홈 화면 */
(function () {
  const $ = U.$;
  let todayPick = null;

  function greeting() {
    const h = new Date().getHours();
    const name = Store.settings().childName || '우리';
    if (h < 6) return '아직 꿈나라 시간, ' + name + '야 🌙';
    if (h < 11) return '좋은 아침이에요, ' + name + '! ☀️';
    if (h < 16) return '안녕, ' + name + '! 🚗';
    if (h < 20) return '신나게 놀 시간, ' + name + '! ⚡';
    return '오늘도 수고했어요, ' + name + ' 🌟';
  }

  function pickToday() {
    const unlearned = CARBOTS.filter(c => !Store.learned(c.id));
    const easy = unlearned.filter(c => c.level === 1);
    const pool = easy.length ? easy : unlearned.length ? unlearned : CARBOTS;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function renderHome() {
    const s = Store.state;
    const learned = Store.learnedList();
    const chips = Store.chips();
    const dex = learned.length;
    $('#heroHi').textContent = greeting();
    $('#heroSub').textContent = learned.length
      ? '지금까지 ' + learned.length + '마리 카봇 이름을 썼어요. 오늘은 무엇을 써 볼까요?'
      : '카봇 이름을 쓰면 카봇칩을 받을 수 있어요!';
    $('#statLearned').textContent = learned.length;
    $('#statChips').textContent = chips.length;
    $('#statDex').textContent = dex;
    $('#statStreak').textContent = s.stats.streak || 0;

    todayPick = pickToday();
    $('#todayPickName').textContent = todayPick ? todayPick.name + ' · ' + todayPick.seriesName : '모든 카봇 완성! 🏆';

    const due = Store.dueList();
    const enDue = Store.enDueList();
    $('#reviewCount').textContent = (due.length + enDue.length)
      ? ('카봇 ' + due.length + ' · 영어 낱말 ' + enDue.length + '개')
      : '오늘 복습할 카드가 없어요';

    const row = $('#recentRow');
    row.innerHTML = '';
    const recent = Object.entries(s.chars)
      .filter(([id, r]) => r.done && CARBOT_BY_ID[id])
      .sort((a, b) => (b[1].last || 0) - (a[1].last || 0))
      .slice(0, 8);
    if (!recent.length) {
      row.innerHTML = '<div class="mini empty">아직 쓴 카봇이 없어요</div>';
    } else {
      recent.forEach(([id, r]) => {
        const c = CARBOT_BY_ID[id];
        const d = U.el('button', 'mini');
        d.innerHTML = '<img src="' + c.img + '" alt="' + c.name + '"><b>' + c.name + '</b>';
        d.addEventListener('click', () => { switchTab('write'); setTimeout(() => Writing.open(id, 'practice'), 60); });
        row.appendChild(d);
      });
    }
    updateChipBadge();
  }

  function updateChipBadge() {
    const el = $('#chipCount b'); if (el) el.textContent = Store.chips().length;
  }

  function switchTab(name) {
    U.stopSpeak();
    document.body.classList.remove('in-practice');
    document.body.classList.remove('in-en');
    const enP = document.getElementById('enPractice');
    if (enP && !enP.classList.contains('hidden')) English.showList();
    if (window.EnglishExtras && EnglishExtras.isOpen()) English.showList();
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const page = document.getElementById('page-' + name);
    if (page) page.classList.add('active');
    document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === name));
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (name === 'home') renderHome();
    if (name === 'write') Writing.renderList();
    if (name === 'watch') Watch.render();
    if (name === 'english') English.render();
    if (name === 'review') Review.render();
    if (name === 'sketch') Sketch.onShow();
    if (name === 'settings') Settings.fill();
  }

  function refreshAll() {
    renderHome();
    updateChipBadge();
    // 지금 보이는 탭만 그려서 이미지 요청을 줄입니다
    const active = (document.querySelector('.page.active') || {}).id || 'page-home';
    if (active === 'page-watch') Watch.render();
    if (active === 'page-review') Review.render();
    if (active === 'page-write') Writing.renderList();
    if (active === 'page-sketch') Sketch.renderGallery();
    if (active === 'page-settings') Settings.fill();
    if (active === 'page-english') English.render();
  }

  function bind() {
    document.querySelectorAll('.tab').forEach(t => t.addEventListener('click', () => {
      U.click(); switchTab(t.dataset.tab);
    }));
    $('#btnStartToday') && $('#btnStartToday').addEventListener('click', () => {
      if (!todayPick) return;
      U.click(); switchTab('write');
      setTimeout(() => Writing.open(todayPick.id, 'practice'), 60);
    });
    $('#btnReviewNow') && $('#btnReviewNow').addEventListener('click', () => {
      switchTab('review');
    });
    Store.onChange(() => {
      updateChipBadge();
      if (document.getElementById('page-home').classList.contains('active')) renderHome();
      if (document.getElementById('page-watch').classList.contains('active')) Watch.render();
      if (document.getElementById('page-review').classList.contains('active')) Review.render();
    });
  }

  function init() {
    // 날짜
    const d = new Date();
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    $('#dateLine').textContent = (d.getMonth() + 1) + '월 ' + d.getDate() + '일 ' + days[d.getDay()] + '요일 · 카봇과 함께!';

    Writing.fillSeasonFilter();
    Writing.bind();
    English.bind();
    Watch.bind();
    Review.bind();
    Story.bind();
    Sketch.bind();
    Settings.bind();
    bind();

    Store.initSync();
    refreshAll();

    if (!Store.state.gallery.length) Sketch.renderGallery();
    // 오늘 이야기 미리 만들기
    if (window.Story) { try { Story.render(Story.build()); } catch (e) { console.warn(e); } }

    switchTab('home');
  }

  window.App = { init, switchTab, renderHome, refreshAll };
  window.switchTab = switchTab;

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
