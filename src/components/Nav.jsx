// src/components/Nav.jsx
import React from "react";
import { supabase } from "@/lib/supabaseClient.js";

/**
 * 공통 네비게이션
 * - 좌측 브랜드 / 우측 로그인|로그아웃
 * - 하단 메뉴(포트폴리오, 커뮤니티, About) + 우측 CTA
 * - onCtaClick이 있으면 링크 대신 버튼으로 렌더링하여 파일 피커를 직접 호출
 */
export default function Nav({
  ctaLabel = "제작하기",
  ctaHref = "/upload.html",
  onCtaClick, // 커뮤니티에서 업로드 피커 열 때 전달
}) {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) =>
      setUser(session?.user ?? null)
    );
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) =>
      setUser(session?.user ?? null)
    );
    return () => sub?.subscription?.unsubscribe?.();
  }, []);

  const signOut = async (e) => {
    e.preventDefault();
    await supabase.auth.signOut();
    // 상태 바로 반영
    setUser(null);
    // 필요시 홈으로
    if (location.pathname.includes("community")) {
      location.href = "/";
    }
  };

  const handleCta = (e) => {
    if (onCtaClick) {
      e.preventDefault();
      onCtaClick(); // iOS 사용자 제스처 체인 유지
    }
  };

  return (
    <header className="site-nav" role="banner">
      <div className="nav-top kj-container">
        <a href="/" className="brand" aria-label="KIMIJI STUDIO 홈">KIMIJI STUDIO</a>
        {user ? (
          <a href="#" onClick={signOut} className="login-link">로그아웃</a>
        ) : (
          <a href="/signup.html" className="login-link">로그인</a>
        )}
      </div>

      <nav className="nav-bottom kj-container" aria-label="주요 메뉴">
        <ul className="nav-links" role="list">
          <li><a href="/#portfolio" className="nav-link">포트폴리오</a></li>
          <li><a href="/community.html" className="nav-link">커뮤니티</a></li>
          <li><a href="/#about" className="nav-link">About</a></li>
        </ul>

        <div className="cta-wrap">
          {onCtaClick ? (
            <button type="button" className="btn btn-cta" onClick={handleCta}>
              {ctaLabel}
            </button>
          ) : (
            <a href={ctaHref} className="btn btn-cta">{ctaLabel}</a>
          )}
        </div>
      </nav>

      <style>{`
        .kj-container{max-width:1100px;margin:0 auto;padding:0 16px}
        .site-nav{position:sticky;top:0;z-index:40;background:#000;color:#fff}
        .nav-top,.nav-bottom{display:flex;align-items:center;justify-content:space-between}
        .nav-top{height:48px}
        .brand{font-weight:900;letter-spacing:1px;text-decoration:none;color:#fff;font-size:18px;line-height:1}
        .login-link{font-weight:700;text-decoration:none;color:#fff;opacity:.95}
        .nav-bottom{height:52px;border-top:1px solid rgba(255,255,255,.12)}
        .nav-links{display:flex;gap:18px;margin:0;padding:0;list-style:none}
        .nav-link{display:inline-block;padding:10px 8px;text-decoration:none;color:#fff;font-weight:700;opacity:.95}
        .cta-wrap{display:flex;align-items:center}
        .btn{display:inline-flex;align-items:center;justify-content:center;border:0;cursor:pointer}
        .btn-cta{min-height:36px;padding:8px 16px;border-radius:999px;background:#fff;color:#1b1b1b;font-weight:800;font-size:14px;line-height:1}
        @media (max-width:640px){
          .brand{font-size:16px}
          .nav-links{gap:10px}
          .nav-link{padding:8px 6px;font-size:14px}
          .btn-cta{padding:8px 14px;font-size:14px}
          .nav-top{height:44px}
          .nav-bottom{height:48px}
        }
      `}</style>
    </header>
  );
}
