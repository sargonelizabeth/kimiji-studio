import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient.js'

export default function AuthSignupPage() {
  const [form, setForm] = useState({
    name: '', display_name: '',
    email: '', password: '',
    phone: '', address: '',
    marketing_opt_in: false,
    agree_terms: false,
  })
  const [loading, setLoading] = useState(false)
  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((s) => ({ ...s, [name]: type === 'checkbox' ? checked : value }))
  }

  const signWith = async (provider) => {
    await supabase.auth.signInWithOAuth({
      provider, // 'google' | 'kakao' | 'naver'
      options: { redirectTo: `${window.location.origin}/community.html` }
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.agree_terms) return alert('약관 동의가 필요합니다.')
    if (!form.email || !form.password) return alert('이메일/비밀번호를 입력하세요.')
    setLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          name: form.name,
          display_name: form.display_name,
          phone: form.phone,
          address: form.address,
          marketing_opt_in: form.marketing_opt_in,
          agree_terms: form.agree_terms
        },
        emailRedirectTo: `${window.location.origin}/community.html`
      }
    })
    if (error) { setLoading(false); return alert(error.message) }

    const user = data.user
    if (user?.id) {
      await supabase.from('profiles').upsert({
        id: user.id,
        name: form.name,
        display_name: form.display_name,
        phone: form.phone,
        address: form.address,
        marketing_opt_in: form.marketing_opt_in,
        agree_terms: form.agree_terms,
        agreed_at: new Date().toISOString()
      })
    }
    setLoading(false)
    window.location.href = '/community.html'
  }

  return (
    <section style={{padding:'32px 16px', maxWidth: '960px', margin: '0 auto'}}>
      <h1 className="heading" style={{textAlign:'center', marginBottom: 20}}>회원가입</h1>

      <div style={{display:'grid', gap: '16px'}}>
        <form onSubmit={onSubmit} style={{display:'grid', gap: '12px', background:'rgba(0,0,0,0.22)', padding: '20px', borderRadius:'14px', border:'1px solid rgba(0,0,0,0.35)'}}>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
            <input placeholder="이름" name="name" value={form.name} onChange={onChange} required />
            <input placeholder="닉네임" name="display_name" value={form.display_name} onChange={onChange} />
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
            <input type="email" placeholder="이메일" name="email" value={form.email} onChange={onChange} required />
            <input type="password" placeholder="비밀번호" name="password" value={form.password} onChange={onChange} required />
          </div>
          <input placeholder="전화번호" name="phone" value={form.phone} onChange={onChange} />
          <input placeholder="집주소" name="address" value={form.address} onChange={onChange} />
          <label style={{display:'flex', alignItems:'center', gap:'8px'}}>
            <input type="checkbox" name="marketing_opt_in" checked={form.marketing_opt_in} onChange={onChange} />
            마케팅 수신 동의(선택)
          </label>
          <label style={{display:'flex', alignItems:'center', gap:'8px'}}>
            <input type="checkbox" name="agree_terms" checked={form.agree_terms} onChange={onChange} required />
            이용약관/개인정보 처리방침 동의(필수)
          </label>
          <button type="submit" className="btn-cta-global" disabled={loading}>
            {loading ? '처리 중…' : '회원가입 완료'}
          </button>
        </form>

        <div style={{display:'grid', gap:'10px'}}>
          <button className="btn-cta-global" onClick={() => signWith('google')}>Google로 계속하기</button>
          <button className="btn-cta-global" onClick={() => signWith('kakao')}>카카오로 계속하기</button>
          <button className="btn-cta-global" onClick={() => signWith('naver')}>네이버로 계속하기</button>
        </div>
      </div>
    </section>
  )
}
