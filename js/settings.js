/* 설정 · 연동 · 내보내기 */
(function () {
  const $ = U.$;

  function fill() {
    const s = Store.settings();
    if ($('#setChildName')) $('#setChildName').value = s.childName || '';
    if ($('#setSound')) $('#setSound').checked = !!s.sound;
    if ($('#setVoice')) $('#setVoice').checked = !!s.voice;
    const fb = s.firebase || {};
    if ($('#setDbUrl')) $('#setDbUrl').value = fb.databaseURL || '';
    if ($('#setApiKey')) $('#setApiKey').value = fb.apiKey || '';
    if ($('#setProjectId')) $('#setProjectId').value = fb.projectId || '';
    if ($('#setAppId')) $('#setAppId').value = fb.appId || '';
    if ($('#setFamilyCode')) $('#setFamilyCode').value = s.familyCode || '';
    const st = $('#syncStatusText');
    if (st) st.textContent = '상태: ' + Store.statusText(CarbotSync.status);
  }

  function readForm() {
    return {
      childName: ($('#setChildName').value || '').trim() || '친구',
      sound: $('#setSound').checked,
      voice: $('#setVoice').checked,
      familyCode: ($('#setFamilyCode').value || '').trim(),
      firebase: {
        apiKey: ($('#setApiKey').value || '').trim(),
        authDomain: (($('#setProjectId').value || '').trim() ? ($('#setProjectId').value || '').trim() + '.firebaseapp.com' : ''),
        databaseURL: ($('#setDbUrl').value || '').trim(),
        projectId: ($('#setProjectId').value || '').trim(),
        storageBucket: '',
        messagingSenderId: '',
        appId: ($('#setAppId').value || '').trim()
      }
    };
  }

  async function connect() {
    const v = readForm();
    Store.setSettings(v);
    if (!v.familyCode) { U.toast('가족 코드를 먼저 정해 주세요 (예: CARBOT7)'); return; }
    if (!v.firebase.databaseURL) { U.toast('databaseURL을 넣어 주세요'); return; }
    U.toast('연결하는 중…');
    await CarbotSync.connect({ firebase: v.firebase, familyCode: v.familyCode });
    fill();
    if (CarbotSync.status === 'online') U.toast('☁️ 가족 기기와 연결됐어요!');
  }

  function disconnect() {
    CarbotSync.disconnect();
    fill();
    U.toast('연동을 껐어요. 이 기기에만 저장돼요');
  }

  function showExport() {
    const code = Store.exportCode();
    const m = $('#modal'), card = $('#modalCard');
    card.innerHTML = '<h3>📦 내보내기 코드</h3>' +
      '<p class="tiny-note" style="text-align:left">아래 코드를 복사해서 다른 기기의 [불러오기]에 붙여넣으면 기록이 그대로 옮겨져요.</p>' +
      '<textarea id="expArea" readonly>' + code + '</textarea>' +
      '<div class="btn-row"><button class="btn primary" id="btnCopy">복사하기</button><button class="btn ghost" id="mClose">닫기</button></div>';
    m.classList.remove('hidden');
    $('#btnCopy').onclick = async () => {
      try { await navigator.clipboard.writeText(code); U.toast('복사했어요!'); }
      catch (e) { $('#expArea').select(); document.execCommand('copy'); U.toast('복사했어요!'); }
    };
    $('#mClose').onclick = () => m.classList.add('hidden');
  }

  function showImport() {
    const m = $('#modal'), card = $('#modalCard');
    card.innerHTML = '<h3>📥 불러오기</h3>' +
      '<p class="tiny-note" style="text-align:left">다른 기기에서 내보낸 코드를 붙여넣어 주세요.</p>' +
      '<textarea id="impArea" placeholder="코드를 붙여넣기"></textarea>' +
      '<div class="btn-row"><button class="btn primary" id="btnDoImport">불러오기</button><button class="btn ghost" id="mClose">닫기</button></div>';
    m.classList.remove('hidden');
    $('#btnDoImport').onclick = () => {
      const ok = Store.importCode($('#impArea').value || '');
      m.classList.add('hidden');
      if (ok) { U.toast('기록을 불러왔어요 🎉'); App.refreshAll(); }
      else U.toast('코드를 읽지 못했어요. 다시 확인해 주세요');
    };
    $('#mClose').onclick = () => m.classList.add('hidden');
  }

  function loadQr() {
    return new Promise((resolve, reject) => {
      if (window.qrcode) return resolve();
      const s = document.createElement('script');
      s.src = 'assets/vendor/qrcode.js';
      s.onload = resolve; s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  async function showQr() {
    const box = $('#qrBox'), cv = $('#qrCanvas');
    if (!box.classList.contains('hidden')) { box.classList.add('hidden'); return; }
    try {
      await loadQr();
      const code = Store.exportCode();
      // QR은 짧은 데이터만 담을 수 있어, 기록 요약이 아니라 "가족 코드"를 담습니다.
      const fc = Store.settings().familyCode;
      const data = fc ? ('carbot-hangul://family/' + fc) : code.slice(0, 900);
      const qr = window.qrcode(0, 'M');
      qr.addData(data); qr.make();
      cv.width = 380; cv.height = 380;
      const ctx = cv.getContext('2d');
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 380, 380);
      const n = qr.getModuleCount(), cell = Math.floor(360 / n);
      const off = Math.floor((380 - cell * n) / 2);
      ctx.fillStyle = '#12324d';
      for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
        if (qr.isDark(r, c)) ctx.fillRect(off + c * cell, off + r * cell, cell, cell);
      }
      box.classList.remove('hidden');
      U.toast(fc ? '가족 코드 QR이에요' : '내보내기 코드 일부를 담았어요');
    } catch (e) {
      console.warn(e); U.toast('QR을 만들지 못했어요');
    }
  }

  function reset() {
    const m = $('#modal'), card = $('#modalCard');
    card.innerHTML = '<h3>🧹 기록 모두 지우기</h3><p class="tiny-note" style="text-align:left">배운 카봇, 칩, 보관함 그림이 모두 지워져요. 되돌릴 수 없어요.</p>' +
      '<div class="btn-row"><button class="btn danger" id="btnDoReset">정말 지우기</button><button class="btn ghost" id="mClose">취소</button></div>';
    m.classList.remove('hidden');
    $('#btnDoReset').onclick = () => {
      Store.reset(); m.classList.add('hidden'); App.refreshAll(); U.toast('기록을 지웠어요');
    };
    $('#mClose').onclick = () => m.classList.add('hidden');
  }

  function bind() {
    $('#setChildName') && $('#setChildName').addEventListener('change', () => {
      const v = readForm(); Store.setSettings({ childName: v.childName }); App.renderHome();
    });
    $('#setSound') && $('#setSound').addEventListener('change', () => Store.setSettings({ sound: $('#setSound').checked }));
    $('#setVoice') && $('#setVoice').addEventListener('change', () => Store.setSettings({ voice: $('#setVoice').checked }));
    $('#btnSyncConnect') && $('#btnSyncConnect').addEventListener('click', connect);
    $('#btnSyncDisconnect') && $('#btnSyncDisconnect').addEventListener('click', disconnect);
    $('#btnExport') && $('#btnExport').addEventListener('click', showExport);
    $('#btnImport') && $('#btnImport').addEventListener('click', showImport);
    $('#btnShowQr') && $('#btnShowQr').addEventListener('click', showQr);
    $('#btnReset') && $('#btnReset').addEventListener('click', reset);
    const m = $('#modal');
    if (m) m.addEventListener('click', e => { if (e.target === m) m.classList.add('hidden'); });
  }

  window.Settings = { bind, fill };
})();
