import React from "react";
import { supabase } from "@/lib/supabaseClient.js";
import Nav from "@/components/Nav.jsx";

export default function AuthSignupPage(){
  const [f,setF] = React.useState({ nickname:"", name:"", email:"", pw:"", pw2:"", phone:"", address:"", zip:"" });
  const [err,setErr]=React.useState("");

  async function onSubmit(e){
    e.preventDefault();
    setErr("");
    if(f.pw!==f.pw2){ setErr("비밀번호가 일치하지 않습니다."); return; }

    const { data, error } = await supabase.auth.signUp({
      email: f.email, password: f.pw,
      options: { data: { nickname:f.nickname, name:f.name, phone:f.phone, address:f.address, zip:f.zip } }
    });
    if(error){ setErr(error.message); return; }

    // 사용자 프로필 레코드 보조 저장(테이블: profiles, PK=id(uuid))
    if(data.user){
      await supabase.from("profiles").upsert({
        id: data.user.id,
        nickname: f.nickname, name: f.name, phone: f.phone, address: f.address, zip: f.zip
      }, { onConflict: "id" });
    }
    alert("가입이 완료되었습니다. 로그인해주세요.");
    window.location.href="/login.html";
  }

  return (
    <>
      <Nav page="auth" />
      <section className="auth-wrap">
        <div className="card">
          <h1>회원가입</h1>
          <button className="gbtn" onClick={()=>signInWithGoogle()}>Google로 계속하기</button>
          <div className="or">또는</div>

          <form onSubmit={onSubmit}>
            <Grid>
              <Field label="닉네임"><input value={f.nickname} onChange={e=>setF({...f, nickname:e.target.value})} required/></Field>
              <Field label="이름"><input value={f.name} onChange={e=>setF({...f, name:e.target.value})} required/></Field>
              <Field label="이메일"><input type="email" value={f.email} onChange={e=>setF({...f, email:e.target.value})} required/></Field>
              <Field label="비밀번호"><input type="password" value={f.pw} onChange={e=>setF({...f, pw:e.target.value})} required/></Field>
              <Field label="비밀번호 확인"><input type="password" value={f.pw2} onChange={e=>setF({...f, pw2:e.target.value})} required/></Field>
              <Field label="전화번호"><input value={f.phone} onChange={e=>setF({...f, phone:e.target.value})} placeholder="010-0000-0000"/></Field>
              <Field label="주소"><input value={f.address} onChange={e=>setF({...f, address:e.target.value})}/></Field>
              <Field label="우편번호"><input value={f.zip} onChange={e=>setF({...f, zip:e.target.value})}/></Field>
            </Grid>
            <button className="primary" type="submit">저장하고 돌아가기</button>
            {err && <p className="err">{err}</p>}
          </form>

          <div className="links nowrap">
            이미 계정이 있으신가요? <a href="/login.html">로그인</a>
            <span className="dot">·</span>
            <a href="/find.html">아이디/비밀번호 찾기</a>
          </div>
        </div>
      </section>
      <Style/>
    </>
  );
}

function Field({label, children}){ return <label className="field"><span>{label}</span>{children}</label> }
function Grid({children}){ return <div className="grid">{children}</div> }

async function signInWithGoogle(){
  localStorage.setItem("postAuthRedirect","/community.html");
  await supabase.auth.signInWithOAuth({
    provider:"google",
    options:{ redirectTo:`${location.origin}/auth/callback.html`, queryParams:{ prompt:"select_account" } }
  });
}

function Style(){
  return (
    <style>{`
      .auth-wrap{min-height:calc(100vh - 60px);background:#000;color:#fff;padding:24px 16px}
      .card{max-width:680px;margin:0 auto;background:#0f0f0f;border:1px solid #222;border-radius:18px;padding:18px}
      h1{margin:2px 2px 12px}
      .gbtn{width:100%;border-radius:999px;padding:12px 14px;border:1px solid #444;background:#fff;color:#000;font-weight:800}
      .or{opacity:.7;text-align:center;margin:12px 0}
      .grid{display:grid;grid-template-columns:1fr;gap:10px}
      .field{display:flex;flex-direction:column;gap:6px}
      .field input{border-radius:12px;border:1px solid #333;background:#111;color:#fff;padding:12px}
      .primary{margin-top:10px;border:0;border-radius:999px;background:#fff;color:#000;padding:12px 16px;font-weight:900}
      .err{color:#ff6b6b;margin:8px 0 0}
      .links{margin-top:12px;text-align:center}
      .nowrap{white-space:nowrap}
      .dot{opacity:.6;margin:0 6px}
    `}</style>
  )
}
