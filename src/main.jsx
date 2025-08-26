// ... 기존 import들
import './fonts.css';
import './index.css';
import App from './App.jsx';
import React from 'react';
import ReactDOM from 'react-dom/client';

import './fonts.css';
import './index.css';
import App from './App.jsx';

/* -------------- 폰트 핵잠금: Document + 모든 ShadowRoot + 동일출처 iframe -------------- */
(function lockFontsEverywhere() {
  const FONT_STACK = `"Sandoll GothicNeoRound", "Apple SD Gothic Neo", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  const FONT_CSS = `
    :host, :root, html, body, #root, *, *::before, *::after {
      font-family: ${FONT_STACK} !important;
      font-weight: 400 !important;
      color: inherit;
    }
    .sd-700 {
      font-family: ${FONT_STACK} !important;
      font-weight: 700 !important;
    }
  `;

  // 특정 루트(Document 또는 ShadowRoot)에 스타일 1회 주입
  function installInto(root) {
    try {
      const doc = root.nodeType === 9 ? root : (root.host ? root.ownerDocument : document);
      const head = root.nodeType === 9 ? root.head : root; // Document면 head, ShadowRoot면 자기 자신
      if (!head || !doc) return;
      // 중복 방지
      if (head.querySelector('#sd-font-lock')) return;
      const style = doc.createElement('style');
      style.id = 'sd-font-lock';
      style.textContent = FONT_CSS;
      head.appendChild(style);
    } catch (_) {}
  }

  // 메인 문서에: 폰트 준비 후 주입
  document.fonts.ready.then(() => installInto(document));

  // 기존에 열린 ShadowRoot들에 주입
  function installIntoExistingShadowRoots() {
    document.querySelectorAll('*').forEach(el => {
      if (el.shadowRoot) installInto(el.shadowRoot);
    });
  }
  installIntoExistingShadowRoots();

  // 앞으로 생성될 ShadowRoot에도 자동 주입 (open/closed 둘 다 커버)
  const _attachShadow = Element.prototype.attachShadow;
  Element.prototype.attachShadow = function(init) {
    const root = _attachShadow.call(this, init);
    // next tick에 주입 (초기 슬롯 렌더 후)
    Promise.resolve().then(() => installInto(root));
    return root;
  };

  // 동일 출처 iframe에도 주입 (+ 나중에 추가되는 iframe까지 관찰)
  function installIntoFrame(frame) {
    try {
      const doc = frame.contentDocument;
      if (!doc) return;
      const go = () => installInto(doc);
      if (doc.readyState === 'complete' || doc.readyState === 'interactive') go();
      else frame.addEventListener('load', go, { once: true });
    } catch (_) {
      /* 교차 출처 iframe(유튜브 등)은 접근 불가 → 무시해도 됨 */
    }
  }
  document.querySelectorAll('iframe').forEach(installIntoFrame);
  new MutationObserver(muts => {
    muts.forEach(m => m.addedNodes.forEach(n => {
      if (n.tagName === 'IFRAME') installIntoFrame(n);
    }));
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
/* -------------------------------------------------------------------- */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);


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
