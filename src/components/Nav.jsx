import React from "react";
import { supabase } from "@/lib/supabaseClient.js";

/**
 * page: 'home' | 'community' | 'auth'
 *  - home/auth 에서는 CTA = "제작하기" (아무 동작 X)
 *  - community 에서는 CTA = "업로드" (로그인 시 파일선택 열림)
 */
export default function Nav({ page = "home" }) {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
    return () => sub?.subscription?.unsubscribe?.();
  }, []);

  const ctaLabel = page === "community" ? "업로드" : "제작하기";

  function onCta(e) {
    e.preventDefault();
    if (page === "community") {
      if (!user) {
        const next = "/community.html";
        window.location.href = `/login.html?next=${encodeURIComponent(next)}`;
        return;
      }
      // 커뮤니티에서만 업로드 열기
      window.dispatchEvent(new CustomEvent("open-upload"));
    }
    // home/auth 에서는 “제작하기”는 동작 없음(요청사항)
  }

  async function onLoginLogout() {
    if (user) {
      await supabase.auth.signOut();
      window.location.replace("/");
    } else {
      const here = window.location.pathname.endsWith(".html") ? window.location.pathname : "/index.html";
      window.location.href = `/login.html?next=${encodeURIComponent(here)}`;
    }
  }

  return (
    <header className="kj-nav">
      <div className="row">
        <a className="brand" href="/index.html" aria-label="KIMIJI STUDIO">KIMIJI<br/>STUDIO</a>

        <nav className="tabs" aria-label="primary">
          <a href="/index.html#portfolio">포트폴리오</a>
          <a href="/community.html">커뮤니티</a>
          <a href="/about.html">About</a>
        </nav>

        <div className="right">
          <button className={`btn ${user ? "outline" : "outline"}`} onClick={onLoginLogout}>
            {user ? "로그아웃" : "로그인"}
          </button>
          <button className="btn cta" onClick={onCta}>{ctaLabel}</button>
        </div>
      </div>

      <style>{`
        .kj-nav{position:sticky;top:0;z-index:20;background:#000;color:#fff;border-bottom:1px solid rgba(255,255,255,.08)}
        .kj-nav .row{max-width:1040px;margin:0 auto;padding:12px 16px;display:flex;align-items:center;gap:18px}
        .brand{font-weight:900;line-height:0.92;letter-spacing:0.5px;color:#fff;text-decoration:none;font-size:20px}
        .tabs{display:flex;gap:18px;margin-left:8px;flex:1}
        .tabs a{color:#fff;text-decoration:none;opacity:.9}
        .tabs a:hover{opacity:1;text-decoration:underline}
        .right{display:flex;gap:10px}
        .btn{border-radius:14px;padding:10px 16px;font-weight:800;cursor:pointer;border:1px solid rgba(255,255,255,.22);background:transparent;color:#fff}
        .btn.cta{background:#fff;color:#000;border-color:#fff}
        .btn:active{transform:translateY(1px)}
        @media (max-width:440px){
          .tabs{gap:12px}
          .btn{padding:8px 12px;border-radius:12px}
          .brand{font-size:18px}
        }
      `}</style>
    </header>
  );
}
