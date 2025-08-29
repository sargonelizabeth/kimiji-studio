// src/components/auth/AuthSignupPage.jsx
import React from 'react'
import { supabase } from '@/lib/supabaseClient.js'

export default function AuthSignupPage(){
  const [form,setForm] = React.useState({
    nickname:'', name:'', email:'', password:'', confirm:'', phone:'', address:'', postal:''
  })
  const [busy,setBusy] = React.useState(false)

  const set = (k)=>(e)=>setForm({...form,[k]:e.target.value})

  async function handleGoogle(){
    const redirectTo = `${window.location.origin}/community.html`
    const { error } = await supabase.auth.signInWithOAuth({ provider:'google', options:{ redirectTo }})
    if(error) alert(error.message)
  }

  async function handleSubmit(e){
    e.preventDefault()
    if(form.password !== form.confirm){ alert('비밀번호가 일치하지 않습니다.'); return }
    setBusy(true)
    const { data, error } = await supabase.auth.signUp({
      email: form.email, password: form.password,
      options: { data: { nickname:form.nickname, name:form.name, phone:form.phone, address:form.address, postal:form.postal } }
    })
    setBusy(false)
    if(error){ alert(error.message); return }

    // 이메일 확인이 꺼져있다면 바로 세션이 생김 → profiles 저장
    const uid = data.user?.id
    if(uid){
      await supabase.from('profiles').upsert({
        id: uid, nickname:form.nickname, name:form.name, phone:form.phone, address:form.address, postal:form.postal
      })
      window.location.href='/community.html'
    }else{
      alert('가입 메일을 확인한 뒤 로그인해주세요.')
      window.location.href='/login.html'
    }
  }

  return (
    <section className="auth">
      <div className="panel">
        <h1>회원가입</h1>
        <button className="google" onClick={handleGoogle}>Google로 계속하기</button>
        <div className="or">또는</div>
        <form onSubmit={handleSubmit}>
          <label>닉네임<input value={form.nickname} onChange={set('nickname')} /></label>
          <label>이름<input value={form.name} onChange={set('name')} /></label>
          <label>이메일<input type="email" value={form.email} onChange={set('email')} required/></label>
          <label>비밀번호<input type="password" value={form.password} onChange={set('password')} required/></label>
          <label>비밀번호 확인<input type="password" value={form.confirm} onChange={set('confirm')} required/></label>
          <label>전화번호<input value={form.phone} onChange={set('phone')} placeholder="010-0000-0000"/></label>
          <label>주소<input value={form.address} onChange={set('address')} /></label>
          <label>우편번호<input value={form.postal} onChange={set('postal')} /></label>
          <button className="primary" disabled={busy}>{busy?'저장 중...':'저장하고 돌아가기'}</button>
        </form>
      </div>
      <style>{panelCss}</style>
    </section>
  )
}

const panelCss = `
  .auth{min-height:calc(100vh - 64px);display:flex;align-items:flex-start;justify-content:center;padding:24px}
  .panel{width:100%;max-width:640px;background:#111;border:1px solid rgba(255,255,255,.14);border-radius:16px;padding:20px;color:#fff}
  h1{margin:0 0 12px}
  .google{width:100%;padding:12px;border-radius:999px;border:0;background:#fff;color:#111;font-weight:800}
  .or{opacity:.7;text-align:center;margin:14px 0}
  form{display:grid;gap:10px}
  label{display:grid;gap:6px;font-weight:600}
  input{width:100%;border:1px solid rgba(255,255,255,.25);background:#000;color:#fff;border-radius:10px;padding:12px}
  .primary{margin-top:6px;width:100%;padding:12px;border-radius:999px;border:0;background:#fff;color:#111;font-weight:800}
`
