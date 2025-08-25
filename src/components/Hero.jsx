export default function Hero() {
    return (
      <section className="relative w-full h-screen overflow-hidden">
        {/* Background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/bg.mp4"
          autoPlay
          muted
          loop
          playsInline
        ></video>
  
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
  
        {/* Centered Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 text-white px-4">
          <h1
            className="mb-8 drop-shadow-xl text-7xl md:text-9xl"
            style={{ fontFamily: "Sandoll GothicNeo3, sans-serif", fontWeight: 400 }}
          >
            KIMIJI STUDIO
          </h1>
          <p
            className="drop-shadow-lg text-3xl md:text-5xl"
            style={{ fontFamily: "Sandoll Smiley Sans, sans-serif", fontWeight: 400 }}
          >
            일상 사진에서 스튜디오 화보로!
          </p>
        </div>
      </section>
    );
  }
  