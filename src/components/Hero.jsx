export default function Hero() {
    return (
      <section className="relative h-screen w-full overflow-hidden">
        {/* YouTube Background */}
        <iframe
          className="absolute inset-0 w-full h-full"
          src="https://www.youtube.com/embed/BqCjCxn2CUw?autoplay=1&mute=1&loop=1&playlist=BqCjCxn2CUw&controls=0&modestbranding=1&showinfo=0"
          title="KIMIJI STUDIO Intro"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
  
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
  
        {/* Centered Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 z-20">
          <h1
            className="text-6xl md:text-8xl mb-6 drop-shadow-lg"
            style={{ fontFamily: "Sandoll Smiley Sans, sans-serif" }}
          >
            KIMIJI STUDIO
          </h1>
          <p
            className="text-2xl md:text-3xl drop-shadow"
            style={{ fontFamily: "Sandoll Smiley Sans, sans-serif" }}
          >
            일상에서 스튜디오 화보 사진으로!
          </p>
        </div>
      </section>
    );
  }
  