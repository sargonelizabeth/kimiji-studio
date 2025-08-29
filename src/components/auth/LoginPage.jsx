// src/components/auth/LoginPage.jsx
import React from "react";
import { supabase } from "@/lib/supabaseClient.js";

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [pw, setPw] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const back = new URLSearchParams(location.search).get("back") || "/community.html";

  async function onGoogle() {
    setBusy(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      // redirectTo는 넣지 않습니다. (Site URL/Redirect URLs로 처리)
      options: { queryParams: { prompt: "select_account" } }
    });
    if (error) { alert(error.message); setBusy(false); }
  }

  async function onEmail(e) {
    e.preventDefault();
    setBusy(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: pw });
    setBusy(false);
    if (error) return alert(error.message);
    window.location.href = back;
  }

  return (
    <main className="auth-wrap">
      <section className="panel">
        <h1>회원가입 / 로그인</h1>

        <button className="btn google" onClick={onGoogle} disabled={busy}>Google로 계속하기</button>

        <div className="sep">또는</div>

        <form onSubmit={onEmail} className="form">
          <label>이메일</label>
          <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
          <label>비밀번호</label>
          <input type="password" required value={pw} onChange={e=>setPw(e.target.value)} placeholder="********" />
          <button className="btn solid" disabled={busy}>로그인</button>
        </form>

        <div className="links-row">
          <a href="/signup.html">회원가입</a>
          <span>·</span>
          <a href="/reset.html">아이디/비밀번호 찾기</a>
        </div>
      </section>

      <style>{`
        .auth-wrap{padding:28px 16px;display:flex;justify-content:center}
        .panel{width:100%;max-width:520px;background:#161616;border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:18px;color:#fff}
        h1{font-size:22px;margin:6px 0 16px}
        .btn{display:inline-flex;align-items:center;justify-content:center;border-radius:10px;padding:10px 14px;font-weight:800;border:0;cursor:pointer}
        .btn.google{width:100%;background:#fff;color:#111}
        .btn.solid{width:100%;background:#fff;color:#111;margin-top:4px}
        .sep{opacity:.7;text-align:center;margin:14px 0}
        .form{display:grid;gap:8px}
        label{font-size:12px;opacity:.8}
        input{background:#0d0d0d;border:1px solid rgba(255,255,255,.15);border-radius:10px;padding:10px 12px;color:#fff}
        .links-row{margin-top:10px;display:flex;gap:8px;justify-content:center;opacity:.9}
        .links-row a{color:#fff}
      `}</style>
    </main>
  );
}
