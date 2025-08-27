// src/pages/Upload.jsx
import React from "react"
import { supabase } from "@/lib/supabaseClient.js"
const BUCKET = "photo"

export default function Upload(){
  const [busy,setBusy] = React.useState(false)
  const [file,setFile] = React.useState(null)
  const [caption,setCaption] = React.useState("")

  async function onSubmit(e){
    e.preventDefault()
    if(!file) return
    setBusy(true)

    const { data:{ session } } = await supabase.auth.getSession()
    if(!session?.user){ window.location.href="/signup.html"; return }

    const ext = (file.name.split(".").pop()||"jpg").toLowerCase()
    const path = `${session.user.id}/${Date.now()}.${ext}`

    const { error:upErr } = await supabase.storage.from(BUCKET).upload(path, file, { upsert:false, cacheControl:"3600" })
    if(upErr){ alert("업로드 실패: "+upErr.message); setBusy(false); return }

    const { data:pub } = supabase.storage.from(BUCKET).getPublicUrl(path)
    await supabase.from("photo").insert({
      user_id: session.user.id,
      storage_path: path,
      public_url: pub.publicUrl,
      caption: caption || null
    })
    setBusy(false)
    window.location.href = "/community.html"
  }

  return (
    <section style={{maxWidth:520,margin:"40px auto",padding:"0 16px",color:"#fff"}}>
      <h1 style={{margin:"0 0 12px"}}>업로드</h1>
      <form onSubmit={onSubmit}>
        <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)} />
        <input style={{display:"block",width:"100%",marginTop:10}} value={caption} onChange={e=>setCaption(e.target.value)} placeholder="캡션(선택)" />
        <button disabled={busy||!file} style={{marginTop:12,padding:"10px 16px",border:0,borderRadius:10,fontWeight:800}}>
          {busy ? "업로드 중…" : "업로드"}
        </button>
      </form>
    </section>
  )
}
