import React from "react";
import { supabase } from "@/lib/supabaseClient.js";

export default function AuthForgotPage(){
  const [email,setEmail]=React.useState("");
  const [busy,setBusy]=React.useState(false);
  const cb = `${window.location.origin}/auth/reset.html`;

  async function send(e){
    e.preventDefault(); setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email,{ redirectTo: cb });
    setBusy(false);
    if(error) return alert(error.message);
    alert("재설정 메일을 보냈습니다.");
  }

  return (
    <main className="auth-wrap">
      <section className="card">
        <h1>아이디/비밀번호 찾기</h1>
        <form onSubmit={send}>
          <label>가입 이메일<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label>
          <button disabled={busy}>{busy?"전송 중...":"재설정 메일 보내기"}</button>
        </form>
        <div className="links"><a href="/auth/login.html">로그인으로 돌아가기</a></div>
      </section>
      <style>{baseAuthCss}</style>
    </main>
  );
}

const baseAuthCss = `
.auth-wrap{min-height:calc(100vh - 64px);padding:24px 16px;color:#fff;background:#000}
.card{max-width:520px;margin:0 auto;background:#111;border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:22px}
label{display:block;margin:10px 0 6px}
input{width:100%;padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,.2);background:#000;color:#fff}
button{width:100%;margin-top:12px;border:0;border-radius:999px;padding:12px 16px;background:#fff;color:#111;font-weight:900}
.links{margin-top:14px;text-align:center}
`;
