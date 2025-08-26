// ✅ 모든 import는 파일 맨 위
import BgmController from "./components/BgmController";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import CustomerShots from "./components/CustomerShots";
import Portfolio from "./components/Portfolio";
import Pricing from "./components/Pricing";
import SocialBar from "./components/SocialBar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      {/* 전역 BGM 토글 */}
      <BgmController />

      {/* 순서 고정 */}
      <Nav />
      <Hero />
      <CustomerShots />
      <Portfolio />
      <Pricing />     {/* 두 박스 + 각자 제작하기 버튼 + 아래 공통 CTA + 흰 줄 */}
      <SocialBar />   {/* 인스타 버튼 */}
      <Footer />
    </>
  );
}
