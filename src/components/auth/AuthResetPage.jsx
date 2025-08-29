// src/components/auth/AuthResetPage.jsx
import React from 'react'
import { supabase } from '@/lib/supabaseClient.js'

export default function AuthResetPage(){
  const [email,setEmail] = React.useState('')
  const [sent,setSent]   = React.useState(false)

  async function sendReset(e){
    e.preventDefault()
    const redirectTo = `${window.location.origin}/login.html`
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })
    if(error){ alert(error.message); return }
    setSent(true)
  }

  return (
    <section className="auth">
      <div className="panel">
        <h1>아이디/비밀번호 찾기</h1>
        {sent ? (
          <p>재설정 메일을 보냈습니다. 메일함을 확인해주세요.</p>
        ) : (
          <form onSubmit={sendReset}>
            <label>가입 이메일<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label>
            <button className="primary">재설정 메일 보내기</button>
          </form>
        )}
      </div>
      <style>{panelCss}</style>
    </section>
  )
}

const panelCss = `
  .auth{min-height:calc(100vh - 64px);display:flex;align-items:flex-start;justify-content:center;padding:24px}
  .panel{width:100%;max-width:520px;background:#111;border:1px solid rgba(255,255,255,.14);border-radius:16px;padding:20px;color:#fff}
  h1{margin:0 0 12px}
  form{display:grid;gap:10px}
  label{display:grid;gap:6px;font-weight:600}
  input{width:100%;border:1px solid rgba(255,255,255,.25);background:#000;color:#fff;border-radius:10px;padding:12px}
  .primary{margin-top:6px;width:100%;padding:12px;border-radius:999px;border:0;background:#fff;color:#111;font-weight:800}
`
