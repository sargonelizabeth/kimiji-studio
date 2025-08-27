import React from "react"
import { supabase } from "@/lib/supabaseClient.js"

export default function NavPure({ ctaLabel = "제작하기", ctaHref = "/upload.html" }) {
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data:{ session } }) => setUser(session?.user ?? null))
    supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null))
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

  return (
    <header className="site-nav">
      <div className="nav-top container">
        <a href="/" className="brand" aria-label="KIMIJI STUDIO 홈으로">KIMIJI STUDIO</a>
        <a href="#" className="login-link" onClick={onAuth}>{user ? "로그아웃" : "로그인"}</a>
      </div>
      <nav className="nav-bottom container" aria-label="주요 메뉴">
        <ul className="nav-links">
          <li><a href="/#portfolio" className="nav-link">포트폴리오</a></li>
          <li><a href="/community.html" className="nav-link">커뮤니티</a></li>
          <li><a href="/#about" className="nav-link">About</a></li>
          <li><a href={ctaHref} id="nav-cta" className="btn btn-cta">{ctaLabel}</a></li>
        </ul>
      </nav>

      <style>{`
        .site-nav{position:sticky;top:0;z-index:1000;background:rgba(0,0,0,.75);backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,.12)}
        .container{max-width:1200px;margin:0 auto;padding:10px 20px}
        .nav-top{display:flex;align-items:center;justify-content:space-between;padding:8px 0}
        .brand{color:#fff;text-decoration:none;font-weight:800;letter-spacing:.08em;font-size:clamp(16px,2vw,20px)}
        .login-link{color:#fff;text-decoration:none;font-weight:700;padding:8px 10px;border-radius:10px}
        .login-link:hover{background:rgba(255,255,255,.1)}
        .nav-bottom{padding:6px 0 14px}
        .nav-links{list-style:none;display:flex;gap:10px;padding:0;margin:0;flex-wrap:wrap}
        .nav-link{color:#fff;text-decoration:none;padding:10px 12px;border-radius:10px;font-weight:700}
        .nav-link:hover{background:rgba(255,255,255,.10)}
        .btn{border:1px solid transparent;padding:10px 14px;border-radius:12px;font-weight:800;text-decoration:none;display:inline-block}
        .btn-cta{background:#fff;color:#000}
        .btn-cta:hover{filter:brightness(.96)}
        @media (max-width:720px){.nav-links{row-gap:8px}.nav-top{padding-bottom:6px}}
      `}</style>
    </header>
  )
}
