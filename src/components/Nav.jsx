// src/components/Nav.jsx
import React from "react";
import { supabase } from "@/lib/supabaseClient.js";

export default function Nav() {
  const [user, setUser] = React.useState(null);
  const fileRef = React.useRef(null);

  // 세션 추적
  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
    return () => sub?.subscription?.unsubscribe?.();
  }, []);

  // 전역 업로드 오픈 함수 (다른 컴포넌트에서도 동일하게 사용)
  React.useEffect(() => {
    window.__openUpload = async () => {
      // 반드시 '사용자 제스처' 안에서 호출되도록 버튼 onClick에서 직접 호출하세요.
      if (!fileRef.current) return;
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        window.location.href = "/signup.html";
        return;
      }
      fileRef.current.click();
    };
    return () => { delete window.__openUpload };
  }, []);

  // 파일 선택 핸들러(업로드 페이지/커뮤니티에서 공용 사용)
  async function handlePick(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) { alert("로그인이 필요합니다."); e.target.value=""; return; }

    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const key = `${session.user.id}/${Date.now()}.${ext}`;
    const BUCKET = "photo";

    const up = await supabase.storage.from(BUCKET).upload(key, file, { upsert: false });
    if (up.error) { alert("업로드 실패: " + up.error.message); e.target.value=""; return; }

    const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(key);
    const { error: insErr } = await supabase.from("photo").insert({
      user_id: session.user.id,
      storage_path: key,
      public_url: pub.publicUrl,
      caption: null
    });
    if (insErr) { alert("DB 저장 실패: " + insErr.message); e.target.value=""; return; }

    e.target.value = "";
    // 업로드 후 커뮤니티로
    window.location.href = "/community.html";
  }

  async function onLogin() {
    // 회원가입(프로필 작성) 페이지로 이동
    window.location.href = "/signup.html";
  }

  async function onLogout() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  function onMake() {
    // 사용자 제스처 안에서 직접 호출
    window.__openUpload?.();
  }

  return (
    <header className="kj-nav">
      {/* 전역 파일 입력: display:none 대신 시각적으로만 숨김 */}
      <input
        ref={fileRef}
        id="global-file-picker"
        type="file"
        accept="image/*"
        style={{position:"absolute",width:1,height:1,opacity:0,top:0,left:0}}
        onChange={handlePick}
        aria-hidden="true"
        tabIndex={-1}
      />

      <nav className="row">
        <a className="brand" href="/">KIMIJI<br/>STUDIO</a>
        <div className="links">
          <a href="#portfolio">포트폴리오</a>
          <a href="/community.html">커뮤니티</a>
          <a href="/#about">About</a>
        </div>
        <div className="actions">
          {!user
            ? <button className="btn ghost" onClick={onLogin}>로그인</button>
            : <button className="btn ghost" onClick={onLogout}>로그아웃</button>}
          <button className="btn primary" onClick={onMake}>제작하기</button>
        </div>
      </nav>

      <style>{`
        .kj-nav{position:sticky;top:0;z-index:50;background:#2a2115;color:#fff}
        .row{max-width:1024px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 12px}
        .brand{font-weight:900;line-height:1;letter-spacing:.6px;color:#fff;text-decoration:none}
        .links{display:flex;gap:16px}
        .links a{color:#fff;text-decoration:none;opacity:.9}
        .actions{display:flex;gap:8px}
        .btn{border:0;border-radius:999px;font-weight:800;cursor:pointer;padding:8px 14px}
        .btn.ghost{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.25)}
        .btn.primary{background:#fff;color:#000}
        @media(max-width:520px){
          .links{gap:10px;font-size:14px}
          .actions .btn{padding:8px 12px}
        }
      `}</style>
    </header>
  );
}
