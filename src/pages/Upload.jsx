// src/pages/Upload.jsx (예시)
import React from 'react'
import { supabase } from '@/lib/supabaseClient.js'
const BUCKET = 'photo'

export default function UploadPage(){
  const [busy,setBusy] = React.useState(false)
  async function onPick(e){
    const file = e.target.files?.[0]; if(!file) return;
    setBusy(true)
    const { data:{ session } } = await supabase.auth.getSession()
    if(!session?.user){ setBusy(false); return; }

    const ext=(file.name.split('.').pop()||'jpg').toLowerCase()
    const path=`${session.user.id}/${Date.now()}.${ext}`
    const { error:upErr }=await supabase.storage.from(BUCKET).upload(path,file,{upsert:false,cacheControl:"3600"})
    if(upErr){ setBusy(false); return; }
    const { data:pub }=supabase.storage.from(BUCKET).getPublicUrl(path)
    await supabase.from("photos").insert({ user_id:session.user.id, public_url:pub.publicUrl, caption:null })
    setBusy(false)
  }
  return <input type="file" accept="image/*" onChange={onPick} disabled={busy}/>
}
