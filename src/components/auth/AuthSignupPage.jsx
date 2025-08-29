// src/components/auth/AuthSignupPage.jsx
import React from "react";
import { supabase } from "@/lib/supabaseClient.js";
import Nav from "@/components/Nav.jsx";

export default function AuthSignupPage(){
  const [nickname,setNickname]=React.useState("");
  const [name,setName]=React.useState("");
  const [email,setEmail]=React.useState("");
  const [phone,setPhone]=React.useState("");
  const [address,setAddress]=React.useState("");
  const [zipcode,setZipcode]=React.useState("");
  const [password,setPassword]=React.useState("");
  const [password2,setPassword2]=React.useState("");
  const next = new URLSearchParams(location.search).get("next") || "/";

  async function handleGoogle(){
    await supabase.auth.signInWithOAuth({
      provider:"google",
      options:{
        redirectTo:`${location.origin}/auth/callback.html?next=${encodeURIComponent(next)}`,
        queryParams:{ prompt:"select_account" },
      }
    });
  }

  async function handleSubmit(e){
    e.preventDefault();
    if(password!==password2){ alert("비밀번호가 일치하지 않습니다."); return; }
    const { data, error } = await supabase.auth.signUp({
      email, password,
      options:{ data:{ nickname, name, phone, address, zipcode } }
    });
    if(error){ alert(error.message); return; }
    // 프로젝트에서 이메일 확인 off 라면 바로 세션 생성, on 이면 확인 메일 발송됨
    location.href = next;
  }

  return (
    <>
      <Nav/>
      <main className="auth-wrap">
        <section className="card">
          <h1>회원가입</h1>
          <button className="btn-google" onClick={handleGoogle}>Google로 계속하기</button>
          <div className="sep">또는</div>
          <form onSubmit={handleSubmit} className="form">
            <label>닉네임</label><input value={nickname} onChange={e=>setNickname(e.target.value)} required/>
            <label>이름</label><input value={name} onChange={e=>setName(e.target.value)} required/>
            <label>이메일</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
            <label>비밀번호</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
            <label>비밀번호 확인</label><input type="password" value={password2} onChange={e=>setPassword2(e.target.value)} required/>
            <label>전화번호</label><input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="010-0000-0000"/>
            <label>주소</label><input value={address} onChange={e=>setAddress(e.target.value)}/>
            <label>우편번호</label><input value={zipcode} onChange={e=>setZipcode(e.target.value)}/>
            <button className="btn-submit">저장하고 돌아가기</button>
          </form>
          <div className="links">
            <a href="/auth/login.html">이미 계정이 있으신가요? 로그인</a>
            <span>·</span>
            <a href="/auth/recover.html">아이디/비밀번호 찾기</a>
          </div>
        </section>
      </main>
      <style>{commonAuthCss}</style>
    </>
  );
}

const commonAuthCss = `
.auth-wrap{max-width:680px;margin:24px auto;padding:0 16px}
.card{background:#111;border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:22px;color:#fff}
h1{margin:0 0 14px}
.btn-google{width:100%;border-radius:999px;border:0;background:#fff;color:#000;padding:12px 16px;font-weight:900}
.sep{opacity:.7;text-align:center;margin:14px 0}
.form{display:grid;gap:10px}
.form input{border:1px solid rgba(255,255,255,.28);background:transparent;color:#fff;border-radius:10px;padding:10px}
.btn-submit{margin-top:6px;width:100%;border-radius:999px;border:0;background:#fff;color:#000;padding:12px 16px;font-weight:900}
.links{margin-top:12px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
.links a{white-space:nowrap}
`;
