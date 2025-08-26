import { useEffect, useRef, useState } from "react";

export default function Hero(){
  const vRef = useRef(null);
  const [usePoster, setUsePoster] = useState(false);

  useEffect(() => {
    const v = vRef.current;
    if (!v) return;
    v.muted = true; // iOS 자동재생 조건
    const tryPlay = async () => {
      try { await v.play(); } catch {}
    };
    tryPlay();

    // 첫 제스처에서 재시도 (iOS 정책)
    const unlock = async () => { try { await v.play(); } catch {} window.removeEventListener("pointerdown", unlock); };
    window.addEventListener("pointerdown", unlock, { once:true, passive:true });

    // 1.8s 안에 재생 준비가 안 되면 이미지 fallback
    const t = setTimeout(() => {
      if (!v || v.readyState < 2) setUsePoster(true);
    }, 1800);
    return () => clearTimeout(t);
  }, []);

  const commonStyle = { position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" };

  return (
    <section id="top" style={{position:"relative", width:"100vw", height:"100vh", overflow:"hidden", background:"#000", textAlign:"center"}}>
      {/* 배경 레이어 */}
      {!usePoster && (
        <video
          ref={vRef}
          className="hero-video"
          playsInline
          autoPlay
          muted
          loop
          preload="metadata"
          poster="/assets/portfolio/p01.jpg"
          style={commonStyle}
          onError={() => setUsePoster(true)}
          onSuspend={() => setUsePoster(true)}
        >
          <source src="/videos/bg.mp4" type="video/mp4" />
        </video>
      )}
      {usePoster && (
        <img src="/assets/portfolio/p01.jpg" alt="" aria-hidden="true" style={commonStyle}/>
      )}

      {/* 오버레이(가독성) */}
      <div style={{position:"absolute", inset:0, background:"linear-gradient(180deg, rgba(0,0,0,.35), rgba(0,0,0,.55))"}} />

      {/* 콘텐츠 */}
      <div style={{position:"relative", zIndex:2, display:"grid", placeItems:"center", height:"100%"}}>
        <div>
          <h1 className="kj-800 kj-softshadow" style={{fontSize:"clamp(28px, 7vw, 56px)", margin:"0 0 8px"}}>KIMIJI STUDIO</h1>
          <p style={{fontSize:"clamp(14px, 3.8vw, 20px)", margin:"0 0 18px"}}>일상에서 스튜디오 화보로!</p>
          <p style={{maxWidth:560, margin:"0 auto 18px", padding:"0 16px",
            fontSize:"clamp(13px, 3.6vw, 16px)"}}>
            사진관에 가지 않아도 우리 아이의 일상을 스튜디오 사진으로 남길 수 있어요!
          </p>
          <a href="#pricing" className="kj-800 kj-card" style={{
            display:"inline-flex", alignItems:"center", justifyContent:"center",
            height:48, padding:"0 20px", borderRadius:9999, background:"#fff", color:"#111",
            boxShadow:"0 10px 24px rgba(0,0,0,.35)"
          }}>제작하기</a>
        </div>
      </div>
    </section>
  );
}
