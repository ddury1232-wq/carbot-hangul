/* 에피소드 스토리 리딩 — 내가 모은 카봇들이 나오는 짧은 동화 */
(function () {
  const $ = U.$;
  let current = null;

  const PLACES = ['우리 동네 놀이터', '파란 하늘 위', '반짝이는 바닷가', '별이 뜨는 밤하늘', '동그란 언덕'];
  const PROBLEMS = [
    '커다란 바위가 길을 막아 버렸어요',
    '장난감 가게 앞에 무거운 상자가 쓰러졌어요',
    '고양이가 나무 위에서 내려오지 못했어요',
    '검은 구름이 해님을 가려 버렸어요',
    '다리가 부서져서 건너갈 수가 없었어요'
  ];
  const SOLUTIONS = [
    '힘을 모아 바위를 번쩍 들어 옮겼어요',
    '하나둘셋! 하고 상자를 밀어 올렸어요',
    '사다리를 만들고 살며시 안아 내려왔어요',
    '반짝반짝 빛을 비춰 구름을 밀어냈어요',
    '튼튼한 다리를 놓아 모두를 건너게 했어요'
  ];
  const CHEERS = ['정말 멋졌어요!', '모두가 박수를 쳤어요!', '카봇들은 의리 최고예요!', '오늘도 정의를 지켰어요!'];

  const pick = (arr, n) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return n ? a.slice(0, n) : a[0];
  };

  function cast() {
    const owned = Store.learnedList();
    const pool = owned.length >= 3 ? owned : owned.concat(pick(CARBOTS, 6)).filter((c, i, a) => a.findIndex(x => x.id === c.id) === i);
    return pick(pool, Math.min(4, Math.max(3, pool.length)));
  }

  function build() {
    const group = cast();
    const a = group[0], b = group[1], c = group[2] || group[0];
    const d = group[3] || null;
    const child = (Store.settings().childName || '우리').replace(/님$/, '');
    const place = pick(PLACES), problem = pick(PROBLEMS), solution = pick(SOLUTIONS), cheer = pick(CHEERS);
    const J = (w, p) => U.josa(w, p);

    function intro(ch) {
      const t = (ch.tag || '').trim();
      if (!t) return ch.name + J(ch.name, ['은', '는']) + ' 오늘도 씩씩한 카봇이에요.';
      if (/^[“"']/.test(t)) return '“' + t.replace(/^[“"']+|[”"']+$/g, '') + '” ' + ch.name + J(ch.name, ['이', '가']) + ' 말했어요.';
      return ch.name + J(ch.name, ['은', '는']) + ' ' + t.replace(/\.$/, '') + '.';
    }

    const title = a.name + J(a.name, ['과', '와']) + ' ' + b.name + ', ' + place + J(place, ['을', '를']) + ' 지켜라!';
    const lines = [
      child + J(child, ['이', '가']) + ' 오늘도 카봇 이름을 또박또박 썼어요. 그때 ' + place + '에서 반짝 빛이 났어요.',
      '“' + a.name + '!” 하고 불렀더니, ' + a.name + J(a.name, ['이', '가']) + ' 힘차게 달려왔어요.',
      intro(a),
      '그때 ' + b.name + J(b.name, ['도', '도']) + ' 나타났어요. ' + intro(b),
      '바로 그 순간, ' + problem + '!',
      a.name + J(a.name, ['과', '와']) + ' ' + b.name + J(b.name, ['은', '는']) + ' ' + c.name + J(c.name, ['과', '와']) + ' 함께 힘을 모았어요.',
      '그리고 ' + solution + '. ' + cheer,
      child + J(child, ['는', '는']) + ' 큰 소리로 이름을 읽었어요. “' + a.name + ', ' + b.name + ', ' + c.name + '!”',
      (d && d.id !== a.id && d.id !== b.id && d.id !== c.id ? d.name + '도 멀리서 손을 흔들었어요. ' : '') +
      '오늘도 카봇들과 함께라서 씩씩한 하루였어요.'
    ];
    return { title, lines, cast: group };
  }

  function highlightNames(text, chars) {
    let html = text;
    chars.forEach(ch => {
      html = html.split(ch.name).join('<em>' + ch.name + '</em>');
    });
    return html;
  }

  function render(story) {
    current = story;
    const t = $('#storyTitle'), b = $('#storyBody');
    if (t) t.textContent = story.title;
    if (b) {
      b.innerHTML = story.lines.map((line, i) =>
        '<p data-i="' + i + '">' + highlightNames(line, story.cast) + '</p>').join('');
    }
  }

  function makeNew() {
    U.click();
    const story = build();
    render(story);
    U.speak(story.title, { force: true });
    U.toast('새 이야기가 만들어졌어요 📖');
  }

  function read() {
    if (!current) makeNew();
    if (!('speechSynthesis' in window)) { U.toast('이 브라우저는 읽어주기를 지원하지 않아요'); return; }
    const paras = Array.from(document.querySelectorAll('#storyBody p'));
    const chars = current.lines.map(l => l.length + 1);
    const offsets = [];
    let acc = 0;
    chars.forEach(n => { offsets.push(acc); acc += n; });
    const full = current.lines.join(' ');
    U.stopSpeak();
    U.speak(full, {
      force: true, rate: 0.86,
      onboundary: (e) => {
        const idx = offsets.findIndex((o, i) => e.charIndex >= o && e.charIndex < o + chars[i]);
        paras.forEach((p, i) => p.classList.toggle('now', i === idx));
      },
      onend: () => paras.forEach(p => p.classList.remove('now'))
    });
  }

  function stop() { U.stopSpeak(); document.querySelectorAll('#storyBody p').forEach(p => p.classList.remove('now')); }

  function bind() {
    $('#btnNewStory') && $('#btnNewStory').addEventListener('click', makeNew);
    $('#btnReadStory') && $('#btnReadStory').addEventListener('click', read);
    $('#btnStopStory') && $('#btnStopStory').addEventListener('click', stop);
    $('#storyBody') && $('#storyBody').addEventListener('click', (e) => {
      const p = e.target.closest('p'); if (!p) return;
      U.speak(p.textContent, { force: true });
    });
  }

  window.Story = { render, makeNew, read, bind, build };
})();
