// DOM이 완전히 로드된 후에 이벤트 리스너를 추가
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const searchInput = document.getElementById('searchQuery');
  const tooltipCheckbox = document.getElementById('tooltipCheckbox');
  const darkModeCheckbox = document.getElementById('darkModeCheckbox');
  const descriptsBtn = document.getElementById('descriptsBtn');
  const openSettingsBtn = document.getElementById('open-settings');
  const searchBtn = document.getElementById('searchBtn');
  
  // 페이지 로드 시 검색창에 자동 포커스
  if (searchInput) {
    searchInput.focus();
  }
  let isTooltipEnabled;
  let isDarkMode;
  // 저장된 다크 모드 및 툴팁 상태를 불러오기
  chrome.storage.sync.get(['isDarkMode', 'isTooltipEnabled'], (result) => {
    // 다크 모드 불러오기
    if (result.isDarkMode !== undefined) {
      if (result.isDarkMode) {
        body.classList.add('dark-mode');
        darkModeCheckbox.checked = true;
      } else {
        body.classList.add('light-mode');
        darkModeCheckbox.checked = false;
      }
    }

    // 툴팁 상태 불러오기
    if (result.isTooltipEnabled !== undefined) {
      tooltipCheckbox.checked = result.isTooltipEnabled;
      this.isTooltipEnabled=isTooltipEnabled;
    }
  });
  
  // 단축키 저장소에서 불러오기
  let shortcuts = {};

  chrome.storage.sync.get(null, (result) => {
    shortcuts = {
      site: result.siteShortcut,
      source: result.sourceShortcut,
      related: result.relatedShortcut,
      intitle: result.intitleShortcut,
      intext: result.intextShortcut,
      allintitle: result.allintitleShortcut,
      allintext: result.allintextShortcut,
      filetype: result.filetypeShortcut,
      ext: result.extShortcut,
      define: result.defineShortcut,
      cache: result.cacheShortcut,
      weather: result.weatherShortcut,
      stocks: result.stocksShortcut,
      map: result.mapShortcut,
      movie: result.movieShortcut,
      around: result.aroundShortcut,
      exact: result.exactShortcut,
      or: result.orShortcut,
      and: result.andShortcut,
      exclude: result.excludeShortcut,
      wildcard: result.wildcardShortcut,
      group: result.groupShortcut,
      currency: result.currencyShortcut,
      range: result.rangeShortcut,
      convert: result.convertShortcut
    };
  });

  // 설정 버튼 클릭 시 settings.html 파일을 로드
  if (openSettingsBtn) {
    openSettingsBtn.addEventListener('click', () => {
      window.location.href = '../settings/settings.html';
    });
  }

  // 설명 사이트 로드(새창)
  descriptsBtn.addEventListener('click', () => {
    const url_dscripts = `http://lmrdb.duckdns.org/descript/descript.html`;
    chrome.tabs.create({ url: url_dscripts });
  })

  // 툴팁 상태 (기본: 활성화)
  // tooltipCheckbox.checked = true;

  // 툴팁 토글 이벤트
  tooltipCheckbox.addEventListener('change', () => {
    isTooltipEnabled = tooltipCheckbox.checked;
    chrome.storage.sync.set({'isTooltipEnabled':isTooltipEnabled}, function(){
      console.log("툴팁 활성화 상태:", isTooltipEnabled ," 저장 완료");
    });
  });

  // 체크박스 상태에 따라 다크 모드 적용
  darkModeCheckbox.addEventListener("change", () => {
    if (darkModeCheckbox.checked) {
      body.classList.remove("light-mode");
      body.classList.add("dark-mode");
      isDarkMode=true;
    } else {
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
      isDarkMode=false;
    }
    chrome.storage.sync.set({ 'isDarkMode': isDarkMode }, function(){
      console.log("다크 모드 저장됨");
    });
  });

  // 연산자 버튼을 클릭하면 검색어에 연산자를 추가하는 함수
  function addOperator(operator) {
    const searchInput = document.getElementById('searchQuery');
    if (searchInput) {
      searchInput.value += ` ${operator}`;
      searchInput.focus();  // 버튼 클릭 후 검색창에 포커스 유지

    } else {
      console.error('검색어 입력 필드를 찾을 수 없습니다.');
    }
  }

  // 단축키 이벤트 감지
  document.addEventListener('keydown', (event) => {
    const keyCombo = `${event.ctrlKey ? 'Ctrl+' : ''}${event.shiftKey ? 'Shift+' : ''}${event.key}`;

    if (keyCombo === shortcuts.site) {
      addOperator('site:');
    } else if (keyCombo === shortcuts.source) {
      addOperator('source:');
    } else if (keyCombo === shortcuts.related) {
      addOperator('related:');
    } else if (keyCombo === shortcuts.intitle) {
      addOperator('intitle:');
    } else if (keyCombo === shortcuts.intext) {
      addOperator('intext:');
    } else if (keyCombo === shortcuts.allintitle) {
      addOperator('allintitle:');
    } else if (keyCombo === shortcuts.allintext) {
      addOperator('allintext:');
    } else if (keyCombo === shortcuts.filetype) {
      addOperator('filetype:');
    } else if (keyCombo === shortcuts.ext) {
      addOperator('ext:');
    } else if (keyCombo === shortcuts.define) {
      addOperator('define:');
    } else if (keyCombo === shortcuts.cache) {
      addOperator('cache:');
    } else if (keyCombo === shortcuts.weather) {
      addOperator('weather:');
    } else if (keyCombo === shortcuts.stocks) {
      addOperator('stocks:');
    } else if (keyCombo === shortcuts.map) {
      addOperator('map:');
    } else if (keyCombo === shortcuts.movie) {
      addOperator('movie:');
    } else if (keyCombo === shortcuts.around) {
      addOperator('around(x)');
    } else if (keyCombo === shortcuts.exact) {
      addOperator('" "');  // 정확한 검색을 위한 연산자
    } else if (keyCombo === shortcuts.or) {
      addOperator('OR');
    } else if (keyCombo === shortcuts.and) {
      addOperator('AND');
    } else if (keyCombo === shortcuts.exclude) {
      addOperator('-');
    } else if (keyCombo === shortcuts.wildcard) {
      addOperator('*');
    } else if (keyCombo === shortcuts.group) {
      addOperator('()');
    } else if (keyCombo === shortcuts.currency) {
      addOperator('₩, $');
    } else if (keyCombo === shortcuts.range) {
      addOperator('#..#');
    } else if (keyCombo === shortcuts.convert) {
      addOperator('in');
    }
  });

  // 각 버튼의 명령어와 툴팁 설명을 저장하는 객체
  const buttonData = {
    site: { command: 'site:', description: '특정 사이트에서 검색' },
    source: { command: 'source:', description: '특정 출처에서 뉴스 검색' },
    related: { command: 'related:', description: '관련 사이트 검색' },
    intitle: { command: 'intitle:', description: '제목에 검색어 포함' },
    intext: { command: 'intext:', description: '본문에 검색어 포함' },
    allintitle: { command: 'allintitle:', description: '제목에 모든 검색어 포함' },
    allintext: { command: 'allintext:', description: '본문에 모든 검색어 포함' },
    filetype: { command: 'filetype:', description: '특정 파일 형식 검색' },
    ext: { command: 'ext:', description: '파일 확장자 검색' },
    define: { command: 'define:', description: '단어 정의 검색' },
    cache: { command: 'cache:', description: '캐시된 페이지 검색' },
    weather: { command: 'weather:', description: '날씨 검색' },
    stocks: { command: 'stocks:', description: '주식 정보 검색' },
    map: { command: 'map:', description: '지도에서 검색' },
    movie: { command: 'movie:', description: '영화 정보 검색' },
    around: { command: 'around(x)', description: '근접 검색' },
    exact: { command: '" "', description: '정확한 검색' },
    or: { command: 'OR', description: 'OR 검색' },
    and: { command: 'AND', description: 'AND 검색' },
    exclude: { command: '-', description: '특정 검색어 제외' },
    wildcard: { command: '*', description: '와일드카드 검색' },
    group: { command: '()', description: '검색어 그룹화' },
    currency: { command: '₩, $', description: '통화 검색' },
    range: { command: '#..#', description: '숫자 범위 검색' },
    convert: { command: 'in', description: '단위 변환' }
  };

  // 각 버튼을 찾아 클릭 시 addOperator 함수 호출
  Object.keys(buttonData).forEach(id => {
    const button = document.getElementById(id);
    if (button) {
      button.textContent = buttonData[id].command;  // 기본 명령어로 버튼 텍스트 설정

      // 툴팁 설정
      button.setAttribute('data-tooltip', buttonData[id].description);
      // 마우스 호버 시 커스텀 툴팁 보여주기
      button.addEventListener('mouseover', () => {
        if (tooltipCheckbox.checked) {
          button.classList.add('show-tooltip');  // 커스텀 툴팁 활성화
        }
      });

      // 마우스가 버튼에서 떠났을 때 툴팁 제거
      button.addEventListener('mouseout', () => {
        button.classList.remove('show-tooltip');
      });

      // 버튼 클릭 시 명령어 추가
      button.addEventListener('click', () => addOperator(buttonData[id].command));
    } else {
      console.error(`버튼 ${id}을(를) 찾을 수 없습니다.`);
    }
  });

  // 검색 실행 함수
  function executeSearch() {
    const searchQuery = searchInput.value.trim();
    if (searchQuery) {
      const url = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
      chrome.tabs.create({ url });  // 새로운 탭에서 구글 검색 실행
    } else {
      alert('검색어를 입력하세요.');
    }
  }

  // 검색 버튼을 클릭하면 구글 검색을 실행
  if (searchBtn) {
    searchBtn.addEventListener('click', executeSearch);
  } else {
    console.error('검색 버튼을 찾을 수 없습니다.');
  }

  // Enter 키 입력 시 검색 실행
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      executeSearch();  // Enter 입력 시 검색 실행
    }
  });

});