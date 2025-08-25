export default function Hero() {
    return (
      <section className="relative w-full h-screen overflow-hidden">
        {/* YouTube Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2"
            src="https://www.youtube.com/embed/BqCjCxn2CUw?autoplay=1&mute=1&loop=1&playlist=BqCjCxn2CUw&controls=0&modestbranding=1&rel=0"
            title="KIMIJI STUDIO Intro"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>
        </div>
  
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
  
        {/* Centered Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20 px-4">
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
  
        {/* Prevent YouTube Hover UI */}
        <div className="absolute inset-0 z-30"></div>
      </section>
    );
  }
  