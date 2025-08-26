import React from 'react';
import ReactDOM from 'react-dom/client';

import './fonts.css';   // 산돌 CSS @import
import './index.css';   // 전역 색/레이아웃
import App from './App.jsx';

/* ===== Sandoll 잠금: Document + 모든 ShadowRoot + same-origin iframe ===== */
(function lockFontsEverywhere() {
  const FONT_STACK = `"Sandoll GothicNeoRound", "Apple SD Gothic Neo", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  const CSS_TEXT = `*{font-family:${FONT_STACK} !important;font-weight:400 !important;color:inherit} .sd-700{font-family:${FONT_STACK} !important;font-weight:700 !important}`;

  function installInto(root){
    try{
      const isDoc = root.nodeType===9;
      const headLike = isDoc ? root.head : root; // Document면 head, ShadowRoot면 자기 자신
      if(!headLike || headLike.querySelector('#sd-font-lock')) return;
      const style = (isDoc?root:document).createElement('style');
      style.id='sd-font-lock';
      style.textContent=CSS_TEXT;
      headLike.appendChild(style);
    }catch(_){}
  }

  // 1) 폰트 준비 후 문서에 잠금
  document.fonts.ready.then(()=>installInto(document));

  // 2) 이미 열린 ShadowRoot들
  Array.from(document.querySelectorAll('*')).forEach(el=>{ if(el.shadowRoot) installInto(el.shadowRoot); });

  // 3) 이후 생성될 ShadowRoot 감시
  const _attachShadow = Element.prototype.attachShadow;
  Element.prototype.attachShadow = function(init){
    const root = _attachShadow.call(this, init);
    Promise.resolve().then(()=>installInto(root));
    return root;
  };

  // 4) 동일 출처 iframe에도 잠금 (유튜브 등 교차출처는 접근 불가)
  function installIntoFrame(frame){
    try{
      const doc = frame.contentDocument; if(!doc) return;
      const go = ()=>installInto(doc);
      if(doc.readyState==='complete' || doc.readyState==='interactive') go();
      else frame.addEventListener('load', go, {once:true});
    }catch(_){}
  }
  Array.from(document.querySelectorAll('iframe')).forEach(installIntoFrame);
  new MutationObserver(m=>{ m.forEach(x=>x.addedNodes.forEach(n=>{ if(n.tagName==='IFRAME') installIntoFrame(n); })); }).observe(document.documentElement,{childList:true,subtree:true});
})();
/* ===================================================================== */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
