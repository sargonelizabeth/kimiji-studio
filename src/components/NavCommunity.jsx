import React from "react";

export default function NavCommunity() {
  return (
    <nav className="kj-nav">
      <div className="kj-container kj-nav__inner">
        <a href="/" className="kj-brand">KIMIJI STUDIO</a>
        <div className="kj-nav__links">
          <a href="/#works">포트폴리오</a>
          <a href="/community.html">커뮤니티</a>
          <a href="/upload.html">업로드</a>
        </div>
      </div>
      <style>{`
        .kj-nav{position:sticky;top:0;z-index:20;backdrop-filter:blur(10px);background:rgba(255,255,255,.6)}
        .kj-nav__inner{display:flex;align-items:center;justify-content:space-between;padding:10px 14px}
        .kj-brand{font-weight:800;text-decoration:none;color:#111}
        .kj-nav__links{display:flex;gap:14px;white-space:nowrap;overflow-x:auto}
        .kj-nav__links a{text-decoration:none;color:#111;font-weight:700}
      `}</style>
    </nav>
  );
}
