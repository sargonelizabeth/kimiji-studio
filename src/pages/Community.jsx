import React from "react";
import { supabase } from "../lib/supabaseClient.js";
import { useAuth } from "../providers/AuthProvider.jsx";
import AuthInline from "../components/AuthInline.jsx";

const krw = n => new Intl.NumberFormat("ko-KR",{style:"currency",currency:"KRW"}).format(n||0);

export default function Community() {
  const { user } = useAuth();
  const [metrics, setMetrics] = React.useState({ prize_krw: 0, cumulative_krw: 0 });
  const [photos, setPhotos] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const pageSize = 12;

  // 메트릭 로드(실패해도 죽지 않음)
  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase
          .from("site_metrics")
          .select("prize_krw,cumulative_krw")
          .eq("id", 1)
          .single();
        if (data) setMetrics(data);
      } catch (e) {
        console.warn("metrics load skipped:", e);
      }
    })();
  }, []);

  // 갤러리 로드(실패해도 UI는 유지)
  async function loadMore(reset=false){
    try {
      const from = reset ? 0 : page * pageSize;
      const to   = from + pageSize - 1;
      const { data } = await supabase
        .from("photos")
        .select("id,user_id,public_url,caption,created_at")
        .order("created_at",{ascending:false})
        .range(from,to);
      if (data) {
        setPhotos(reset ? data : [...photos, ...data]);
        setPage(reset ? 1 : page + 1);
      }
    } catch (e) {
      console.warn("photos load skipped:", e);
    }
  }
  React.useEffect(()=>{ loadMore(true); },[]);

  return (
    <section className="community">
      <div className="kj-container">
        {/* 상단 지표 */}
        <div className="metrics">
          <div className="row"><div>상금</div><div>{krw(metrics.prize_krw)}</div></div>
          <div className="div" />
          <div className="row"><div>누적 후원 금액</div><div>{krw(metrics.cumulative_krw)}</div></div>
        </div>

        {/* 갤러리 */}
        <h2>사진 갤러리</h2>
        <div className="grid">
          {photos.map(p => <Card key={p.id} p={p} authed={!!user} />)}
          {photos.length === 0 && (
            <div style={{opacity:.8, padding:"24px 0"}}>아직 업로드가 없어요. 로그인 후 첫 사진을 올려보세요.</div>
          )}
        </div>
        <div className="more"><button className="btn" onClick={()=>loadMore(false)}>더 보기</button></div>

        {!user && (<div className="auth"><p>로그인하면 업로드/좋아요/댓글 가능</p><AuthInline/></div>)}
      </div>

      <style>{`
        .community{padding:32px 16px 48px;color:#fff}
        .kj-container{max-width:980px;margin:0 auto}
        .metrics{background:rgba(255,255,255,.06);border-radius:16px;padding:16px;box-shadow:0 8px 24px rgba(0,0,0,.2);display:grid;gap:12px;grid-template-rows:auto 1px auto;margin-bottom:16px}
        .metrics .row{display:flex;justify-content:space-between;font-weight:800}
        .div{height:1px;background:rgba(255,255,255,.15);border-radius:1px}
        .grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}@media(max-width:640px){.grid{grid-template-columns:1fr}}
        .more{display:flex;justify-content:center;margin-top:12px}
        .btn{background:#fff;color:#111;border:0;border-radius:999px;padding:10px 18px;font-weight:800;cursor:pointer}
        .auth{margin-top:16px}
      `}</style>
    </section>
  );
}

function Card({ p, authed }) {
  const [liked,setLiked]=React.useState(false);
  const [count,setCount]=React.useState(0);
  const [comments,setComments]=React.useState([]);
  const [text,setText]=React.useState("");

  React.useEffect(()=>{ refreshLikes(); refreshComments(); },[]);

  async function refreshLikes(){
    try{
      const { count } = await supabase.from("photo_likes").select("*",{count:"exact",head:true}).eq("photo_id",p.id);
      setCount(count||0);
      if(authed){
        const { data } = await supabase.from("photo_likes").select("photo_id").eq("photo_id",p.id).maybeSingle();
        setLiked(!!data);
      } else setLiked(false);
    }catch(e){ console.warn("likes skipped:", e); }
  }

  async function refreshComments(){
    try{
      const { data } = await supabase.from("photo_comments").select("id,content,created_at").eq("photo_id",p.id).order("created_at",{ascending:true});
      setComments(data||[]);
    }catch(e){ console.warn("comments skipped:", e); }
  }

  async function toggleLike(){
    try{
      const { data:sess } = await supabase.auth.getSession(); if(!sess?.session) return;
      if(liked){ await supabase.from("photo_likes").delete().eq("photo_id",p.id).eq("user_id",sess.session.user.id); }
      else { await supabase.from("photo_likes").insert({ photo_id:p.id, user_id:sess.session.user.id }); }
      refreshLikes();
    }catch(e){ console.warn("toggleLike skipped:", e); }
  }

  async function postComment(e){
    e.preventDefault();
    try{
      const { data:sess } = await supabase.auth.getSession(); if(!sess?.session || !text.trim()) return;
      await supabase.from("photo_comments").insert({ photo_id:p.id, user_id:sess.session.user.id, content:text.trim() });
      setText(""); refreshComments();
    }catch(e){ console.warn("postComment skipped:", e); }
  }

  return (
    <article className="card">
      <figure className="frame"><img src={p.public_url} alt={p.caption||"photo"} loading="lazy"/></figure>
      {p.caption && <p className="cap">{p.caption}</p>}
      <div className="act"><button className={`like ${liked?"on":""}`} onClick={toggleLike} disabled={!authed}>♥ {count}</button></div>
      <div className="cmt">
        <ul>{comments.map(c=><li key={c.id}>• {c.content}</li>)}</ul>
        <form onSubmit={postComment}><input value={text} onChange={e=>setText(e.target.value)} placeholder={authed?"댓글 입력":"로그인 필요"} disabled={!authed}/><button disabled={!authed}>등록</button></form>
      </div>
      <style>{`
        .card{background:rgba(255,255,255,.06);border-radius:14px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,.2)}
        .frame{width:100%;aspect-ratio:4/5;background:#111}.frame img{width:100%;height:100%;object-fit:cover;display:block}
        .cap{margin:8px 10px 0;font-weight:600;color:#fff}
        .act{display:flex;justify-content:flex-end;padding:8px 10px 0}.like{border:0;background:transparent;font-weight:800;cursor:pointer;color:#fff;opacity:.9}.like.on{color:#ff6b6b}
        .cmt{padding:8px 10px 12px}.cmt ul{list-style:none;margin:0 0 6px;padding:0;display:flex;flex-direction:column;gap:4px;color:#fff}
        .cmt form{display:flex;gap:6px}.cmt input{flex:1;border:1px solid rgba(255,255,255,.25);background:transparent;color:#fff;border-radius:8px;padding:8px}
        .cmt button{border:0;background:#fff;color:#111;border-radius:8px;padding:8px 12px;font-weight:800}
      `}</style>
    </article>
  );
}
