// src/components/auth/AuthLoginPage.jsx
import React from 'react'
import { supabase } from '@/lib/supabaseClient.js'

export default function AuthLoginPage(){
  const [email,setEmail] = React.useState('')
  const [password,setPassword] = React.useState('')
  const [busy,setBusy] = React.useState(false)

  async function handleEmailLogin(e){
    e.preventDefault(); setBusy(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setBusy(false)
    if(error){ alert(error.message); return }
    window.location.href='/community.html'
  }

  async function handleGoogle(){
    const redirectTo = `${window.location.origin}/community.html`
    const { error } = await supabase.auth.signInWithOAuth({
      provider:'google',
      options:{ redirectTo }
    })
    if(error) alert(error.message)
  }

  return (
    <section className="auth">
      <div className="panel">
        <h1>로그인</h1>
        <button className="google" onClick={handleGoogle}>Google로 계속하기</button>
        <div className="or">또는</div>
        <form onSubmit={handleEmailLogin}>
          <label>이메일<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required /></label>
          <label>비밀번호<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></label>
          <button className="primary" disabled={busy}>{busy?'로그인 중...':'로그인'}</button>
        </form>
        <div className="links">
          <a href="/signup.html">회원가입</a>
          <span> · </span>
          <a href="/reset.html">아이디/비밀번호 찾기</a>
        </div>
      </div>

      <style>{panelCss}</style>
    </section>
  )
}

const panelCss = `
  .auth{min-height:calc(100vh - 64px);display:flex;align-items:flex-start;justify-content:center;padding:24px}
  .panel{width:100%;max-width:520px;background:#111;border:1px solid rgba(255,255,255,.14);border-radius:16px;padding:20px;color:#fff}
  h1{margin:0 0 12px}
  .google{width:100%;padding:12px;border-radius:999px;border:0;background:#fff;color:#111;font-weight:800}
  .or{opacity:.7;text-align:center;margin:14px 0}
  form{display:grid;gap:10px}
  label{display:grid;gap:6px;font-weight:600}
  input{width:100%;border:1px solid rgba(255,255,255,.25);background:#000;color:#fff;border-radius:10px;padding:12px}
  .primary{margin-top:6px;width:100%;padding:12px;border-radius:999px;border:0;background:#fff;color:#111;font-weight:800}
  .links{margin-top:10px;text-align:center}
  .links a{color:#fff}
`
