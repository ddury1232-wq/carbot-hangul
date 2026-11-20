/* =====================================================================
   카봇 영어 출동 미션 · 데이터
   ---------------------------------------------------------------------
   Step 1  단모음 · 장모음 (Short & Long Vowels) — 단어 가족(-at·-an…) + 매직 e
   Step 2  자음군 · 이중자음 (Blends & Digraphs)
   Step 3  이중모음 · 응용 (Vowel Teams & R-controlled)
   Step 4  심화 · 긴 단어 (Endings, Silent letters, Long words)

   · 단어는 '음가 유닛(unit)'으로 묶여 있고, 화면에서는 단계 탭 → 유닛 탭으로 찾아갑니다.
   · 단어를 하나 끝낼 때마다 ⚡ 에너지 코어 1개 → 4개마다 그 단계의 리더스 미션 1개 해금
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
  { id: 's4', tag: 'Step 4', title: '심화 · 긴 단어', sub: 'Endings, Silent & Long Words',
    emoji: '🚀', color: '#d9713c',
    intro: 'kn·wr·ph·-tion·-ing 와 여러 음절 긴 단어까지 익혀요.' }
];

/* ---------------------------------------------------------------------
   음가 유닛 — words 는 '낱말|뜻|그림' 줄바꿈 목록
   --------------------------------------------------------------------- */
window.EN_UNIT_LIST = [
  /* ================= Step 1 · 단모음 단어 가족 ================= */
  { id: 's1at', step: 's1', title: '-at 가족', sub: 'short a', emoji: '🐱', words: `
cat|고양이|🐱
hat|모자|🎩
bat|야구방망이|🏏
rat|쥐|🐀
mat|매트|🧘
sat|앉았다|🪑
fat|뚱뚱한|🐷
pat|쓰다듬다|👋
flat|평평한|➖` },
  { id: 's1an', step: 's1', title: '-an 가족', sub: 'short a', emoji: '🍳', words: `
man|남자|👨
pan|냄비|🍳
fan|선풍기|🌀
can|깡통|🥫
van|밴|🚐
ran|달렸다|🏃
tan|황갈색|🟤
plan|계획|🗒️` },
  { id: 's1ap', step: 's1', title: '-ap 가족', sub: 'short a', emoji: '🧢', words: `
map|지도|🗺️
cap|야구모자|🧢
nap|낮잠|😴
tap|수도꼭지|🚰
lap|무릎|🦵
clap|박수|👏
snap|딱|⚡
trap|덫|🪤` },
  { id: 's1ag', step: 's1', title: '-ag 가족', sub: 'short a', emoji: '🎒', words: `
bag|가방|🎒
tag|꼬리표|🏷️
wag|흔들다|🐕
drag|끌다|🧲
brag|자랑하다|😤
stag|수사슴|🦌
rag|걸레|🧻` },
  { id: 's1ad', step: 's1', title: '-ad 가족', sub: 'short a', emoji: '😢', words: `
bad|나쁜|👎
dad|아빠|👨
sad|슬픈|😢
mad|화난|😠
lad|소년|👦
pad|패드|📝
add|더하다|➕
glad|기쁜|😊` },
  { id: 's1am', step: 's1', title: '-am 가족', sub: 'short a', emoji: '🍓', words: `
jam|잼|🍓
ham|햄|🍖
ram|숫양|🐏
dam|댐|🌊
clam|조개|🦪
gram|그램|⚖️
swam|헤엄쳤다|🏊` },
  { id: 's1ed', step: 's1', title: '-ed · -eg 가족', sub: 'short e', emoji: '🛏️', words: `
bed|침대|🛏️
red|빨강|🔴
led|이끌었다|🧭
fed|먹였다|🍼
wed|결혼하다|💍
beg|애원하다|🙏
leg|다리|🦵
peg|못|📌` },
  { id: 's1en', step: 's1', title: '-en 가족', sub: 'short e', emoji: '🖊️', words: `
pen|펜|🖊️
hen|암탉|🐔
ten|열|🔟
den|굴|🕳️
men|남자들|👬
open|열다|🔓
oven|오븐|🔥` },
  { id: 's1et', step: 's1', title: '-et 가족', sub: 'short e', emoji: '🕸️', words: `
net|그물|🕸️
jet|제트기|✈️
wet|젖은|💧
pet|반려동물|🐾
get|얻다|🎁
let|허락하다|👍
set|놓다|🧩
vet|수의사|🩺` },
  { id: 's1ig', step: 's1', title: '-ig 가족', sub: 'short i', emoji: '🐷', words: `
pig|돼지|🐷
big|큰|🐘
dig|파다|⛏️
wig|가발|💇
fig|무화과|🫒
jig|춤|🕺
twig|나뭇가지|🌿
rig|장비|🛠️` },
  { id: 's1in', step: 's1', title: '-in 가족', sub: 'short i', emoji: '📌', words: `
pin|핀|📌
win|이기다|🏆
bin|쓰레기통|🗑️
fin|지느러미|🐟
twin|쌍둥이|👯
thin|얇은|📏
shin|정강이|🦵` },
  { id: 's1it', step: 's1', title: '-it 가족', sub: 'short i', emoji: '🪑', words: `
sit|앉다|🪑
hit|치다|👊
bit|조금|🤏
kit|도구 세트|🧰
fit|맞다|✅
lit|불 켜진|🔥
quit|그만두다|🚪
knit|뜨개질|🧶` },
  { id: 's1ip', step: 's1', title: '-ip 가족', sub: 'short i', emoji: '👄', words: `
lip|입술|👄
tip|끝|👆
zip|지퍼|🤐
dip|찍다|🥣
hip|엉덩이|🕺
sip|홀짝이다|🥤
drip|방울|💧
chip|과자|🍟` },
  { id: 's1og', step: 's1', title: '-og 가족', sub: 'short o', emoji: '🐶', words: `
dog|개|🐶
log|통나무|🪵
fog|안개|🌫️
jog|조깅|🏃
hog|돼지|🐗
clog|막다|🚫
bog|늪|🟩` },
  { id: 's1op', step: 's1', title: '-op 가족', sub: 'short o', emoji: '🧹', words: `
mop|대걸레|🧹
top|꼭대기|⛰️
hop|깡충 뛰다|🐰
pop|터지다|🎈
cop|경찰관|👮
chop|썰다|🔪
flop|털썩|🛋️
plop|풍덩|💦` },
  { id: 's1ot', step: 's1', title: '-ot 가족', sub: 'short o', emoji: '🍲', words: `
pot|냄비|🍲
hot|뜨거운|🔥
cot|아기침대|🛏️
dot|점|⚫
lot|많음|🧺
not|아니다|❌
shot|발사|🎯
knot|매듭|🪢
rod|막대|🎣` },
  { id: 's1ug', step: 's1', title: '-ug 가족', sub: 'short u', emoji: '🐛', words: `
bug|벌레|🐛
mug|컵|☕
rug|깔개|🧶
hug|포옹|🤗
jug|주전자|🫙
dug|팠다|⛏️
slug|민달팽이|🐌` },
  { id: 's1un', step: 's1', title: '-un 가족', sub: 'short u', emoji: '☀️', words: `
sun|해|☀️
fun|재미|🎉
run|달리다|🏃
bun|빵|🥯
gun|총|🔫
spun|돌았다|🌀
stun|기절시키다|😵` },
  { id: 's1ut', step: 's1', title: '-ut 가족', sub: 'short u', emoji: '✂️', words: `
cut|자르다|✂️
nut|견과|🥜
hut|오두막|🛖
but|그러나|↔️
jut|튀어나오다|📐
shut|닫다|🚪` },
  { id: 's1all', step: 's1', title: '-all 가족', sub: 'long a', emoji: '⚽', words: `
ball|공|⚽
tall|키 큰|📏
fall|넘어지다|🍂
wall|벽|🧱
call|부르다|📞
hall|복도|🏛️
mall|쇼핑몰|🛍️
stall|가판대|🏪` },
  { id: 's1ell', step: 's1', title: '-ell 가족', sub: 'short e', emoji: '🔔', words: `
bell|종|🔔
tell|말하다|🗣️
yell|소리치다|📢
sell|팔다|💰
well|잘|👍
dwell|살다|🏠
spell|철자하다|🔤` },
  { id: 's1ill', step: 's1', title: '-ill 가족', sub: 'short i', emoji: '⛰️', words: `
hill|언덕|⛰️
fill|채우다|🫗
pill|알약|💊
will|~할 것이다|🔮
bill|계산서|🧾
mill|방앗간|🏭
spill|쏟다|🥛
drill|드릴|🪛` },
  { id: 's1ump', step: 's1', title: '-ump 가족', sub: 'short u', emoji: '🦘', words: `
jump|뛰다|🦘
bump|부딪히다|💥
dump|버리다|🗑️
lump|덩어리|🧆
pump|펌프|⛽
stump|그루터기|🪵` },
  { id: 's1oss', step: 's1', title: '-oss 가족', sub: 'short o', emoji: '🧑‍💼', words: `
boss|상사|🧑‍💼
loss|손실|📉
toss|던지다|🤾
moss|이끼|🌿
floss|치실|🦷
gloss|광택|✨` },
  { id: 's1ock', step: 's1', title: '-ock 가족', sub: 'short o', emoji: '🪨', words: `
rock|바위|🪨
dock|부두|⚓
mock|놀리다|😝
flock|떼|🐑
stock|재고|📦
shock|충격|😲` },
  { id: 's1uck', step: 's1', title: '-uck 가족', sub: 'short u', emoji: '🍀', words: `
luck|행운|🍀
buck|수사슴|🦌
tuck|넣다|🛌
stuck|끼인|🪤
pluck|뽑다|🎸
cluck|꼬꼬댁|🐔` },
  { id: 's1ash', step: 's1', title: '-ash 가족', sub: 'short a', emoji: '💵', words: `
cash|현금|💵
dash|돌진|💨
mash|으깨다|🥔
rash|발진|🔴
sash|띠|🎗️` },
  { id: 's1est', step: 's1', title: '-est 가족', sub: 'short e', emoji: '🪺', words: `
nest|둥지|🪺
rest|쉬다|😌
test|시험|📝
west|서쪽|🧭
vest|조끼|🦺
chest|가슴|📦
guest|손님|🙋` },
  { id: 's1end', step: 's1', title: '-end 가족', sub: 'short e', emoji: '🏁', words: `
end|끝|🏁
bend|구부리다|↩️
send|보내다|📮
tend|돌보다|🌱
lend|빌려주다|🤲
mend|고치다|🧵` },
  { id: 's1amp', step: 's1', title: '-amp 가족', sub: 'short a', emoji: '⛺', words: `
camp|야영|⛺
lamp|램프|🪔
damp|축축한|💧
ramp|경사로|🛗` },
  { id: 's1and', step: 's1', title: '-and 가족', sub: 'short a', emoji: '✋', words: `
hand|손|✋
band|밴드|🎸
land|땅|🌍
sand|모래|🏖️
grand|웅장한|🏰` },
  { id: 's1ink', step: 's1', title: '-ink 가족', sub: 'short i', emoji: '🖋️', words: `
ink|잉크|🖋️
pink|분홍|🌸
sink|싱크대|🚰
link|연결|🔗
wink|윙크|😉` },
  { id: 's1ank', step: 's1', title: '-ank 가족', sub: 'short a', emoji: '🏦', words: `
bank|은행|🏦
tank|탱크|🛢️
sank|가라앉았다|⚓
rank|순위|🏅
frank|솔직한|💬` },
  { id: 's1unk', step: 's1', title: '-unk 가족', sub: 'short u', emoji: '🧱', words: `
junk|잡동사니|🗑️
chunk|덩어리|🧱
trunk|코끼리 코|🐘
sunk|가라앉은|🚢` },
  { id: 's1old', step: 's1', title: '-old 가족', sub: 'long o', emoji: '🥇', words: `
gold|금|🥇
cold|추운|🥶
hold|잡다|🤲
fold|접다|📄
told|말했다|🗣️
bold|대담한|💪` },
  { id: 's1ind', step: 's1', title: '-ind 가족', sub: 'long i', emoji: '❤️', words: `
kind|친절한|❤️
mind|마음|🧠
find|찾다|🔍
wind|바람|🌬️` },

  /* ================= Step 1 · 매직 e · 장모음 ================= */
  { id: 's1a_e', step: 's1', title: '매직 e · a_e', sub: 'a_e', emoji: '🍰', words: `
cake|케이크|🍰
name|이름|🏷️
game|게임|🎮
tape|테이프|🎗️
cape|망토|🦸
gate|문|🚪
late|늦은|⏰
date|날짜|📅
lake|호수|🏞️
bake|굽다|🍞
make|만들다|🔨
wave|손 흔들기|👋
cave|동굴|🕳️
grape|포도|🍇
snake|뱀|🐍
plate|접시|🍽️` },
  { id: 's1i_e', step: 's1', title: '매직 e · i_e', sub: 'i_e', emoji: '🚲', words: `
bike|자전거|🚲
time|시간|⏰
kite|연|🪁
five|다섯|5️⃣
pine|소나무|🌲
hide|숨다|🙈
ride|타다|🎠
nine|아홉|9️⃣
line|선|➖
mine|나의 것|⛏️
wide|넓은|↔️
rice|쌀|🍚
ice|얼음|🧊
smile|웃다|😊
dice|주사위|🎲
slide|미끄럼틀|🛝` },
  { id: 's1o_e', step: 's1', title: '매직 e · o_e', sub: 'o_e', emoji: '🏠', words: `
home|집|🏠
bone|뼈다귀|🦴
note|쪽지|📝
nose|코|👃
hope|희망|✨
rope|밧줄|🪢
rose|장미|🌹
hole|구멍|🕳️
pole|기둥|🏑
close|닫다|🚪
those|저것들|👈
woke|깨어났다|😮
joke|농담|😂
stone|돌|🪨
globe|지구본|🌍
froze|얼었다|🧊` },
  { id: 's1u_e', step: 's1', title: '매직 e · u_e', sub: 'u_e', emoji: '🧊', words: `
cube|정육면체|🧊
tube|관|🧪
cute|귀여운|🥰
use|사용하다|🛠️
mule|노새|🐴
rule|규칙|📏
tune|곡조|🎵
huge|거대한|🐳
mute|소리 없는|🤐
fuse|퓨즈|🔌
fume|연기|🌫️
dune|모래언덕|🏜️
prune|자두|🍑` },
  { id: 's1ee', step: 's1', title: '장모음 ee', sub: 'ee', emoji: '🐝', words: `
see|보다|👀
bee|벌|🐝
tree|나무|🌳
feet|발|👣
seed|씨앗|🌰
free|자유로운|🕊️
sleep|자다|😴
sheep|양|🐑
week|주|📅
meet|만나다|🤝
jeep|지프|🚙
deep|깊은|🌊
keep|지키다|🛡️
need|필요하다|🙏
cheek|볼|😊
queen|여왕|👑` },
  { id: 's1ea', step: 's1', title: '장모음 ea', sub: 'ea', emoji: '🍽️', words: `
eat|먹다|🍽️
read|읽다|📖
sea|바다|🌊
meat|고기|🍖
tea|차|🍵
beach|해변|🏖️
dream|꿈|💭
team|팀|👥
leaf|나뭇잎|🍃
peach|복숭아|🍑
teach|가르치다|🧑‍🏫
wheat|밀|🌾
speak|말하다|🗣️
steam|김이 나다|♨️
seal|물개|🦭
beans|콩|🫘` },
  { id: 's1y', step: 's1', title: 'y가 내는 소리', sub: 'y as long i / e', emoji: '🌤️', words: `
my|나의|🙋
sky|하늘|🌤️
fly|날다|🛫
shy|수줍은|😳
cry|울다|😭
try|시도하다|💪
dry|마른|☀️
why|왜|❓
baby|아기|👶
happy|행복한|😄
funny|웃긴|😆
candy|사탕|🍬
sunny|화창한|☀️
windy|바람 부는|🌬️
puppy|강아지|🐶
teddy|곰인형|🧸
city|도시|🏙️
party|파티|🎉` },
  { id: 's1oo', step: 's1', title: 'oo 두 가지 소리', sub: 'oo', emoji: '🌙', words: `
moon|달|🌙
book|책|📚
food|음식|🍞
look|보다|🔍
zoo|동물원|🦓
pool|수영장|🏊
cool|시원한|😎
soon|곧|⏳
boot|부츠|👢
room|방|🛋️
door|문|🚪
good|좋은|👍
wood|나무|🪵
foot|발|🦶
cook|요리하다|👨‍🍳
hook|갈고리|🪝
spoon|숟가락|🥄
balloon|풍선|🎈` },
  { id: 's1pairs', step: 's1', title: '짝 소리 (최소대립쌍)', sub: 'cap ↔ cape', emoji: '🅰️', words: `
mate|친구|🤝
rate|속도|📈
fate|운명|🎲
bate|식히다|🕊️
site|터전|🏗️
twine|끈|🧵
spine|척추|🦴
slim|날씬한|🤸
stare|빤히 보다|👀
fare|요금|🎫
here|여기|📍
glob|덩어리|🟡
hid|숨었다|🙈
rid|없애다|🧹
slid|미끄러졌다|🛝
made|만들었다|🔨
hate|싫어하다|😣
mane|갈기|🦁
bite|물다|🦷
dime|10센트|🪙
robe|가운|🧖
code|암호|🔐
quite|꽤|✨
rode|탔다|🎠
dote|사랑하다|💗
mope|침울하다|😔
cope|잘 지내다|💪` },

  /* ================= Step 2 · 자음군 · 이중자음 ================= */
  { id: 's2sh', step: 's2', title: 'sh', sub: 'sh', emoji: '🚢', words: `
ship|배|🚢
fish|물고기|🐟
shop|가게|🏪
wash|씻다|🧼
shell|조개껍질|🐚
shark|상어|🦈
brush|붓|🖌️
dish|접시|🍽️
push|밀다|👐
wish|소원|🌠
shoe|신발|👟
shower|샤워|🚿` },
  { id: 's2ch', step: 's2', title: 'ch', sub: 'ch', emoji: '💬', words: `
chat|수다 떨다|💬
chin|턱|🙂
lunch|점심|🍱
chair|의자|🪑
cheese|치즈|🧀
chick|병아리|🐤
church|교회|⛪
cherry|체리|🍒
catch|잡다|🧤
watch|시계|⌚
much|많은|🔢` },
  { id: 's2th', step: 's2', title: 'th', sub: 'th', emoji: '📏', words: `
this|이것|👉
bath|목욕|🫧
three|셋|3️⃣
thick|두꺼운|📚
tooth|이빨|🦷
mouth|입|👄
think|생각하다|🤔
thank|고마워하다|🙏
mother|엄마|👩
father|아빠|👨
brother|형·동생|👦
weather|날씨|🌦️
math|수학|➗
path|오솔길|🛤️` },
  { id: 's2wh', step: 's2', title: 'wh', sub: 'wh', emoji: '🐳', words: `
whale|고래|🐳
wheel|바퀴|🛞
white|하양|⚪
when|언제|⏰
where|어디|📍
what|무엇|❓
who|누구|👤
whip|채찍|🥢
whistle|호루라기|📢
whole|전체의|🔵` },
  { id: 's2ck', step: 's2', title: 'ck', sub: 'ck', emoji: '🦆', words: `
duck|오리|🦆
sock|양말|🧦
back|등|🎒
neck|목|🦒
kick|차다|🦵
lock|자물쇠|🔒
sick|아픈|🤒
pack|짐 싸다|🧳
snack|간식|🍪
brick|벽돌|🧱` },
  { id: 's2ng', step: 's2', title: 'ng', sub: 'ng', emoji: '👑', words: `
king|왕|👑
song|노래|🎵
ring|반지|💍
wing|날개|🪽
sing|노래하다|🎤
long|긴|📏
bang|쾅|💥
hang|걸다|🪝
thing|물건|📦
sting|쏘다|🐝` },
  { id: 's2bl', step: 's2', title: 'bl', sub: 'bl', emoji: '🔵', words: `
blue|파랑|🔵
black|검정|⚫
block|블록|🧱
blanket|담요|🛏️
blow|불다|🌬️
bloom|꽃피다|🌸
blouse|블라우스|👚
blush|얼굴 붉히다|😊` },
  { id: 's2cl', step: 's2', title: 'cl', sub: 'cl', emoji: '🕐', words: `
clock|시계|🕐
clay|점토|🏺
clean|깨끗한|🧼
climb|오르다|🧗
clown|광대|🤡
cloud|구름|☁️
club|클럽|🎪
class|수업|🏫` },
  { id: 's2fl', step: 's2', title: 'fl', sub: 'fl', emoji: '🚩', words: `
flag|깃발|🚩
flower|꽃|🌷
flame|불꽃|🔥
float|뜨다|🛟
floor|바닥|🧱
flood|홍수|🌊
flash|번쩍|⚡
flip|뒤집다|🔄` },
  { id: 's2gl', step: 's2', title: 'gl', sub: 'gl', emoji: '🥛', words: `
glass|유리|🥛
glove|장갑|🧤
glue|풀|🧴
glitter|반짝임|✨
glow|빛나다|🌟` },
  { id: 's2pl', step: 's2', title: 'pl', sub: 'pl', emoji: '🛩️', words: `
plane|비행기|🛩️
plant|식물|🪴
plus|더하기|➕
plum|자두|🍑
planet|행성|🪐
plastic|플라스틱|🧴
please|부디|🙏
playground|놀이터|🛝` },
  { id: 's2sl', step: 's2', title: 'sl', sub: 'sl', emoji: '🛷', words: `
sled|썰매|🛷
slow|느린|🐢
slip|미끄러지다|🧊
slam|쾅 닫다|🚪
slime|점액|🟢
slap|찰싹|👋
slice|조각|🍕
slipper|슬리퍼|🩴` },
  { id: 's2br', step: 's2', title: 'br', sub: 'br', emoji: '🟤', words: `
brown|갈색|🟤
bread|빵|🍞
bring|가져오다|🎁
branch|나뭇가지|🌿
brave|용감한|🦸
bridge|다리|🌉
breakfast|아침밥|🥣
broom|빗자루|🧹` },
  { id: 's2cr', step: 's2', title: 'cr', sub: 'cr', emoji: '🦀', words: `
crab|게|🦀
cross|건너다|🚸
crown|왕관|👑
cream|크림|🍦
crayon|크레용|🖍️
crawl|기다|🐛
crash|충돌|💥
crisp|바삭한|🥨` },
  { id: 's2dr', step: 's2', title: 'dr', sub: 'dr', emoji: '🥁', words: `
drum|북|🥁
dress|드레스|👗
drop|떨어뜨리다|💧
drive|운전하다|🚗
dragon|용|🐉
drawer|서랍|🗄️
drink|마시다|🥤
drama|연극|🎭` },
  { id: 's2fr', step: 's2', title: 'fr', sub: 'fr', emoji: '🐸', words: `
frog|개구리|🐸
friend|친구|🤝
fruit|과일|🍎
fresh|신선한|🥬
Friday|금요일|📅
frost|서리|❄️
freeze|얼다|🧊
front|앞|⬆️` },
  { id: 's2gr', step: 's2', title: 'gr', sub: 'gr', emoji: '🟢', words: `
green|초록|🟢
grass|풀|🌿
gray|회색|⬜
grandpa|할아버지|👴
group|무리|👥
grin|활짝 웃다|😁
grumpy|심술궂은|😤
growl|으르렁|🐻` },
  { id: 's2pr', step: 's2', title: 'pr', sub: 'pr', emoji: '🏆', words: `
prize|상|🏆
prince|왕자|🤴
print|인쇄하다|🖨️
press|누르다|👇
pretty|예쁜|💐
proud|자랑스러운|😌
pray|기도하다|🙏
price|가격|🏷️` },
  { id: 's2tr', step: 's2', title: 'tr', sub: 'tr', emoji: '🚂', words: `
train|기차|🚂
trip|여행|🧳
truck|트럭|🚚
true|사실의|✔️
track|길|🛤️
trash|쓰레기|🗑️
trumpet|트럼펫|🎺
tricky|까다로운|🌀` },
  { id: 's2sc', step: 's2', title: 'sc', sub: 'sc', emoji: '🧣', words: `
scarf|목도리|🧣
scale|저울|⚖️
score|점수|💯
scoop|국자|🍦
scooter|킥보드|🛴
scoot|질주하다|💨
scissors|가위|✂️` },
  { id: 's2sk', step: 's2', title: 'sk', sub: 'sk', emoji: '⛸️', words: `
skate|스케이트|⛸️
ski|스키|🎿
skill|기술|🛠️
skin|피부|🧴
skip|건너뛰다|🦘
skirt|치마|👗
sketch|그림|✏️` },
  { id: 's2sm', step: 's2', title: 'sm', sub: 'sm', emoji: '🐜', words: `
small|작은|🐜
smell|냄새|👃
smooth|매끄러운|🧴
smart|똑똑한|🧠
smash|부수다|💥` },
  { id: 's2sn', step: 's2', title: 'sn', sub: 'sn', emoji: '🐌', words: `
snail|달팽이|🐌
sneeze|재채기|🤧
sniff|킁킁|👃
snowman|눈사람|⛄
snore|코골이|😴` },
  { id: 's2sp', step: 's2', title: 'sp', sub: 'sp', emoji: '🕷️', words: `
spider|거미|🕷️
spin|돌다|🌀
sport|운동|⚽
space|우주|🚀
spend|쓰다|💸
spooky|으스스한|👻` },
  { id: 's2st', step: 's2', title: 'st', sub: 'st', emoji: '⭐', words: `
star|별|⭐
stop|멈추다|🛑
step|걸음|👟
best|최고|👍
stand|서다|🧍
stick|막대|🥢
storm|폭풍|🌪️
story|이야기|📖
stamp|도장|📮
stiff|뻣뻣한|🪵` },
  { id: 's2sw', step: 's2', title: 'sw', sub: 'sw', emoji: '🏊', words: `
swim|수영|🏊
sweet|달콤한|🍬
sweater|스웨터|🧶
swallow|삼키다|🐦
swan|백조|🦢
sweep|쓸다|🧹` },
  { id: 's2tw', step: 's2', title: 'tw', sub: 'tw', emoji: '👯', words: `
twist|비틀다|🌀
twelve|열둘|🔢
twinkle|반짝이다|🎇
tweet|지저귀다|🐤
twilight|황혼|🌆` },
  { id: 's2squ', step: 's2', title: 'squ', sub: 'squ', emoji: '🦑', words: `
squid|오징어|🦑
squash|호박|🎃
squeak|찍찍|🐭
squeeze|짜다|🍋
squirrel|다람쥐|🐿️
squad|팀|👥` },
  { id: 's2shr', step: 's2', title: 'shr', sub: 'shr', emoji: '🤷', words: `
shrug|어깨를 으쓱|🤷
shred|찢다|📄
shriek|비명|😱
shrub|관목|🌳` },

  /* ================= Step 3 · 이중모음 · 응용 ================= */
  { id: 's3ai', step: 's3', title: 'ai · ay', sub: 'ai · ay', emoji: '🌧️', words: `
rain|비|🌧️
play|놀다|⚽
day|날|📅
wait|기다리다|⏳
mail|편지|✉️
tail|꼬리|🐒
sail|돛|⛵
paint|칠하다|🎨
paid|지불했다|💵
may|5월|🌸
say|말하다|🗣️
stay|머물다|🏠
way|길|🛣️
today|오늘|📅
birthday|생일|🎂` },
  { id: 's3oa', step: 's3', title: 'oa · ow', sub: 'oa · ow', emoji: '⛵', words: `
boat|배|⛵
snow|눈|❄️
coat|코트|🧥
grow|자라다|🌱
road|길|🛣️
goat|염소|🐐
soap|비누|🧼
toast|토스트|🍞
bowl|그릇|🥣
window|창문|🪟
yellow|노랑|🟡
pillow|베개|🛏️
show|보여주다|👀
low|낮은|⬇️
crow|까마귀|🐦‍⬛
flow|흐르다|💧` },
  { id: 's3ou', step: 's3', title: 'ou · ow (아우)', sub: 'ou · ow', emoji: '🐭', words: `
mouse|쥐|🐭
house|집|🏠
count|세다|🔢
round|둥근|⭕
sound|소리|🔊
loud|시끄러운|📢
found|찾았다|🔍
out|밖으로|🚪
shout|외치다|🗣️
cow|소|🐄
down|아래로|⬇️
town|마을|🏘️
ground|땅|🌍
around|주위에|🔄` },
  { id: 's3oi', step: 's3', title: 'oi · oy', sub: 'oi · oy', emoji: '🪙', words: `
coin|동전|🪙
boy|소년|👦
toy|장난감|🧸
joy|기쁨|😄
oil|기름|🛢️
boil|끓다|🫖
point|가리키다|👉
noise|소음|📣
enjoy|즐기다|😋
royal|왕실의|👑
soil|흙|🟫
spoil|망치다|💔` },
  { id: 's3au', step: 's3', title: 'au · aw', sub: 'au · aw', emoji: '🍂', words: `
autumn|가을|🍂
audio|소리|🎧
August|8월|📅
pause|잠시 멈춤|⏸️
draw|그리다|✏️
saw|보았다|👁️
paw|발|🐾
lawn|잔디|🌱
yawn|하품|🥱
hawk|매|🦅
claw|발톱|🦞
awful|끔찍한|😖` },
  { id: 's3ew', step: 's3', title: 'ew · ue', sub: 'ew · ue', emoji: '✨', words: `
new|새로운|✨
few|몇 개|🔢
dew|이슬|💧
grew|자랐다|🌱
chew|씹다|😋
stew|스튜|🍲
clue|단서|🔍
value|가치|💎
rescue|구조하다|🚑
argue|다투다|😠
view|경치|🏞️
flew|날았다|🕊️` },
  { id: 's3igh', step: 's3', title: 'igh', sub: 'igh', emoji: '💡', words: `
light|빛|💡
night|밤|🌙
right|오른쪽|👉
high|높은|⬆️
bright|밝은|✨
fight|싸우다|🥊
tight|꽉 끼는|🎽
might|~일지도|🤔
sigh|한숨|😮‍💨
flight|비행|✈️
sight|시야|👁️
delight|기쁨|😊` },
  { id: 's3ar', step: 's3', title: 'ar', sub: 'ar', emoji: '🚗', words: `
car|자동차|🚗
farm|농장|🚜
park|공원|🏞️
arm|팔|💪
hard|단단한|🪨
card|카드|🃏
barn|헛간|🏚️
dark|어두운|🌑
yard|마당|🏡
far|멀리|🔭
jar|병|🫙` },
  { id: 's3or', step: 's3', title: 'or', sub: 'or', emoji: '🍴', words: `
fork|포크|🍴
horse|말|🐴
corn|옥수수|🌽
short|짧은|🩳
horn|뿔|📯
sort|분류하다|🗂️
north|북쪽|🧭
cord|끈|🧵
stork|황새|🐦
born|태어난|👶
torch|횃불|🔥
porch|현관|🚪` },
  { id: 's3er', step: 's3', title: 'er · ir · ur', sub: 'er · ir · ur', emoji: '🐦', words: `
bird|새|🐦
girl|소녀|👧
turn|돌다|🔄
her|그녀의|👩
fern|고사리|🌿
germ|세균|🦠
shirt|셔츠|👕
first|첫째|1️⃣
third|셋째|3️⃣
hurt|다치다|🤕
fur|털|🐈
nurse|간호사|👩‍⚕️
curl|곱슬|🌀
purple|보라|🟣
burn|타다|🔥
stir|젓다|🥄` },
  { id: 's3air', step: 's3', title: 'air · ear · eer', sub: 'air · ear · eer', emoji: '💇', words: `
hair|머리카락|💇
pair|한 쌍|👯
fair|공정한|⚖️
stair|계단|🪜
air|공기|💨
ear|귀|👂
near|가까운|📍
hear|듣다|👂
dear|사랑하는|💕
year|년|📅
clear|맑은|☀️
deer|사슴|🦌
cheer|응원|📣
beard|수염|🧔
fear|두려움|😨
tear|눈물|💧` },
  { id: 's3ore', step: 's3', title: 'ore · are', sub: 'ore · are', emoji: '🏪', words: `
more|더|👆
store|가게|🏪
shore|해안|🏖️
before|전에|⏮️
care|돌봄|💗
share|나누다|🤝
square|정사각형|⬛
scare|겁주다|👻
mare|암말|🐎
bare|벌거벗은|🦶
core|핵심|🎯
wore|입었다|👕` },
  { id: 's3our', step: 's3', title: 'oor · our', sub: 'oor · our', emoji: '🥺', words: `
poor|가난한|🥺
tour|여행|🧭
four|넷|4️⃣
pour|붓다|🫗
your|너의|🫵
hour|시간|⏰
sour|신맛|🍋
flour|밀가루|🌾
court|법정|⚖️
mourn|슬퍼하다|🖤` },
  { id: 's3ie', step: 's3', title: 'ie', sub: 'ie', emoji: '🥧', words: `
pie|파이|🥧
tie|넥타이|👔
lie|눕다|🛌
field|들판|🌾
shield|방패|🛡️
piece|조각|🧩` },

  /* ================= Step 4 · 심화 ================= */
  { id: 's4str', step: 's4', title: 'str', sub: 'str', emoji: '🛣️', words: `
street|거리|🛣️
strong|강한|💪
spring|봄|🌸
straw|빨대|🥤
string|끈|🧵
stripe|줄무늬|🦓
straight|곧은|📏
stress|긴장|😰` },
  { id: 's4spr', step: 's4', title: 'spr', sub: 'spr', emoji: '🌱', words: `
spray|분무기|🧴
sprout|새싹|🌱
sprint|전력 질주|🏃
spread|펼치다|🧈
sprinkle|뿌리다|✨` },
  { id: 's4scr', step: 's4', title: 'scr', sub: 'scr', emoji: '😱', words: `
scream|소리치다|😱
scrub|문지르다|🧽
screen|화면|📺
scratch|긁다|🐈
screw|나사|🔩
scribble|낙서|✏️
scrap|조각|🗑️` },
  { id: 's4spl', step: 's4', title: 'spl', sub: 'spl', emoji: '💦', words: `
splash|첨벙|💦
split|쪼개다|✂️
splatter|튀기다|🎨
splint|부목|🩹` },
  { id: 's4thr', step: 's4', title: 'thr', sub: 'thr', emoji: '🤾', words: `
throw|던지다|🤾
thread|실|🧵
shrimp|새우|🦐
shrink|줄어들다|🔻
throat|목구멍|🗣️
thrill|짜릿함|🎢` },
  { id: 's4ph', step: 's4', title: 'ph', sub: 'ph', emoji: '📱', words: `
phone|전화|📱
photo|사진|📷
graph|그래프|📊
dolphin|돌고래|🐬
elephant|코끼리|🐘
trophy|트로피|🏆
phantom|유령|👻
nephew|조카|👦` },
  { id: 's4silent', step: 's4', title: '묵음 글자 (kn · wr · mb)', sub: 'silent letters', emoji: '🤫', words: `
knee|무릎|🦵
write|쓰다|✍️
know|알다|💡
knife|칼|🔪
knock|노크|🚪
wrong|틀린|❌
wrist|손목|⌚
lamb|새끼 양|🐑
thumb|엄지|👍
comb|빗|💈
sign|표지판|🪧
half|반|➗` },
  { id: 's4ing', step: 's4', title: '-ing', sub: '-ing', emoji: '🦘', words: `
jumping|뛰는|🦘
running|달리는|🏃
eating|먹는|🍽️
sleeping|자는|😴
singing|노래하는|🎤
dancing|춤추는|💃
swimming|수영하는|🏊
drawing|그리는|✏️
painting|그림 그리기|🎨` },
  { id: 's4ed', step: 's4', title: '-ed', sub: '-ed', emoji: '🚶', words: `
walked|걸었다|🚶
played|놀았다|⚽
jumped|뛰었다|🦘
looked|보았다|👀
helped|도왔다|🤝
stopped|멈췄다|🛑
painted|칠했다|🎨
started|시작했다|🚦` },
  { id: 's4tion', step: 's4', title: '-tion · -sion', sub: '-tion', emoji: '🧭', words: `
action|행동|🏃
station|역|🚉
motion|움직임|↔️
nation|나라|🌍
question|질문|❓
direction|방향|🧭
division|나눗셈|➗
vision|시력|👁️` },
  { id: 's4ture', step: 's4', title: '-ture', sub: '-ture', emoji: '🖼️', words: `
picture|그림|🖼️
nature|자연|🌳
future|미래|🚀
capture|붙잡다|📸
mixture|혼합|🥣
creature|생물|🐾` },
  { id: 's4ly', step: 's4', title: '-ly', sub: '-ly', emoji: '🏃', words: `
quickly|빠르게|🏃
slowly|느리게|🐢
loudly|크게|📢
quietly|조용히|🤫
happily|행복하게|😄
softly|부드럽게|🪶
badly|심하게|🤕
kindly|친절하게|❤️` },
  { id: 's4ful', step: 's4', title: '-ful · -less', sub: '-ful · -less', emoji: '🧺', words: `
helpful|도움이 되는|🤝
careful|조심스러운|⚠️
beautiful|아름다운|🌸
wonderful|멋진|✨
colorful|알록달록한|🌈
careless|부주의한|😅
hopeless|가망없는|😞
endless|끝없는|♾️` },
  { id: 's4comp', step: 's4', title: '합성어', sub: 'compound', emoji: '🌈', words: `
rainbow|무지개|🌈
sunflower|해바라기|🌻
butterfly|나비|🦋
football|축구|🏈
bedroom|침실|🛏️
bathroom|욕실|🛁
notebook|공책|📓
cupcake|컵케이크|🧁
flashlight|손전등|🔦
sandbox|모래놀이터|🏖️` },
  { id: 's4un', step: 's4', title: 'un- · re-', sub: 'prefix', emoji: '🔄', words: `
unhappy|불행한|😞
unkind|불친절한|😒
unsafe|위험한|⚠️
unfair|불공평한|⚖️
replay|다시 재생|🔁
return|돌아오다|↩️
restart|다시 시작|🔄
rebuild|다시 짓다|🏗️
rewrite|다시 쓰다|📝
remove|치우다|🧹` },
  { id: 's4long', step: 's4', title: '긴 단어', sub: 'long words', emoji: '🦕', words: `
dinosaur|공룡|🦕
computer|컴퓨터|💻
umbrella|우산|☂️
holiday|휴일|🎉
family|가족|👨‍👩‍👧
together|함께|🤝
important|중요한|⭐
different|다른|🔀
remember|기억하다|🧠
yesterday|어제|📆` },
  { id: 's4tricky', step: 's4', title: '철자 주의 단어', sub: 'tricky words', emoji: '🧩', words: `
because|왜냐하면|💡
people|사람들|👥
could|~할 수 있었다|💭
would|~할 것이다|🔮
should|~해야 한다|✅
their|그들의|👥
there|거기에|📍
again|다시|🔁
always|언제나|♾️
never|절대 ~않다|🚫` },
  { id: 's4double', step: 's4', title: '겹자음', sub: 'double letters', emoji: '🐰', words: `
rabbit|토끼|🐰
dinner|저녁 식사|🍽️
letter|편지|✉️
summer|여름|☀️
winter|겨울|❄️
button|단추|🔘` },
  { id: 's4cmp', step: 's4', title: '-er · -est 비교', sub: 'comparatives', emoji: '📈', words: `
bigger|더 큰|🐘
faster|더 빠른|🏎️
taller|더 키 큰|🦒
smaller|더 작은|🐜
colder|더 추운|🥶
warmer|더 따뜻한|🌤️
loudest|가장 시끄러운|📢
fastest|가장 빠른|⚡` },
  { id: 's4ness', step: 's4', title: '-ness · -ment', sub: 'suffix', emoji: '💗', words: `
kindness|친절|💗
sadness|슬픔|😢
darkness|어둠|🌑
happiness|행복|😊
movement|움직임|🏃
payment|지불|💳
feeling|느낌|💭
building|건물|🏢` },
  { id: 's4ous', step: 's4', title: '-ous', sub: '-ous', emoji: '🌟', words: `
famous|유명한|🌟
dangerous|위험한|⚠️
curious|궁금한|🔍
delicious|맛있는|😋
nervous|긴장한|😬
serious|진지한|🧐` },
  { id: 's4al', step: 's4', title: '-al', sub: '-al', emoji: '🏥', words: `
animal|동물|🐾
hospital|병원|🏥
capital|수도|🏙️
festival|축제|🎪
final|마지막|🏁
normal|보통의|➖` },
  { id: 's4ic', step: 's4', title: '-ic', sub: '-ic', emoji: '🎵', words: `
magic|마법|✨
music|음악|🎵
picnic|소풍|🧺
topic|주제|💬
comic|만화|📚
public|공공의|🏛️` },
  { id: 's4le', step: 's4', title: '-le', sub: '-le', emoji: '🍎', words: `
apple|사과|🍎
little|작은|🐜
bottle|병|🍼
turtle|거북이|🐢
candle|양초|🕯️
puzzle|퍼즐|🧩
circle|동그라미|⭕
middle|가운데|🎯` },
  { id: 's4y', step: 's4', title: '-y 형용사', sub: 'weather words', emoji: '🌧️', words: `
cloudy|흐린|☁️
snowy|눈 오는|🌨️
rainy|비 오는|🌧️
sleepy|졸린|😴
hungry|배고픈|🍽️
thirsty|목마른|🥤
dirty|더러운|🧦
angry|화난|😠
lucky|운 좋은|🍀
messy|어지러운|🌀` },
  { id: 's4er2', step: 's4', title: '-er (사람)', sub: '-er', emoji: '🧑‍🏫', words: `
teacher|선생님|🧑‍🏫
farmer|농부|👨‍🌾
singer|가수|🎤
dancer|무용수|💃
driver|운전사|🚗
worker|일꾼|🛠️
painter|화가|🎨
player|선수|⚽` },
  { id: 's4school', step: 's4', title: '학교 낱말', sub: 'school', emoji: '🏫', words: `
school|학교|🏫
student|학생|🧑‍🎓
pencil|연필|✏️
eraser|지우개|🧽
ruler|자|📏
backpack|책가방|🎒
homework|숙제|📓
classroom|교실|🏫` },
  { id: 's4season', step: 's4', title: '달 · 계절', sub: 'months', emoji: '📅', words: `
season|계절|🍂
January|1월|📅
February|2월|❄️
March|3월|🌱
April|4월|🌷
June|6월|☀️
July|7월|🏖️
September|9월|🍁` },
  { id: 's4day', step: 's4', title: '요일 · 하루', sub: 'days', emoji: '🗓️', words: `
Monday|월요일|🗓️
Tuesday|화요일|🗓️
Wednesday|수요일|🗓️
Thursday|목요일|🗓️
Saturday|토요일|🗓️
Sunday|일요일|🗓️
morning|아침|🌅
evening|저녁|🌆` },
  { id: 's4mood', step: 's4', title: '성격 · 기분', sub: 'feelings', emoji: '😊', words: `
honest|정직한|🙌
gentle|온순한|🕊️
polite|예의 바른|🙇
cheerful|쾌활한|😄
friendly|친절한|🤝
quiet|조용한|🤫
noisy|시끄러운|📣
busy|바쁜|🐝
tired|피곤한|😪
excited|신난|🤩` }
];

/* 유닛 목록 → 단어 평면 목록 (id 중복은 앞에 나온 유닛을 남깁니다) */
(function () {
  const seen = new Set(); const words = [];
  EN_UNIT_LIST.forEach(u => {
    u.raw = u.words || '';
    u.count = 0;
    u.raw.split('\n').forEach(line => {
      const t = line.trim(); if (!t) return;
      const p = t.split('|');
      const w0 = (p[0] || '').trim(); if (!w0) return;
      const id = w0.toLowerCase().replace(/[^a-z']/g, '');
      if (!id || seen.has(id)) return;
      seen.add(id);
      words.push({
        id: id, w: w0, ko: (p[1] || '').trim(), emoji: (p[2] || '🔤').trim(),
        step: u.step, u: u.id, f: u.title
      });
      u.count++;
    });
  });
  window.EN_UNITS = EN_UNIT_LIST.map(u => ({ id: u.id, step: u.step, title: u.title, sub: u.sub, emoji: u.emoji, count: u.count }));
  window.EN_UNIT_BY_ID = Object.fromEntries(EN_UNITS.map(u => [u.id, u]));
  window.EN_WORDS = words;
  window.EN_WORD_BY_ID = Object.fromEntries(words.map(w => [w.id, w]));
  window.EN_STEPS.forEach(s => { s.count = words.filter(w => w.step === s.id).length; });
})();

/* 최소대립쌍 — 단모음 ↔ 매직 e (두 낱말 모두 단어 목록에 있어요) */
window.EN_PAIRS = ('cap/cape, tap/tape, mat/mate, rat/rate, fat/fate, bat/bate, ' +
  'pin/pine, kit/kite, sit/site, twin/twine, spin/spine, slim/slime, hid/hide, rid/ride, slid/slide, ' +
  'hop/hope, not/note, dot/dote, mop/mope, cop/cope, ' +
  'cub/cube, tub/tube, cut/cute, rob/robe, cod/code, rod/rode, mad/made, hat/hate, man/mane, bit/bite, dim/dime, quit/quite, ' +
  'star/stare, far/fare, her/here, glob/globe, plan/plane')
  .split(',').map(s => s.trim().split('/'));

(function () {
  const seen = new Set();
  window.EN_PAIR_LIST = EN_PAIRS.filter(p => {
    if (!p || p.length !== 2) return false;
    if (!EN_WORD_BY_ID[p[0]] || !EN_WORD_BY_ID[p[1]]) return false;
    const k = p.join('/');
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
  EN_PAIR_LIST.forEach(p => {
    const a = EN_WORD_BY_ID[p[0]], b = EN_WORD_BY_ID[p[1]];
    a.pair = b.id; b.alt = a.id;
  });
})();

/* 그림 속 단어 뜻 보기용 사전 (리더스에서 쓰는 쉬운 낱말 포함) */
window.EN_DICT = {
  a: '하나의', an: '하나의', and: '그리고', are: '~이다', at: '~에', be: '~이다',
  big: '큰', brave: '용감한', by: '~옆에', can: '~할 수 있다', catch: '잡다',
  come: '오다', cool: '멋진', day: '날', do: '하다', down: '아래로', fast: '빠른',
  fire: '불', five: '다섯', fly: '날다', for: '~를 위해', from: '~로부터', fun: '재미있는',
  get: '얻다', give: '주다', go: '가다', good: '좋은', great: '훌륭한', help: '돕다',
  hero: '영웅', high: '높은', his: '그의', home: '집', hop: '깡충 뛰다', hot: '뜨거운',
  how: '어떻게', i: '나', in: '~안에', is: '~이다', it: '그것', jump: '뛰다',
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
  says: '말한다', said: '말했다', them: '그들을', their: '그들의', whole: '전체의', every: '모든',
  machine: '기계', engine: '엔진', broken: '고장난', screw: '나사', wrench: '렌치',
  build: '짓다', crew: '대원', night: '밤', fist: '주먹', stone: '돌', win: '이기다',
  sky: '하늘', hold: '잡다', together: '함께', spin: '돌다', bright: '밝은', line: '선',
  wheel: '바퀴', shine: '빛나다', wind: '바람', thread: '실', trick: '묘기',
  turn: '돌다', shape: '모양', changing: '바뀌는', rescue: '구조', sea: '바다',
  sound: '소리', heavy: '무거운', light: '빛', dark: '어두운', warm: '따뜻한',
  road: '길', slow: '느린', again: '다시', always: '언제나', never: '절대',
  he: '그는', her: '그녀의', him: '그를', here: '여기', there: '거기에', its: '그것의',
  our: '우리의', them2: '그들을', were: '~이었다', was: '~이었다', has: '가진다', have: '가진다',
  had: '가졌다', does: '~한다', did: '했다', been: '~이었다', being: '있는', can_t: '~할 수 없다',
  will_not: '~하지 않을 것이다', dont: '~하지 마', some: '몇몇', any: '어떤', all: '모두',
  each: '각각', other: '다른', another: '또 다른', more: '더', most: '가장',
  just: '그냥', only: '오직', also: '또한', still: '아직', yet: '아직', ever: '언젠가',
  before: '전에', after: '후에', around: '주위에', through: '통과하여', between: '사이에',
  under: '아래에', over: '위에', into: '~속으로', onto: '~위로', off: '떨어져',
  back: '뒤로', away: '멀리', near: '가까이', far: '멀리', beside: '옆에',
  but: '그러나', or: '또는', because: '왜냐하면', if: '만약', then: '그러면', than: '보다',
  who2: '누구', which: '어느', whose: '누구의', why: '왜', how2: '어떻게',
  one2: '하나', two2: '둘', three2: '셋', four2: '넷', six: '여섯', seven: '일곱',
  eight: '여덟', nine: '아홉', ten2: '열', first: '첫째', last: '마지막', next: '다음',
  ready: '준비된', kind: '친절한', nice: '좋은', bad: '나쁜', old: '오래된', young: '어린',
  happy: '행복한', sad: '슬픈', tired: '피곤한', hungry: '배고픈', sleepy: '졸린',
  afraid: '무서워하는', sorry: '미안한', hello: '안녕', hi: '안녕', goodbye: '잘 가',
  today: '오늘', tomorrow: '내일', morning: '아침', evening: '저녁', time: '시간',
  way: '길', friend: '친구', family: '가족', mother: '엄마', father: '아빠',
  brother: '형제', sister: '자매', baby: '아기', child: '아이', children: '아이들',
  people: '사람들', everyone: '모두', something: '무언가', nothing: '아무것도',
  everything: '모든 것', someone: '누군가', where2: '어디', please2: '부디', thank: '고마워'
};

/* =====================================================================
   사이트 워드 (Sight Words) — Dolch 220 + 명사 낱말, 레벨(묶음)별 탐색
   '낱말|뜻|예문|그림(생략 가능)'
   ===================================================================== */
window.EN_SIGHT_LEVELS = [
  { id: 'sw1', tag: 'Lv.1', title: '첫 낱말', sub: 'Pre-K' },
  { id: 'sw2', tag: 'Lv.2', title: '유치원', sub: 'Kindergarten' },
  { id: 'sw3', tag: 'Lv.3', title: '1학년', sub: 'Grade 1' },
  { id: 'sw4', tag: 'Lv.4', title: '2학년', sub: 'Grade 2' },
  { id: 'sw5', tag: 'Lv.5', title: '3학년', sub: 'Grade 3' },
  { id: 'sw6', tag: 'Lv.6', title: '명사 낱말', sub: 'Nouns' }
];

window.EN_SIGHT_LIST = [
  { id: 'sw1', words: `
a|하나의|a cat|1️⃣
and|그리고|mom and dad|➕
away|멀리|go away|👋
big|큰|a big dog|🐘
blue|파란|a blue car|🔵
can|~할 수 있어요|I can run|💪
come|오다|come here|🚶
down|아래로|sit down|⬇️
find|찾다|find the ball|🔍
for|~를 위해|a gift for you|🎁
funny|웃긴|a funny cat|😄
go|가다|go, go, go!|🚦
help|돕다|help me|🤝
here|여기|I am here|📍
I|나|I am happy|🙋
in|~안에|in the box|📥
is|~이에요|he is big|🟰
it|그것|it is mine|📦
jump|뛰다|jump high|🦘
little|작은|a little dog|🐶
look|보다|look at me|🔎
make|만들다|make a cake|🎂
me|나를|look at me|🫵
my|나의|my hat|🙋
not|아니|not now|❌
one|하나|one cat|1️⃣
play|놀다|play with me|⚽
red|빨간|a red ball|🔴
run|달리다|run fast|🏃
said|말했다|he said hi|🗣️
see|보다|I see you|👀
the|그|the sun|📖
three|셋|three cats|3️⃣
to|~로|go to school|➡️
two|둘|two dogs|2️⃣
up|위로|look up|⬆️
we|우리는|we can go|🧑‍🤝‍🧑
where|어디|where is it?|❓
yellow|노란|a yellow car|🟡
you|너|you and me|🫵` },
  { id: 'sw2', words: `
all|모두|all of us|🌐
am|~이에요|I am here|🟰
are|~이에요|we are here|👨‍👩‍👧
at|~에|at home|📍
ate|먹었다|I ate cake|🍰
be|~이다|be kind|🌟
black|검정|a black cat|⚫
brown|갈색|a brown bear|🐻
but|그러나|small but strong|↔️
came|왔다|he came home|🚶
did|했다|I did it|✅
do|하다|do your best|💪
eat|먹다|eat lunch|🍽️
four|넷|four cars|4️⃣
get|얻다|get a star|⭐
good|좋은|good job|👍
have|가지다|I have a dog|🤲
he|그는|he is here|👦
into|~속으로|into the box|📥
like|좋아하다|I like cake|❤️
must|~해야 한다|you must go|❗
new|새로운|a new car|✨
no|아니|no, thank you|🙅
now|지금|do it now|⏰
on|~위에|on the table|⬆️
our|우리의|our house|🏠
out|밖으로|go out|🚪
please|부디|help me, please|🙏
pretty|예쁜|a pretty flower|💐
ran|달렸다|he ran fast|🏃
ride|타다|ride a bike|🚲
saw|보았다|I saw a bird|👁️
say|말하다|say hello|🗣️
she|그녀는|she can sing|👧
so|그래서|so good|➡️
soon|곧|see you soon|⏳
that|저것|that is my hat|👈
there|거기에|over there|📍
they|그들은|they are here|👥
this|이것|this is my bag|👉
too|또한|me too|➕
under|아래에|under the bed|⬇️
want|원하다|I want water|🙏
was|~이었다|it was fun|📆
well|잘|well done|👍
went|갔다|we went home|🚶
what|무엇|what is it?|❓
white|하양|a white cloud|⚪
who|누구|who is it?|👤
will|~할 것이다|I will go|🔮
with|~와 함께|with my friend|🤝
yes|네|yes, I can|✅` },
  { id: 'sw3', words: `
after|후에|after lunch|⏭️
again|다시|try again|🔁
an|하나의|an apple|1️⃣
any|어떤|any time|🕐
as|~처럼|as big as me|🟰
ask|묻다|ask a friend|❓
by|~옆에|by the door|📍
could|~할 수 있었다|I could run|💭
every|모든|every day|📅
fly|날다|fly high|🛫
from|~로부터|from school|🏫
give|주다|give me five|🤚
going|가는 중|I am going home|🚶
had|가졌다|I had fun|🎉
has|가진다|she has a cat|🐱
her|그녀의|her hat|👩
him|그를|help him|👦
his|그의|his bike|🚲
how|어떻게|how are you?|❔
just|그냥|just one|1️⃣
know|알다|I know it|💡
let|~하게 하다|let me go|🙌
live|살다|I live here|🏠
may|~해도 된다|may I go?|🙋
of|~의|a cup of milk|🥛
old|오래된|an old car|🚗
once|한 번|once a day|1️⃣
open|열다|open the door|🔓
over|위에|over the hill|⛰️
put|놓다|put it here|📥
round|둥근|a round ball|⚽
some|몇몇|some milk|🥛
stop|멈추다|stop here|🛑
take|가져가다|take this|🤲
thank|고마워하다|thank you|🙏
them|그들을|help them|👥
then|그때|then we go|➡️
think|생각하다|think again|🤔
walk|걷다|walk with me|🚶
were|~이었다|we were there|📆
when|언제|when is it?|⏰` },
  { id: 'sw4', words: `
always|언제나|always smile|♾️
around|주위에|look around|🔄
because|왜냐하면|because I like it|💡
been|~이었다|I have been here|✅
before|전에|before lunch|⏮️
best|최고|my best friend|🏆
both|둘 다|both hands|🙌
buy|사다|buy a toy|🛒
call|부르다|call me|📞
cold|추운|cold water|🥶
does|~한다|he does it|✅
don't|~하지 마|don't run|🚫
fast|빠른|a fast car|🏎️
first|첫째|first day|1️⃣
five|다섯|five stars|5️⃣
found|찾았다|I found it|🔍
gave|주었다|he gave me a pen|🎁
goes|간다|she goes home|🚶
green|초록|green grass|🟢
its|그것의|its tail|🐕
made|만들었다|I made a cake|🎂
many|많은|many friends|👥
off|떨어져|turn it off|🔌
or|또는|red or blue|↔️
pull|당기다|pull the rope|🪢
read|읽다|read a book|📖
right|맞는|right here|✅
sing|노래하다|sing a song|🎤
sit|앉다|sit down|🪑
sleep|자다|sleep well|😴
tell|말하다|tell me|🗣️
their|그들의|their house|🏠
these|이것들|these shoes|👟
those|저것들|those birds|🐦
upon|~위에|once upon a time|📖
us|우리를|play with us|👥
use|사용하다|use a pencil|✏️
very|아주|very big|🐘
wash|씻다|wash your hands|🧼
which|어느|which one?|❓
why|왜|why not?|❔
wish|소원|make a wish|🌠
work|일하다|I work hard|💼
would|~할 것이다|I would go|🔮
write|쓰다|write your name|✍️
your|너의|your bag|🎒` },
  { id: 'sw5', words: `
about|~에 대해|a book about cars|📖
better|더 좋은|feel better|👍
bring|가져오다|bring water|🎁
carry|나르다|carry the box|📦
clean|깨끗한|clean room|🧼
cut|자르다|cut the paper|✂️
done|끝난|all done|✅
draw|그리다|draw a cat|✏️
drink|마시다|drink water|🥤
eight|여덟|eight legs|8️⃣
fall|넘어지다|don't fall|🍂
far|멀리|far away|🔭
full|가득 찬|full of water|🫗
got|얻었다|I got a star|⭐
grow|자라다|grow up|🌱
hold|잡다|hold my hand|🤲
hot|뜨거운|hot soup|🔥
hurt|다치다|it may hurt|🤕
if|만약|if you can|❓
keep|지키다|keep going|🛡️
kind|친절한|be kind|❤️
laugh|웃다|laugh out loud|😂
light|빛|turn on the light|💡
long|긴|a long road|📏
much|많은|too much|🔢
myself|나 자신|by myself|🙋
never|절대 ~않다|never stop|🚫
only|오직|only one|1️⃣
own|자기 자신의|my own room|🏠
pick|고르다|pick one|👉
seven|일곱|seven days|7️⃣
shall|~할 것이다|shall we go?|🙋
show|보여주다|show me|👀
six|여섯|six eggs|6️⃣
small|작은|a small bug|🐜
start|시작하다|start now|🚦
ten|열|ten cars|🔟
today|오늘|today is fun|📅
together|함께|play together|🤝
try|시도하다|try again|💪
warm|따뜻한|warm coat|☀️` },
  { id: 'sw6', words: `
apple|사과|a red apple|🍎
baby|아기|a baby cat|👶
back|등|my back|🎒
ball|공|a blue ball|⚽
bear|곰|a brown bear|🐻
bed|침대|in bed|🛏️
bell|종|ring the bell|🔔
bird|새|a small bird|🐦
birthday|생일|happy birthday|🎂
boat|배|a toy boat|⛵
box|상자|a big box|📦
boy|소년|a tall boy|👦
bread|빵|fresh bread|🍞
brother|형제|my brother|👦
cake|케이크|a cake|🍰
car|자동차|a red car|🚗
cat|고양이|my cat|🐱
chair|의자|sit on a chair|🪑
chicken|닭|little chicken|🐔
coat|코트|a warm coat|🧥
corn|옥수수|sweet corn|🌽
cow|소|a big cow|🐄
day|날|a sunny day|📅
dog|개|my dog|🐶
doll|인형|a small doll|🪆
door|문|open the door|🚪
duck|오리|a yellow duck|🦆
egg|달걀|an egg|🥚
eye|눈|one eye|👁️
farm|농장|on the farm|🚜
farmer|농부|the farmer|👨‍🌾
father|아빠|my father|👨
feet|발|two feet|👣
fire|불|a small fire|🔥
fish|물고기|a red fish|🐟
floor|바닥|on the floor|🧱
flower|꽃|a pretty flower|🌷
game|게임|a fun game|🎮
garden|정원|in the garden|🌳
girl|소녀|a happy girl|👧
goodbye|잘 가|goodbye, friend|👋
grass|풀|green grass|🌿
ground|땅|on the ground|🌍
hand|손|my hand|✋
head|머리|my head|🧠
hill|언덕|up the hill|⛰️
home|집|go home|🏠
horse|말|a brown horse|🐴
house|집|a big house|🏠
kitty|고양이|a little kitty|🐱
leg|다리|my leg|🦵
letter|편지|a letter|✉️
man|남자|a tall man|👨
milk|우유|cold milk|🥛
money|돈|some money|💵
morning|아침|good morning|🌅
mother|엄마|my mother|👩
name|이름|my name|🏷️
nest|둥지|a bird's nest|🪺
night|밤|good night|🌙
paper|종이|a paper|📄
party|파티|a fun party|🎉
picture|그림|a picture|🖼️
pig|돼지|a pink pig|🐷
rabbit|토끼|a white rabbit|🐰
rain|비|cold rain|🌧️
ring|반지|a gold ring|💍
school|학교|go to school|🏫
seed|씨앗|a small seed|🌰
sheep|양|a white sheep|🐑
shoe|신발|one shoe|👟
sister|자매|my sister|👧
snow|눈|white snow|❄️
song|노래|a happy song|🎵
squirrel|다람쥐|a squirrel|🐿️
stick|막대|a long stick|🥢
street|거리|on the street|🛣️
sun|해|the sun|☀️
table|탁자|on the table|🪑
thing|물건|one thing|📦
time|시간|it is time|⏰
top|꼭대기|on top|⛰️
toy|장난감|a new toy|🧸
tree|나무|a tall tree|🌳
watch|시계|my watch|⌚
water|물|cold water|💧
way|길|this way|🛣️
wind|바람|cold wind|🌬️
window|창문|a big window|🪟
wood|나무|a bit of wood|🪵` }
];

(function () {
  const seen = new Set(); const list = [];
  const lvOf = {};
  EN_SIGHT_LIST.forEach(lv => {
    String(lv.words || '').split('\n').forEach(line => {
      const t = line.trim(); if (!t) return;
      const p = t.split('|');
      const w0 = (p[0] || '').trim(); if (!w0) return;
      const id = w0.toLowerCase().replace(/[^a-z']/g, '');
      if (!id || seen.has(id)) return;
      seen.add(id);
      list.push({ id: id, w: w0, ko: (p[1] || '').trim(), ex: (p[2] || '').trim(), emoji: (p[3] || '⭐').trim(), level: lv.id });
      lvOf[lv.id] = (lvOf[lv.id] || 0) + 1;
    });
  });
  EN_SIGHT_LEVELS.forEach(l => { l.count = lvOf[l.id] || 0; });
  window.EN_SIGHT = list;
  window.EN_SIGHT_BY_ID = Object.fromEntries(list.map(w => [w.id, w]));
})();

/* =====================================================================
   소리 듣고 고르기 퀴즈 — 원어민 발음(en-US)을 듣고 알맞은 카드 고르기
   · round 'pair'  : 단모음 ↔ 장모음 최소대립쌍(cap↔cape …)
   · round 's1'~'s4': 유닛별 · 단계별 단어 구별
   · round 'sight' : 사이트 워드 찾기
   문제는 데이터에서 자동으로 만들어 집니다(같은 낱말이 한 문제에 두 번 나오지 않게).
   ===================================================================== */
window.EN_QUIZ_ROUNDS = [
  { id: 'pair',  tag: '짝 소리', title: '최소대립쌍', sub: 'cap vs cape',  emoji: '🅰️', size: 2 },
  { id: 's1',    tag: 'Step 1',  title: '단모음 · 장모음',  sub: 'cat · cake',   emoji: '🔤', size: 4 },
  { id: 's2',    tag: 'Step 2',  title: '자음군 · 이중자음', sub: 'ship · shop',  emoji: '🔠', size: 4 },
  { id: 's3',    tag: 'Step 3',  title: '이중모음 · 응용',  sub: 'rain · boat',  emoji: '🌈', size: 4 },
  { id: 's4',    tag: 'Step 4',  title: '심화 · 긴 단어',   sub: 'street · scream', emoji: '🚀', size: 4 },
  { id: 'sight', tag: '사이트 워드', title: '찾기 놀이', sub: 'the · is · can', emoji: '⭐', size: 4 }
];
window.EN_QUIZ_ROUND_BY_ID = Object.fromEntries(EN_QUIZ_ROUNDS.map(r => [r.id, r]));

(function () {
  const Q = [];
  const push = q => { if (!q.choices || q.choices.length < 2) return; Q.push(q); };

  /* 1) 최소대립쌍 — 두 낱말 2지선다 */
  EN_PAIR_LIST.forEach(p => {
    const a = EN_WORD_BY_ID[p[0]], b = EN_WORD_BY_ID[p[1]];
    if (!a || !b) return;
    push({ id: 'pq-' + a.id, round: 'pair', unit: 'pair', kind: 'words', ans: a.id, choices: [a.id, b.id], cue: a.pair ? a.w + ' ↔ ' + EN_WORD_BY_ID[a.pair].w : a.w });
    push({ id: 'pq-' + b.id, round: 'pair', unit: 'pair', kind: 'words', ans: b.id, choices: [b.id, a.id], cue: EN_WORD_BY_ID[b.alt] ? b.w + ' ↔ ' + EN_WORD_BY_ID[b.alt].w : b.w });
  });

  /* 2) 유닛별 4지선다 — 같은 음가 친구들끼리 */
  EN_UNITS.forEach(u => {
    const ws = EN_WORDS.filter(w => w.u === u.id);
    if (ws.length < 4) return;
    for (let k = 0; k < 2; k++) {
      const i = (k * 3 + 1) % ws.length;
      const ans = ws[i];
      const picks = [ans.id];
      for (let s = 1; picks.length < 4 && s <= ws.length * 2; s++) {
        const cand = ws[(i + s * 2 + k) % ws.length];
        if (cand && picks.indexOf(cand.id) < 0) picks.push(cand.id);
      }
      if (picks.length === 4) push({ id: 'q-' + u.id + '-' + k, round: u.step, unit: u.id, kind: 'words', ans: ans.id, choices: picks, cue: u.title });
    }
  });

  /* 3) 단계별 섞기 — 여러 유닛에서 골고루 */
  EN_STEPS.forEach(st => {
    const ws = EN_WORDS.filter(w => w.step === st.id);
    if (ws.length < 4) return;
    for (let k = 0; k < 10; k++) {
      const i = Math.floor(ws.length * (k + 0.5) / 10) % ws.length;
      const ans = ws[i];
      const picks = [ans.id];
      for (let s = 1; picks.length < 4 && s < ws.length; s++) {
        const cand = ws[(i + s * Math.max(7, Math.floor(ws.length / 7))) % ws.length];
        if (cand && picks.indexOf(cand.id) < 0) picks.push(cand.id);
      }
      if (picks.length === 4) push({ id: 'qm-' + st.id + '-' + k, round: st.id, unit: st.id, kind: 'words', ans: ans.id, choices: picks, cue: st.tag + ' · 섞어 듣기' });
    }
  });

  /* 4) 사이트 워드 찾기 — 낱말마다 1문제 */
  const n = EN_SIGHT.length;
  EN_SIGHT.forEach((s, i) => {
    const picks = [i];
    [3, 7, 11].forEach(step => {
      let k = (i + step) % n, guard = 0;
      while ((picks.indexOf(k) >= 0) && guard++ < n) k = (k + 1) % n;
      if (picks.indexOf(k) < 0) picks.push(k);
    });
    push({ id: 'sw-' + s.id, round: 'sight', unit: 'sight', kind: 'sight', ans: s.id, choices: picks.map(k => EN_SIGHT[k].id), cue: s.ko });
  });

  window.EN_QUIZ = Q;
  window.EN_QUIZ_BY_ID = Object.fromEntries(Q.map(q => [q.id, q]));
})();

/* =====================================================================
   리더스 미션 · 6줄 이야기 (52편)
   한 줄 = '미션id|단계|카봇|제목|한글제목|1번문장|2번문장|…|6번문장'
   step 안에서 에너지 코어 4개마다 1편씩 열립니다.
   ===================================================================== */
window.EN_MISSION_ROWS = `
m01|s1|cb097|Ace to the Rescue|에이스의 출동|Ace is a big red fire truck.|He can make a big fire stop.|I can help you, says Ace.|He is quick and he is brave.|Go, Ace, go! You are a hero.|The town is safe with Ace.
m02|s1|cb098|Hawk and the Cat|호크와 고양이|Hawk is a fast blue car.|He sees a small cat in a tree.|Hop in, cat! says Hawk.|The cat is safe and happy.|Hawk can drive it home.|Thank you, Hawk! says the cat.
m03|s1|cb099|Fron Fixes It|프론의 수리|Fron is a police car.|He can fix a bike and a gate.|I can fix it, no problem!|He can make a old car new.|Fron is a big help in town.|Call me anytime! says Fron.
m04|s1|cb100|Dandy Gives a Ride|댄디의 구급차|Dandy is a white van.|He can give you a ride.|Come in, I can help you.|He can make a sick friend smile.|Dandy is a good friend.|He can run all day and night.
m05|s1|cb101|Sky at Night|밤의 스카이|Sky is a cool car.|She can fly up high.|I am from a star! she says.|Sky can see all the town.|She can help in the dark night.|Let us go up! says Sky.
m06|s1|cb102|Storm the Big Truck|큰 트럭 스톰|Storm is a big blue truck.|He is strong and tall.|I can lift this big box.|He can make a road for five cars.|Storm can do it all.|The five cars can go home.
m07|s1|cb103|Five in One|다섯이 하나로|Five car-bots can make one.|Ace, Fron, Dandy, Sky, Storm!|They are big and strong.|They can save the town.|We are Pentastorm! they say.|Go, Pentastorm, go!
m08|s1|cb104|Arty and the Magic Hat|아티의 마법 모자|Arty is a magic car.|He has a big black hat.|Look! A hat can fly!|He can make a game for us.|Arty can do magic.|Come and see! says Arty.
m09|s2|cb105|Born the Spy|스파이 본|Born is a green spy car.|He can hide in a shop.|Sh! Do not tell! says Born.|He can catch a thief at lunch.|He is a smart friend.|Born can help us all day.
m10|s2|cb106|Meister Makes a Ship|마이스터의 배|Meister is a smart guy.|He can make a ship.|This ship can go fast!|He can fix a chair and a clock.|Meister can mend a train.|I can make anything!
m11|s2|cb107|True at the Bath|목욕하는 트루|True is a ghost car.|He can jump and splash.|This bath is so fun!|He can hide in the bath.|True is not a bad ghost.|He is a friendly friend.
m12|s2|cb108|Night and the Thief|나이트와 도둑|Night is a police car.|He can catch a thief.|Stop right there, please!|He can run on the street.|Night keeps the town safe.|Sleep well, says Night.
m13|s2|cb109|Luke on the Block|블록 위의 루크|Luke is a fast police car.|He can stop on the block.|This is my job! says Luke.|He can help a friend in need.|Luke can chase a big truck.|The town is safe with Luke.
m14|s2|cb110|Phone and the Train|폰과 기차|Phone is a small bike car.|He can ride with a train.|The train is so big!|He can zip and zoom all day.|Phone is quick and glad.|Let us ride again!
m15|s3|cb112|Mighty Guard and the Rain|비 오는 날의 마이티가드|It can rain and rain all day.|Mighty Guard can help the town.|I can stop the fire! he says.|He can carry a horse to the farm.|He is a big strong friend.|The sun can come out again.
m16|s3|cb113|Ugaba in the Park|공원의 우가바|Ugaba is a wild car.|He can jump in the park.|Look at me go!|He can play on the green grass.|Ugaba can play all day.|Let us play again!
m17|s3|cb114|King Guyz and the Corn|킹가이즈와 옥수수|King Guyz is a gold car.|He can eat a lot of corn.|Yum, yum! More corn!|He can share food with all.|King Guyz is so glad.|The farm is his home.
m18|s3|cb115|Gold Rex and the Moon|골드렉스와 달|Gold Rex can fly to the moon.|He can look at the stars.|The moon is so far!|He can go over the sea.|Gold Rex can go home soon.|See you next time!
m19|s3|cb116|Jetren and the Bird|제트렌과 새|Jetren is a fast jet.|He can see a small bird.|Fly with me, bird!|They can turn and turn.|They can look at the town.|Fly high, my friend!
m20|s3|cb117|K-Cops on the Farm|농장의 케이캅스|K-Cops are brave and strong.|They can run to the farm.|We can help the horse!|They can catch a bad guy.|K-Cops can save the day.|All safe! say the K-Cops.
m21|s4|cb135|Iron the Engineer|수리왕 아이언트|Iron is a smart engineer car.|He can fix a broken engine.|Bring me a screw and a spring!|With a strong wrench he can build a street.|The crew can work all night.|All fixed! says Iron.
m22|s4|cb136|Converter the Trickster|장난꾸러기 컨버스터|Converter is a shape-changing car.|He can turn a truck into a jet.|Splash and spin! he says.|He can make a screen from a box.|Converter can think of a new trick.|Try and catch me!
m23|s4|cb137|Lucky Punch Wins|럭키펀치의 한 방|Lucky Punch has a big strong fist.|He can throw a stone far.|One punch and I can win!|He can spring up to the sky.|Lucky Punch is quick and glad.|What a good day!
m24|s4|cb138|Inook Saves the Whale|고래를 구한 아이누크|Inook can fly like a big bird.|He can see a whale in the sea.|Hold on! I can help!|He can lift a truck from the street.|The rescue crew can work together.|All safe! says Inook.
m25|s4|cb139|Star Spinner Shines|별처럼 도는 스타피너|Star Spinner can spin and spin.|He can write a bright line in the sky.|Look! A wheel of light!|He can screen the town at night.|The stars can shine on the street.|Good night! says Star Spinner.
m26|s4|cb151|Meta Falcon Flies|매처럼 나는 메타팔콘|Meta Falcon can fly up high.|He can scream like a strong wind.|I can shrink and fly!|He can throw a thread of light.|The screen of the sky is bright.|Catch me if you can!
m27|s1|cb123|Proud Jet and the Kite|자랑스러운 제트와 연|Jet is a proud blue car.|He can fly up to the sky.|A kite is in the tree.|I can get it down! says Jet.|The kid is glad and says thanks.|Jet can help and feel proud.
m28|s1|cb124|Star Blaster and the Night|별을 쏘는 스타블래스터|Star Blaster is a big white car.|He can make a star shine.|The night is dark and cold.|I can light the road, he says.|All the cars can go home safe.|What a bright night!
m29|s1|cb125|Builder and the Bed|빌디언의 침대|Builder is a strong red car.|He can build a bed and a gate.|This bed is for my friend.|He can make it big and wide.|Now my friend can sleep well.|Thank you, Builder!
m30|s1|cb126|Cran and the Cake|크랜과 케이크|Cran is a happy green car.|He can bake a big cake.|He puts it on a plate.|Come and eat with me!|The cake is sweet and good.|Yum, yum! says Cran.
m31|s1|cb127|Duke and the Mud|듀크와 진흙|Duke is a big strong truck.|He can dig in the mud.|A small car is stuck in it.|Hold on! I can pull you out.|Now the small car can go.|Duke is a good friend.
m32|s1|cb005|EV Commander and the Ride|EV 커맨더의 드라이브|EV is a quiet white car.|He can ride without a sound.|Hop in and we can go.|He can stop at the red light.|We can ride all day long.|What a fun ride!
m33|s2|cb148|Hyper Builder and the Ship|하이퍼 빌디언의 배|Hyper Builder can make a ship.|It has a big strong shell.|It can go on the green sea.|Bring a rope and a brush.|Now the ship can go fast.|The crew can cheer!
m34|s2|cb149|Evan Prime and the Lunch|에반 프라임의 점심|Evan Prime is a smart car.|He can cook lunch for the crew.|Cheese and bread on a plate.|This lunch is so good!|He can wash the dish.|What a great cook!
m35|s2|cb152|Jesty and the Shell|제스티와 조개껍질|Jesty is a quick little car.|He can see a shell on the sand.|It is pink and white.|He can share it with a friend.|They can look at it all day.|Thank you, Jesty!
m36|s2|cb153|Starby and the Sheep|스타비와 양|Starby is a bright yellow car.|She can see a sheep on the hill.|The sheep has a thick coat.|I can brush it for you.|Now the sheep is soft and clean.|Starby can help all day.
m37|s2|cb060|Ultimax and the Storm|울티맥스와 폭풍|Ultimax is a big blue truck.|A storm can come at night.|He can stand in the wind.|I can hold the bridge! he says.|The town can sleep safe.|Ultimax is very strong.
m38|s2|cb064|Dandy Ambulance and the Chick|댄디 앰뷸런스와 병아리|Dandy is a white van.|He can see a small chick.|The chick is wet and cold.|Come in and get warm!|He can bring it to the farm.|The chick is happy now.
m39|s2|cb070|Rai Cops and the Snack|라이캅스와 간식|Rai Cops are quick and smart.|They can stop at the shop.|A cat is on the top shelf.|We can get it down!|They can share a snack.|All glad! say the Rai Cops.
m40|s3|cb051|Hospers Bang and the Rain|호스퍼스 뱅과 비|It can rain and rain all day.|Hospers Bang can drive to the farm.|The goat can not go out.|I can bring it some hay.|The rain can stop soon.|The sun can come out!
m41|s3|cb048|Night Hopper and the Star|나이트호퍼와 별|Night Hopper can jump up high.|He can see a bright star.|The star is so far away.|I can light the road for you.|He can shine all night.|Good night, my friend!
m42|s3|cb044|Eagle Hyder and the Ball|이글하이더와 공|Eagle Hyder can fly and see.|A ball is in the tall tree.|He can bring it down.|The kids can play again.|He can hear them cheer.|What a good day!
m43|s3|cb034|Supporty Boom and the Store|서포티붐과 가게|Supporty Boom can go to the store.|He can buy milk and bread.|The bag is too full.|He can share it with a friend.|They can walk home together.|Thank you for your help!
m44|s3|cb017|Star Guardian and the Whale|스타가디언과 고래|Star Guardian can fly over the sea.|He can see a whale in the water.|The whale can not turn.|I can pull you out, he says.|The whale can swim again.|The sea is safe now.
m45|s3|cb013|Code Guy and the Door|코드 가이와 문|Code Guy is a smart gray car.|He can open a locked door.|He can use a secret code.|Beep, beep! The door is open.|All the cars can go in.|Code Guy can do it all!
m46|s3|cb075|Buddy Guard and the Bird|버디가드와 새|Buddy Guard is a kind green car.|He can hear a small bird.|The bird can not fly.|I can help you, says Buddy.|He can make a soft bed.|Soon the bird can fly again.
m47|s4|cb061|Pentastorm X and the Street|펜타스톰 X와 거리|Pentastorm X can work all night.|He can build a long street.|He can use a strong screw.|The crew can bring a wrench.|Scratch and scrape, the street is straight.|All fixed! says Pentastorm X.
m48|s4|cb066|Fron Police X and the Thief|프론 폴리스 X와 도둑|Fron Police X can run on the street.|He can catch a tricky thief.|Stop right there, please!|He can bring him to the station.|The town can sleep in peace.|Thank you, Fron!
m49|s4|cb057|Guardiant and the Screen|가디언트와 화면|Guardiant can see every screen.|A screen is broken at school.|He can fix it in a minute.|Now the class can start.|He can watch the whole school.|All safe! says Guardiant.
m50|s4|cb045|Bear Hyder and the Mountain|베어하이더와 산|Bear Hyder can climb a high mountain.|He can carry a heavy pack.|The path is dark and cold.|He can light a bright torch.|The rescue crew can follow him.|What a brave friend!
m51|s4|cb001|Big Port and the Ships|빅포트와 배들|Big Port is a giant blue truck.|He can carry four big ships.|He can drive to the station.|The crew can unload the boxes.|Everything is in the right place.|Big Port can do it all!
m52|s4|cb018|Ugaba X and the Rainbow|우가바 X와 무지개|Ugaba X can jump and splash.|He can see a rainbow in the sky.|It has seven bright stripes.|He can paint it in a notebook.|He can show it to his friends.|What a wonderful day!`;

(function () {
  const list = [];
  String(EN_MISSION_ROWS || '').split('\n').forEach(line => {
    const t = line.trim(); if (!t) return;
    const p = t.split('|');
    if (p.length < 11) return;
    list.push({
      id: p[0].trim(), step: p[1].trim(), carbot: p[2].trim(),
      title: p[3].trim(), ko: p[4].trim(),
      lines: p.slice(5, 11).map(x => x.trim()).filter(Boolean)
    });
  });
  window.EN_MISSIONS = list;
  window.EN_MISSION_BY_ID = Object.fromEntries(list.map(m => [m.id, m]));
})();

/* 미션 해금에 필요한 에너지 코어 수 */
window.EN_CORES_PER_MISSION = 4;

/* =====================================================================
   리더스 문장 블록 맞추기 — 리더스마다 6문장을 1번 → 2번 → … 순서로 연습
   EN_BLOCKS          : 문장 하나 = 블록 문제 하나 (52편 × 6문장 = 312문장)
   EN_BLOCKS_BY_MISSION: 미션별 6문장 목록
   ===================================================================== */
(function () {
  const all = [];
  const byMission = {};
  EN_MISSIONS.forEach(m => {
    const arr = m.lines.map((line, i) => ({
      id: m.id + '-' + i, mission: m.id, step: m.step, i: i,
      sentence: line,
      words: line.replace(/\s+/g, ' ').trim().split(' ')
    }));
    byMission[m.id] = arr;
    arr.forEach(b => all.push(b));
    m.sentenceCount = arr.length;
  });
  window.EN_BLOCKS = all;
  window.EN_BLOCKS_BY_MISSION = byMission;
  window.EN_TOTAL_SENTENCES = all.length;
  // 예전 이름 호환: EN_BLOCK_BY_ID[미션] = 그 미션의 1번 문장 블록
  window.EN_BLOCK_BY_ID = Object.fromEntries(EN_MISSIONS.map(m => [m.id, byMission[m.id][0]]));
})();
