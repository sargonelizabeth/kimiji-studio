import React from 'react'
import { supabase } from '@/lib/supabaseClient.js'

export default function Nav() {
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data:{ session } }) => setUser(session?.user ?? null))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null))
    return () => sub?.subscription?.unsubscribe?.()
  }, [])

  async function onAuthClick(e){
    e.preventDefault()
    if (user) {
      await supabase.auth.signOut()
      location.reload()
    } else {
      location.href = '/login.html'
    }
  }

  return (
    <header className="kj-nav">
      <nav className="inner">
        <a className="brand" href="/">KIMIJI<br/>STUDIO</a>
        <div className="links">
          <a href="/">포트폴리오</a>
          <a href="/community.html">커뮤니티</a>
          <a href="/about.html">About</a>
        </div>
        <div className="actions">
          <a href="#" className="auth" onClick={onAuthClick}>{user ? '로그아웃' : '로그인'}</a>
          {/* 제작하기는 파일 선택기와 무관. 아무 동작 없음 */}
          <a href="#" className="cta" onClick={e=>e.preventDefault()}>제작하기</a>
        </div>
      </nav>

      <style>{`
        .kj-nav{position:sticky;top:0;z-index:1000;background:#0b0b0b;color:#fff;border-bottom:1px solid rgba(255,255,255,.08)}
        .kj-nav .inner{max-width:1080px;margin:0 auto;padding:12px 16px;display:grid;grid-template-columns:auto 1fr auto;gap:16px;align-items:center}
        .brand{font-weight:900;line-height:0.95;letter-spacing:1px;text-decoration:none;color:#fff}
        .links{display:flex;gap:20px;justify-content:center}
        .links a{color:#fff;text-decoration:none;opacity:.9}
        .links a:hover{opacity:1}
        .actions{display:flex;gap:10px;align-items:center}
        .auth{display:inline-block;border:1px solid rgba(255,255,255,.2);padding:8px 14px;border-radius:999px;color:#fff;text-decoration:none}
        .cta{display:inline-block;background:#fff;color:#111;font-weight:800;padding:8px 16px;border-radius:999px;text-decoration:none}
        @media (max-width:640px){
          .kj-nav .inner{grid-template-columns:auto 1fr auto}
          .links{gap:12px;font-size:14px}
          .brand{font-size:16px}
        }
        /* Nav가 폼을 가리지 않도록 페이지 기본 상단 패딩 */
        body{margin:0}
        main, .page, .auth-shell, .community{padding-top:8px}
      `}</style>
    </header>
  )
}
