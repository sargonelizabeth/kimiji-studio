import React, { useEffect, useState } from "react"
import SortBar from "@/components/SortBar.jsx"
import { supabase } from "@/lib/supabaseClient.js"

const krw = n => new Intl.NumberFormat("ko-KR",{style:"currency",currency:"KRW"}).format(n||0)

export default function Community() {
  const [metrics, setMetrics] = useState({ prize_krw: 0, cumulative_krw: 0 })
  const [sort, setSort] = useState("latest")
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(0)
  const [authed, setAuthed] = useState(false)
  const pageSize = 12

  useEffect(() => {
    supabase.auth.getSession().then(({ data:{ session } }) => setAuthed(!!session?.user))
    supabase.auth.onAuthStateChange((_e, session) => setAuthed(!!session?.user))
  }, [])

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase
          .from("site_metrics")
          .select("prize_krw,cumulative_krw")
          .eq("id", 1).single()
        if (data) setMetrics(data)
      } catch {}
    })()
  }, [])

  async function loadMore(reset=false){
    try{
      const from = reset ? 0 : page * pageSize
      const to   = from + pageSize - 1
      const orderCol = sort === "popular" ? "likes_count" : "created_at"
      const { data, error } = await supabase
        .from("v_photos_stats")
        .select("id,user_id,public_url,caption,created_at,likes_count,comments_count")
        .order(orderCol,{ascending:false})
        .range(from,to)
      if (error) throw error
      setPhotos(reset ? (data||[]) : [...photos, ...(data||[])])
      setPage(reset ? 1 : page + 1)
    }catch{}
  }
  useEffect(()=>{ loadMore(true) }, [sort])

  async function ensureAuthRedirect() {
    const { data:{ session } } = await supabase.auth.getSession()
    if (!session?.user) { window.location.href="/signup.html"; return null }
    return session.user
  }

  async function onLike(photo_id){
    const user = await ensureAuthRedirect(); if (!user) return
    try{
      const { data:has } = await supabase
        .from("photo_likes")
        .select("photo_id").eq("photo_id",photo_id).eq("user_id",user.id).maybeSingle()
      if (has) await supabase.from("photo_likes").delete().eq("photo_id",photo_id).eq("user_id",user.id)
      else     await supabase.from("photo_likes").insert({ photo_id, user_id:user.id })
      loadMore(true)
    }catch{}
  }

  async function onComment(photo_id, text){
    const user = await ensureAuthRedirect(); if (!user) return
    const body = (text||"").trim(); if (!body) return
    try{ await supabase.from("photo_comments").insert({ photo_id, user_id:user.id, content:body }); loadMore(true) }catch{}
  }

  return (
    <section className="community">
      <div className="kj-container">
        <div className="metrics">
          <div className="row"><div>상금</div><div>{krw(metrics.prize_krw)}</div></div>
          <div className="div" />
          <div className="row"><div>누적 후원 금액</div><div>{krw(metrics.cumulative_krw)}</div></div>
        </div>

        <SortBar sort={sort} onChange={(v)=>{ setPage(0); setSort(v) }} />

        <h2>사진 갤러리</h2>
        <div className="grid">
          {photos.map(p => <Card key={p.id} p={p} authed={authed} onLike={onLike} onComment={onComment} />)}
          {photos.length===0 && <div style={{opacity:.8,padding:"24px 0"}}>아직 업로드가 없어요. 로그인 후 첫 사진을 올려보세요.</div>}
        </div>
        <div className="more"><button className="btn" onClick={()=>loadMore(false)}>더 보기</button></div>
      </div>
      <style>{`
        .community{padding:32px 16px 48px;color:#fff}
        .kj-container{max-width:980px;margin:0 auto}
        .metrics{background:rgba(255,255,255,.06);border-radius:16px;padding:16px;box-shadow:0 8px 24px rgba(0,0,0,.2);display:grid;gap:12px;grid-template-rows:auto 1px auto;margin-bottom:16px}
        .metrics .row{display:flex;justify-content:space-between;font-weight:800}
        .div{height:1px;background:rgba(255,255,255,.15);border-radius:1px}
        .grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
        @media(max-width:640px){.grid{grid-template-columns:1fr}}
        .more{display:flex;justify-content:center;margin-top:12px}
        .btn{background:#fff;color:#111;border:0;border-radius:999px;padding:10px 18px;font-weight:800;cursor:pointer}
      `}</style>
    </section>
  )
}

function Card({ p, authed, onLike, onComment }) {
  const [text,setText] = React.useState("")
  return (
    <article className="card">
      <figure className="frame"><img src={p.public_url} alt={p.caption||"photo"} loading="lazy"/></figure>
      {p.caption && <p className="cap">{p.caption}</p>}
      <div className="stat"><span>♥ {p.likes_count}</span><span>💬 {p.comments_count}</span></div>
      <div className="act"><button className="like" onClick={()=>onLike(p.id)} disabled={!authed}>좋아요</button></div>
      <div className="cmt">
        <form onSubmit={(e)=>{e.preventDefault(); onComment(p.id, text); setText("")}}>
          <input value={text} onChange={e=>setText(e.target.value)} placeholder={authed?"댓글 입력":"로그인 필요"} disabled={!authed}/>
          <button disabled={!authed}>등록</button>
        </form>
      </div>
      <style>{`
        .card{background:rgba(255,255,255,.06);border-radius:14px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,.2)}
        .frame{width:100%;aspect-ratio:4/5;background:#111}.frame img{width:100%;height:100%;object-fit:cover;display:block}
        .cap{margin:8px 10px 0;font-weight:600;color:#fff}
        .stat{display:flex;gap:10px;padding:6px 10px 0;color:#fff;opacity:.9;font-weight:700}
        .act{display:flex;justify-content:flex-end;padding:6px 10px 0}
        .like{border:0;background:#fff;color:#111;border-radius:8px;padding:6px 12px;font-weight:800;cursor:pointer}
        .cmt{padding:8px 10px 12px}.cmt form{display:flex;gap:6px}
        .cmt input{flex:1;border:1px solid rgba(255,255,255,.25);background:transparent;color:#fff;border-radius:8px;padding:8px}
        .cmt button{border:0;background:#fff;color:#111;border-radius:8px;padding:8px 12px;font-weight:800}
      `}</style>
    </article>
  )
}
