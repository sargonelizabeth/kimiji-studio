// src/components/NavPure.jsx
import React from 'react'
import { supabase } from '@/lib/supabaseClient.js'

export default function NavPure() {
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null))
    return () => sub?.subscription?.unsubscribe?.()
  }, [])

  const onLoginClick = (e) => {
    e.preventDefault()
    window.location.href = '/signup.html'
  }

  const onLogoutClick = async (e) => {
    e.preventDefault()
    await supabase.auth.signOut()
    window.location.reload()
  }

  const isCommunity = typeof window !== 'undefined' && window.location.pathname.endsWith('/community.html')
  const ctaLabel = isCommunity ? '업로드' : '제작하기'

  const onCtaClick = (e) => {
    if (isCommunity) {
      // 같은 페이지에 있는 숨김 파일 입력 그대로 클릭(모바일 대응)
      const input = document.getElementById('community-file-input')
      if (input) {
        e.preventDefault()
        input.click()
        return
      }
    }
    // 그 외엔 업로드 페이지로 이동
    // (회원가드 없이 진입, 페이지 안에서 다시 가드)
    window.location.href = '/upload.html'
  }

  return (
    <header className="kj-nav">
      <div className="kj-nav-top">
        <a className="brand" href="/" aria-label="KIMIJI STUDIO 홈">KIMIJI STUDIO</a>
        {user ? (
          <a href="#" className="login" onClick={onLogoutClick}>로그아웃</a>
        ) : (
          <a href="/signup.html" className="login" onClick={onLoginClick}>로그인</a>
        )}
      </div>

      <nav className="kj-nav-bottom" aria-label="주요 메뉴">
        <ul className="links">
          <li><a className="link" href="/#portfolio">포트폴리오</a></li>
          <li><a className="link" href="/community.html">커뮤니티</a></li>
          <li><a className="link" href="/#about">About</a></li>
          <li><a className="btn-cta" href="/upload.html" onClick={onCtaClick}>{ctaLabel}</a></li>
        </ul>
      </nav>

      <style>{`
        .kj-nav{position:sticky;top:0;z-index:1000;background:rgba(0,0,0,.55);backdrop-filter:blur(8px);border-bottom:1px solid rgba(255,255,255,.08)}
        .kj-nav-top{max-width:1200px;margin:0 auto;padding:10px 20px;display:flex;align-items:center;justify-content:space-between}
        .brand{color:#fff;text-decoration:none;font-weight:800;letter-spacing:.08em}
        .login{color:#fff;text-decoration:none;font-weight:700;padding:8px 10px;border-radius:10px}
        .login:hover{background:rgba(255,255,255,.1)}
        .kj-nav-bottom{max-width:1200px;margin:0 auto;padding:0 20px 12px}
        .links{list-style:none;display:flex;gap:10px;margin:0;padding:0;flex-wrap:wrap}
        .link{color:#fff;text-decoration:none;padding:10px 12px;border-radius:10px;font-weight:700}
        .link:hover{background:rgba(255,255,255,.10)}
        .btn-cta{margin-left:auto;background:#fff;color:#000;border:0;border-radius:12px;padding:10px 14px;font-weight:800;text-decoration:none}
        .btn-cta:hover{filter:brightness(.96)}
        @media(max-width:720px){.links{row-gap:8px}}
      `}</style>
    </header>
  )
}
