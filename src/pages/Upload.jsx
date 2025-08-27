import React from "react"
import { createRoot } from "react-dom/client"
import Nav from "@/components/NavPure.jsx"
import { supabase } from "@/lib/supabaseClient.js"
import "@/styles/brand.css"
import "@/styles/fonts.css"
import "@/index.css"

const BUCKET = "photo"

function Upload(){
  const [file,setFile] = React.useState(null)
  const [caption,setCaption] = React.useState("")
  const [busy,setBusy] = React.useState(false)

  async function onSubmit(e){
    e.preventDefault()
    if(!file){ alert("사진을 선택하세요."); return }
    const { data:{ session } } = await supabase.auth.getSession()
    if(!session?.user){ window.location.href="/signup.html"; return }

    setBusy(true)
    const ext=(file.name.split(".").pop()||"jpg").toLowerCase()
    const key=`${session.user.id}/${Date.now()}.${ext}`

    const { error:upErr } = await supabase.storage.from(BUCKET).upload(key,file,{ upsert:false, cacheControl:"3600" })
    if(upErr){ setBusy(false); alert("업로드 실패: "+upErr.message); return }

    const { data:{ publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(key)
    const { error:insErr } = await supabase.from("photo").insert({ user_id:session.user.id, public_url:publicUrl, caption: caption||null })
    setBusy(false)
    if(insErr){ alert("DB 저장 실패: "+insErr.message); return }

    window.location.href="/community.html"
  }

  return (
    <>
      <Nav />
      <section className="upload-page" style={{padding:"24px", color:"#fff"}}>
        <h1>사진 업로드</h1>
        <form onSubmit={onSubmit} style={{display:"grid", gap:12, maxWidth:420}}>
          <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)} />
          <input type="text" placeholder="캡션(선택)" value={caption} onChange={e=>setCaption(e.target.value)} />
          <button disabled={busy} className="btn-cta-global">{busy?"업로드 중…":"업로드"}</button>
        </form>
      </section>
    </>
  )
}

createRoot(document.getElementById("root")).render(<Upload />)
