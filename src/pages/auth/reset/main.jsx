import React from "react";
import ReactDOM from "react-dom/client";
import Nav from "@/components/Nav.jsx";
import { supabase } from "@/lib/supabaseClient.js";
import "@/index.css";

function ResetPage(){
  const [pw1,setPw1]=React.useState("");
  const [pw2,setPw2]=React.useState("");
  const [busy,setBusy]=React.useState(false);

  async function reset(e){
    e.preventDefault();
    if(pw1!==pw2) return alert("비밀번호 확인이 일치하지 않습니다.");
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: pw1 });
    setBusy(false);
    if(error) return alert(error.message);
    alert("변경되었습니다."); window.location.replace("/auth/login.html");
  }

  return (
    <main className="auth-wrap">
      <section className="card">
        <h1>비밀번호 재설정</h1>
        <form onSubmit={reset}>
          <label>새 비밀번호<input type="password" value={pw1} onChange={e=>setPw1(e.target.value)} required/></label>
          <label>비밀번호 확인<input type="password" value={pw2} onChange={e=>setPw2(e.target.value)} required/></label>
          <button disabled={busy}>{busy?"저장 중...":"비밀번호 변경"}</button>
        </form>
      </section>
      <style>{`
        .auth-wrap{min-height:calc(100vh - 64px);padding:24px 16px;color:#fff;background:#000}
        .card{max-width:520px;margin:0 auto;background:#111;border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:22px}
        label{display:block;margin:10px 0 6px}
        input{width:100%;padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,.2);background:#000;color:#fff}
        button{width:100%;margin-top:12px;border:0;border-radius:999px;padding:12px 16px;background:#fff;color:#111;font-weight:900}
      `}</style>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Nav ctaLabel="제작하기" ctaHref="/" />
    <ResetPage />
  </React.StrictMode>
);
