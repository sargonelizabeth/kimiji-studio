// src/components/auth/AuthForgotPage.jsx
import React from 'react'
import { supabase } from '@/lib/supabaseClient.js'

export default function AuthForgotPage(){
  const [email,setEmail]=React.useState('')
  const [busy,setBusy]=React.useState(false)
  const [done,setDone]=React.useState(false)

  async function onSend(e){
    e.preventDefault()
    if(!email) return
    setBusy(true)
    const redirectTo = `${location.origin}/login.html`
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })
    setBusy(false)
    if(error){ alert(error.message||'메일 전송 실패'); return }
    setDone(true)
  }

  return (
    <section className="auth-card-wrap">
      <div className="auth-card">
        <h1 className="auth-title">아이디/비밀번호 찾기</h1>
        {done ? (
          <p>재설정 메일을 보냈어요. 메일함을 확인해주세요.</p>
        ) : (
          <form onSubmit={onSend} className="auth-form">
            <label className="lbl">가입 이메일
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
            </label>
            <button className="btn-primary" disabled={busy}>{busy?'전송 중...':'재설정 메일 보내기'}</button>
          </form>
        )}
      </div>
      <style>{`
        .auth-card-wrap{display:flex;justify-content:center;padding:80px 16px}
        .auth-card{width:100%;max-width:520px;background:#111;border:1px solid rgba(255,255,255,.14);
          border-radius:18px;color:#fff;padding:20px}
        .auth-title{margin:0 0 12px}
        .auth-form{display:flex;flex-direction:column;gap:12px}
        .lbl{display:flex;flex-direction:column;gap:6px}
        .lbl input{border:1px solid rgba(255,255,255,.25);background:transparent;color:#fff;border-radius:10px;padding:10px}
        .btn-primary{border:0;background:#fff;color:#111;border-radius:999px;padding:12px 18px;font-weight:800}
      `}</style>
    </section>
  )
}
