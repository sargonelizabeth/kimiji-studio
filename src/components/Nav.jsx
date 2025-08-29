// src/components/Nav.jsx
import React from "react";
import { supabase } from "@/lib/supabaseClient.js";

export default function Nav({ ctaLabel = "제작하기", ctaHref = "/upload.html" }) {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    let sub;
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      sub = supabase.auth.onAuthStateChange((_evt, session) => {
        setUser(session?.user ?? null);
      });
    })();
    return () => sub?.data?.subscription?.unsubscribe?.();
  }, []);

  const onLoginClick = (e) => {
    e.preventDefault();
    if (user) {
      supabase.auth.signOut().then(() => {
        // 로그아웃 후 홈으로
        location.href = "/";
      });
    } else {
      location.href = "/signup.html";
    }
  };

  // 업로드 버튼은 전역 커스텀이벤트를 쏴서
  // 각 페이지에서 숨겨둔 input[type=file]을 클릭하도록 통일
  const onUploadClick = (e) => {
    e.preventDefault();
    if (!user) {
      location.href = "/signup.html";
      return;
    }
    window.dispatchEvent(new CustomEvent("open-upload"));
  };

  return (
    <header className="kj-nav">
      <nav className="kj-nav__inner">
        <a className="brand" href="/"><strong>KIMIJI</strong>&nbsp;STUDIO</a>

        <ul className="links">
          <li><a href="/#portfolio">포트폴리오</a></li>
          <li><a href="/community.html">커뮤니티</a></li>
          <li><a href="/#about">About</a></li>
        </ul>

        <div className="right">
          <button className="btn ghost" onClick={onLoginClick}>
            {user ? "로그아웃" : "로그인"}
          </button>

          {/* 커뮤니티에서는 “업로드”, 그 외는 “제작하기” 표기해도 됨 */}
          <a className="btn solid" href={ctaHref} onClick={ctaHref === "#upload" ? onUploadClick : undefined}>
            {ctaLabel}
          </a>
        </div>
      </nav>

      <style>{`
        .kj-nav{position:sticky;top:0;background:#2f2416;color:#fff;z-index:50}
        .kj-nav__inner{max-width:1100px;margin:0 auto;display:flex;align-items:center;gap:14px;padding:10px 14px}
        .brand{color:#fff;text-decoration:none;font-weight:900;letter-spacing:.5px;white-space:nowrap}
        .links{display:flex;gap:14px;list-style:none;margin:0;padding:0}
        .links a{color:#fff;text-decoration:none;opacity:.95}
        .links a:hover{opacity:1;text-decoration:underline}
        .right{margin-left:auto;display:flex;gap:10px;align-items:center}
        .btn{border-radius:999px;padding:8px 14px;font-weight:800;cursor:pointer;white-space:nowrap}
        .btn.ghost{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.35)}
        .btn.solid{background:#fff;color:#111;border:0}
        @media(max-width:640px){
          .links{gap:10px}
          .kj-nav__inner{gap:10px}
          .btn{padding:7px 12px}
        }
      `}</style>
    </header>
  );
}
