// src/components/Nav.jsx
import React from 'react'
import { supabase } from '@/lib/supabaseClient.js'

export default function Nav({ active }) {
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data:{ session } }) => setUser(session?.user ?? null))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null))
    return () => sub?.subscription?.unsubscribe()
  }, [])

  const go = (href) => { window.location.href = href }
  const onLogin = () => go('/login.html')
  const onLogout = async () => { await supabase.auth.signOut(); go('/') }

  return (
    <nav className="kj-nav">
      <div className="kj-wrap">
        <a className="brand" href="/">KIMIJI<br/>STUDIO</a>
        <div className="links">
          <a href="/" className={active==='portfolio'?'on':''}>포트폴리오</a>
          <a href="/community.html" className={active==='community'?'on':''}>커뮤니티</a>
          <a href="/#about" className={active==='about'?'on':''}>About</a>
        </div>
        <div className="actions">
          {user
            ? <button className="ghost" onClick={onLogout}>로그아웃</button>
            : <button className="ghost" onClick={onLogin}>로그인</button>
          }
          <a className="cta" href="#" onClick={(e)=>e.preventDefault()}>제작하기</a>
        </div>
      </div>

      <style>{`
        .kj-nav{position:sticky;top:0;z-index:50;background:#000;color:#fff}
        .kj-wrap{max-width:980px;margin:0 auto;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;gap:16px}
        .brand{font-weight:900;line-height:1;text-decoration:none;color:#fff}
        .links{display:flex;gap:18px}
        .links a{color:#fff;opacity:.9;text-decoration:none}
        .links a.on{font-weight:800}
        .actions{display:flex;gap:8px;align-items:center}
        .ghost{background:transparent;border:1px solid rgba(255,255,255,.3);border-radius:999px;color:#fff;padding:8px 14px}
        .cta{display:inline-block;background:#fff;color:#000;border-radius:999px;padding:8px 14px;font-weight:800;text-decoration:none}
      `}</style>
    </nav>
  )
}
