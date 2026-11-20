/* =====================================================================
   카봇 영어 출동 미션 · 데이터
   ---------------------------------------------------------------------
   Step 1  단모음 · 장모음 집중 연습 (Short & Long Vowels)  ← 단모음/매직 e를 처음부터 대비
   Step 2  자음군 · 이중자음 (Blends & Digraphs)
   Step 3  이중모음 · 응용 (Vowel Teams & R-controlled)
   단어를 하나 끝낼 때마다 ⚡ 에너지 코어 1개 → 4개마다 그 단계의 리더스 미션 1개 해금
   ===================================================================== */
window.EN_STEPS = [
  { id: 's1', tag: 'Step 1', title: '단모음 · 장모음', sub: 'Short & Long Vowels',
    emoji: '🅰️', color: '#2f86d8',
    intro: 'cat ↔ cake 처럼 짧은 소리와 긴 소리를 나란히 익혀요.' },
  { id: 's2', tag: 'Step 2', title: '자음군 · 이중자음', sub: 'Blends & Digraphs',
    emoji: '🔠', color: '#7b61d8',
    intro: 'sh·ch·th·st·tr 처럼 두 글자가 만드는 소리를 익혀요.' },
  { id: 's3', tag: 'Step 3', title: '이중모음 · 응용', sub: 'Vowel Teams & R-controlled',
    emoji: '🌈', color: '#12968a',
    intro: 'ai·oa·ee·oo 와 ar·or·er 소리를 익혀요.' },
  { id: 's4', tag: 'Step 4', title: '심화 · 긴 단어', sub: 'Blends, Digraphs & Endings',
    emoji: '🚀', color: '#d9713c',
    intro: 'str·scr·wh·ph·ng·ck 와 -ing·-ed, 묵음 글자까지 익혀요.' }
];

/* f: 소리 묶음 이름 / alt: 단·장모음 짝 / emoji: 그림 힌트 */
window.EN_WORDS = [
  /* ---------------- Step 1 · 단모음 a ---------------- */
  { id: 'cat',  w: 'cat',  ko: '고양이',   emoji: '🐱', step: 's1', f: '단모음 a' },
  { id: 'hat',  w: 'hat',  ko: '모자',     emoji: '🎩', step: 's1', f: '단모음 a' },
  { id: 'map',  w: 'map',  ko: '지도',     emoji: '🗺️', step: 's1', f: '단모음 a' },
  { id: 'bag',  w: 'bag',  ko: '가방',     emoji: '🎒', step: 's1', f: '단모음 a' },
  /* ---------------- Step 1 · 매직 e (a_e) ---------------- */
  { id: 'cake', w: 'cake', ko: '케이크',   emoji: '🍰', step: 's1', f: '매직 e · a_e' },
  { id: 'name', w: 'name', ko: '이름',     emoji: '🏷️', step: 's1', f: '매직 e · a_e' },
  { id: 'game', w: 'game', ko: '게임',     emoji: '🎮', step: 's1', f: '매직 e · a_e' },
  { id: 'tape', w: 'tape', ko: '테이프',   emoji: '🎗️', step: 's1', f: '매직 e · a_e' },
  /* 단·장모음 짝 */
  { id: 'cap',  w: 'cap',  ko: '야구모자', emoji: '🧢', step: 's1', f: '단모음 a', pair: 'cape' },
  { id: 'cape', w: 'cape', ko: '망토',     emoji: '🦸', step: 's1', f: '매직 e · a_e', alt: 'cap' },
  /* ---------------- Step 1 · 단모음 i ---------------- */
  { id: 'pig',  w: 'pig',  ko: '돼지',     emoji: '🐷', step: 's1', f: '단모음 i' },
  { id: 'sit',  w: 'sit',  ko: '앉다',     emoji: '🪑', step: 's1', f: '단모음 i' },
  { id: 'six',  w: 'six',  ko: '여섯',     emoji: '6️⃣', step: 's1', f: '단모음 i' },
  { id: 'win',  w: 'win',  ko: '이기다',   emoji: '🏆', step: 's1', f: '단모음 i' },
  /* ---------------- Step 1 · 매직 e (i_e) ---------------- */
  { id: 'bike', w: 'bike', ko: '자전거',   emoji: '🚲', step: 's1', f: '매직 e · i_e' },
  { id: 'time', w: 'time', ko: '시간',     emoji: '⏰', step: 's1', f: '매직 e · i_e' },
  { id: 'kite', w: 'kite', ko: '연',       emoji: '🪁', step: 's1', f: '매직 e · i_e' },
  { id: 'five', w: 'five', ko: '다섯',     emoji: '5️⃣', step: 's1', f: '매직 e · i_e' },
  { id: 'pin',  w: 'pin',  ko: '핀',       emoji: '📌', step: 's1', f: '단모음 i', pair: 'pine' },
  { id: 'pine', w: 'pine', ko: '소나무',   emoji: '🌲', step: 's1', f: '매직 e · i_e', alt: 'pin' },
  /* ---------------- Step 1 · 단모음 o ---------------- */
  { id: 'dog',  w: 'dog',  ko: '개',       emoji: '🐶', step: 's1', f: '단모음 o' },
  { id: 'box',  w: 'box',  ko: '상자',     emoji: '📦', step: 's1', f: '단모음 o' },
  { id: 'mop',  w: 'mop',  ko: '대걸레',   emoji: '🧹', step: 's1', f: '단모음 o' },
  { id: 'top',  w: 'top',  ko: '꼭대기',   emoji: '⛰️', step: 's1', f: '단모음 o' },
  /* ---------------- Step 1 · 매직 e (o_e) ---------------- */
  { id: 'home', w: 'home', ko: '집',       emoji: '🏠', step: 's1', f: '매직 e · o_e' },
  { id: 'bone', w: 'bone', ko: '뼈다귀',   emoji: '🦴', step: 's1', f: '매직 e · o_e' },
  { id: 'note', w: 'note', ko: '쪽지',     emoji: '📝', step: 's1', f: '매직 e · o_e' },
  { id: 'nose', w: 'nose', ko: '코',       emoji: '👃', step: 's1', f: '매직 e · o_e' },
  { id: 'hop',  w: 'hop',  ko: '깡충 뛰다', emoji: '🐰', step: 's1', f: '단모음 o', pair: 'hope' },
  { id: 'hope', w: 'hope', ko: '희망',     emoji: '✨', step: 's1', f: '매직 e · o_e', alt: 'hop' },
  /* ---------------- Step 1 · 단모음 u ---------------- */
  { id: 'sun',  w: 'sun',  ko: '해',       emoji: '☀️', step: 's1', f: '단모음 u' },
  { id: 'bus',  w: 'bus',  ko: '버스',     emoji: '🚌', step: 's1', f: '단모음 u' },
  { id: 'cup',  w: 'cup',  ko: '컵',       emoji: '🥤', step: 's1', f: '단모음 u' },
  { id: 'tub',  w: 'tub',  ko: '욕조',     emoji: '🛁', step: 's1', f: '단모음 u' },
  /* ---------------- Step 1 · 매직 e (u_e) ---------------- */
  { id: 'cube', w: 'cube', ko: '정육면체', emoji: '🧊', step: 's1', f: '매직 e · u_e', alt: 'cub' },
  { id: 'tube', w: 'tube', ko: '관',       emoji: '🧪', step: 's1', f: '매직 e · u_e' },
  { id: 'cute', w: 'cute', ko: '귀여운',   emoji: '🥰', step: 's1', f: '매직 e · u_e' },
  { id: 'cub',  w: 'cub',  ko: '새끼 곰',  emoji: '🐻', step: 's1', f: '단모음 u', pair: 'cube' },
  /* ---------------- Step 1 · 대표 장모음 e ---------------- */
  { id: 'see',  w: 'see',  ko: '보다',     emoji: '👀', step: 's1', f: '장모음 e' },
  { id: 'bee',  w: 'bee',  ko: '벌',       emoji: '🐝', step: 's1', f: '장모음 e' },
  { id: 'tree', w: 'tree', ko: '나무',     emoji: '🌳', step: 's1', f: '장모음 e' },
  { id: 'feet', w: 'feet', ko: '발',       emoji: '👣', step: 's1', f: '장모음 e' },

  /* ---------------- Step 2 · sh ---------------- */
  { id: 'ship', w: 'ship', ko: '배',       emoji: '🚢', step: 's2', f: 'sh' },
  { id: 'fish', w: 'fish', ko: '물고기',   emoji: '🐟', step: 's2', f: 'sh' },
  { id: 'shop', w: 'shop', ko: '가게',     emoji: '🏪', step: 's2', f: 'sh' },
  { id: 'wash', w: 'wash', ko: '씻다',     emoji: '🧼', step: 's2', f: 'sh' },
  /* ---------------- Step 2 · ch ---------------- */
  { id: 'chat', w: 'chat', ko: '수다 떨다', emoji: '💬', step: 's2', f: 'ch' },
  { id: 'chin', w: 'chin', ko: '턱',       emoji: '🙂', step: 's2', f: 'ch' },
  { id: 'lunch', w: 'lunch', ko: '점심',   emoji: '🍱', step: 's2', f: 'ch' },
  { id: 'chair', w: 'chair', ko: '의자',   emoji: '🪑', step: 's2', f: 'ch' },
  /* ---------------- Step 2 · th ---------------- */
  { id: 'thin', w: 'thin', ko: '얇은',     emoji: '📏', step: 's2', f: 'th' },
  { id: 'this', w: 'this', ko: '이것',     emoji: '👉', step: 's2', f: 'th' },
  { id: 'bath', w: 'bath', ko: '목욕',     emoji: '🫧', step: 's2', f: 'th' },
  { id: 'three', w: 'three', ko: '셋',     emoji: '3️⃣', step: 's2', f: 'th' },
  /* ---------------- Step 2 · st ---------------- */
  { id: 'star', w: 'star', ko: '별',       emoji: '⭐', step: 's2', f: 'st' },
  { id: 'stop', w: 'stop', ko: '멈추다',   emoji: '🛑', step: 's2', f: 'st' },
  { id: 'step', w: 'step', ko: '걸음',     emoji: '👟', step: 's2', f: 'st' },
  { id: 'best', w: 'best', ko: '최고',     emoji: '👍', step: 's2', f: 'st' },
  /* ---------------- Step 2 · tr ---------------- */
  { id: 'train', w: 'train', ko: '기차',   emoji: '🚂', step: 's2', f: 'tr' },
  { id: 'trip',  w: 'trip',  ko: '여행',   emoji: '🧳', step: 's2', f: 'tr' },
  { id: 'truck', w: 'truck', ko: '트럭',   emoji: '🚚', step: 's2', f: 'tr' },
  /* ---------------- Step 2 · bl ---------------- */
  { id: 'blue',  w: 'blue',  ko: '파랑',   emoji: '🔵', step: 's2', f: 'bl' },
  { id: 'black', w: 'black', ko: '검정',   emoji: '⚫', step: 's2', f: 'bl' },
  { id: 'block', w: 'block', ko: '블록',   emoji: '🧱', step: 's2', f: 'bl' },
  /* ---------------- Step 2 · fr / gr ---------------- */
  { id: 'frog',   w: 'frog',   ko: '개구리', emoji: '🐸', step: 's2', f: 'fr' },
  { id: 'friend', w: 'friend', ko: '친구',   emoji: '🤝', step: 's2', f: 'fr' },
  { id: 'green',  w: 'green',  ko: '초록',   emoji: '🟢', step: 's2', f: 'gr' },
  { id: 'grass',  w: 'grass',  ko: '풀',     emoji: '🌿', step: 's2', f: 'gr' },
  /* ---------------- Step 2 · cl / pl ---------------- */
  { id: 'clock', w: 'clock', ko: '시계',     emoji: '🕐', step: 's2', f: 'cl · pl' },
  { id: 'plane', w: 'plane', ko: '비행기',   emoji: '🛩️', step: 's2', f: 'cl · pl' },

  /* ---------------- Step 3 · ai / ay ---------------- */
  { id: 'rain', w: 'rain', ko: '비',       emoji: '🌧️', step: 's3', f: 'ai · ay' },
  { id: 'play', w: 'play', ko: '놀다',     emoji: '⚽', step: 's3', f: 'ai · ay' },
  { id: 'day',  w: 'day',  ko: '날',       emoji: '📅', step: 's3', f: 'ai · ay' },
  { id: 'wait', w: 'wait', ko: '기다리다', emoji: '⏳', step: 's3', f: 'ai · ay' },
  /* ---------------- Step 3 · oa / ow ---------------- */
  { id: 'boat', w: 'boat', ko: '배',       emoji: '⛵', step: 's3', f: 'oa · ow' },
  { id: 'snow', w: 'snow', ko: '눈',       emoji: '❄️', step: 's3', f: 'oa · ow' },
  { id: 'coat', w: 'coat', ko: '코트',     emoji: '🧥', step: 's3', f: 'oa · ow' },
  { id: 'grow', w: 'grow', ko: '자라다',   emoji: '🌱', step: 's3', f: 'oa · ow' },
  /* ---------------- Step 3 · ee / ea ---------------- */
  { id: 'seed', w: 'seed', ko: '씨앗',     emoji: '🌰', step: 's3', f: 'ee · ea' },
  { id: 'eat',  w: 'eat',  ko: '먹다',     emoji: '🍽️', step: 's3', f: 'ee · ea' },
  { id: 'read', w: 'read', ko: '읽다',     emoji: '📖', step: 's3', f: 'ee · ea' },
  { id: 'sea',  w: 'sea',  ko: '바다',     emoji: '🌊', step: 's3', f: 'ee · ea' },
  /* ---------------- Step 3 · oo ---------------- */
  { id: 'moon', w: 'moon', ko: '달',       emoji: '🌙', step: 's3', f: 'oo' },
  { id: 'book', w: 'book', ko: '책',       emoji: '📚', step: 's3', f: 'oo' },
  { id: 'food', w: 'food', ko: '음식',     emoji: '🍞', step: 's3', f: 'oo' },
  { id: 'look', w: 'look', ko: '보다',     emoji: '🔍', step: 's3', f: 'oo' },
  /* ---------------- Step 3 · ar ---------------- */
  { id: 'car',  w: 'car',  ko: '자동차',   emoji: '🚗', step: 's3', f: 'ar' },
  { id: 'farm', w: 'farm', ko: '농장',     emoji: '🚜', step: 's3', f: 'ar' },
  { id: 'park', w: 'park', ko: '공원',     emoji: '🏞️', step: 's3', f: 'ar' },
  { id: 'arm',  w: 'arm',  ko: '팔',       emoji: '💪', step: 's3', f: 'ar' },
  /* ---------------- Step 3 · or ---------------- */
  { id: 'fork',  w: 'fork',  ko: '포크',   emoji: '🍴', step: 's3', f: 'or' },
  { id: 'horse', w: 'horse', ko: '말',     emoji: '🐴', step: 's3', f: 'or' },
  { id: 'corn',  w: 'corn',  ko: '옥수수', emoji: '🌽', step: 's3', f: 'or' },
  { id: 'short', w: 'short', ko: '짧은',   emoji: '🩳', step: 's3', f: 'or' },
  /* ---------------- Step 3 · er / ir / ur ---------------- */
  { id: 'bird', w: 'bird', ko: '새',       emoji: '🐦', step: 's3', f: 'er · ir · ur' },
  { id: 'girl', w: 'girl', ko: '소녀',     emoji: '👧', step: 's3', f: 'er · ir · ur' },
  { id: 'turn', w: 'turn', ko: '돌다',     emoji: '🔄', step: 's3', f: 'er · ir · ur' },
  { id: 'her',  w: 'her',  ko: '그녀의',   emoji: '👩', step: 's3', f: 'er · ir · ur' },
/* ---------------- Step 4 · 3글자 자음군 str / spr / scr ---------------- */
  { id: 'street', w: 'street', ko: '거리',     emoji: '🛣️', step: 's4', f: 'str' },
  { id: 'strong', w: 'strong', ko: '강한',     emoji: '💪', step: 's4', f: 'str' },
  { id: 'spring', w: 'spring', ko: '봄',       emoji: '🌸', step: 's4', f: 'str' },
  { id: 'straw',  w: 'straw',  ko: '빨대',     emoji: '🥤', step: 's4', f: 'str' },
  { id: 'spray',  w: 'spray',  ko: '분무기',   emoji: '🧴', step: 's4', f: 'spr' },
  { id: 'sprout', w: 'sprout', ko: '새싹',     emoji: '🌱', step: 's4', f: 'spr' },
  { id: 'sprint', w: 'sprint', ko: '전력 질주', emoji: '🏃', step: 's4', f: 'spr' },
  { id: 'scream', w: 'scream', ko: '소리치다', emoji: '😱', step: 's4', f: 'scr' },
  { id: 'scrub',  w: 'scrub',  ko: '문지르다', emoji: '🧽', step: 's4', f: 'scr' },
  { id: 'screen', w: 'screen', ko: '화면',     emoji: '📺', step: 's4', f: 'scr' },
  /* ---------------- Step 4 · spl / thr / shr ---------------- */
  { id: 'splash', w: 'splash', ko: '첨벙',     emoji: '💦', step: 's4', f: 'spl' },
  { id: 'split',  w: 'split',  ko: '쪼개다',   emoji: '✂️', step: 's4', f: 'spl' },
  { id: 'throw',  w: 'throw',  ko: '던지다',   emoji: '🤾', step: 's4', f: 'thr' },
  { id: 'thread', w: 'thread', ko: '실',       emoji: '🧵', step: 's4', f: 'thr' },
  { id: 'shrimp', w: 'shrimp', ko: '새우',     emoji: '🦐', step: 's4', f: 'shr' },
  { id: 'shrink', w: 'shrink', ko: '줄어들다', emoji: '🔻', step: 's4', f: 'shr' },
  /* ---------------- Step 4 · wh / ph / ng / ck ---------------- */
  { id: 'whale', w: 'whale', ko: '고래',       emoji: '🐳', step: 's4', f: 'wh' },
  { id: 'wheel', w: 'wheel', ko: '바퀴',       emoji: '🛞', step: 's4', f: 'wh' },
  { id: 'phone', w: 'phone', ko: '전화',       emoji: '📱', step: 's4', f: 'ph' },
  { id: 'photo', w: 'photo', ko: '사진',       emoji: '📷', step: 's4', f: 'ph' },
  { id: 'king',  w: 'king',  ko: '왕',         emoji: '👑', step: 's4', f: 'ng' },
  { id: 'song',  w: 'song',  ko: '노래',       emoji: '🎵', step: 's4', f: 'ng' },
  { id: 'duck',  w: 'duck',  ko: '오리',       emoji: '🦆', step: 's4', f: 'ck' },
  { id: 'sock',  w: 'sock',  ko: '양말',       emoji: '🧦', step: 's4', f: 'ck' },
  /* ---------------- Step 4 · 어미 / 묵음 ---------------- */
  { id: 'jumping', w: 'jumping', ko: '뛰는',   emoji: '🦘', step: 's4', f: '-ing' },
  { id: 'walked',  w: 'walked',  ko: '걸었다', emoji: '🚶', step: 's4', f: '-ed' },
  { id: 'knee',    w: 'knee',    ko: '무릎',   emoji: '🦵', step: 's4', f: '묵음 k' },
  { id: 'write',   w: 'write',   ko: '쓰다',   emoji: '✍️', step: 's4', f: '묵음 w' }
];

window.EN_WORD_BY_ID = Object.fromEntries(EN_WORDS.map(w => [w.id, w]));

/* 그림 속 단어 뜻 보기용 사전 (리더스에서 쓰는 쉬운 낱말 포함) */
window.EN_DICT = {
  a: '하나의', an: '하나의', and: '그리고', are: '~이다', at: '~에', be: '~이다',
  big: '큰', brave: '용감한', by: '~옆에', can: '~할 수 있다', catch: '잡다',
  come: '오다', cool: '멋진', day: '날', do: '하다', down: '아래로', fast: '빠른',
  fire: '불', five: '다섯', fly: '날다', for: '~를 위해', from: '~로부터', fun: '재미있는',
  get: '얻다', give: '주다', go: '가다', good: '좋은', great: '훌륭한', help: '돕다',
  hero: '영웅', high: '높은', his: '그의', home: '집', hop: '깡충 뛰다', hot: '뜨거운',
  how: '어떻게', I: '나', in: '~안에', is: '~이다', it: '그것', jump: '뛰다',
  keep: '지키다', let: '~하게 하다', lift: '들다', like: '좋아하다', little: '작은',
  look: '보다', lot: '많음', magic: '마법', make: '만들다', many: '많은', me: '나를',
  my: '나의', new: '새로운', no: '아니', not: '~아니다', now: '지금', of: '~의',
  on: '~위에', one: '하나', out: '밖으로', play: '놀다', please: '부디', put: '놓다',
  quick: '빠른', rain: '비', red: '빨간', ride: '타다', right: '맞는', run: '달리다',
  safe: '안전한', save: '구하다', say: '말하다', see: '보다', she: '그녀는', sit: '앉다',
  small: '작은', so: '그래서', soon: '곧', splash: '첨벙', star: '별', stop: '멈추다',
  strong: '강한', sun: '해', take: '가져가다', tall: '키가 큰', that: '저것', the: '그',
  they: '그들은', this: '이것', to: '~로', too: '또한', town: '마을', tree: '나무',
  up: '위로', us: '우리를', very: '아주', want: '원하다', we: '우리는', what: '무엇',
  when: '언제', where: '어디', who: '누구', will: '~할 것이다', with: '~와 함께',
  yes: '네', you: '너', your: '너의', yum: '냠냠', zoom: '씽씽',
  says: '말한다', them: '그들을', their: '그들의', whole: '전체의', every: '모든',
  machine: '기계', engine: '엔진', broken: '고장난', screw: '나사', wrench: '렌치',
  build: '짓다', crew: '대원', night: '밤', fist: '주먹', stone: '돌', win: '이기다',
  sky: '하늘', hold: '잡다', together: '함께', spin: '돌다', bright: '밝은', line: '선',
  wheel: '바퀴', shine: '빛나다', wind: '바람', thread: '실', trick: '묘기', catch: '잡다',
  turn: '돌다', shape: '모양', changing: '바뀌는', rescue: '구조', sea: '바다', safe: '안전한',
  sound: '소리', heavy: '무거운', light: '빛', dark: '어두운', warm: '따뜻한', cool: '시원한',
  road: '길', slow: '느린', together: '함께', again: '다시', always: '언제나', never: '절대'
};

/* =====================================================================
   리더스 미션 · 6줄 이야기
   step 안에서 에너지 코어 4개마다 1개씩 열립니다.
   ===================================================================== */
window.EN_MISSIONS = [
  /* ---------------- Step 1 (시즌1 카봇) ---------------- */
  { id: 'm01', step: 's1', carbot: 'cb097', title: 'Ace to the Rescue', ko: '에이스의 출동', lines: [
    'Ace is a big red fire truck.',
    'He can make a big fire stop.',
    'I can help you, says Ace.',
    'He is quick and he is brave.',
    'Go, Ace, go! You are a hero.',
    'The town is safe with Ace.'
  ] },
  { id: 'm02', step: 's1', carbot: 'cb098', title: 'Hawk and the Cat', ko: '호크와 고양이', lines: [
    'Hawk is a fast blue car.',
    'He sees a small cat in a tree.',
    'Hop in, cat! says Hawk.',
    'The cat is safe and happy.',
    'Hawk can drive it home.',
    'Thank you, Hawk! says the cat.'
  ] },
  { id: 'm03', step: 's1', carbot: 'cb099', title: 'Fron Fixes It', ko: '프론의 수리', lines: [
    'Fron is a police car.',
    'He can fix a bike and a gate.',
    'I can fix it, no problem!',
    'He can make a old car new.',
    'Fron is a big help in town.',
    'Call me anytime! says Fron.'
  ] },
  { id: 'm04', step: 's1', carbot: 'cb100', title: 'Dandy Gives a Ride', ko: '댄디의 구급차', lines: [
    'Dandy is a white van.',
    'He can give you a ride.',
    'Come in, I can help you.',
    'He can make a sick friend smile.',
    'Dandy is a good friend.',
    'He can run all day and night.'
  ] },
  { id: 'm05', step: 's1', carbot: 'cb101', title: 'Sky at Night', ko: '밤의 스카이', lines: [
    'Sky is a cool car.',
    'She can fly up high.',
    'I am from a star! she says.',
    'Sky can see all the town.',
    'She can help in the dark night.',
    'Let us go up! says Sky.'
  ] },
  { id: 'm06', step: 's1', carbot: 'cb102', title: 'Storm the Big Truck', ko: '큰 트럭 스톰', lines: [
    'Storm is a big blue truck.',
    'He is strong and tall.',
    'I can lift this big box.',
    'He can make a road for five cars.',
    'Storm can do it all.',
    'The five cars can go home.'
  ] },
  { id: 'm07', step: 's1', carbot: 'cb103', title: 'Five in One', ko: '다섯이 하나로', lines: [
    'Five car-bots can make one.',
    'Ace, Fron, Dandy, Sky, Storm!',
    'They are big and strong.',
    'They can save the town.',
    'We are Pentastorm! they say.',
    'Go, Pentastorm, go!'
  ] },
  { id: 'm08', step: 's1', carbot: 'cb104', title: 'Arty and the Magic Hat', ko: '아티의 마법 모자', lines: [
    'Arty is a magic car.',
    'He has a big black hat.',
    'Look! A hat can fly!',
    'He can make a game for us.',
    'Arty can do magic.',
    'Come and see! says Arty.'
  ] },

  /* ---------------- Step 2 (시즌2 카봇) ---------------- */
  { id: 'm09', step: 's2', carbot: 'cb105', title: 'Born the Spy', ko: '스파이 본', lines: [
    'Born is a green spy car.',
    'He can hide in a shop.',
    'Sh! Do not tell! says Born.',
    'He can catch a thief at lunch.',
    'He is a smart friend.',
    'Born can help us all day.'
  ] },
  { id: 'm10', step: 's2', carbot: 'cb106', title: 'Meister Makes a Ship', ko: '마이스터의 배', lines: [
    'Meister is a smart guy.',
    'He can make a ship.',
    'This ship can go fast!',
    'He can fix a chair and a clock.',
    'Meister can mend a train.',
    'I can make anything!'
  ] },
  { id: 'm11', step: 's2', carbot: 'cb107', title: 'True at the Bath', ko: '목욕하는 트루', lines: [
    'True is a ghost car.',
    'He can jump and splash.',
    'This bath is so fun!',
    'He can hide in the bath.',
    'True is not a bad ghost.',
    'He is a friendly friend.'
  ] },
  { id: 'm12', step: 's2', carbot: 'cb108', title: 'Night and the Thief', ko: '나이트와 도둑', lines: [
    'Night is a police car.',
    'He can catch a thief.',
    'Stop right there, please!',
    'He can run on the street.',
    'Night keeps the town safe.',
    'Sleep well, says Night.'
  ] },
  { id: 'm13', step: 's2', carbot: 'cb109', title: 'Luke on the Block', ko: '블록 위의 루크', lines: [
    'Luke is a fast police car.',
    'He can stop on the block.',
    'This is my job! says Luke.',
    'He can help a friend in need.',
    'Luke can chase a big truck.',
    'The town is safe with Luke.'
  ] },
  { id: 'm14', step: 's2', carbot: 'cb110', title: 'Phone and the Train', ko: '폰과 기차', lines: [
    'Phone is a small bike car.',
    'He can ride with a train.',
    'The train is so big!',
    'He can zip and zoom all day.',
    'Phone is quick and glad.',
    'Let us ride again!'
  ] },

  /* ---------------- Step 3 (시즌3 카봇) ---------------- */
  { id: 'm15', step: 's3', carbot: 'cb112', title: 'Mighty Guard and the Rain', ko: '비 오는 날의 마이티가드', lines: [
    'It can rain and rain all day.',
    'Mighty Guard can help the town.',
    'I can stop the fire! he says.',
    'He can carry a horse to the farm.',
    'He is a big strong friend.',
    'The sun can come out again.'
  ] },
  { id: 'm16', step: 's3', carbot: 'cb113', title: 'Ugaba in the Park', ko: '공원의 우가바', lines: [
    'Ugaba is a wild car.',
    'He can jump in the park.',
    'Look at me go!',
    'He can play on the green grass.',
    'Ugaba can play all day.',
    'Let us play again!'
  ] },
  { id: 'm17', step: 's3', carbot: 'cb114', title: 'King Guyz and the Corn', ko: '킹가이즈와 옥수수', lines: [
    'King Guyz is a gold car.',
    'He can eat a lot of corn.',
    'Yum, yum! More corn!',
    'He can share food with all.',
    'King Guyz is so glad.',
    'The farm is his home.'
  ] },
  { id: 'm18', step: 's3', carbot: 'cb115', title: 'Gold Rex and the Moon', ko: '골드렉스와 달', lines: [
    'Gold Rex can fly to the moon.',
    'He can look at the stars.',
    'The moon is so far!',
    'He can go over the sea.',
    'Gold Rex can go home soon.',
    'See you next time!'
  ] },
  { id: 'm19', step: 's3', carbot: 'cb116', title: 'Jetren and the Bird', ko: '제트렌과 새', lines: [
    'Jetren is a fast jet.',
    'He can see a small bird.',
    'Fly with me, bird!',
    'They can turn and turn.',
    'They can look at the town.',
    'Fly high, my friend!'
  ] },
  { id: 'm20', step: 's3', carbot: 'cb117', title: 'K-Cops on the Farm', ko: '농장의 케이캅스', lines: [
    'K-Cops are brave and strong.',
    'They can run to the farm.',
    'We can help the horse!',
    'They can catch a bad guy.',
    'K-Cops can save the day.',
    'All safe! say the K-Cops.'
  ] },

  /* ---------------- Step 4 (시즌5~6 카봇 · 심화) ---------------- */
  { id: 'm21', step: 's4', carbot: 'cb135', title: 'Iron the Engineer', ko: '수리왕 아이언트', lines: [
    'Iron is a smart engineer car.',
    'He can fix a broken engine.',
    'Bring me a screw and a spring!',
    'With a strong wrench he can build a street.',
    'The crew can work all night.',
    'All fixed! says Iron.'
  ] },
  { id: 'm22', step: 's4', carbot: 'cb136', title: 'Converter the Trickster', ko: '장난꾸러기 컨버스터', lines: [
    'Converter is a shape-changing car.',
    'He can turn a truck into a jet.',
    'Splash and spin! he says.',
    'He can make a screen from a box.',
    'Converter can think of a new trick.',
    'Try and catch me!'
  ] },
  { id: 'm23', step: 's4', carbot: 'cb137', title: 'Lucky Punch Wins', ko: '럭키펀치의 한 방', lines: [
    'Lucky Punch has a big strong fist.',
    'He can throw a stone far.',
    'One punch and I can win!',
    'He can spring up to the sky.',
    'Lucky Punch is quick and glad.',
    'What a good day!'
  ] },
  { id: 'm24', step: 's4', carbot: 'cb138', title: 'Inook Saves the Whale', ko: '고래를 구한 아이누크', lines: [
    'Inook can fly like a big bird.',
    'He can see a whale in the sea.',
    'Hold on! I can help!',
    'He can lift a truck from the street.',
    'The rescue crew can work together.',
    'All safe! says Inook.'
  ] },
  { id: 'm25', step: 's4', carbot: 'cb139', title: 'Star Spinner Shines', ko: '별처럼 도는 스타피너', lines: [
    'Star Spinner can spin and spin.',
    'He can write a bright line in the sky.',
    'Look! A wheel of light!',
    'He can screen the town at night.',
    'The stars can shine on the street.',
    'Good night! says Star Spinner.'
  ] },
  { id: 'm26', step: 's4', carbot: 'cb151', title: 'Meta Falcon Flies', ko: '매처럼 나는 메타팔콘', lines: [
    'Meta Falcon can fly up high.',
    'He can scream like a strong wind.',
    'I can shrink and fly!',
    'He can throw a thread of light.',
    'The screen of the sky is bright.',
    'Catch me if you can!'
  ] }
];

/* 미션 해금에 필요한 에너지 코어 수 */
window.EN_CORES_PER_MISSION = 4;

/* =====================================================================
   사이트 워드 (Sight Words) — 6줄 리더스에 자주 나오는 필수 빈출 단어
   통째로 익히는 말이라 뜻(ko)과 짧은 예시(ex)를 함께 보여 줍니다.
   ===================================================================== */
window.EN_SIGHT = [
  { id: 'the',  w: 'the',  ko: '그',           emoji: '📖', ex: 'the sun' },
  { id: 'is',   w: 'is',   ko: '~이에요',       emoji: '🟰', ex: 'he is big' },
  { id: 'a',    w: 'a',    ko: '하나의',        emoji: '1️⃣', ex: 'a cat' },
  { id: 'can',  w: 'can',  ko: '~할 수 있어요',  emoji: '💪', ex: 'I can go' },
  { id: 'you',  w: 'you',  ko: '너',           emoji: '🫵', ex: 'you and me' },
  { id: 'go',   w: 'go',   ko: '가다',          emoji: '🚦', ex: 'go, go, go!' },
  { id: 'and',  w: 'and',  ko: '그리고',        emoji: '➕', ex: 'mom and dad' },
  { id: 'with', w: 'with', ko: '~와 함께',      emoji: '🤝', ex: 'with my friend' },
  { id: 'he',   w: 'he',   ko: '그는',          emoji: '👦', ex: 'he is here' },
  { id: 'she',  w: 'she',  ko: '그녀는',        emoji: '👧', ex: 'she can see' },
  { id: 'are',  w: 'are',  ko: '~이에요(여럿)',  emoji: '👨‍👩‍👧', ex: 'we are here' },
  { id: 'they', w: 'they', ko: '그들은',        emoji: '👥', ex: 'they can go' },
  { id: 'have', w: 'have', ko: '가지다',        emoji: '🤲', ex: 'I have a cat' },
  { id: 'like', w: 'like', ko: '좋아하다',      emoji: '❤️', ex: 'I like cake' },
  { id: 'see',  w: 'see',  ko: '보다',          emoji: '👀', ex: 'I see you' },
  { id: 'look', w: 'look', ko: '쳐다보다',      emoji: '🔎', ex: 'look at me' },
  { id: 'come', w: 'come', ko: '오다',          emoji: '🚶', ex: 'come here' },
  { id: 'here', w: 'here', ko: '여기',          emoji: '📍', ex: 'I am here' },
  { id: 'this', w: 'this', ko: '이것',          emoji: '👉', ex: 'this is my hat' },
  { id: 'that', w: 'that', ko: '저것',          emoji: '👈', ex: 'that is a dog' },
  { id: 'my',   w: 'my',   ko: '나의',          emoji: '🙋', ex: 'my cat' },
  { id: 'we',   w: 'we',   ko: '우리는',        emoji: '🧑‍🤝‍🧑', ex: 'we can go' },
  { id: 'it',   w: 'it',   ko: '그것',          emoji: '📦', ex: 'it is big' },
  { id: 'to',   w: 'to',   ko: '~로',           emoji: '➡️', ex: 'go to the park' }
];
window.EN_SIGHT_BY_ID = Object.fromEntries(EN_SIGHT.map(w => [w.id, w]));

/* =====================================================================
   소리 듣고 고르기 퀴즈 — 원어민 발음(en-US)을 듣고 알맞은 카드 고르기
   · round 'pair'  : 단모음 ↔ 장모음 최소대립쌍(cap↔cape, pin↔pine, hop↔hope, cub↔cube)
   · round 's1'~'s4': 단계별 단어 구별
   · round 'sight' : 사이트 워드 찾기(아래에서 자동 생성)
   답(ans)은 단어 id, choices 는 같은 문제 카드에 놓이는 단어 id 목록입니다.
   ===================================================================== */
window.EN_QUIZ_ROUNDS = [
  { id: 'pair',  tag: '짝 소리', title: '단모음 ↔ 장모음', sub: 'cap vs cape',  emoji: '🅰️', size: 2 },
  { id: 's1',    tag: 'Step 1',  title: '단모음 · 장모음',  sub: 'cat · cake',   emoji: '🔤', size: 4 },
  { id: 's2',    tag: 'Step 2',  title: '자음군 · 이중자음', sub: 'ship · shop',  emoji: '🔠', size: 4 },
  { id: 's3',    tag: 'Step 3',  title: '이중모음 · 응용',  sub: 'rain · boat',  emoji: '🌈', size: 4 },
  { id: 's4',    tag: 'Step 4',  title: '심화 · 긴 단어',   sub: 'street · scream', emoji: '🚀', size: 4 },
  { id: 'sight', tag: '사이트 워드', title: '찾기 놀이', sub: 'the · is · can', emoji: '⭐', size: 4 }
];

window.EN_QUIZ = [
  /* ---------- 단모음 ↔ 장모음 짝 (2지선다) ---------- */
  { id: 'pq-cap',  round: 'pair', ans: 'cap',  choices: ['cap', 'cape'], cue: '단모음 a' },
  { id: 'pq-cape', round: 'pair', ans: 'cape', choices: ['cape', 'cap'], cue: '매직 e · a_e' },
  { id: 'pq-pin',  round: 'pair', ans: 'pin',  choices: ['pin', 'pine'], cue: '단모음 i' },
  { id: 'pq-pine', round: 'pair', ans: 'pine', choices: ['pine', 'pin'], cue: '매직 e · i_e' },
  { id: 'pq-hop',  round: 'pair', ans: 'hop',  choices: ['hop', 'hope'], cue: '단모음 o' },
  { id: 'pq-hope', round: 'pair', ans: 'hope', choices: ['hope', 'hop'], cue: '매직 e · o_e' },
  { id: 'pq-cub',  round: 'pair', ans: 'cub',  choices: ['cub', 'cube'], cue: '단모음 u' },
  { id: 'pq-cube', round: 'pair', ans: 'cube', choices: ['cube', 'cub'], cue: '매직 e · u_e' },

  /* ---------- Step 1 · 단모음 / 장모음 (4지선다) ---------- */
  { id: 'q-s1-1', round: 's1', ans: 'cat',  choices: ['cat', 'cake', 'cap', 'bag'],   cue: '단모음 a' },
  { id: 'q-s1-2', round: 's1', ans: 'cake', choices: ['cake', 'cat', 'name', 'bike'], cue: '매직 e · a_e' },
  { id: 'q-s1-3', round: 's1', ans: 'pig',  choices: ['pig', 'pin', 'bike', 'pine'],  cue: '단모음 i' },
  { id: 'q-s1-4', round: 's1', ans: 'bike', choices: ['bike', 'pig', 'five', 'sit'],  cue: '매직 e · i_e' },
  { id: 'q-s1-5', round: 's1', ans: 'dog',  choices: ['dog', 'box', 'home', 'bone'],  cue: '단모음 o' },
  { id: 'q-s1-6', round: 's1', ans: 'home', choices: ['home', 'dog', 'nose', 'mop'],  cue: '매직 e · o_e' },
  { id: 'q-s1-7', round: 's1', ans: 'sun',  choices: ['sun', 'bus', 'cube', 'cup'],   cue: '단모음 u' },
  { id: 'q-s1-8', round: 's1', ans: 'cube', choices: ['cube', 'cub', 'tube', 'cup'],  cue: '매직 e · u_e' },

  /* ---------- Step 2 · 자음군 / 이중자음 ---------- */
  { id: 'q-s2-1', round: 's2', ans: 'ship',  choices: ['ship', 'shop', 'fish', 'wash'],    cue: 'sh' },
  { id: 'q-s2-2', round: 's2', ans: 'chin',  choices: ['chin', 'chat', 'chair', 'lunch'],  cue: 'ch' },
  { id: 'q-s2-3', round: 's2', ans: 'thin',  choices: ['thin', 'this', 'bath', 'three'],   cue: 'th' },
  { id: 'q-s2-4', round: 's2', ans: 'star',  choices: ['star', 'stop', 'step', 'best'],    cue: 'st' },
  { id: 'q-s2-5', round: 's2', ans: 'train', choices: ['train', 'trip', 'truck', 'star'],  cue: 'tr' },
  { id: 'q-s2-6', round: 's2', ans: 'black', choices: ['black', 'blue', 'block', 'plane'], cue: 'bl' },
  { id: 'q-s2-7', round: 's2', ans: 'frog',  choices: ['frog', 'friend', 'green', 'grass'], cue: 'fr' },
  { id: 'q-s2-8', round: 's2', ans: 'clock', choices: ['clock', 'block', 'black', 'plane'], cue: 'cl · pl' },

  /* ---------- Step 3 · 이중모음 / 응용 ---------- */
  { id: 'q-s3-1', round: 's3', ans: 'rain', choices: ['rain', 'play', 'day', 'wait'],    cue: 'ai · ay' },
  { id: 'q-s3-2', round: 's3', ans: 'boat', choices: ['boat', 'snow', 'coat', 'grow'],   cue: 'oa · ow' },
  { id: 'q-s3-3', round: 's3', ans: 'seed', choices: ['seed', 'eat', 'read', 'sea'],     cue: 'ee · ea' },
  { id: 'q-s3-4', round: 's3', ans: 'book', choices: ['book', 'moon', 'look', 'food'],   cue: 'oo' },
  { id: 'q-s3-5', round: 's3', ans: 'car',  choices: ['car', 'farm', 'park', 'arm'],     cue: 'ar' },
  { id: 'q-s3-6', round: 's3', ans: 'fork', choices: ['fork', 'horse', 'corn', 'short'], cue: 'or' },
  { id: 'q-s3-7', round: 's3', ans: 'bird', choices: ['bird', 'girl', 'turn', 'her'],    cue: 'er · ir · ur' },
  { id: 'q-s3-8', round: 's3', ans: 'wait', choices: ['wait', 'rain', 'day', 'play'],    cue: 'ai · ay' },

  /* ---------- Step 4 · 심화 ---------- */
  { id: 'q-s4-1', round: 's4', ans: 'street', choices: ['street', 'strong', 'spring', 'straw'],   cue: 'str' },
  { id: 'q-s4-2', round: 's4', ans: 'spray',  choices: ['spray', 'sprout', 'sprint', 'scream'],   cue: 'spr' },
  { id: 'q-s4-3', round: 's4', ans: 'scream', choices: ['scream', 'scrub', 'screen', 'splash'],    cue: 'scr' },
  { id: 'q-s4-4', round: 's4', ans: 'splash', choices: ['splash', 'split', 'throw', 'thread'],     cue: 'spl' },
  { id: 'q-s4-5', round: 's4', ans: 'shrimp', choices: ['shrimp', 'shrink', 'throw', 'thread'],    cue: 'shr' },
  { id: 'q-s4-6', round: 's4', ans: 'whale',  choices: ['whale', 'wheel', 'phone', 'photo'],      cue: 'wh · ph' },
  { id: 'q-s4-7', round: 's4', ans: 'king',   choices: ['king', 'song', 'duck', 'sock'],          cue: 'ng · ck' },
  { id: 'q-s4-8', round: 's4', ans: 'knee',   choices: ['knee', 'write', 'walked', 'jumping'],    cue: '묵음 k · w' }
];

/* 사이트 워드 찾기 문제는 목록에서 만들어 넣습니다(같은 낱말이 겹치지 않게) */
(function () {
  const n = EN_SIGHT.length;
  EN_SIGHT.forEach((s, i) => {
    const picks = [i];
    [3, 7, 11].forEach(step => {
      let k = (i + step) % n, guard = 0;
      while ((picks.indexOf(k) >= 0) && guard++ < n) k = (k + 1) % n;
      if (picks.indexOf(k) < 0) picks.push(k);
    });
    EN_QUIZ.push({
      id: 'sw-' + s.id, round: 'sight', kind: 'sight', ans: s.id,
      choices: picks.map(k => EN_SIGHT[k].id), cue: s.ko
    });
  });
})();

window.EN_QUIZ_BY_ID = Object.fromEntries(EN_QUIZ.map(q => [q.id, q]));

/* =====================================================================
   리더스 문장 블록 맞추기 — 리더스마다 핵심 문장 한 줄을 단어 블록으로 나눕니다
   (line: 그 리더스 6줄 중 고른 줄 번호)
   ===================================================================== */
window.EN_BLOCK_LINES = {
  m01: 5, m02: 0, m03: 0, m04: 0, m05: 0, m06: 0, m07: 2, m08: 0,
  m09: 0, m10: 0, m11: 0, m12: 0, m13: 0, m14: 0, m15: 1, m16: 0,
  m17: 0, m18: 2, m19: 0, m20: 0, m21: 0, m22: 4, m23: 2, m24: 2,
  m25: 0, m26: 0
};
window.EN_BLOCKS = EN_MISSIONS.map(m => {
  const idx = EN_BLOCK_LINES[m.id] == null ? 0 : EN_BLOCK_LINES[m.id];
  const line = m.lines[idx] || m.lines[0];
  return {
    mission: m.id, step: m.step, line: idx,
    sentence: line,
    words: line.replace(/\s+/g, ' ').trim().split(' ')
  };
});
window.EN_BLOCK_BY_ID = Object.fromEntries(EN_BLOCKS.map(b => [b.mission, b]));
