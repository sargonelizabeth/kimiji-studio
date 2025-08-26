// ... 기존 import들
import './fonts.css';
import './index.css';
import App from './App.jsx';

/** 폰트가 준비되면 전역으로 Sandoll 400/700을 강제 잠금 */
document.fonts.ready.then(() => {
  // 이미 주입되어 있으면 중복 방지
  if (document.getElementById('sd-font-lock')) return;

  const css = `
    /* 모든 노드 + 가상 요소까지 Sandoll 400 고정 */
    html, body, #root, *, *::before, *::after {
      font-family: "Sandoll GothicNeoRound", "Apple SD Gothic Neo", "Noto Sans KR",
                   -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
      font-weight: 400 !important;
      color: inherit;
    }
    /* 제목/버튼은 .sd-700 으로 700 고정 */
    .sd-700 {
      font-family: "Sandoll GothicNeoRound", "Apple SD Gothic Neo", "Noto Sans KR",
                   -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
      font-weight: 700 !important;
    }
  `;
  const style = document.createElement('style');
  style.id = 'sd-font-lock';
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
});

import React from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
