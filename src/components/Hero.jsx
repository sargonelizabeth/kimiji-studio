export default function Hero() {
    return (
      <section
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#000",
        }}
      >
        {/* Video Background (유튜브 UI 완전 차단) */}
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
            background: "rgba(0,0,0,0.5)",
            zIndex: 1,
          }}
        />
  
        {/* 중앙 정렬 텍스트 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "#fff",
            padding: "0 16px",
            zIndex: 2,
          }}
        >
          <h1
            style={{
              fontFamily: "Sandoll GothicNeo3",
              fontWeight: 400,
              margin: 0,
              marginBottom: "24px",
              lineHeight: 1.05,
              textShadow: "0 2px 18px rgba(0,0,0,0.6)",
              fontSize: "clamp(48px, 8vw, 120px)", // 모바일~데스크탑 자동 반응형
            }}
          >
            KIMIJI STUDIO
          </h1>
          <p
            style={{
              fontFamily: "Sandoll Smiley Sans",
              fontWeight: 400,
              margin: 0,
              lineHeight: 1.2,
              textShadow: "0 2px 14px rgba(0,0,0,0.5)",
              fontSize: "clamp(20px, 3.5vw, 56px)",
            }}
          >
            일상 사진에서 스튜디오 화보로!
          </p>
        </div>
      </section>
    );
  }
  