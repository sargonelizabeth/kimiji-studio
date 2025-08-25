function App() {
  return (
    <div className="font-sans bg-[#fefcf8] text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen text-center px-6">
        <h1 className="text-5xl font-bold mb-6 tracking-tight">
          KIMIJI STUDIO
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          일상에서 찍은 사진들로 스튜디오 화보를 만들어 드려요.
        </p>
        <button className="px-8 py-3 rounded-full bg-black text-white shadow-md hover:bg-gray-900 transition">
          지금 바로 시작하기
        </button>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">
          포트폴리오
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="overflow-hidden rounded-xl shadow hover:scale-105 transition">
            <img src="https://source.unsplash.com/600x400/?dog" alt="dog" />
          </div>
          <div className="overflow-hidden rounded-xl shadow hover:scale-105 transition">
            <img src="https://source.unsplash.com/600x400/?cat" alt="cat" />
          </div>
          <div className="overflow-hidden rounded-xl shadow hover:scale-105 transition">
            <img src="https://source.unsplash.com/600x400/?pet" alt="pet" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
