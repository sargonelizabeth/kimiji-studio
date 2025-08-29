// src/components/Nav.jsx
import React from 'react'
import { supabase } from '@/lib/supabaseClient.js'

export default function Nav(){
  const [user,setUser]=React.useState(null)

  React.useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>setUser(session?.user??null))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session)=>setUser(session?.user??null))
    return ()=>sub?.subscription?.unsubscribe?.()
  },[])

  function onLoginClick(e){
    e.preventDefault()
    const ret = encodeURIComponent(location.pathname+location.search)
    location.href = `/login.html?returnTo=${ret}`
  }
  async function onLogoutClick(e){
    e.preventDefault()
    await supabase.auth.signOut()
    location.reload()
  }

  return (
    <nav className="nav">
      <div className="inner">
        <a href="/" className="brand">KIMIJI STUDIO</a>

        <div className="links">
          <a href="/#portfolio">포트폴리오</a>
          <a href="/community.html">커뮤니티</a>
          <a href="/#about">About</a>
        </div>

        <div className="right">
          {user ? (
            <a href="#" onClick={onLogoutClick} className="btn ghost">로그아웃</a>
          ) : (
            <a href="#" onClick={onLoginClick} className="btn ghost">로그인</a>
          )}
          {/* 제작하기: 눌러도 아무 동작 없음(요청사항) */}
          <a href="#" onClick={e=>e.preventDefault()} className="btn cta">제작하기</a>
        </div>
      </div>

      <style>{`
        .nav{position:sticky;top:0;background:#000;color:#fff;z-index:1000}
        .inner{max-width:980px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:12px 16px}
        .brand{font-weight:900;color:#fff}
        .links{display:flex;gap:18px}
        .links a{color:#fff;opacity:.9}
        .right{display:flex;gap:10px}
        .btn{display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:999px;text-decoration:none;font-weight:800}
        .btn.ghost{border:1px solid rgba(255,255,255,.3);color:#fff}
        .btn.cta{background:#fff;color:#111;border:0}
      `}</style>
    </nav>
  )
}
