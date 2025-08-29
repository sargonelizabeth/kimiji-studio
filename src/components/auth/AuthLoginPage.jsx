import React from "react";
import { supabase } from "@/lib/supabaseClient.js";
import Nav from "@/components/Nav.jsx";

export default function AuthLoginPage(){
  const [email,setEmail]=React.useState("");
  const [pw,setPw]=React.useState("");
  const [err,setErr]=React.useState("");

  async function onEmailLogin(e){
    e.preventDefault();
    setErr("");
    const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
    if(error){ setErr(error.message); return; }
    const next = new URLSearchParams(window.location.search).get("next") || "/community.html";
    window.location.replace(next);
  }

  return (
    <>
      <Nav page="auth" />
      <section className="auth-wrap">
        <div className="card">
          <h1>로그인</h1>
          <button className="gbtn" onClick={()=>signInWithGoogle()}>
            Google로 계속하기
          </button>
          <div className="or">또는</div>
          <form onSubmit={onEmailLogin}>
            <label>이메일<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label>
            <label>비밀번호<input type="password" value={pw} onChange={e=>setPw(e.target.value)} required/></label>
            <button className="primary" type="submit">로그인</button>
            {err && <p className="err">{err}</p>}
          </form>
          <div className="links">
            <a href="/signup.html">회원가입</a>
            <span className="dot">·</span>
            <a href="/find.html">아이디/비밀번호 찾기</a>
          </div>
        </div>
      </section>
      <Style />
    </>
  );
}

async function signInWithGoogle(){
  localStorage.setItem("postAuthRedirect", new URLSearchParams(location.search).get("next") || "/community.html");
  await supabase.auth.signInWithOAuth({
    provider:"google",
    options:{
      redirectTo: `${location.origin}/auth/callback.html`,
      queryParams:{ prompt:"select_account" }
    }
  });
}

function Style(){
  return (
    <style>{`
      .auth-wrap{min-height:calc(100vh - 60px);background:#000;color:#fff;padding:24px 16px}
      .card{max-width:560px;margin:0 auto;background:#0f0f0f;border:1px solid #222;border-radius:18px;padding:18px}
      h1{margin:2px 2px 12px}
      .gbtn{width:100%;border-radius:999px;padding:12px 14px;border:1px solid #444;background:#fff;color:#000;font-weight:800}
      .or{opacity:.7;text-align:center;margin:12px 0}
      form{display:flex;flex-direction:column;gap:10px}
      label{display:flex;flex-direction:column;gap:6px}
      input{border-radius:12px;border:1px solid #333;background:#111;color:#fff;padding:12px}
      .primary{margin-top:6px;border:0;border-radius:999px;background:#fff;color:#000;padding:12px 16px;font-weight:900}
      .err{color:#ff6b6b;margin:8px 0 0}
      .links{margin-top:10px;text-align:center;white-space:nowrap}
      .links a{color:#fff}
      .dot{opacity:.6;margin:0 6px}
    `}</style>
  )
}
