import React from "react";
import { supabase } from "@/lib/supabaseClient.js";

export default function AuthSignupPage(){
  const [loading, setLoading] = React.useState(false);

  async function signInWithGoogle(){
    setLoading(true);
    const redirectTo = `${window.location.origin}/signup.html`; // 허용 URL에 등록됨
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo, queryParams: { prompt: "select_account" } } // 계정 선택 강제
    });
    if (error) { alert(error.message); setLoading(false); }
  }

  // ... 폼 저장/업서트 로직은 기존과 동일 ...

  return (
    <div className="auth-wrap">
      <button className="btn google" onClick={signInWithGoogle} disabled={loading}>
        Google로 계속하기
      </button>
      {/* 닉네임/이름/이메일/전화/주소/우편번호 폼 ... */}
    </div>
  );
}
