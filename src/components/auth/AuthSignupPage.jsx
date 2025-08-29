// src/components/auth/AuthSignupPage.jsx
import React from "react";
import { supabase } from "@/lib/supabaseClient.js";

export default function AuthSignupPage(){
  const [nickname,setNickname]=React.useState("");
  const [fullName,setFullName]=React.useState("");
  const [email,setEmail]=React.useState("");
  const [phone,setPhone]=React.useState("");
  const [address,setAddress]=React.useState("");
  const [postal,setPostal]=React.useState("");
  const [pw,setPw]=React.useState("");
  const [pw2,setPw2]=React.useState("");
  const [busy,setBusy]=React.useState(false);

  async function onGoogle(){
    setBusy(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider:"google",
      options:{ queryParams:{ prompt:"select_account" } }
    });
    if(error){ alert(error.message); setBusy(false); }
  }

  async function onSubmit(e){
    e.preventDefault();
    if(pw!==pw2){ alert("비밀번호가 일치하지 않습니다."); return; }
    setBusy(true);

    const { data, error } = await supabase.auth.signUp({ email, password: pw });
    if(error){ setBusy(false); return alert(error.message); }

    // 프로필 저장
    const uid = data.user?.id;
    if(uid){
      await supabase.from("profiles").upsert({
        id: uid,
        nickname, full_name: fullName, phone, address, postal_code: postal
      });
    }

    setBusy(false);
    window.location.href = "/community.html";
  }

  return (
    <main className="auth-wrap">
      <section className="panel">
        <h1>회원가입</h1>
        <button className="btn google" onClick={onGoogle} disabled={busy}>Google로 계속하기</button>
        <div className="sep">또는</div>

        <form onSubmit={onSubmit} className="form">
          <label>닉네임</label>
          <input value={nickname} onChange={e=>setNickname(e.target.value)} placeholder="닉네임" required/>
          <label>이름</label>
          <input value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="이름" required/>
          <label>이메일</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="이메일" required/>
          <label>비밀번호</label>
          <input type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="비밀번호" required/>
          <label>비밀번호 확인</label>
          <input type="password" value={pw2} onChange={e=>setPw2(e.target.value)} placeholder="비밀번호 확인" required/>
          <label>전화번호</label>
          <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="010-0000-0000" />
          <label>주소</label>
          <input value={address} onChange={e=>setAddress(e.target.value)} placeholder="주소" />
          <label>우편번호</label>
          <input value={postal} onChange={e=>setPostal(e.target.value)} placeholder="우편번호" />
          <button className="btn solid" disabled={busy}>저장하고 돌아가기</button>
        </form>

        <div className="links-row">
          <a href="/login.html">이미 계정이 있으신가요? 로그인</a>
        </div>
      </section>

      <style>{`
        .auth-wrap{padding:28px 16px;display:flex;justify-content:center}
        .panel{width:100%;max-width:520px;background:#161616;border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:18px;color:#fff}
        h1{font-size:22px;margin:6px 0 16px}
        .btn{display:inline-flex;align-items:center;justify-content:center;border-radius:10px;padding:10px 14px;font-weight:800;border:0;cursor:pointer}
        .btn.google{width:100%;background:#fff;color:#111}
        .btn.solid{width:100%;background:#fff;color:#111;margin-top:8px}
        .sep{opacity:.7;text-align:center;margin:14px 0}
        .form{display:grid;gap:8px}
        label{font-size:12px;opacity:.8}
        input{background:#0d0d0d;border:1px solid rgba(255,255,255,.15);border-radius:10px;padding:10px 12px;color:#fff}
        .links-row{margin-top:10px;text-align:center}
        .links-row a{color:#fff}
      `}</style>
    </main>
  );
}
