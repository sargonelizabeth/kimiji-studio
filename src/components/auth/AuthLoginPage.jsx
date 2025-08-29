import React from "react";
import { supabase } from "@/lib/supabaseClient.js";

export default function AuthLoginPage(){
  const [email,setEmail] = React.useState("");
  const [password,setPassword] = React.useState("");
  const [busy,setBusy] = React.useState(false);
  const next = new URLSearchParams(location.search).get("next") || "/";

  async function login(e){
    e.preventDefault();
    if(busy) return;
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if(error){ alert(error.message); setBusy(false); return; }
    window.location.replace(next);
  }

  async function google(){
    const { error } = await supabase.auth.signInWithOAuth({
      provider:"google",
      options:{ redirectTo: window.location.origin }
    });
    if(error) alert(error.message);
  }

  return (
    <div className="auth-wrap">
      <div className="card">
        <h1>로그인</h1>
        <button className="btn google" onClick={google}>Google로 계속하기</button>
        <div className="or">또는</div>
        <form onSubmit={login} className="form">
          <label>이메일<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" inputMode="email" /></label>
          <label>비밀번호<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="********" /></label>
          <button className="btn submit" disabled={busy}>{busy?"처리 중…":"로그인"}</button>
        </form>
        <div className="links">
          <a href="/signup.html">회원가입</a>
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
