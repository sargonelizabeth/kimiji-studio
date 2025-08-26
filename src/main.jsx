import React from 'react';
import ReactDOM from 'react-dom/client';

/* 1) 산돌 CSS를 번들에 포함 */
import './fonts.css';

/* 2) 전역 스타일 */
import './index.css';

import App from './App.jsx';

/* 3) head에 산돌 링크가 없으면 주입 (실패 방지용 이중 장전) */
(function ensureSandollLink() {
  const HREF = 'https://hmolhy4qpa.execute-api.ap-northeast-2.amazonaws.com/v1/api/css/drop_fontstream_css/?sid=gAAAAABorBr_uT6Uy4-5TLMEhfp1BPyRHXfpKMa7nKFipQnJ0LmjebuXFb4JDI8rJN52M_lhCk5sEo3sYEEXfAPIQmzWIfxB5WOpmKGbxVcvzWsZczNLh6k2gPfM9ADo57hXI2ZGcXnFrLsGyxC0jw47fcV93_SlzTGiX5n2wHnCmrJmudyRktqwAnqaxOFUh2OaqQwibaQEdUy5YpV-Zkw8tYHjVpIq_QMeoiBucM7jZHdJIWzkoVzh6x8pEQ5fk_POwSVGBnPL&v=pcfix2';
  if (!document.querySelector('link[href*="drop_fontstream_css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = HREF;
    link.crossOrigin = 'anonymous';
    link.referrerPolicy = 'origin';
    document.head.appendChild(link);
  }
})();

/* 4) 폰트 family 이름 자동탐지 → CSS 변수(--sd-400/--sd-700)에 정확히 주입
      (가끔 Regular/Bold가 서로 다른 family로 내려올 때 400만 Apple SD로 빠지는 문제를 잡는다) */
(function autoDetectSandollFamilies() {
  const candidates400 = [
    'Sandoll GothicNeoRound',
    'Sandoll GothicNeoRound 03 Regular',
    'Sandoll GothicNeoRound Regular',
    'Sandoll GothicNeoRound R',
    'SandollGothicNeoRound',
    'Sandoll Gothic Neo Round'
  ];

  const candidates700 = [
    'Sandoll GothicNeoRound',
    'Sandoll GothicNeoRound 07 Bold',
    'Sandoll GothicNeoRound 05 Heavy',
    'Sandoll GothicNeoRound Bold',
    'SandollGothicNeoRound Bold',
    'Sandoll Gothic Neo Round Bold'
  ];

  const pick = (names, weight) => {
    for (const name of names) {
      try {
        if (document.fonts.check(`${weight} 16px "${name}"`)) return name;
      } catch (_) {}
    }
    return null;
  };

  const apply = (f400, f700) => {
    const root = document.documentElement.style;
    // 변수에 "따옴표 포함"으로 넣어야 공백 있는 family가 안전하게 적용됨
    if (f400) root.setProperty('--sd-400', `"${f400}"`);
    if (f700) root.setProperty('--sd-700', `"${f700}"`);
  };

  // 폰트가 준비되면 탐지
  document.fonts.ready.then(() => {
    const f400 = pick(candidates400, 400);
    const f700 = pick(candidates700, 700) || f400; // 같은 family로 weight만 있는 케이스
    apply(f400, f700);
  });

  // 혹시 늦게 로드될 때를 대비해 1.5초 후 1회 재시도
  setTimeout(() => {
    const f400 = pick(candidates400, 400);
    const f700 = pick(candidates700, 700) || f400;
    apply(f400, f700);
  }, 1500);
})();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
