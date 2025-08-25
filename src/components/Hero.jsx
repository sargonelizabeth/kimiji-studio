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
        {/* Background video */}
        <video
          src="/videos/bg.mp4"
          autoPlay
          muted
          loop
          playsInline
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
  
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 1,
          }}
        />
  
        {/* Centered Text */}
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
            zIndex: 2,
            padding: "0 16px",
          }}
        >
          <h1
            style={{
              fontFamily: "Sandoll GothicNeo3",
              fontWeight: 400,
              margin: 0,
              marginBottom: "24px",
              fontSize: "clamp(48px, 8vw, 120px)",
              lineHeight: 1.05,
              textShadow: "0 2px 18px rgba(0,0,0,0.6)",
            }}
          >
            KIMIJI STUDIO
          </h1>
          <p
            style={{
              fontFamily: "Sandoll Smiley Sans",
              fontWeight: 400,
              margin: 0,
              fontSize: "clamp(20px, 3.5vw, 56px)",
              lineHeight: 1.2,
              textShadow: "0 2px 14px rgba(0,0,0,0.5)",
            }}
          >
            일상 사진에서 스튜디오 화보로!
          </p>
        </div>
      </section>
    );
  }
  