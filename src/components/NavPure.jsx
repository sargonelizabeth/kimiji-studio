// src/components/NavPure.jsx
import React from "react"
import { supabase } from "@/lib/supabaseClient.js"

export default function NavPure(){
  const [user,setUser]=React.useState(null)
  React.useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>setUser(session?.user ?? null))
    const { data:sub } = supabase.auth.onAuthStateChange((_e,s)=>setUser(s?.user ?? null))
    return ()=>sub?.subscription?.unsubscribe?.()
  },[])

  const isCommunity = typeof window!=="undefined" && window.location.pathname.includes("community.html")
  const ctaLabel = isCommunity ? "업로드" : "제작하기"

  async function onLogin(e){
    e.preventDefault()
    await supabase.auth.signInWithOAuth({
      provider:"google",
      options:{ redirectTo: `${window.location.origin}/community.html` }
    })
  }
  async function onLogout(e){
    e.preventDefault()
    await supabase.auth.signOut()
    window.location.reload()
  }

  async function onCTA(e){
    if(isCommunity){
      e.preventDefault()
      const { data:{ session } } = await supabase.auth.getSession()
      if(!session?.user){ window.location.href="/signup.html"; return }
      document.getElementById("community-file-input")?.click() // 커뮤니티 섹션의 input 호출
      return
    }
    // 홈/기타: 업로드 페이지로 이동
    // a 태그 기본동작 유지
  }

  return (
    <header className="site-nav" role="banner">
      <div className="nav-top container">
        <a href="/" className="brand" aria-label="KIMIJI STUDIO 홈">KIMIJI STUDIO</a>
        {user
          ? <a href="#" className="login" onClick={onLogout}>로그아웃</a>
          : <a href="#" className="login" onClick={onLogin}>로그인</a>}
      </div>

      <nav className="nav-bottom container" aria-label="주요 메뉴">
        <ul className="links">
          <li><a href="/#portfolio"  className="nav-link">포트폴리오</a></li>
          <li><a href="/community.html" className="nav-link">커뮤니티</a></li>
          <li><a href="/#about"      className="nav-link">About</a></li>
        </ul>
        <a
          href={isCommunity ? "#" : "/upload.html"}
          className="btn-cta"
          onClick={onCTA}
        >
          {ctaLabel}
        </a>
      </nav>

      <style>{`
        .site-nav{
          position:sticky;top:0;z-index:1000;
          background:rgba(0,0,0,.55);backdrop-filter:blur(10px);
          border-bottom:1px solid rgba(255,255,255,.08)
        }
        .container{max-width:1200px;margin:0 auto;padding:10px 20px}
        .nav-top{display:flex;align-items:center;justify-content:space-between}
        .brand{color:#fff;text-decoration:none;font-weight:800;letter-spacing:.08em;font-size:18px}
        .login{color:#fff;text-decoration:none;font-weight:700;padding:8px 10px;border-radius:10px}
        .login:hover{background:rgba(255,255,255,.10)}
        .nav-bottom{
          display:flex;align-items:center;gap:12px;
          padding:6px 20px 14px
        }
        .links{display:flex;gap:10px;list-style:none;margin:0;padding:0;flex:1}
        .nav-link{color:#fff;text-decoration:none;padding:10px 12px;border-radius:10px;font-weight:700;line-height:1;display:inline-flex;align-items:center;height:40px}
        .nav-link:hover{background:rgba(255,255,255,.10)}
        .btn-cta{
          background:#fff;color:#000;text-decoration:none;
          border-radius:12px;font-weight:800;
          display:inline-flex;align-items:center;justify-content:center;
          padding:0 16px;height:40px;min-width:108px; /* 과하게 커지지 않게 고정 */
          border:1px solid transparent
        }
        .btn-cta:hover{filter:brightness(.96)}
        @media (max-width:720px){
          .nav-bottom{padding-bottom:10px}
          .btn-cta{min-width:96px;height:38px}
          .nav-link{height:38px}
        }
      `}</style>
    </header>
  )
}
