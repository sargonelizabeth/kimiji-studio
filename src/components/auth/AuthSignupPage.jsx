// src/components/auth/AuthSignupPage.jsx
import React from "react";
import { supabase } from "@/lib/supabaseClient.js";

export default function AuthSignupPage() {
  const [user, setUser] = React.useState(null);
  const [form, setForm] = React.useState({
    nickname: "", full_name: "", email: "", phone: "", address: "", postal_code: ""
  });
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) setForm(v => ({ ...v, email: u.email || "" }));
    });
    const { data } = supabase.auth.onAuthStateChange((_e, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) setForm(v => ({ ...v, email: u.email || "" }));
    });
    return () => data?.subscription?.unsubscribe?.();
  }, []);

  async function signInGoogle() {
    const redirectTo = `${location.origin}/community.html`;
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo, queryParams: { prompt: "select_account" } }
    });
  }

  async function saveProfile(e) {
    e.preventDefault();
    if (!user) { alert("먼저 Google로 로그인 해주세요."); return; }
    setSaving(true);
    const payload = {
      id: user.id,
      nickname: form.nickname || null,
      full_name: form.full_name || null,
      email: form.email || user.email || null,
      phone: form.phone || null,
      address: form.address || null,
      postal_code: form.postal_code || null,
      updated_at: new Date().toISOString()
    };
    const { error } = await supabase.from("profiles").upsert(payload, { onConflict: "id" });
    setSaving(false);
    if (error) { alert("프로필 저장 실패: " + error.message); return; }
    alert("가입 완료! 커뮤니티에서 업로드를 눌러 보세요.");
    location.href = "/community.html";
  }

  return (
    <div className="page">
      <div className="card">
        <h1>회원가입 / 로그인</h1>
        <button className="google" onClick={signInGoogle}>Google로 계속하기</button>

        <div className="divider">또는</div>

        <form onSubmit={saveProfile} className="form">
          <label>닉네임<input value={form.nickname} onChange={e=>setForm({...form,nickname:e.target.value})} /></label>
          <label>이름<input value={form.full_name} onChange={e=>setForm({...form,full_name:e.target.value})} /></label>
          <label>이메일<input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /></label>
          <label>전화번호<input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} /></label>
          <label>주소<input value={form.address} onChange={e=>setForm({...form,address:e.target.value})} /></label>
          <label>우편번호<input value={form.postal_code} onChange={e=>setForm({...form,postal_code:e.target.value})} /></label>
          <button className="save" disabled={saving}>{saving?"저장 중...":"가입 완료"}</button>
        </form>
      </div>

      <style>{`
        .page{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#000}
        .card{width:min(520px,92%);background:#1a1a1a;color:#fff;padding:24px;border-radius:16px;box-shadow:0 8px 24px rgba(0,0,0,.4)}
        h1{margin:0 0 12px;font-size:22px}
        .google{width:100%;border:0;border-radius:8px;padding:12px 14px;font-weight:800;cursor:pointer;background:#fff;color:#111}
        .divider{opacity:.7;text-align:center;margin:12px 0}
        .form{display:grid;gap:10px}
        label{display:grid;gap:6px;font-size:13px}
        input{border:1px solid rgba(255,255,255,.2);background:#0f0f0f;color:#fff;border-radius:8px;padding:10px}
        .save{margin-top:6px;background:#fff;color:#111;border:0;border-radius:10px;padding:12px 14px;font-weight:900}
      `}</style>
    </div>
  );
}
