// src/components/Nav.jsx
import React from "react";
import { supabase } from "@/lib/supabaseClient.js";

export default function Nav() {
  const [user, setUser] = React.useState(null);
  // 커뮤니티 페이지에서만 '업로드' 버튼 노출
  const isCommunity =
    typeof window !== "undefined" && window.location.pathname.endsWith("/community.html");

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data?.session?.user ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub?.subscription?.unsubscribe?.();
  }, []);

  const goSignup = (e) => {
    e?.preventDefault?.();
    window.location.href = "/signup.html";
  };

  // '업로드'만 파일 선택기 오픈
  const openUpload = async (e) => {
    e?.preventDefault?.();
    const { data } = await supabase.auth.getSession();
    if (!data?.session?.user) return goSignup();
    window.dispatchEvent(new CustomEvent("open-upload"));
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <header className="kj-nav">
      <div className="wrap">
        <a className="brand" href="/">KIMIJI<br/>STUDIO</a>

        <nav className="links">
          <a href="/#portfolio">포트폴리오</a>
          <a href="/community.html">커뮤니티</a>
          <a href="/#about">About</a>
        </nav>

        <div className="right">
          {isCommunity && (
            <button className="pill strong" onClick={openUpload}>업로드</button>
          )}

          {user ? (
            <button className="pill" onClick={signOut}>로그아웃</button>
          ) : (
            <button className="pill" onClick={goSignup}>로그인</button>
          )}

          {/* 제작하기는 링크만, 파일 선택기 열지 않음 */}
          <a className="cta" href="/#pricing">제작하기</a>
        </div>
      </div>

      <style>{`
        .kj-nav{position:sticky;top:0;z-index:50;background:#0E0E0E;color:#fff}
        .wrap{max-width:1080px;margin:0 auto;display:flex;align-items:center;gap:18px;padding:12px 16px}
        .brand{font-weight:900;line-height:1;letter-spacing:.3px;color:#fff;text-decoration:none}
        .links{display:flex;gap:18px;margin-left:8px}
        .links a{color:#fff;opacity:.9;text-decoration:none}
        .right{margin-left:auto;display:flex;gap:10px;align-items:center}
        .pill{background:#1d1d1d;border:1px solid rgba(255,255,255,.15);color:#fff;padding:8px 14px;border-radius:999px;cursor:pointer}
        .pill.strong{background:#fff;color:#000;border:0;font-weight:800}
        .cta{background:#fff;color:#000;border-radius:999px;padding:10px 18px;font-weight:800;text-decoration:none;display:inline-flex;align-items:center}
        @media (max-width:640px){
          .wrap{gap:12px}
          .links{gap:12px}
        }
      `}</style>
    </header>
  );
}
