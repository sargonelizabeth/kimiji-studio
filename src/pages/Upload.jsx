// src/pages/Upload.jsx
import React from "react"
import { supabase } from "@/lib/supabaseClient.js"

const BUCKET = "photo"

export default function UploadPage(){
  const [user, setUser]   = React.useState(null)
  const [file, setFile]   = React.useState(null)
  const [preview, setPreview] = React.useState("")
  const [caption, setCaption] = React.useState("")
  const [busy, setBusy]   = React.useState(false)

  React.useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>setUser(session?.user ?? null))
    const { data:sub } = supabase.auth.onAuthStateChange((_e,s)=>setUser(s?.user ?? null))
    return ()=>sub?.subscription?.unsubscribe?.()
  },[])

  function openPicker(){
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e)=>{
      const f = e.target.files?.[0]
      if(!f) return
      setFile(f)
      setPreview(URL.createObjectURL(f))
    }
    // iOS Safari 대응: click()
    input.click()
  }

  async function doUpload(e){
    e.preventDefault()
    if(!user){ window.location.href="/signup.html"; return }
    if(!file){ alert("이미지를 선택해 주세요."); return }
    setBusy(true)
    try{
      const ext  = (file.name.split(".").pop() || "jpg").toLowerCase()
      const path = `${user.id}/${Date.now()}.${ext}`

      const { error:upErr } = await supabase.storage.from(BUCKET).upload(path, file, { upsert:false })
      if(upErr) throw upErr

      const { data:{ publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(path)
      const { error:dbErr } = await supabase.from("photo").insert({
        user_id: user.id, storage_path: path, public_url: publicUrl, caption: caption || null
      })
      if(dbErr) throw dbErr

      setBusy(false)
      window.location.href = "/community.html"
    }catch(err){
      setBusy(false)
      alert(`업로드 실패: ${err?.message || err}`)
    }
  }

  return (
    <section className="upload-page">
      <div className="kj-container">
        <h1>사진 업로드</h1>
        {!user && <p style={{opacity:.8}}>로그인이 필요합니다. 상단 로그인으로 진행해 주세요.</p>}

        <div className="uibox">
          <div className="preview" onClick={openPicker} role="button" tabIndex={0}>
            {preview ? <img src={preview} alt="preview" /> : <span>이미지 선택</span>}
          </div>

          <input
            type="text"
            placeholder="캡션(선택)"
            value={caption}
            onChange={(e)=>setCaption(e.target.value)}
          />

          <button className="btn" onClick={doUpload} disabled={busy}>
            {busy ? "업로드 중…" : "업로드"}
          </button>
        </div>
      </div>

      <style>{`
        .upload-page{padding:28px 16px;color:#fff}
        .kj-container{max-width:780px;margin:0 auto}
        .uibox{display:flex;flex-direction:column;gap:12px;background:rgba(0,0,0,.30);border:1px solid rgba(255,255,255,.14);border-radius:16px;padding:16px}
        .preview{background:#222;border-radius:12px;aspect-ratio:4/5;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;opacity:.9}
        .preview img{width:100%;height:100%;object-fit:cover;border-radius:12px}
        .uibox input{border:1px solid rgba(255,255,255,.25);background:transparent;color:#fff;border-radius:10px;padding:10px}
        .btn{background:#fff;color:#000;border:0;border-radius:12px;padding:10px 14px;font-weight:800;cursor:pointer}
      `}</style>
    </section>
  )
}
