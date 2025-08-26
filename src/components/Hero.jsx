// src/components/Hero.jsx
export default function Hero() {
  const v = {
    position:"absolute", top:"50%", left:"50%",
    minWidth:"100%", minHeight:"100%",
    transform:"translate(-50%, -50%)",
    objectFit:"cover"
  };
  const top  = { position:"absolute", top:"7vh", left:"50%", transform:"translateX(-50%)", zIndex:2, textAlign:"center", padding:"0 16px" };
  const bot  = { position:"absolute", bottom:"7vh", left:"50%", transform:"translateX(-50%)", zIndex:2, textAlign:"center", padding:"0 16px" };
  const line = { display:"block", whiteSpace:"nowrap", wordBreak:"keep-all" };

  return (
    <>
      {/* HERO (bg.mp4) */}
      <section id="top" style={{ position:"relative", width:"100vw", height:"100vh", overflow:"hidden", background:"#000", textAlign:"center" }}>
        <video style={v} autoPlay muted loop playsInline preload="auto" webkit-playsinline="true"
               onError={(e)=>{ e.currentTarget.style.display='none'; }}>
          <source src="/videos/bg.mp4" type="video/mp4" />
        </video>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg, rgba(0,0,0,.35), rgba(0,0,0,.55))", zIndex:1 }} />

        <div style={top}>
          <h1 className="kj-800 kj-softshadow" style={{
            margin:0, letterSpacing:"-0.02em",
            fontSize:"clamp(36px, 7vw, 84px)",
            whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"
          }}>KIMIJI STUDIO</h1>
          <p className="kj-softshadow" style={{ margin:"10px 0 0 0", fontSize:"clamp(14px,3.2vw,22px)" }}>
            일상에서 스튜디오 화보로!
          </p>
        </div>

        <div style={bot}>
          <p className="kj-softshadow" style={{ margin:0, lineHeight:1.5, fontSize:"clamp(13px,3vw,18px)", letterSpacing:"-0.01em" }}>
            <span style={line}>사진관에 가지 않아도 <strong>우리 아이의 일상을</strong></span>
            <span style={line}>스튜디오 사진으로 남길 수 있어요!</span>
          </p>
          <a href="#make" className="kj-800"
             style={{ display:"inline-flex", alignItems:"center", justifyContent:"center",
                      marginTop:16, padding:"12px 20px", borderRadius:9999,
                      background:"#fff", color:"#111", boxShadow:"0 6px 18px rgba(0,0,0,.35)" }}>
            제작하기
          </a>
        </div>
      </section>

      {/* ABOUT (bg2.mp4) */}
      <section id="about" style={{ position:"relative", width:"100vw", minHeight:"100vh", overflow:"hidden", background:"#000", textAlign:"center" }}>
        <video style={v} autoPlay muted loop playsInline preload="auto" webkit-playsinline="true"
               onError={(e)=>{ e.currentTarget.style.display='none'; }}>
          <source src="/videos/bg2.mp4" type="video/mp4" />
        </video>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg, rgba(0,0,0,.3), rgba(0,0,0,.5))", zIndex:1 }} />
        <div style={{ position:"relative", zIndex:2, maxWidth:960, margin:"0 auto", padding:"12vh 20px" }}>
          <h2 className="kj-800 kj-softshadow" style={{ margin:"0 0 12px 0", whiteSpace:"pre-line", fontSize:"clamp(18px,3vw,32px)" }}>
            {"KIMIJI STUDIO는 \n단순히 예쁜 이미지를 만드는 곳이 아닙니다."}
          </h2>
          <p className="kj-softshadow" style={{ whiteSpace:"pre-line", lineHeight:1.6, fontSize:"clamp(14px,2.2vw,20px)" }}>
{`우리는 기억 속 감정을 꺼내
그 장면을 새롭게 설계하고,
다시 복원해내는 '기억의 작가'들 입니다.

그 날, 당신은 무엇을 느꼈고, 
무엇을 함께 했나요?

그날을 기억하는 아이의 감정과 당신의 시선,
그 따스한 장면을 바탕으로
우리는 화보의 씬을 섬세하게 설계합니다.`}
          </p>
        </div>
      </section>
    </>
  );
}
