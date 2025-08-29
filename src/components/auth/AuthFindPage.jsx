import React from "react";
import { supabase } from "@/lib/supabaseClient.js";
import Nav from "@/components/Nav.jsx";

export default function AuthFindPage(){
  const [email,setEmail]=React.useState("");
  const [msg,setMsg]=React.useState("");

  async function sendReset(e){
    e.preventDefault();
    setMsg("");
    const redirectTo = `${location.origin}/login.html`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    setMsg(error ? error.message : "재설정 메일을 보냈습니다. 메일함을 확인해주세요.");
  }

  return (
    <>
      <Nav page="auth" />
      <section className="auth-wrap">
        <div className="card">
          <h1>아이디/비밀번호 찾기</h1>
          <form onSubmit={sendReset}>
            <label>가입 이메일
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
            </label>
            <button className="primary">재설정 메일 보내기</button>
          </form>
          {msg && <p className="msg">{msg}</p>}
        </div>
      </section>
      <style>{`
        .auth-wrap{min-height:calc(100vh - 60px);background:#000;color:#fff;padding:24px 16px}
        .card{max-width:560px;margin:0 auto;background:#0f0f0f;border:1px solid #222;border-radius:18px;padding:18px}
        h1{margin:2px 2px 12px}
        label{display:flex;flex-direction:column;gap:6px}
        input{border-radius:12px;border:1px solid #333;background:#111;color:#fff;padding:12px}
        .primary{margin-top:10px;border:0;border-radius:999px;background:#fff;color:#000;padding:12px 16px;font-weight:900}
        .msg{margin-top:10px}
      `}</style>
    </>
  );
}
