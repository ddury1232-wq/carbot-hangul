/* =====================================================================
   카봇 한글 쓰기 · 설정 파일
   ---------------------------------------------------------------------
   Firebase 프로젝트: carbot-hangul (Realtime Database 사용)
   · 아래 값이 그대로 들어 있어서, 사이트를 열면 바로 자동으로 연결됩니다.
   · 데이터는 루트 아래 /families/{가족코드} 에만 저장/구독합니다.
     (보안 규칙에서 루트 전체 읽기를 막고 가족 단위로만 허용할 수 있어요)
   · 가족 코드 기본값은 "carbot-home-01".
     주소 뒤에 ?code=다른코드 를 붙이면 그 코드로 접속합니다.
     (예: https://.../index.html?code=tablet2)
     ⚙️ 설정 화면에서도 바꿀 수 있어요.
   ===================================================================== */
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyCQRIcTUC01EJzA5KAV5BABCoOuqtE6-Pg",
  authDomain: "carbot-hangul.firebaseapp.com",
  databaseURL: "https://carbot-hangul-default-rtdb.firebaseio.com",
  projectId: "carbot-hangul",
  storageBucket: "carbot-hangul.firebasestorage.app",
  messagingSenderId: "554932938888",
  appId: "1:554932938888:web:cf63356ecc7a88c1a1d73d"
};

/* 기본 가족 코드 (설정 화면에서 바꿀 수 있어요) */
window.DEFAULT_FAMILY_CODE = "carbot-home-01";

/* 주소의 ?code=... 값을 가족 코드로 사용 */
(function () {
  try {
    const p = new URLSearchParams(location.search);
    const code = p.get('code') || p.get('family');
    if (code) window.DEFAULT_FAMILY_CODE = code.trim();
  } catch (e) {}
})();
