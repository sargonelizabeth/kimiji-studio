export default function Hero() {
  return (
    <>
      <section id="top" style={{ position:"relative", width:"100vw", height:"100vh", overflow:"hidden", background:"#000", textAlign:"center" }}>
        <video src="/videos/bg.mp4" autoPlay muted loop playsInline preload="auto"
          style={{ position:"absolute", top:"50%", left:"50%", minWidth:"100%", minHeight:"100%", transform:"translate(-50%,-50%)", objectFit:"cover" }} />
        <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,.45)", zIndex:1 }} />

        {/* 상단 타이틀/부제 */}
        <div style={{ position:"absolute", top:"7vh", left:"50%", transform:"translateX(-50%)", zIndex:2, padding:"0 16px", color:"#fff" }}>
          <h1 className="sd-700" style={{
            margin:0, lineHeight:1.06, textShadow:"0 2px 18px rgba(0,0,0,.6)",
            fontSize:"clamp(24px, 7.2vw, 128px)", whiteSpace:"nowrap", wordBreak:"keep-all"
          }}>
            KIMIJI STUDIO
          </h1>
          <p className="sd-400" style={{
            margin:"10px 0 0 0", lineHeight:1.12, textShadow:"0 2px 14px rgba(0,0,0,.5)",
            fontSize:"clamp(14px, 3.6vw, 48px)", whiteSpace:"nowrap", wordBreak:"keep-all"
          }}>
            일상 사진에서 스튜디오 화보로!
          </p>
        </div>

        {/* 하단 카피 + 버튼 */}
        <div style={{ position:"absolute", bottom:"7vh", left:"50%", transform:"translateX(-50%)", zIndex:2, padding:"0 16px", color:"#fff" }}>
          <p className="sd-400" style={{
            margin:0, lineHeight:1.3, letterSpacing:"-0.01em",
            whiteSpace:"pre-line", wordBreak:"keep-all", textAlign:"center",
            textShadow:"0 2px 12px rgba(0,0,0,.5)",
            fontSize:"clamp(14px, 3.6vw, 48px)"
          }}>
            {"사진관에 가지 않아도 우리 아이의 일상을\n스튜디오 사진으로 남길 수 있어요."}
          </p>

          <a href="#make" className="sd-700" style={{
              display:"inline-flex", alignItems:"center", justifyContent:"center",
              width:"clamp(110px, 32vw, 140px)", height:"clamp(110px, 32vw, 140px)", /* ← 최소폭 늘림 */
              borderRadius:"9999px", marginTop:16, background:"#fff", color:"#111", textDecoration:"none",
              fontSize:"clamp(12px, 2.8vw, 16px)", letterSpacing:"-0.01em", lineHeight:1,
              whiteSpace:"nowrap", /* ← 줄바꿈 금지 */
              boxShadow:"0 10px 30px rgba(0,0,0,.25)", transition:"transform .25s ease, box-shadow .25s ease"
            }}
            onMouseEnter={(e)=>{e.currentTarget.style.transform="scale(1.05)"; e.currentTarget.style.boxShadow="0 12px 36px rgba(0,0,0,.3)";}}
            onMouseLeave={(e)=>{e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="0 10px 30px rgba(0,0,0,.25)";}}
          >
            제작하기
          </a>
        </div>
      </section>

      {/* 커뮤니티 앵커는 CustomerShots 섹션에서 id="community" 로 처리 */}
      <section id="about" style={{ position:"relative", width:"100vw", minHeight:"100vh", overflow:"hidden", background:"#000", textAlign:"center" }}>
        <video src="/videos/bg2.mp4" autoPlay muted loop playsInline preload="auto"
          style={{ position:"absolute", top:"50%", left:"50%", minWidth:"100%", minHeight:"100%", transform:"translate(-50%,-50%)", objectFit:"cover" }} />
        <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,.35)", zIndex:1 }} />
        <div style={{ position:"relative", zIndex:2, maxWidth:960, margin:"0 auto", padding:"12vh 20px", color:"#fff" }}>
          <h2 style={{
            fontFamily:"Sandoll GothicNeoRound", fontWeight:700,
            margin:"0 0 16px 0", lineHeight:1.2, wordBreak:"keep-all",
            textShadow:"0 2px 16px rgba(0,0,0,.5)", fontSize:"clamp(16px, 3.2vw, 32px)", whiteSpace:"pre-line"
          }}>
            {"KIMIJI STUDIO는 \n단순히 예쁜 이미지를 만드는 곳이 아닙니다."}
          </h2>
          <p style={{
            fontFamily:"Sandoll GothicNeoRound", fontWeight:400, /* ← 작은 폰트 400 */
            margin:0, whiteSpace:"pre-line", lineHeight:1.65,
            fontSize:"clamp(14px, 2.2vw, 22px)", textShadow:"0 2px 12px rgba(0,0,0,.45)", wordBreak:"keep-all"
          }}>
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
