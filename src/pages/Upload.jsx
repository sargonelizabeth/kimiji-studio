import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../providers/AuthProvider";
import AuthInline from "../components/AuthInline.jsx";

export default function Upload(){
  const { user } = useAuth();
  const [file,setFile]=useState(null); const [caption,setCaption]=useState(""); const [busy,setBusy]=useState(false); const [ok,setOk]=useState("");
  if(!user) return (<section className="upload"><div className="kj-container"><h2>업로드</h2><p>회원만 업로드 가능</p><AuthInline/></div></section>);
  async function onSubmit(e){
    e.preventDefault(); if(!file) return; setBusy(true); setOk("");
    const ext=file.name.split(".").pop(); const path=`${user.id}/${Date.now()}.${ext}`;
    const { error:upErr }=await supabase.storage.from("photos").upload(path,file,{upsert:false,cacheControl:"3600"}); if(upErr){ setBusy(false); return; }
    const { data:pub }=supabase.storage.from("photos").getPublicUrl(path);
    await supabase.from("photos").insert({ user_id:user.id, storage_path:path, public_url:pub.publicUrl, caption: caption||null });
    setBusy(false); setFile(null); setCaption(""); setOk("업로드 완료!");
  }
  return (
    <section className="upload"><div className="kj-container">
      <h2>업로드</h2>
      <form onSubmit={onSubmit} className="form">
        <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]??null)} />
        <input type="text" placeholder="캡션(선택)" value={caption} onChange={e=>setCaption(e.target.value)} />
        <button className="btn" disabled={busy||!file}>{busy?"업로드 중...":"업로드"}</button>
      </form>
      {ok && <p className="ok">{ok}</p>}
      <style>{`.upload{padding:32px 16px 48px}.kj-container{max-width:720px;margin:0 auto}.form{display:grid;gap:10px}.form input[type=text]{border:1px solid #ddd;border-radius:8px;padding:10px}.btn{background:#111;color:#fff;border:0;border-radius:999px;padding:10px 18px;font-weight:800;cursor:pointer;width:120px}.ok{margin-top:8px;color:#0a7f41;font-weight:700}`}</style>
    </div></section>
  );
}
