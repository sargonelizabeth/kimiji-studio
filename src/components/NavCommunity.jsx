import React from "react";

export default function NavCommunity() {
  return (
    <nav className="kj-nav">
      <div className="kj-container kj-nav__inner">
        <a href="/" className="kj-brand">KIMIJI STUDIO</a>
        <div className="kj-nav__links">
          <a href="/#works" className="kj-link">포트폴리오</a>
          <a href="/community.html" className="kj-link">커뮤니티</a>
          {/* 커뮤니티에선 '업로드'가 CTA */}
          <a href="/upload.html" className="btn btn--white">업로드</a>
        </div>
      </div>

      <style>{`
        .kj-nav{
          position:sticky; top:0; z-index:1000;
          background: rgba(0,0,0,.68);
          backdrop-filter: blur(8px);
        }
        .kj-nav__inner{display:flex; align-items:center; justify-content:space-between; padding:10px 14px;}
        .kj-brand{font-weight:800; text-decoration:none; color:#fff;}
        .kj-nav__links{display:flex; gap:12px; align-items:center; white-space:nowrap; overflow-x:auto;}
        .kj-link{color:#fff; text-decoration:none; font-weight:700;}
        .btn{display:inline-flex; align-items:center; justify-content:center;
          height:36px; padding:0 16px; border-radius:999px; border:1px solid transparent;
          font-weight:800; text-decoration:none; cursor:pointer; box-shadow:0 4px 12px rgba(0,0,0,.14);
        }
        .btn--white{background:#fff; color:#111; border-color:rgba(255,255,255,.15);}
      `}</style>
    </nav>
  );
}
