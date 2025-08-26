import { useEffect, useRef, useState } from "react";

export default function BgmController() {
  const audioRef = useRef(null);
  const [on, setOn] = useState(() => localStorage.getItem("kmj_bgm_on") !== "0"); // 기본 ON
  const targetVol = 0.6;

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0;
    a.loop = true;

    // 최초 재생 시도(브라우저가 막으면 무시됨)
    a.play().then(() => { if (!on) a.pause(); else fadeTo(a, targetVol); }).catch(()=>{});

    // 어떤 제스처든 발생하면 바로 재생 시도
    const unlock = async () => {
      if (!on) return;
      try { await a.play(); fadeTo(a, targetVol); } catch {}
      detach();
    };

    const evts = ["pointerdown","touchstart","keydown","wheel","scroll"];
    const detach = () => evts.forEach(e => window.removeEventListener(e, unlock));
    evts.forEach(e => window.addEventListener(e, unlock, { passive:true, once:true }));

    // 탭 비활성화/복귀
    const vis = () => { if (document.hidden) a.pause(); else if (on) a.play().catch(()=>{}); };
    document.addEventListener("visibilitychange", vis);

    return () => { detach(); document.removeEventListener("visibilitychange", vis); };
  }, []); // eslint-disable-line

  useEffect(() => {
    localStorage.setItem("kmj_bgm_on", on ? "1" : "0");
    const a = audioRef.current;
    if (!a) return;
    if (on) a.play().then(() => fadeTo(a, targetVol)).catch(()=>{});
    else fadeTo(a, 0, true);
  }, [on]); // eslint-disable-line

  function fadeTo(a, v, pause=false){
    const dur=300, start=a.volume, t0=performance.now();
    const step=(t)=>{ const k=Math.min(1,(t-t0)/dur); a.volume=start+(v-start)*k; if(k<1) requestAnimationFrame(step); else { a.volume=v; if(pause) a.pause(); } };
    requestAnimationFrame(step);
  }

  const btn = {
    position:"fixed", right:12, bottom:12, zIndex:9999,
    width:28, height:28, borderRadius:14,
    display:"inline-flex", alignItems:"center", justifyContent:"center",
    background:"rgba(17,17,17,.9)", color:"#fff",
    border:"1px solid rgba(255,255,255,.2)",
    boxShadow:"0 8px 18px rgba(0,0,0,.35)",
    backdropFilter:"blur(4px)", WebkitBackdropFilter:"blur(4px)",
    fontSize:14, lineHeight:1
  };

  return (
    <>
      <audio ref={audioRef} preload="auto" playsInline>
        <source src="/audio/bgm.mp3" type="audio/mpeg" />
        <source src="/audio/bgm.ogg" type="audio/ogg" />
      </audio>

      <button type="button" onClick={()=>setOn(s=>!s)} style={btn}
              aria-pressed={on} aria-label={on ? "배경음악 끄기" : "배경음악 켜기"}>
        {on ? "🔊" : "🔈"}
      </button>
    </>
  );
}
