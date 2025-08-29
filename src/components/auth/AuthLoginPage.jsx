// src/components/auth/AuthLoginPage.jsx
import React from "react";
import { supabase } from "@/lib/supabaseClient.js";
import Nav from "@/components/Nav.jsx";

export default function AuthLoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const next = new URLSearchParams(location.search).get("next") || "/";

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback.html?next=${encodeURIComponent(next)}`,
        queryParams: { prompt: "select_account" },
      },
    });
  }

  async function handleLogin(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { alert(error.message); return; }
    location.href = next;
  }

  return (
    <>
      <Nav />
      <main className="auth-wrap">
        <section className="card">
          <h1>로그인</h1>
          <button className="btn-google" onClick={handleGoogle}>Google로 계속하기</button>
          <div className="sep">또는</div>
          <form onSubmit={handleLogin} className="form">
            <label>이메일</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="you@example.com" />
            <label>비밀번호</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
            <button className="btn-submit">로그인</button>
          </form>
          <div className="links">
            <a href="/auth/signup.html">회원가입</a>
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
.links{margin-top:12px;display:flex;gap:10px;justify-content:center}
.links a{white-space:nowrap}
`;
