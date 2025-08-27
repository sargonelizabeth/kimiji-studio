import React from "react"
import { supabase } from "@/lib/supabaseClient.js"

const krw = n => new Intl.NumberFormat("ko-KR",{style:"currency",currency:"KRW"}).format(n||0)

export default function Community(){
  const [user, setUser]   = React.useState(null)
  const [metrics, setMetrics] = React.useState({ prize_krw:0, cumulative_krw:0 })
  const [photos, setPhotos]   = React.useState([])
  const [sort, setSort]       = React.useState("latest") // 'latest' | 'popular'
  const pageSize = 18
  const fileRef = React.useRef(null)

  // 세션 추적
  React.useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>setUser(session?.user??null))
    const { data } = supabase.auth.onAuthStateChange((_e, session)=>setUser(session?.user??null))
    return ()=>data?.subscription?.unsubscribe?.()
  },[])

  // 상단 지표
  React.useEffect(()=>{
    ;(async()=>{
      try{
        const { data } = await supabase
          .from("site_metrics")
          .select("prize_krw,cumulative_krw")
          .eq("id",1)
          .single()
        if(data) setMetrics(data)
      }catch{}
    })()
  },[])

  // 피드 로드
  React.useEffect(()=>{ load(true) },[sort])

  async function load(reset=false){
    try{
      if (sort === "latest"){
        const { data } = await supabase
          .from("photos")
          .select("id,user_id,public_url,caption,created_at")
          .order("created_at",{ ascending:false })
          .limit(pageSize)
        setPhotos(reset ? (data||[]) : [...photos, ...(data||[])])
      } else {
        // popular: 좋아요 카운트를 별도 조회 후 클라이언트 정렬(안전/안정)
        const { data: base } = await supabase
          .from("photos")
          .select("id,user_id,public_url,caption,created_at")
          .limit(pageSize * 2)

        const ids = (base||[]).map(p=>p.id)
        let likeMap = {}
        if (ids.length){
          const { data: counts } = await supabase
            .from("photo_likes_count")
            .select("photo_id,count")
            .in("photo_id", ids)
          counts?.forEach(c => { likeMap[c.photo_id] = c.count })
        }
        const sorted = (base||[])
          .slice()
          .sort((a,b)=>(likeMap[b.id]||0)-(likeMap[a.id]||0))
          .slice(0, pageSize)

        setPhotos(reset ? sorted : [...photos, ...sorted])
      }
    }catch(e){ console.warn("feed load skipped:", e) }
  }

  // Nav의 업로드 트리거와 연결
  React.useEffect(()=>{
    const handler = ()=>{ if(fileRef.current) fileRef.current.click() }
    window.addEventListener("open-upload", handler)
    return ()=>window.removeEventListener("open-upload", handler)
  },[])

  // 업로드(앨범에서 1장)
  async function handlePick(e){
    const file = e.target.files?.[0]
    if(!file) return

    if (!file.type || !file.type.startsWith("image/")){
      alert("이미지 파일만 선택해주세요.")
      e.target.value = ""
      return
    }

    const { data:{ session } } = await supabase.auth.getSession()
    if(!session?.user){
      alert("로그인이 필요합니다.")
      e.target.value = ""
      return
    }

    const ext = (file.name.split(".").pop()||"jpg").toLowerCase()
    const key = `${session.user.id}/${Date.now()}.${ext}`

    const up = await supabase.storage.from("photos").upload(key, file, { upsert:false })
    if(up.error){
      alert("업로드 실패")
      e.target.value = ""
      return
    }

    const { data:{ publicUrl } } = supabase.storage.from("photos").getPublicUrl(key)
    await supabase.from("photos").insert({ user_id: session.user.id, public_url: publicUrl, caption: "" })

    e.target.value = ""     // 같은 파일 다시 선택 가능
    setPhotos([]); load(true)
  }

  function toggleSort(next){ if(next!==sort) setSort(next) }

  return (
    <section className="community">
      {/* capture 제거 → 카메라 강제 없음, 사진첩 선택 가능 */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handlePick}
      />

      <div className="kj-container">
        {/* 상단 지표 */}
        <div className="metrics">
          <div className="row"><div>상금</div><div>{krw(metrics.prize_krw)}</div></div>
          <div className="div" />
          <div className="row"><div>누적 후원 금액</div><div>{krw(metrics.cumulative_krw)}</div></div>
        </div>

        {/* 제목 + 정렬 텍스트 + 업로드 버튼 */}
        <div className="gallery-head">
          <h2>사진 갤러리</h2>
          <div className="right">
            <div className="sort">
              <span className={sort==="latest"?"on":""} onClick={()=>toggleSort("latest")}>최신순</span>
              <span className="sep">|</span>
              <span className={sort==="popular"?"on":""} onClick={()=>toggleSort("popular")}>인기순</span>
            </div>
            <button className="upload" onClick={()=>window.dispatchEvent(new CustomEvent("open-upload"))}>업로드</button>
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
        .sort span{opacity:.78;cursor:pointer}
        .sort .on{opacity:1;font-weight:800}
        .sort .sep{opacity:.5;margin:0 6px}
        .upload{background:#fff;color:#000;border:0;border-radius:999px;padding:8px 14px;font-weight:800;cursor:pointer}

        .grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
        @media(max-width:640px){.grid{grid-template-columns:1fr}}
        .empty{opacity:.85;padding:24px 0}
      `}</style>
    </section>
  )
}

function Card({ p, authed }){
  const [liked,setLiked]     = React.useState(false)
  const [count,setCount]     = React.useState(0)
  const [comments,setComments] = React.useState([])
  const [text,setText]       = React.useState("")

  React.useEffect(()=>{ refreshLikes(); refreshComments() },[])

  async function refreshLikes(){
    try{
      const { count } = await supabase
        .from("photo_likes")
        .select("*",{count:"exact",head:true})
        .eq("photo_id",p.id)
      setCount(count||0)

      if(authed){
        const { data: sess } = await supabase.auth.getSession()
        const uid = sess?.session?.user?.id
        if(uid){
          const { data } = await supabase
            .from("photo_likes")
            .select("photo_id")
            .eq("photo_id",p.id)
            .eq("user_id",uid)
            .maybeSingle()
          setLiked(!!data)
        } else setLiked(false)
      } else {
        setLiked(false)
      }
    }catch(e){ console.warn("likes skipped:", e) }
  }

  async function refreshComments(){
    try{
      const { data } = await supabase
        .from("photo_comments")
        .select("id,content,created_at")
        .eq("photo_id",p.id)
        .order("created_at",{ascending:true})
      setComments(data||[])
    }catch(e){ console.warn("comments skipped:", e) }
  }

  async function toggleLike(){
    try{
      const { data:sess } = await supabase.auth.getSession()
      const uid = sess?.session?.user?.id
      if(!uid) return
      if(liked){
        await supabase.from("photo_likes").delete().eq("photo_id",p.id).eq("user_id",uid)
      }else{
        await supabase.from("photo_likes").insert({ photo_id:p.id, user_id:uid })
      }
      refreshLikes()
    }catch(e){ console.warn("like skipped:", e) }
  }

  async function postComment(e){
    e.preventDefault()
    try{
      const { data:sess } = await supabase.auth.getSession()
      const uid = sess?.session?.user?.id
      if(!uid || !text.trim()) return
      await supabase.from("photo_comments").insert({ photo_id:p.id, user_id:uid, content:text.trim() })
      setText("")
      refreshComments()
    }catch(e){ console.warn("cmt skipped:", e) }
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
  )
}
