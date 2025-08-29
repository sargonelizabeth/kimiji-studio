import React from "react";
import { supabase } from "@/lib/supabaseClient.js";

const krw = (n) =>
  new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(
    n || 0
  );

/**
 * 커뮤니티 페이지
 * - 상단 메트릭
 * - 사진 갤러리(최신순 고정)
 * - 업로드 버튼(상/하단 모두 Nav의 전역 파일 픽커 호출)
 * - 카드: 하트(좋아요) / 댓글
 * - 테이블명: public.photo / photo_likes / photo_comments
 */
export default function Community() {
  const [user, setUser] = React.useState(null);
  const [metrics, setMetrics] = React.useState({
    prize_krw: 0,
    cumulative_krw: 0,
  });
  const [photos, setPhotos] = React.useState([]);

  // 세션 추적
  React.useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setUser(session?.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) =>
      setUser(session?.user ?? null)
    );
    return () => sub?.subscription?.unsubscribe?.();
  }, []);

  // 상단 지표
  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase
          .from("site_metrics")
          .select("prize_krw,cumulative_krw")
          .eq("id", 1)
          .single();
        if (data) setMetrics(data);
      } catch {
        /* noop */
      }
    })();
  }, []);

  // 피드(최신순 고정)
  React.useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const { data } = await supabase
        .from("photo")
        .select("id,user_id,public_url,caption,created_at")
        .order("created_at", { ascending: false })
        .limit(36);
      setPhotos(data || []);
    } catch (e) {
      console.warn("feed load skipped:", e);
    }
  }

  // 업로드 버튼(상/하 단일 동작) — Nav가 만들어둔 전역 픽커 호출
  function onUploadClick(e) {
    e.preventDefault();
    if (typeof window.__openUpload === "function") {
      // 반드시 '사용자 제스처' 안에서 호출되어야 iOS가 액션시트(카메라/사진보관함/파일)를 띄웁니다.
      window.__openUpload();
    } else {
      alert("업로드 준비 중입니다. 새로고침 후 다시 시도해주세요.");
    }
  }

  return (
    <section className="community">
      <div className="kj-container">
        {/* 상단 지표 */}
        <div className="metrics">
          <div className="row">
            <div>상금</div>
            <div>{krw(metrics.prize_krw)}</div>
          </div>
          <div className="div" />
          <div className="row">
            <div>누적 후원 금액</div>
            <div>{krw(metrics.cumulative_krw)}</div>
          </div>
        </div>

        {/* 제목 + 업로드 버튼 (정렬 토글 제거) */}
        <div className="gallery-head">
          <h2>사진 갤러리</h2>
          <div className="right">
            <button className="upload" onClick={onUploadClick}>
              업로드
            </button>
          </div>
        </div>

        {/* 갤러리 */}
        <div className="grid">
          {photos.map((p) => (
            <Card key={p.id} p={p} authed={!!user} />
          ))}
          {photos.length === 0 && (
            <div className="empty">
              아직 업로드가 없어요. 로그인 후 첫 사진을 올려보세요.
            </div>
          )}
        </div>
      </div>

      <style>{`
        .community{padding:28px 16px;color:#fff}
        .kj-container{max-width:980px;margin:0 auto}

        .metrics{
          background:rgba(0,0,0,.30);
          border:1px solid rgba(255,255,255,.14);
          border-radius:16px;padding:16px;
          display:grid;gap:12px;grid-template-rows:auto 1px auto;margin-bottom:16px
        }
        .metrics .row{display:flex;justify-content:space-between;font-weight:800}
        .div{height:1px;background:rgba(255,255,255,.18);border-radius:1px}

        .gallery-head{display:flex;align-items:center;justify-content:space-between;margin:10px 0 8px}
        .gallery-head h2{margin:0;font-size:20px}
        .right{display:flex;align-items:center;gap:12px}
        .upload{background:#fff;color:#000;border:0;border-radius:999px;padding:8px 14px;font-weight:800;cursor:pointer}

        .grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
        @media(max-width:640px){.grid{grid-template-columns:1fr}}
        .empty{opacity:.85;padding:24px 0}
      `}</style>
    </section>
  );
}

/** 카드: 좋아요/댓글 */
function Card({ p, authed }) {
  const [liked, setLiked] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const [comments, setComments] = React.useState([]);
  const [text, setText] = React.useState("");

  React.useEffect(() => {
    refreshLikes();
    refreshComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function refreshLikes() {
    try {
      const { count } = await supabase
        .from("photo_likes")
        .select("*", { count: "exact", head: true })
        .eq("photo_id", p.id);
      setCount(count || 0);

      if (authed) {
        const { data: sess } = await supabase.auth.getSession();
        const uid = sess?.session?.user?.id;
        if (uid) {
          const { data } = await supabase
            .from("photo_likes")
            .select("photo_id")
            .eq("photo_id", p.id)
            .eq("user_id", uid)
            .maybeSingle();
          setLiked(!!data);
        } else setLiked(false);
      } else setLiked(false);
    } catch (e) {
      console.warn("likes skipped:", e);
    }
  }

  async function refreshComments() {
    try {
      const { data } = await supabase
        .from("photo_comments")
        .select("id,content,created_at")
        .eq("photo_id", p.id)
        .order("created_at", { ascending: true });
      setComments(data || []);
    } catch (e) {
      console.warn("comments skipped:", e);
    }
  }

  async function toggleLike() {
    try {
      const { data: sess } = await supabase.auth.getSession();
      const uid = sess?.session?.user?.id;
      if (!uid) return;
      if (liked) {
        await supabase
          .from("photo_likes")
          .delete()
          .eq("photo_id", p.id)
          .eq("user_id", uid);
      } else {
        await supabase.from("photo_likes").insert({ photo_id: p.id, user_id: uid });
      }
      refreshLikes();
    } catch (e) {
      console.warn("like skipped:", e);
    }
  }

  async function postComment(e) {
    e.preventDefault();
    try {
      const { data: sess } = await supabase.auth.getSession();
      const uid = sess?.session?.user?.id;
      if (!uid || !text.trim()) return;
      await supabase
        .from("photo_comments")
        .insert({ photo_id: p.id, user_id: uid, content: text.trim() });
      setText("");
      refreshComments();
    } catch (e) {
      console.warn("cmt skipped:", e);
    }
  }

  return (
    <article className="card">
      <figure className="frame">
        <img src={p.public_url} alt={p.caption || "photo"} loading="lazy" />
        <button
          className={`heart ${liked ? "on" : ""}`}
          onClick={toggleLike}
          disabled={!authed}
        >
          ♥ {count}
        </button>
      </figure>
      {p.caption && <p className="cap">{p.caption}</p>}
      <div className="cmt">
        <ul>{comments.map((c) => <li key={c.id}>• {c.content}</li>)}</ul>
        <form onSubmit={postComment}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={authed ? "댓글 입력" : "로그인 필요"}
            disabled={!authed}
          />
          <button disabled={!authed}>등록</button>
        </form>
      </div>

      <style>{`
        .card{background:rgba(0,0,0,.30);border:1px solid rgba(255,255,255,.14);border-radius:14px;overflow:hidden}
        .frame{position:relative;width:100%;aspect-ratio:4/5;background:#111}
        .frame img{width:100%;height:100%;object-fit:cover;display:block}
        .heart{position:absolute;left:10px;bottom:10px;background:rgba(0,0,0,.55);color:#fff;border:0;border-radius:999px;padding:6px 10px;font-weight:800}
        .heart.on{background:#ff6b6b}
        .cap{margin:8px 10px 0}
        .cmt{padding:8px 10px 12px}
        .cmt ul{list-style:none;margin:0 0 6px;padding:0;display:flex;flex-direction:column;gap:4px}
        .cmt form{display:flex;gap:6px}
        .cmt input{flex:1;border:1px solid rgba(255,255,255,.25);background:transparent;color:#fff;border-radius:8px;padding:8px}
        .cmt button{border:0;background:#fff;color:#111;border-radius:8px;padding:8px 12px;font-weight:800}
      `}</style>
    </article>
  );
}
