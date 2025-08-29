// 예: src/components/BgmController.jsx
import React from "react";
export default function BgmController(){
  const ref = React.useRef(null);
  React.useEffect(()=>{
    function arm(){
      const a = ref.current;
      if (!a) return;
      a.muted = false;
      a.play().catch(()=>{ /* 사용자가 거부하면 버튼으로만 */ });
      window.removeEventListener("pointerdown", arm);
      window.removeEventListener("touchstart", arm);
    }
    window.addEventListener("pointerdown", arm, { once:true });
    window.addEventListener("touchstart", arm, { once:true });
  },[]);
  return <audio ref={ref} src="/bgm.mp3" preload="auto" loop muted playsInline/>;
}
