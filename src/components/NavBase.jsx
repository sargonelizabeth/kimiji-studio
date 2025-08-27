import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient.js'
import '@/components/nav.css'

export default function NavBase({ ctaLabel='제작하기', ctaHref='/upload.html' }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    let mounted = true
    supabase.auth.getSession().then(({ data:{ session } }) => mounted && setUser(session?.user ?? null))
    const { data:{ subscription } } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null))
    return () => subscription?.unsubscribe?.()
  }, [])

  const here = typeof window !== 'undefined' ? (window.location.pathname + window.location.hash).toLowerCase() : ''
  const isActive = match => here.includes(match?.toLowerCase())

  const onAuth = async (e) => {
    e.preventDefault()
    if (user) {
      await supabase.auth.signOut()
      window.location.reload()
    } else {
      await supabase.auth.signInWithOAuth({
        provider:'google',
        options:{ redirectTo:`${window.location.origin}/community.html` }
      })
    }
  }

  return (
    <header className="site-nav">
      <div className="nav-top container">
        <a href="/" className="brand" aria-label="KIMIJI STUDIO 홈으로">KIMIJI STUDIO</a>
        <a href="#" id="login-link" className="login-link" onClick={onAuth}>{user ? '로그아웃' : '로그인'}</a>
      </div>
      <nav className="nav-bottom container" aria-label="주요 메뉴">
        <ul className="nav-links">
          <li><a href="/#portfolio" className="nav-link" data-active-match="#portfolio" aria-current={isActive('#portfolio')?'page':undefined}>포트폴리오</a></li>
          <li><a href="/community.html" className="nav-link" data-active-match="community.html" aria-current={isActive('community.html')?'page':undefined}>커뮤니티</a></li>
          <li><a href="/#about" className="nav-link" data-active-match="#about" aria-current={isActive('#about')?'page':undefined}>About</a></li>
          <li><a href={ctaHref} id="nav-cta" className="btn btn-cta">{ctaLabel}</a></li>
        </ul>
      </nav>
    </header>
  )
}
