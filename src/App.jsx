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
    </div>
  )
}

export default App
