// src/pages/auth/signup/main.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import { supabase } from '@/lib/supabaseClient.js'
import Nav from '@/components/Nav.jsx'
import '@/index.css'

function Page() {
  const [user, setUser] = React.useState(null)
  const [form, setForm] = React.useState({ nickname:'', full_name:'', email:'', phone:'', address:'', postal_code:'' })
  const next = new URLSearchParams(location.search).get('next') || '/'

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data:{ session } }) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) setForm((f)=>({ ...f, email: u.email || '' }))
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      const u = session?.user ?? null
      setUser(u)
      if (u && u.email) setForm((f)=>({ ...f, email: u.email }))
    })
    return () => sub?.subscription?.unsubscribe?.()
  }, [])

  async function loginWithGoogle(){
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/signup.html' + (next?`?next=${encodeURIComponent(next)}`:'') }
    })
  }

  async function saveProfile(e){
    e.preventDefault()
    if (!user) return loginWithGoogle()

    // profiles(id uuid pk = auth.users.id)
    await supabase.from('profiles').upsert({
      id: user.id,
      nickname: form.nickname || null,
      full_name: form.full_name || null,
      email: form.email || user.email || null,
      phone: form.phone || null,
      address: form.address || null,
      postal_code: form.postal_code || null,
      updated_at: new Date().toISOString()
    }, { onConflict: 'id' })

    // 완료 후 next로 이동
    window.location.href = next
  }

  return (
    <>
      <Nav />
      <main className="auth-wrap">
        <section className="card">
          <h1>회원가입 / 로그인</h1>
          <button className="btn-google" onClick={loginWithGoogle}>Google로 계속하기</button>

          <div className="sep">또는</div>

          <form onSubmit={saveProfile} className="form">
            <label>닉네임<input value={form.nickname} onChange={e=>setForm({...form,nickname:e.target.value})} placeholder="닉네임" /></label>
            <label>이름<input value={form.full_name} onChange={e=>setForm({...form,full_name:e.target.value})} placeholder="이름" /></label>
            <label>이메일<input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="이메일" type="email" /></label>
            <label>전화번호<input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="010-0000-0000" /></label>
            <label>주소<input value={form.address} onChange={e=>setForm({...form,address:e.target.value})} placeholder="주소" /></label>
            <label>우편번호<input value={form.postal_code} onChange={e=>setForm({...form,postal_code:e.target.value})} placeholder="우편번호" /></label>
            <button className="btn-primary" type="submit">{user ? '저장하고 돌아가기' : 'Google 로그인 후 저장'}</button>
          </form>
        </section>
      </main>

      <style>{`
        .auth-wrap{min-height:calc(100vh - 56px);display:grid;place-items:start center;padding:24px}
        .card{background:#111;color:#fff;border-radius:16px;padding:20px;box-shadow:0 8px 24px rgba(0,0,0,.35);width:min(560px,92vw)}
        .card h1{margin:0 0 12px;font-size:22px}
        .btn-google{width:100%;border:1px solid #fff;background:#fff;color:#111;border-radius:10px;padding:12px 14px;font-weight:800}
        .sep{opacity:.7;text-align:center;padding:10px 0}
        .form{display:grid;gap:10px}
        label{display:grid;gap:6px;font-size:13px}
        input{border:1px solid rgba(255,255,255,.3);background:transparent;color:#fff;border-radius:10px;padding:10px}
        .btn-primary{margin-top:4px;width:100%;background:#fff;color:#000;border:0;border-radius:10px;padding:12px 14px;font-weight:800}
      `}</style>
    </>
  )
}

createRoot(document.getElementById('root')).render(<Page />)
