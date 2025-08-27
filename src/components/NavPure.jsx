import React from "react"
import { supabase } from "@/lib/supabaseClient.js"

export default function NavPure({ ctaLabel = "제작하기", ctaHref = "/upload.html" }) {
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data:{ session } }) => setUser(session?.user ?? null))
    const { data } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null))
    return () => data?.subscription?.unsubscribe?.()
  }, [])

  const onAuth = async (e) => {
    e.preventDefault()
    if (user) {
      await supabase.auth.signOut()
      window.location.reload()
    } else {
      window.location.href = "/signup.html"
    }
  }

  // ★ 여기 수정: 커뮤니티 업로드는 직접 파일 인풋 클릭
  const onCTA = async (e) => {
    if (ctaLabel === "업로드" && location.pathname.includes("community.html")) {
      e.preventDefault()
      const { data:{ session } } = await supabase.auth.getSession()
      if (!session?.user) { window.location.href = "/signup.html"; return }
      const el = document.getElementById("community-file-input")
      if (el) el.click()
      else window.location.href = "/upload.html" // 폴백
      return
    }
    // 일반 CTA
    // (홈 등에서는 그냥 이동)
    // e.g. 제작하기 → /upload.html
    // 앵커 태그 기본 동작 유지
  }

  return (
    <header className="site-nav">
      <div className="nav-top container">
        <a href="/" className="brand" aria-label="KIMIJI STUDIO 홈으로">KIMIJI STUDIO</a>
        <a href="#" className="login-link" onClick={onAuth}>{user ? "로그아웃" : "로그인"}</a>
      </div>

      <nav className="nav-bottom container" aria-label="주요 메뉴">
        <div className="nav-grid">
          <a href="/#portfolio" className="nav-item">포트폴리오</a>
          <a href="/community.html" className="nav-item">커뮤니티</a>
          <a href="/#about" className="nav-item">About</a>
          <a href={ctaHref} id="nav-cta" className="nav-item cta" onClick={onCTA}>{ctaLabel}</a>
        </div>
      </nav>

      <style>{`
        :root { --nav-h: 40px; --pad-x: 14px; }
        .site-nav{position:sticky;top:0;z-index:1000;background:#000;border-bottom:1px solid rgba(255,255,255,.12)}
        .container{max-width:1200px;margin:0 auto;padding:10px 16px}
        .nav-top{display:flex;align-items:center;justify-content:space-between;padding:6px 0}
        .brand{color:#fff;text-decoration:none;font-weight:800;letter-spacing:.08em;font-size:clamp(16px,2vw,20px)}
        .login-link{color:#fff;text-decoration:none;font-weight:700;padding:8px 10px;border-radius:10px}
        .login-link:hover{background:rgba(255,255,255,.10)}

        .nav-bottom{padding:4px 0 12px}
        .nav-grid{
          display:grid;
          grid-template-columns: repeat(4, 1fr);
          gap:8px;
          align-items:center;
        }
        .nav-item{
          display:flex;align-items:center;justify-content:center;
          height:var(--nav-h);
          color:#fff;text-decoration:none;font-weight:700;
          border-radius:10px; padding:0 var(--pad-x);
          background:rgba(255,255,255,.06);
        }
        .nav-item:hover{background:rgba(255,255,255,.12)}
        .nav-item.cta{
          background:#fff; color:#000; font-weight:800;
        }
        .nav-item.cta:hover{filter:brightness(.96)}

        @media (max-width:720px){
          .nav-grid{grid-template-columns: 1fr 1fr; gap:6px}
          .nav-item{height:38px}
        }
      `}</style>
    </header>
  )
}
