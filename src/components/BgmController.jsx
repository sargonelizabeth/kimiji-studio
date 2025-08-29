// src/components/BgmController.jsx
import React from "react";

export default function BgmController(){
  const audioRef = React.useRef(null);
  const [playing,setPlaying] = React.useState(false);

  React.useEffect(()=>{
    const a = audioRef.current;
    const kick = () => a?.play?.().then(()=>setPlaying(true)).catch(()=>{});
    document.addEventListener("touchstart", kick, { once:true });
    document.addEventListener("click",      kick, { once:true });
  },[]);

  const toggle = ()=>{
    const a = audioRef.current;
    if(!a) return;
    if(playing){ a.pause(); setPlaying(false); }
    else { a.play().then(()=>setPlaying(true)).catch(()=>{}); }
  };

  return (
    <>
      <audio ref={audioRef} src="/bgm.mp3" loop preload="auto" playsInline />
      <button className="bgm-toggle" onClick={toggle} aria-pressed={playing}>
        {playing ? "🔊" : "🔈"}
      </button>
      <style>{`
        .bgm-toggle{
          position:fixed; right:12px; bottom:12px; z-index:60;
          background:rgba(0,0,0,.7); color:#fff; border:0; border-radius:999px;
          padding:10px 12px; font-size:14px; font-weight:800; cursor:pointer;
        }
      `}</style>
    </>
  );
}
