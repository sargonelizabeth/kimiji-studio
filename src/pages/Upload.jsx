// src/pages/Upload.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import Nav from '@/components/Nav.jsx'
import '@/index.css'

function UploadPage(){
  React.useEffect(()=>{
    // Nav와 동일한 이벤트를 재사용
    window.dispatchEvent(new CustomEvent('open-upload'))
    // 커뮤니티로 돌아가도 동일하게 작동하도록
    const t = setTimeout(()=>{ window.location.href = '/community.html' }, 1200)
    return ()=>clearTimeout(t)
  },[])
  return (
    <>
      <Nav />
      <main style={{padding:'24px',color:'#fff'}}>업로드를 준비중입니다…</main>
    </>
  )
}
export default UploadPage

createRoot(document.getElementById('root')).render(<UploadPage />)
