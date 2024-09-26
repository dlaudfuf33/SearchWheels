document.addEventListener('DOMContentLoaded', () => {
  // 모든 단축키 입력 필드 객체
  const shortcutInputs = {
    site: document.getElementById('site-shortcut'),
    intitle: document.getElementById('intitle-shortcut'),
    source: document.getElementById('source-shortcut'),
    related: document.getElementById('related-shortcut'),
    intext: document.getElementById('intext-shortcut'),
    allintitle: document.getElementById('allintitle-shortcut'),
    allintext: document.getElementById('allintext-shortcut'),
    filetype: document.getElementById('filetype-shortcut'),
    ext: document.getElementById('ext-shortcut'),
    define: document.getElementById('define-shortcut'),
    cache: document.getElementById('cache-shortcut'),
    weather: document.getElementById('weather-shortcut'),
    stocks: document.getElementById('stocks-shortcut'),
    map: document.getElementById('map-shortcut'),
    movie: document.getElementById('movie-shortcut'),
    around: document.getElementById('around-shortcut'),
    exact: document.getElementById('exact-shortcut'),
    or: document.getElementById('or-shortcut'),
    and: document.getElementById('and-shortcut'),
    exclude: document.getElementById('exclude-shortcut'),
    wildcard: document.getElementById('wildcard-shortcut'),
    group: document.getElementById('group-shortcut'),
    currency: document.getElementById('currency-shortcut'),
    range: document.getElementById('range-shortcut'),
    convert: document.getElementById('convert-shortcut')
  };
  const leavBtn = document.getElementById('leavBtn');
  const forbiddenKeys = ['Enter', 'Backspace', 'Escape', 'Meta'];

  let activeInput = null;

  // 저장된 단축키를 불러오기
  chrome.storage.sync.get(Object.keys(shortcutInputs).map(key => `${key}Shortcut`), (result) => {
    // 저장된 값을 각각의 입력 필드에 할당
    Object.keys(shortcutInputs).forEach(key => {
      shortcutInputs[key].value = result[`${key}Shortcut`] || '단축키 없음'; // 저장된 값이 없으면 기본값으로 '단축키 없음' 표시
    });
  });
  // 키 입력 감지 함수
  function handleKeydown(event) {
    const keys = [];
    // 조합키 추가
    if (event.ctrlKey) keys.push('Ctrl');
    if (event.shiftKey) keys.push('Shift');
    if (event.altKey) keys.push('Alt');
    // 금지된 키는 입력되지 않도록 처리
    if (forbiddenKeys.includes(event.key)) {
      if (activeInput) {
        activeInput.value = '할당 없음'; // 금지된 키가 입력될 경우 "할당 없음"으로 설정
      }
      return;
    }
    // event.code를 사용하여 물리적 키 감지 (숫자키에 대한 처리)
    const key = event.code.startsWith('Digit') ? event.code.replace('Digit', '') : event.key;
    keys.push(key);
    const shortcut = keys.join('+');
    if (activeInput) {
      activeInput.value = shortcut; // 입력된 단축키를 input에 표시
    }
    // 키 입력이 input에 기록되지 않도록 기본 동작 방지
    event.preventDefault();
  }
  // 포커스될 때 activeInput 설정
  // 각 입력 필드에 포커스가 들어올 때 activeInput 설정
  Object.keys(shortcutInputs).forEach(key => {
    shortcutInputs[key].addEventListener('focus', () => activeInput = shortcutInputs[key]);
    // 클릭 시 기존 값 지우기
    shortcutInputs[key].addEventListener('click', () => {
      shortcutInputs[key].value = '';
    });
  });
  // 키 입력 감지 시작
  document.addEventListener('keydown', handleKeydown);

  // 폼 제출 시 설정 저장
  document.getElementById('shortcut-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const shortcuts = {};
    Object.keys(shortcutInputs).forEach(key => {
      shortcuts[`${key}Shortcut`] = shortcutInputs[key].value.trim();
    });

    // 새로운 단축키를 저장
    chrome.storage.sync.set(shortcuts, () => {
      alert('단축키가 저장되었습니다.');
      window.location.href = '../popup/popup.html';
    });
  });  // 나가기 버튼
  leavBtn.addEventListener('click', () => {
    window.location.href = '../popup/popup.html';
  });
});
