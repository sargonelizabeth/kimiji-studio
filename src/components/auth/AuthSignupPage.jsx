import React from 'react'
import { supabase } from '@/lib/supabaseClient.js'
import Nav from '@/components/Nav.jsx'

export default function AuthSignupPage(){
  const [form,setForm]=React.useState({ nickname:'', full_name:'', email:'', password:'', password2:'', phone:'', address:'', zip:'' })
  const [busy,setBusy]=React.useState(false)
  const [msg,setMsg]=React.useState('')

  function upd(k,v){ setForm(p=>({...p,[k]:v})) }

  async function onGoogle(){
    try{
      setBusy(true); setMsg('')
      await supabase.auth.signInWithOAuth({
        provider:'google',
        options:{
          redirectTo: window.location.origin + '/',       // 완료 후 홈
          queryParams: { prompt: 'select_account' }
        }
      })
    }catch(e){ setMsg('Google 로그인 중 오류: '+(e?.message||e)); setBusy(false) }
  }

  async function onSubmit(e){
    e.preventDefault()
    setMsg('')
    if(form.password !== form.password2){ setMsg('비밀번호 확인이 일치하지 않습니다.'); return }
    try{
      setBusy(true)
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { nickname: form.nickname, full_name: form.full_name, phone: form.phone, address: form.address, zip: form.zip } }
      })
      if(error){ setMsg(error.message); setBusy(false); return }

      // 프로필 테이블에 기본행(없으면 무시)
      await supabase.from('profiles').insert({
        user_id: data.user?.id, nickname: form.nickname, full_name: form.full_name,
        phone: form.phone, address: form.address, zip: form.zip
      }).catch(()=>{})

      alert('가입 완료! 이메일 인증을 요구하는 설정이면 메일함을 확인해 주세요.')
      location.replace('/')
    }catch(e){
      setMsg('가입 실패: '+(e?.message||e)); setBusy(false)
    }
  }

  return (
    <>
      <Nav/>
      <section className="auth-shell">
        <div className="card">
          <h1>회원가입</h1>

          <button className="google" disabled={busy} onClick={onGoogle}>Google로 계속하기</button>
          <div className="or">또는</div>

          <form onSubmit={onSubmit}>
            <label>닉네임<input value={form.nickname} onChange={e=>upd('nickname',e.target.value)} required/></label>
            <label>이름<input value={form.full_name} onChange={e=>upd('full_name',e.target.value)} required/></label>
            <label>이메일<input type="email" value={form.email} onChange={e=>upd('email',e.target.value)} required/></label>
            <label>비밀번호<input type="password" value={form.password} onChange={e=>upd('password',e.target.value)} required/></label>
            <label>비밀번호 확인<input type="password" value={form.password2} onChange={e=>upd('password2',e.target.value)} required/></label>
            <label>전화번호<input value={form.phone} onChange={e=>upd('phone',e.target.value)} placeholder="010-0000-0000"/></label>
            <label>주소<input value={form.address} onChange={e=>upd('address',e.target.value)} /></label>
            <label>우편번호<input value={form.zip} onChange={e=>upd('zip',e.target.value)} /></label>
            <button className="primary" disabled={busy}>저장하고 돌아가기</button>
          </form>

          <div className="links">
            <a href="/login.html">이미 계정이 있으신가요? 로그인</a>
          </div>

          {msg && <p className="msg">{msg}</p>}
        </div>
      </section>

      <style>{authCss}</style>
    </>
  )
}

const authCss = `
.auth-shell{display:flex;justify-content:center;padding:24px 16px}
.card{width:100%;max-width:560px;background:#121212;border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:16px;color:#fff;box-shadow:0 8px 24px rgba(0,0,0,.3)}
.card h1{margin:0 0 12px 0}
.google{width:100%;border:1px solid rgba(255,255,255,.2);border-radius:12px;padding:12px;background:#1a1a1a;color:#fff}
.or{opacity:.7;text-align:center;margin:14px 0}
form{display:flex;flex-direction:column;gap:10px}
label{display:flex;flex-direction:column;gap:6px}
input{border:1px solid rgba(255,255,255,.2);background:#0c0c0c;color:#fff;border-radius:10px;padding:12px}
.primary{background:#fff;color:#111;border:0;border-radius:12px;padding:12px;font-weight:800;margin-top:8px}
.links{margin-top:12px;display:flex;gap:10px;justify-content:center}
.msg{margin-top:10px;color:#ff8}
`
