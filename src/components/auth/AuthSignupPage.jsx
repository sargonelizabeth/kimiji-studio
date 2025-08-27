import React from "react"
import { supabase } from "@/lib/supabaseClient.js"
import "@/styles/auth.css"

export default function AuthSignupPage(){
  const google = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/community.html`,
        queryParams: { prompt: "select_account" }
      }
    })
  }

  return (
    <div className="ig-wrap">
      <div className="ig-card">
        <div className="ig-brand">KIMIJI STUDIO</div>
        <div className="ig-sub">계정을 만들어 커뮤니티에 사진을 올려보세요</div>

        <button className="ig-google" onClick={google}>
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21.35 11.1H12v2.9h5.3c-.23 1.5-1.78 4.4-5.3 4.4a5.8 5.8 0 1 1 0-11.6c1.32 0 2.52.47 3.46 1.25l2.36-2.36A9.61 9.61 0 0 0 12 3.5C6.98 3.5 2.9 7.58 2.9 12.6S6.98 21.7 12 21.7c5.04 0 8.36-3.54 8.36-8.52 0-.57-.07-1.02-.16-1.48Z"/></svg>
          Google로 계속하기
        </button>

        <div className="ig-divider"><span>또는</span></div>

        <form className="ig-form" onSubmit={(e)=>e.preventDefault()}>
          <input className="ig-input" placeholder="이름" />
          <input className="ig-input" placeholder="이메일" />
          <input className="ig-input" placeholder="전화번호" />
          <input className="ig-input" placeholder="집 주소" />
          <button className="ig-primary" disabled>회원가입 (이메일 방식 준비중)</button>
        </form>

        <div className="ig-footer">
          계정이 있으신가요? <a href="/signup.html">로그인</a>
        </div>
      </div>
    </div>
  )
}
