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
      <Nav />
      <Hero />
      <CustomerShots />
      {/* 제작하기 앵커는 가격으로 스크롤되게 여기서 지정 */}
      <div id="make"></div>
      <Portfolio />
      <Pricing />
      <SocialBar />
      <Footer />
    </>
  );
}
