// src/components/auth/AuthLoginPage.jsx
import React from 'react'
import { supabase } from '@/lib/supabaseClient.js'

export default function AuthLoginPage() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [busy, setBusy] = React.useState(false)
  const returnTo = new URLSearchParams(location.search).get('returnTo') || '/'

  async function onGoogle() {
    try {
      // 로그인 성공 후 돌아올 페이지 (사이트 내 경로)
      const redirectTo = `${location.origin}${returnTo}`
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo }
      })
      // 구글 페이지로 이동됨
    } catch (e) {
      alert('Google 로그인 시작에 실패했어요.')
      console.error(e)
    }
  }

  async function onLogin(e) {
    e.preventDefault()
    if (!email || !password) return
    setBusy(true)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    setBusy(false)
    if (error) {
      alert(error.message || '로그인 실패')
      return
    }
    // 로그인 성공 → 돌아가기
    location.href = returnTo
  }

  return (
    <section className="auth-card-wrap">
      <div className="auth-card">
        <h1 className="auth-title">로그인</h1>

        <button className="btn-google" onClick={onGoogle}>Google로 계속하기</button>

        <div className="or">또는</div>

        <form onSubmit={onLogin} className="auth-form">
          <label className="lbl">이메일
            <input
              type="email" placeholder="you@example.com"
              value={email} onChange={e=>setEmail(e.target.value)} required
            />
          </label>
          <label className="lbl">비밀번호
            <input
              type="password" placeholder="********"
              value={password} onChange={e=>setPassword(e.target.value)} required
            />
          </label>
          <button className="btn-primary" disabled={busy}>{busy?'로그인 중...':'로그인'}</button>
        </form>

        <div className="links">
          <a href="/signup.html">회원가입</a>
          <span>·</span>
          <a href="/forgot.html">아이디/비밀번호 찾기</a>
        </div>
      </div>

      <style>{`
        .auth-card-wrap{display:flex;justify-content:center;padding:80px 16px}
        .auth-card{width:100%;max-width:520px;background:#111;border:1px solid rgba(255,255,255,.14);
          border-radius:18px;color:#fff;padding:20px}
        .auth-title{margin:0 0 12px}
        .btn-google{width:100%;border-radius:999px;border:0;padding:12px 16px;font-weight:800}
        .or{opacity:.7;text-align:center;margin:16px 0}
        .auth-form{display:flex;flex-direction:column;gap:12px}
        .lbl{display:flex;flex-direction:column;gap:6px}
        .lbl input{border:1px solid rgba(255,255,255,.25);background:transparent;color:#fff;border-radius:10px;padding:10px}
        .btn-primary{border:0;background:#fff;color:#111;border-radius:999px;padding:12px 18px;font-weight:800}
        .links{display:flex;gap:10px;justify-content:center;margin-top:12px;opacity:.9}
        .links a{color:#fff;text-decoration:underline}
      `}</style>
    </section>
  )
}
