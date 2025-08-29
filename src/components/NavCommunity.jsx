// src/components/Nav.jsx
import React from "react";
import { supabase } from "@/lib/supabaseClient.js";

export default function Nav() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub?.subscription?.unsubscribe?.();
  }, []);

  const isCommunity = typeof window !== "undefined" && location.pathname.includes("community");
  const ctaLabel = isCommunity ? "업로드" : "제작하기";

  async function onCtaClick(e) {
    e.preventDefault();
    if (!isCommunity) {
      // 홈/어바웃 등에서는 제작하기 눌러도 아무 동작 안 함 (요청사항)
      return;
    }
    // 커뮤니티에서만 "업로드" 동작
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      const next = encodeURIComponent(location.pathname);
      location.href = `/auth/login.html?next=${next}`;
      return;
    }
    window.dispatchEvent(new CustomEvent("open-upload"));
  }

  function go(url) {
    location.href = url;
  }

  async function logout() {
    await supabase.auth.signOut();
    location.href = "/";
  }

  return (
    <header className="kj-nav">
      <div className="kj-nav__inner">
        <a className="brand" href="/">KIMIJI<br/>STUDIO</a>
        <nav className="links" aria-label="주 메뉴">
          <a href="/portfolio.html">포트폴리오</a>
          <a href="/community.html">커뮤니티</a>
          <a href="/about.html">About</a>
        </nav>
        <div className="actions">
          {user
            ? <button className="btn-outlined" onClick={logout}>로그아웃</button>
            : <button className="btn-outlined" onClick={()=>go(`/auth/login.html?next=${encodeURIComponent(location.pathname)}`)}>로그인</button>}
          <button className="btn-solid" onClick={onCtaClick}>{ctaLabel}</button>
        </div>
      </div>

      <style>{`
        .kj-nav{position:sticky;top:0;z-index:1000;background:#0b0b0b;color:#fff;border-bottom:1px solid rgba(255,255,255,.08)}
        .kj-nav__inner{max-width:1064px;margin:0 auto;display:flex;align-items:center;gap:16px;padding:14px 16px}
        .brand{font-weight:900;line-height:1;letter-spacing:.5px;text-decoration:none;color:#fff}
        .links{display:flex;gap:20px;margin-left:24px}
        .links a{color:#fff;text-decoration:none;opacity:.9}
        .links a:hover{opacity:1}
        .actions{margin-left:auto;display:flex;gap:10px;align-items:center}
        .btn-outlined{background:transparent;border:1px solid rgba(255,255,255,.35);color:#fff;border-radius:999px;padding:8px 14px;font-weight:800}
        .btn-solid{background:#fff;color:#000;border:0;border-radius:999px;padding:8px 16px;font-weight:900}
        @media(max-width:640px){
          .links{gap:14px;margin-left:10px}
          .brand{font-size:16px}
        }
      `}</style>
    </header>
  );
}
