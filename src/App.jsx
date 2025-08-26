import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      {/* 제작하기 버튼 스크롤 목표 지점 */}
      <div id="make"></div>
      <Portfolio />
      <Footer />
    </>
  );
}
