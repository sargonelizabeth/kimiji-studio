import React from 'react';
import ReactDOM from 'react-dom/client';

/* 1) Sandoll CSS 번들 포함 (항상 로드) */
import './fonts.css';

/* 2) 전역 스타일 */
import './index.css';

import App from './App.jsx';

/* 3) 런타임 보강: head에 링크가 없으면 즉시 주입 */
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
