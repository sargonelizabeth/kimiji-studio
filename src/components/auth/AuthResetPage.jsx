import React from 'react'
import { supabase } from '@/lib/supabaseClient.js'
import Nav from '@/components/Nav.jsx'

export default function AuthResetPage(){
  const [email,setEmail]=React.useState('')
  const [msg,setMsg]=React.useState('')
  const [busy,setBusy]=React.useState(false)

  async function onSend(e){
    e.preventDefault()
    try{
      setBusy(true); setMsg('')
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/login.html'   // 메일의 링크 클릭 후 돌아올 위치
      })
      if(error){ setMsg(error.message); setBusy(false); return }
      setMsg('재설정 메일을 보냈습니다. 메일함을 확인해 주세요.')
      setBusy(false)
    }catch(e){ setMsg('전송 실패: '+(e?.message||e)); setBusy(false) }
  }

  return (
    <>
      <Nav/>
      <section className="auth-shell">
        <div className="card">
          <h1>아이디/비밀번호 찾기</h1>
          <form onSubmit={onSend}>
            <label>가입 이메일<input type="email" required value={email} onChange={e=>setEmail(e.target.value)} /></label>
            <button className="primary" disabled={busy}>재설정 메일 보내기</button>
          </form>
          {msg && <p className="msg">{msg}</p>}
        </div>
      </section>
      <style>{css}</style>
    </>
  )
}

const css = `
.auth-shell{display:flex;justify-content:center;padding:24px 16px}
.card{width:100%;max-width:560px;background:#121212;border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:16px;color:#fff}
label{display:flex;flex-direction:column;gap:6px}
input{border:1px solid rgba(255,255,255,.2);background:#0c0c0c;color:#fff;border-radius:10px;padding:12px}
.primary{background:#fff;color:#111;border:0;border-radius:12px;padding:12px;font-weight:800;margin-top:12px}
.msg{margin-top:10px;color:#ff8}
`
