import React from "react";
import { supabase } from "@/lib/supabaseClient.js";

const BUCKET = "photo";
const krw = n => new Intl.NumberFormat("ko-KR",{style:"currency",currency:"KRW"}).format(n||0);

export default function Community(){
  const [user, setUser]   = React.useState(null);
  const [metrics, setMetrics] = React.useState({ prize_krw:0, cumulative_krw:0 });
  const [photos, setPhotos]   = React.useState([]);
  const fileRef = React.useRef(null);
  const pageSize = 18;

  // 세션
  React.useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>setUser(session?.user??null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session)=>setUser(session?.user??null));
    return ()=>sub?.subscription?.unsubscribe?.();
  },[]);

  // 메트릭
  React.useEffect(()=>{
    (async()=>{
      const { data } = await supabase.from("site_metrics")
        .select("prize_krw,cumulative_krw").eq("id",1).maybeSingle();
      if(data) setMetrics(data);
    })();
  },[]);

  // 피드
  React.useEffect(()=>{ load(true) },[]);
  async function load(reset=false){
    const { data, error } = await supabase
      .from("photo")
      .select("id,user_id,public_url,caption,created_at")
      .order("created_at",{ ascending:false })
      .limit(pageSize);
    if(!error) setPhotos(reset ? (data||[]) : [...photos, ...(data||[])]);
  }

  // 업로드: 미로그인 → 로그인 페이지로
  async function openPicker(){
    const { data:{ user } } = await supabase.auth.getUser();
    if(!user){
      const next = "/community.html#upload";
      window.location.href = `/login.html?next=${encodeURIComponent(next)}`;
      return;
    }
    fileRef.current?.click();
  }

  // 실제 업로드
  async function handlePick(e){
    const file = e.target.files?.[0];
    if(!file) return;
    if(!file.type?.startsWith("image/")){ alert("이미지 파일만 업로드 가능합니다."); e.target.value=""; return; }

    const { data:{ user } } = await supabase.auth.getUser();
    if(!user){ alert("로그인이 필요합니다."); e.target.value=""; return; }

    const ext = (file.name.split(".").pop()||"jpg").toLowerCase();
    const key = `${user.id}/${Date.now()}.${ext}`;

    const { error:upErr } = await supabase.storage.from(BUCKET).upload(key, file, { upsert:false });
    if(upErr){ alert("업로드 실패: " + upErr.message); e.target.value=""; return; }

    const { data:{ publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(key);
    const { error:insErr } = await supabase.from("photo")
      .insert({ user_id:user.id, public_url:publicUrl, caption:"" });
    if(insErr){ alert("DB 저장 실패: " + insErr.message); e.target.value=""; return; }

    e.target.value = "";
    setPhotos([]); load(true);
  }

  return (
    <section className="community">
      {/* iOS에서 동작 보장을 위해 화면 밖에 위치(visibility/hidden 사용 X) */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handlePick}
        style={{position:"fixed", left:"-9999px", top:0, width:1, height:1, opacity:0}}
        aria-hidden="true"
        tabIndex={-1}
      />

      <div className="kj-container">
        {/* 상단 지표 */}
        <div className="metrics">
          <div className="row"><div>상금</div><div>{krw(metrics.prize_krw)}</div></div>
          <div className="div" />
          <div className="row"><div>누적 후원 금액</div><div>{krw(metrics.cumulative_krw)}</div></div>
        </div>

        {/* 갤러리 헤더: 제작하기 제거, 업로드만 */}
        <div className="gallery-head">
          <h2>사진 갤러리</h2>
          <div className="right">
            <button className="upload" onClick={openPicker}>업로드</button>
          </div>
        </div>

        {/* 갤러리 */}
        <div className="grid">
          {photos.map(p => <Card key={p.id} p={p} authed={!!user} />)}
          {photos.length===0 && <div className="empty">아직 업로드가 없어요. 로그인 후 첫 사진을 올려보세요.</div>}
        </div>
      </div>

      <style>{`
        .community{padding:28px 16px;color:#fff}
        .kj-container{max-width:980px;margin:0 auto}
        .metrics{background:rgba(0,0,0,.30);border:1px solid rgba(255,255,255,.14);border-radius:16px;padding:16px;display:grid;gap:12px;grid-template-rows:auto 1px auto;margin-bottom:16px}
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

function Card({ p, authed }){
  const [liked,setLiked] = React.useState(false);
  const [count,setCount] = React.useState(0);
  const [comments,setComments] = React.useState([]);
  const [text,setText] = React.useState("");

  React.useEffect(()=>{ refreshLikes(); refreshComments() },[]);

  async function refreshLikes(){
    const { count } = await supabase.from("photo_likes")
      .select("*",{count:"exact",head:true}).eq("photo_id",p.id);
    setCount(count||0);
    if(authed){
      const { data:{ user } } = await supabase.auth.getUser();
      if(user){
        const { data } = await supabase.from("photo_likes")
          .select("photo_id").eq("photo_id",p.id).eq("user_id",user.id).maybeSingle();
        setLiked(!!data);
      } else setLiked(false);
    } else setLiked(false);
  }

  async function refreshComments(){
    const { data } = await supabase
      .from("photo_comments")
      .select("id,content,created_at")
      .eq("photo_id",p.id)
      .order("created_at",{ascending:true});
    setComments(data||[]);
  }

  async function toggleLike(){
    const { data:{ user } } = await supabase.auth.getUser();
    if(!user) return;
    if(liked){ await supabase.from("photo_likes").delete().eq("photo_id",p.id).eq("user_id",user.id) }
    else { await supabase.from("photo_likes").insert({ photo_id:p.id, user_id:user.id }) }
    refreshLikes();
  }

  async function postComment(e){
    e.preventDefault();
    const { data:{ user } } = await supabase.auth.getUser();
    if(!user || !text.trim()) return;
    await supabase.from("photo_comments").insert({ photo_id:p.id, user_id:user.id, content:text.trim() });
    setText(""); refreshComments();
  }

  return (
    <article className="card">
      <figure className="frame">
        <img src={p.public_url} alt={p.caption||"photo"} loading="lazy"/>
        <button className={`heart ${liked?"on":""}`} onClick={toggleLike} disabled={!authed}>♥ {count}</button>
      </figure>
      {p.caption && <p className="cap">{p.caption}</p>}
      <div className="cmt">
        <ul>{comments.map(c=><li key={c.id}>• {c.content}</li>)}</ul>
        <form onSubmit={postComment}>
          <input value={text} onChange={e=>setText(e.target.value)} placeholder={authed?"댓글 입력":"로그인 필요"} disabled={!authed}/>
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
