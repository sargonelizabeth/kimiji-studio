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
      <BgmController />  {/* 🔊 전역 BGM 토글(초소형) */}
      <Nav />
      <Hero />
      <CustomerShots />
      <Portfolio />
      <Pricing />     {/* 세로로 긴 박스 2개 + 공통 CTA + 흰 줄 */}
      <SocialBar />
      <Footer />
    </>
  );
}
