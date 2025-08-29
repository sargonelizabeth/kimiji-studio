// src/components/Nav.jsx
import React from "react";
import { supabase } from "@/lib/supabaseClient.js";

export default function Nav() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
    return () => sub?.subscription?.unsubscribe?.();
  }, []);

  const goto = (href) => (e) => {
    e.preventDefault();
    window.location.href = href;
  };

  const onLogin = (e) => {
    e.preventDefault();
    const back = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.href = `/login.html?back=${back}`;
  };

  const onLogout = async (e) => {
    e.preventDefault();
    await supabase.auth.signOut();
    window.location.reload();
  };

  // 요청사항: "제작하기"는 어떤 페이지에서도 파일선택기를 열지 않음
  const onCta = (e) => {
    e.preventDefault();
    // no-op
  };

  return (
    <header className="kj-nav">
      <nav className="kj-nav-inner">
        <a href="/" onClick={goto("/")} className="brand">KIMIJI<br/>STUDIO</a>

        <div className="links">
          <a href="/#portfolio" onClick={goto("/#portfolio")}>포트폴리오</a>
          <a href="/community.html" onClick={goto("/community.html")}>커뮤니티</a>
          <a href="/#about" onClick={goto("/#about")}>About</a>
        </div>

        <div className="right">
          {user
            ? <a href="#" onClick={onLogout} className="btn ghost">로그아웃</a>
            : <a href="/login.html" onClick={onLogin} className="btn ghost">로그인</a>
          }
          <a href="#" onClick={onCta} className="btn solid">제작하기</a>
        </div>
      </nav>

      {/* 최소한의 nav 스타일 (기존 테마와 조화되도록) */}
      <style>{`
        .kj-nav{position:sticky;top:0;z-index:50;background:#0b0b0b;color:#fff}
        .kj-nav-inner{max-width:1040px;margin:0 auto;display:flex;align-items:center;gap:16px;padding:14px 16px}
        .brand{font-weight:900;line-height:1;letter-spacing:1px;color:#fff;text-decoration:none}
        .links{display:flex;gap:18px;margin-left:8px}
        .links a{color:#fff;text-decoration:none;opacity:.9}
        .links a:hover{opacity:1}
        .right{margin-left:auto;display:flex;gap:10px}
        .btn{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;padding:8px 14px;font-weight:800;text-decoration:none}
        .btn.ghost{background:transparent;border:1px solid rgba(255,255,255,.3);color:#fff}
        .btn.solid{background:#fff;color:#000;border:0}
      `}</style>
    </header>
  );
}
