// src/components/Nav.jsx
import React from "react";
import { supabase } from "@/lib/supabaseClient.js";

export default function Nav() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => data?.subscription?.unsubscribe?.();
  }, []);

  async function onLoginClick() {
    if (user) {
      await supabase.auth.signOut();
      location.reload();
    } else {
      location.href = "/signup.html";
    }
  }

  return (
    <header className="kj-nav">
      <div className="inner">
        <a className="brand" href="/">KIMIJI<br/>STUDIO</a>
        <nav className="links">
          <a href="/">포트폴리오</a>
          <a href="/community.html">커뮤니티</a>
          <a href="#about">About</a>
        </nav>
        <div className="actions">
          <button className="login" onClick={onLoginClick}>{user ? "로그아웃" : "로그인"}</button>
          <a className="cta" href="/upload.html">제작하기</a>
        </div>
      </div>
      <style>{`
        .kj-nav{position:sticky;top:0;z-index:50;background:#18120c;color:#fff;border-bottom:1px solid rgba(255,255,255,.08)}
        .kj-nav .inner{max-width:980px;margin:0 auto;height:56px;display:flex;align-items:center;gap:14px;padding:0 12px}
        .brand{font-weight:900;line-height:0.9;color:#fff;text-decoration:none}
        .links{display:flex;gap:18px;margin-left:8px}
        .links a{color:#fff;text-decoration:none;opacity:.9}
        .links a:hover{opacity:1}
        .actions{margin-left:auto;display:flex;gap:10px}
        .login{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:7px 12px;font-weight:800}
        .cta{background:#fff;color:#111;border-radius:999px;padding:8px 14px;font-weight:900;text-decoration:none}
        @media(max-width:480px){
          .kj-nav .inner{height:52px}
          .links{gap:14px}
          .cta{padding:8px 12px}
        }
      `}</style>
    </header>
  );
}
