import React from "react";
import { supabase } from "@/lib/supabaseClient.js";

export default function AuthSignupPage(){
  const [form, setForm] = React.useState({
    nickname:"", name:"", email:"", password:"", password2:"",
    phone:"", address:"", zipcode:""
  });
  const [busy,setBusy] = React.useState(false);
  const update = k => e => setForm(s => ({...s, [k]: e.target.value}));

  async function signUp(e){
    e.preventDefault();
    if(busy) return;
    if(!form.email || !form.password){ alert("이메일/비밀번호를 입력하세요."); return; }
    if(form.password !== form.password2){ alert("비밀번호가 일치하지 않습니다."); return; }
    setBusy(true);

    const { data, error } = await supabase.auth.signUp({
      email: form.email, password: form.password,
      options: { data: {
        nickname: form.nickname, name: form.name,
        phone: form.phone, address: form.address, zipcode: form.zipcode
      }}
    });
    if(error){ alert(error.message); setBusy(false); return; }

    const uid = data.user?.id;
    if(uid){
      await supabase.from("profiles").upsert({
        id: uid, nickname: form.nickname || null, name: form.name || null,
        phone: form.phone || null, address: form.address || null, zipcode: form.zipcode || null
      }, { onConflict: "id" });
    }

    alert("가입 완료! 메일 확인(필요 시) 후 로그인해주세요.");
    window.location.href = "/login.html";
  }

  async function google(){
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin }
    });
    if(error) alert(error.message);
  }

  return (
    <div className="auth-wrap">
      <div className="card">
        <h1>회원가입</h1>

        <button className="btn google" onClick={google}>Google로 계속하기</button>
        <div className="or">또는</div>

        <form onSubmit={signUp} className="form">
          <label>닉네임<input value={form.nickname} onChange={update("nickname")} placeholder="닉네임" /></label>
          <label>이름<input value={form.name} onChange={update("name")} placeholder="이름" /></label>
          <label>이메일<input value={form.email} onChange={update("email")} placeholder="이메일" inputMode="email" /></label>
          <label>비밀번호<input type="password" value={form.password} onChange={update("password")} placeholder="비밀번호" /></label>
          <label>비밀번호 확인<input type="password" value={form.password2} onChange={update("password2")} placeholder="비밀번호 확인" /></label>
          <label>전화번호<input value={form.phone} onChange={update("phone")} placeholder="010-0000-0000" /></label>
          <label>주소<input value={form.address} onChange={update("address")} placeholder="주소" /></label>
          <label>우편번호<input value={form.zipcode} onChange={update("zipcode")} placeholder="우편번호" /></label>
          <button className="btn submit" disabled={busy}>{busy?"처리 중…":"저장하고 돌아가기"}</button>
        </form>

        <div className="links">
          <a href="/login.html">이미 계정이 있으신가요? <span className="nowrap">로그인</span></a>
          <span className="dot">·</span>
          <a href="/recover.html"><span className="nowrap">아이디/비밀번호 찾기</span></a>
        </div>
      </div>

      <style>{`
        .auth-wrap{min-height:calc(100vh - 64px);display:flex;align-items:flex-start;justify-content:center;padding:24px 16px 60px}
        .card{width:100%;max-width:560px;background:#111;color:#fff;border-radius:16px;padding:20px 16px 24px;border:1px solid rgba(255,255,255,.12)}
        .card h1{margin:0 0 12px;font-size:24px}
        .btn{display:inline-flex;align-items:center;justify-content:center;height:44px;border-radius:10px;font-weight:800;border:0;cursor:pointer}
        .btn.google{width:100%;background:#fff;color:#000}
        .or{opacity:.8;text-align:center;margin:12px 0}
        .form{display:grid;gap:10px}
        label{display:grid;gap:6px}
        input{height:44px;border-radius:10px;border:1px solid rgba(255,255,255,.25);background:transparent;color:#fff;padding:0 12px}
        .btn.submit{background:#fff;color:#000;margin-top:8px}
        .links{display:flex;align-items:center;justify-content:center;gap:10px;margin-top:14px;flex-wrap:wrap}
        .links a{color:#fff;text-decoration:none}
        .links .dot{opacity:.6}
        .nowrap{white-space:nowrap}
      `}</style>
    </div>
  );
}
