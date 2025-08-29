import React from "react";
import { supabase } from "@/lib/supabaseClient.js";

export default function ResetPage(){
  const [email,setEmail]=React.useState("");
  const [sent,setSent]=React.useState(false);

  async function onSubmit(e){
    e.preventDefault();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/login.html"
    });
    if(error) return alert(error.message);
    setSent(true);
  }

  return (
    <main className="auth-wrap">
      <section className="panel">
        <h1>아이디/비밀번호 찾기</h1>
        {sent ? (
          <p>재설정 메일을 보냈습니다. 메일함을 확인해주세요.</p>
        ) : (
          <form onSubmit={onSubmit} className="form">
            <label>가입 이메일</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
            <button className="btn solid">재설정 메일 보내기</button>
          </form>
        )}
      </section>
      <style>{`
        .auth-wrap{padding:28px 16px;display:flex;justify-content:center}
        .panel{width:100%;max-width:520px;background:#161616;border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:18px;color:#fff}
        .form{display:grid;gap:8px}
        .btn.solid{background:#fff;color:#111;border:0;border-radius:10px;padding:10px 14px;font-weight:800}
        input{background:#0d0d0d;border:1px solid rgba(255,255,255,.15);border-radius:10px;padding:10px 12px;color:#fff}
      `}</style>
    </main>
  );
}
