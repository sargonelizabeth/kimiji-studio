export default function Hero() {
  return (
    <>
      {/* 섹션 A: 상단 중앙 타이틀/부제 + 하단 카피/원형 버튼 (bg.mp4) */}
      <section
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#000",
        }}
      >
        {/* 배경 비디오 */}
        <video
          src="/videos/bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            minWidth: "100%",
            minHeight: "100%",
            transform: "translate(-50%, -50%)",
            objectFit: "cover",
          }}
        />

        {/* 어둡게 오버레이 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            zIndex: 1,
          }}
        />

        {/* 상단 중앙 타이틀/부제 */}
        <div
          style={{
            position: "absolute",
            top: "7vh",                  // 화면 상단에서 살짝 띄움
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            color: "#fff",
            zIndex: 2,
            padding: "0 16px",
            letterSpacing: "-0.01em",
          }}
        >
          {/* 타이틀: Sandoll GothicNeo3 */}
          <h1
            style={{
              fontFamily: "Sandoll GothicNeo3",
              fontWeight: 400,
              margin: 0,
              lineHeight: 1.08,
              textShadow: "0 2px 18px rgba(0,0,0,0.6)",
              // 데스크톱에서 크게, 모바일에서 자동 축소
              fontSize: "clamp(56px, 9vw, 128px)",
            }}
          >
            KIMIJI STUDIO
          </h1>

          {/* 부제: Sandoll Smiley Sans (타이틀의 1/2 크기) */}
          <p
            style={{
              fontFamily: "Sandoll Smiley Sans",
              fontWeight: 400,
              margin: "12px 0 0 0",
              lineHeight: 1.15,
              textShadow: "0 2px 14px rgba(0,0,0,0.5)",
              fontSize: "clamp(28px, 4.5vw, 64px)", // 타이틀의 절반 감각
            }}
          >
            일상 사진에서 스튜디오 화보로!
          </p>
        </div>

        {/* 하단 카피 + 원형 버튼 */}
        <div
          style={{
            position: "absolute",
            bottom: "7vh",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            color: "#fff",
            zIndex: 2,
            padding: "0 16px",
          }}
        >
          <p
            style={{
              fontFamily: "Sandoll Smiley Sans",
              fontWeight: 400,
              margin: 0,
              lineHeight: 1.35,
              textShadow: "0 2px 12px rgba(0,0,0,0.5)",
              fontSize: "clamp(16px, 2.6vw, 24px)",
              letterSpacing: "-0.01em",
              whiteSpace: "pre-line",
            }}
          >
            {"사진관에 가지 않아도,\n우리 아이의 일상을 감성 스튜디오 사진으로 남길 수 있어요!"}
          </p>

          {/* 둥근 "원형" 버튼 */}
          <a
            href="#make"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "120px",
              height: "120px",
              borderRadius: "60px",      // 원형
              marginTop: "18px",
              background: "#ffffff",
              color: "#111",
              textDecoration: "none",
              fontFamily: "Sandoll GothicNeo3",
              fontWeight: 400,
              fontSize: "18px",
              letterSpacing: "-0.01em",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              transition: "transform .25s ease, box-shadow .25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.25)";
            }}
          >
            제작하기
          </a>
        </div>
      </section>

      {/* 섹션 B: bg2.mp4 위에 긴 문구 */}
      <section
        style={{
          position: "relative",
          width: "100vw",
          minHeight: "100vh",
          overflow: "hidden",
          backgroundColor: "#000",
        }}
      >
        <video
          src="/videos/bg2.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            minWidth: "100%",
            minHeight: "100%",
            transform: "translate(-50%, -50%)",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "960px",
            margin: "0 auto",
            padding: "12vh 20px",
            color: "#fff",
            letterSpacing: "-0.005em",
          }}
        >
          <h2
            style={{
              fontFamily: "Sandoll GothicNeo3",
              fontWeight: 400,
              margin: "0 0 18px 0",
              fontSize: "clamp(24px, 3.6vw, 40px)",
              lineHeight: 1.15,
              textShadow: "0 2px 16px rgba(0,0,0,0.5)",
            }}
          >
            KIMIJI STUDIO는 <br />단순히 예쁜 이미지를 만드는 곳이 아닙니다.
          </h2>

          <p
            style={{
              fontFamily: "Sandoll Smiley Sans",
              fontWeight: 400,
              margin: 0,
              whiteSpace: "pre-line",
              lineHeight: 1.6,
              fontSize: "clamp(16px, 2.1vw, 22px)",
              textShadow: "0 2px 12px rgba(0,0,0,0.45)",
            }}
          >
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
