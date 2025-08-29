import React from "react";
import { supabase } from "@/lib/supabaseClient.js";

export default function Nav() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    let alive = true;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (alive) setUser(session?.user ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (alive) setUser(session?.user ?? null);
    });
    return () => {
      alive = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    window.location.replace("/"); // 홈으로
  }

  return (
    <header className="kj-nav">
      <div className="inner">
        <a className="brand" href="/">KIMIJI<br/>STUDIO</a>

        <nav className="links">
          <a href="/#portfolio">포트폴리오</a>
          <a href="/community.html">커뮤니티</a>
          <a href="/#about">About</a>
        </nav>

        <div className="actions">
          {user
            ? <button className="btn ghost" onClick={logout} aria-label="로그아웃">로그아웃</button>
            : <a className="btn ghost" href="/login.html">로그인</a>}
          {/* 제작하기: 파일 선택기 절대 열지 않음 */}
          <a className="btn cta" href="/#pricing">제작하기</a>
        </div>
      </div>

      <style>{`
        .kj-nav{position:sticky;top:0;z-index:50;background:#000;color:#fff;border-bottom:1px solid rgba(255,255,255,.08)}
        .kj-nav .inner{max-width:1100px;height:64px;margin:0 auto;padding:0 16px;display:flex;align-items:center;justify-content:space-between;gap:16px}
        .brand{font-weight:900;line-height:1;display:inline-block;color:#fff;text-decoration:none;white-space:nowrap}
        .links{display:flex;gap:20px;align-items:center;white-space:nowrap}
        .links a{color:#fff;text-decoration:none;opacity:.9}
        .links a:hover{opacity:1}
        .actions{display:flex;gap:10px;align-items:center;white-space:nowrap}
        .btn{display:inline-flex;align-items:center;justify-content:center;height:40px;padding:0 14px;border-radius:999px;font-weight:800;text-decoration:none;cursor:pointer}
        .btn.ghost{background:transparent;border:1px solid rgba(255,255,255,.25);color:#fff}
        .btn.cta{background:#fff;color:#000;border:0}
        @media (max-width:420px){ .links{gap:14px} .kj-nav .inner{height:58px} }
      `}</style>
    </header>
  );
}
