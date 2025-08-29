import React from "react";
import { supabase } from "@/lib/supabaseClient.js";

export default function AuthRecoverPage(){
  const [email,setEmail] = React.useState("");
  const [busy,setBusy] = React.useState(false);

  async function send(e){
    e.preventDefault();
    if(busy) return;
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/login.html"
    });
    if(error){ alert(error.message); setBusy(false); return; }
    alert("재설정 메일을 보냈습니다. 받은편지함을 확인하세요.");
    window.location.href="/login.html";
  }

  return (
    <div className="auth-wrap">
      <div className="card">
        <h1>아이디/비밀번호 찾기</h1>
        <form onSubmit={send} className="form">
          <label>가입 이메일<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" inputMode="email" /></label>
          <button className="btn submit" disabled={busy}>{busy?"보내는 중…":"재설정 메일 보내기"}</button>
        </form>
      </div>

      <style>{`
        .auth-wrap{min-height:calc(100vh - 64px);display:flex;align-items:flex-start;justify-content:center;padding:24px 16px 60px}
        .card{width:100%;max-width:560px;background:#111;color:#fff;border-radius:16px;padding:20px 16px 24px;border:1px solid rgba(255,255,255,.12)}
        .card h1{margin:0 0 12px;font-size:24px}
        .form{display:grid;gap:10px}
        input{height:44px;border-radius:10px;border:1px solid rgba(255,255,255,.25);background:transparent;color:#fff;padding:0 12px}
        .btn.submit{background:#fff;color:#000;height:44px;border-radius:10px;font-weight:800;border:0;cursor:pointer}
      `}</style>
    </div>
  );
}
