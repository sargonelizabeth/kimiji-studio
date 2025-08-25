export default function Hero() {
    return (
      <section className="relative h-screen w-full overflow-hidden">
        {/* YouTube Background */}
        <div className="absolute inset-0">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/BqCjCxn2CUw?autoplay=1&mute=1&loop=1&playlist=BqCjCxn2CUw&controls=0&modestbranding=1&rel=0"
            title="KIMIJI STUDIO Intro"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>
  
          {/* 투명 클릭 방지 레이어 */}
          <div className="absolute inset-0 z-10"></div>
        </div>
  
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-20"></div>
  
        {/* Centered Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-30 px-4">
          <h1
            className="text-7xl md:text-9xl mb-8 drop-shadow-xl"
            style={{ fontFamily: "Sandoll GothicNeo3, sans-serif", fontWeight: 400 }}
          >
            KIMIJI STUDIO
          </h1>
          <p
            className="text-3xl md:text-5xl drop-shadow-lg"
            style={{ fontFamily: "Sandoll Smiley Sans, sans-serif", fontWeight: 400 }}
          >
            일상에서 스튜디오 사진으로!
          </p>
        </div>
      </section>
    );
  }
  