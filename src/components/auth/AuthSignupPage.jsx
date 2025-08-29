// src/components/auth/AuthSignupPage.jsx
import React from "react";
import { supabase } from "@/lib/supabaseClient.js";

// 구글 로그인 버튼 + 리디렉트 복귀시 code 교환 처리
export default function AuthSignupPage() {
  const [busy, setBusy] = React.useState(false);
  const [msg, setMsg]   = React.useState("");

  // ① 리디렉트 복귀: URL의 ?code=... 있으면 세션으로 교환
  React.useEffect(() => {
    (async () => {
      const params = new URLSearchParams(location.search);
      const code   = params.get("code");
      const errd   = params.get("error_description");
      if (errd) setMsg(decodeURIComponent(errd));

      if (code) {
        setBusy(true);
        const { data, error } = await supabase.auth.exchangeCodeForSession({ code });
        setBusy(false);
        if (error) {
          setMsg(error.message || "로그인 처리 중 오류가 발생했습니다.");
          return;
        }
        // 세션이 생겼으니 커뮤니티로 이동
        location.replace("/community.html");
      }
    })();
  }, []);

  // ② “Google로 계속하기” 클릭 → 계정 선택 강제 + signup.html로 복귀
  async function signInGoogle(e) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/signup.html`,
        // 계정 선택 강제
        queryParams: { prompt: "select_account", access_type: "offline" },
      },
    });
    setBusy(false);
    if (error) setMsg(error.message || "Google 로그인 시작에 실패했습니다.");
  }

  return (
    <main className="signup-screen">
      <div className="card">
        <h1>회원가입 / 로그인</h1>
        <p className="hint">아래 버튼으로 간편하게 시작하세요.</p>

        <button
          className="btn btn-google"
          onClick={signInGoogle}
          disabled={busy}
          aria-busy={busy}
        >
          {busy ? "처리 중..." : "Google로 계속하기"}
        </button>

        {msg && <p className="err">{msg}</p>}
      </div>

      <style>{`
        .signup-screen{min-height:calc(100vh - 100px);display:flex;align-items:center;justify-content:center;padding:24px;color:#fff}
        .card{width:100%;max-width:420px;background:rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.15);border-radius:16px;padding:20px;box-shadow:0 8px 24px rgba(0,0,0,.25)}
        h1{margin:0 0 10px;font-size:20px;font-weight:900}
        .hint{opacity:.9;margin:0 0 16px}
        .btn{width:100%;display:inline-flex;align-items:center;justify-content:center;border:0;border-radius:10px;min-height:44px;cursor:pointer;font-weight:800}
        .btn-google{background:#fff;color:#111}
        .btn[aria-busy="true"]{opacity:.7;cursor:wait}
        .err{margin-top:12px;color:#ffd5d5}
      `}</style>
    </main>
  );
}
