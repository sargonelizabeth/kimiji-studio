import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "../providers/AuthProvider.jsx";
import CommunityPage from "../pages/Community.jsx";
import NavCommunity from "../components/NavCommunity.jsx";
import "../index.css";

/** 전역 에러가 나면 화면에 빨간 경고를 직접 출력 */
function hookGlobalErrors() {
  const rootEl = document.getElementById("root");
  const show = (title, err) => {
    if (!rootEl) return;
    const msg = (err && (err.stack || err.message || String(err))) || "";
    rootEl.innerHTML = `
      <div style="padding:16px;font-family:system-ui,Segoe UI,Apple SD Gothic Neo,Malgun Gothic,sans-serif;">
        <div style="color:#ff6b6b;font-weight:900;margin-bottom:8px">${title}</div>
        <pre style="white-space:pre-wrap;word-break:break-word;color:#ffb3b3;background:rgba(255,255,255,.06);padding:12px;border-radius:8px;max-height:40vh;overflow:auto;">${msg}</pre>
      </div>`;
  };
  window.addEventListener("error", (e) => show("런타임 에러", e.error || e.message));
  window.addEventListener("unhandledrejection", (e) => show("Unhandled Promise Rejection", e.reason));
}
hookGlobalErrors();

/** 리액트 에러바운더리 */
class ErrorBoundary extends React.Component {
  constructor(props){ super(props); this.state = { err: null }; }
  componentDidCatch(err) { this.setState({ err }); }
  render() {
    if (this.state.err) {
      return (
        <div style={{ padding:16 }}>
          <div style={{ color:"#ff6b6b", fontWeight:900, marginBottom:8 }}>React ErrorBoundary</div>
          <pre style={{ whiteSpace:"pre-wrap", wordBreak:"break-word" }}>
            {(this.state.err.stack || this.state.err.message || String(this.state.err))}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <>
      <NavCommunity />
      <CommunityPage />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </AuthProvider>
);

// 마운트 성공 시 “Loading…” 문구 제거 보장(혹시 스타일 캐시 남았을 때 대비)
setTimeout(() => {
  const el = document.getElementById("root");
  if (el && el.textContent && /Loading…?/i.test(el.textContent)) {
    el.textContent = ""; // React가 이미 렌더링하면 덮어쓴다
  }
}, 50);
