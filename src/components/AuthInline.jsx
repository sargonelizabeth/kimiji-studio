import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../providers/AuthProvider";

export default function AuthInline(){
  const { user } = useAuth();
  const [mode,setMode]=useState("signin");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [busy,setBusy]=useState(false);
  const [msg,setMsg]=useState("");

  async function onSubmit(e){
    e.preventDefault(); setBusy(true); setMsg("");
    if(mode==="signin"){
      const { error }=await supabase.auth.signInWithPassword({ email, password });
      setMsg(error?"로그인 실패":"로그인 완료");
    }else{
      const { error }=await supabase.auth.signUp({ email, password });
      setMsg(error?"가입 실패":"가입 완료. 메일 확인");
    }
    setBusy(false);
  }

  if(user) return null;

  return (
    <div className="auth">
      <form onSubmit={onSubmit} className="f">
        <input type="email" placeholder="이메일" value={email} onChange={e=>setEmail(e.target.value)} required/>
        <input type="password" placeholder="비밀번호" value={password} onChange={e=>setPassword(e.target.value)} required/>
        <button className="btn" disabled={busy}>{busy?"처리 중...":(mode==="signin"?"로그인":"회원가입")}</button>
      </form>
      <div className="s"><button onClick={()=>setMode(mode==="signin"?"signup":"signin")} className="link">{mode==="signin"?"회원가입":"로그인"}</button></div>
      <style>{`.auth{background:#fff;border-radius:12px;padding:12px;box-shadow:0 8px 24px rgba(0,0,0,.06);max-width:420px}.f{display:grid;gap:8px}.f input{border:1px solid #ddd;border-radius:8px;padding:10px}.btn{background:#111;color:#fff;border:0;border-radius:999px;padding:10px 18px;font-weight:800;cursor:pointer}.s{margin-top:8px}.link{background:transparent;border:0;color:#111;font-weight:800;cursor:pointer;text-decoration:underline}`}</style>
    </div>
  );
}
