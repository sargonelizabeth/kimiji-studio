export default function Hero() {
  const videoStyle = {
    position: "absolute", top: "50%", left: "50%",
    minWidth: "100%", minHeight: "100%",
    transform: "translate(-50%, -50%)", objectFit: "cover",
  };

  // 두 줄이 어떤 화면에서도 정확히 2줄로 보이도록: nowrap + 적절한 폰트 사이즈 + 폭 제한
  const copyWrap = {
    margin: 0,
    textAlign: "center",
    lineHeight: 1.5,
    fontSize: "clamp(12px, 3.2vw, 18px)", // 모바일에서도 두 줄 유지
    letterSpacing: "-0.01em",
  };
  const line = {
    display: "block",
    whiteSpace: "nowrap",     // 단어 중간 줄바꿈 절대 금지
    wordBreak: "keep-all",    // 한국어 단어 쪼개기 금지
  };

  const topGroup = { position:"absolute", top:"7vh", left:"50%", transform:"translateX(-50%)", zIndex:2, padding:"0 16px" };
  const bottomGroup = { position:"absolute", bottom:"7vh", left:"50%", transform:"translateX(-50%)", zIndex:2, textAlign:"center", padding:"0 16px" };

  return (
    <>
      {/* 섹션 A: bg.mp4 */}
      <section
        id="top"
        style={{ position:"relative", width:"100vw", height:"100vh", overflow:"hidden", background:"#000", textAlign:"center" }}
      >
        <video
          style={videoStyle}
          autoPlay muted loop playsInline preload="auto"
          // @ts-ignore
          webkit-playsinline="true"
          onError={(e)=>{ e.currentTarget.style.display='none'; }}
        >
          <source src="/videos/bg.mp4" type="video/mp4" />
        </video>

        <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,.45)", zIndex:1 }} />

        {/* 상단 타이틀/부제 */}
        <div style={topGroup}>
          <h1 className="kj-800" style={{ margin:0, fontSize:"clamp(36px,7vw,72px)", letterSpacing:"-0.02em" }}>
            KIMIJI STUDIO
          </h1>
          <p style={{ margin:"8px 0 0 0", fontSize:"clamp(14px,3.2vw,20px)", opacity:.9 }}>
            일상에서 스튜디오 화보로!
          </p>
        </div>

        {/* 하단 카피: 정확히 2줄 */}
        <div style={bottomGroup}>
          <p style={copyWrap}>
            <span style={line}>사진관에 가지 않아도 <strong>우리 아이의 일상을</strong></span>
            <span style={line}>스튜디오 사진으로 남길 수 있어요!</span>
          </p>
          <a href="#make" className="kj-800"
             style={{ display:"inline-flex", alignItems:"center", justifyContent:"center",
                      marginTop:16, padding:"12px 20px", borderRadius:9999,
                      background:"#fff", color:"#111", boxShadow:"0 6px 18px rgba(0,0,0,.25)" }}>
            제작하기
          </a>
        </div>
      </section>

      {/* 섹션 B: bg2.mp4 */}
      <section
        id="about"
        style={{ position:"relative", width:"100vw", minHeight:"100vh", overflow:"hidden", background:"#000", textAlign:"center" }}
      >
        <video
          style={videoStyle}
          autoPlay muted loop playsInline preload="auto"
          // @ts-ignore
          webkit-playsinline="true"
          onError={(e)=>{ e.currentTarget.style.display='none'; }}
        >
          <source src="/videos/bg2.mp4" type="video/mp4" />
        </video>

        <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,.35)", zIndex:1 }} />

        <div style={{ position:"relative", zIndex:2, maxWidth:960, margin:"0 auto", padding:"12vh 20px" }}>
          <h2 className="kj-800" style={{ margin:"0 0 12px 0", whiteSpace:"pre-line", fontSize:"clamp(18px,3vw,32px)" }}>
            {"KIMIJI STUDIO는 \n단순히 예쁜 이미지를 만드는 곳이 아닙니다."}
          </h2>
          <p style={{ whiteSpace:"pre-line", lineHeight:1.6, fontSize:"clamp(14px,2.2vw,20px)" }}>
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
