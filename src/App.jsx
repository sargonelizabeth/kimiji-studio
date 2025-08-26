import Nav from "./components/Nav";
import Hero from "./components/Hero";
import CustomerShots from "./components/CustomerShots";
import Portfolio from "./components/Portfolio";
import Pricing from "./components/Pricing";          // ⬅️ 추가
import SocialBar from "./components/SocialBar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <CustomerShots />
      <Portfolio />
      <Pricing />      {/* ⬅️ 인스타 버튼 위 */}
      <SocialBar />
      <Footer />
    </>
  );
}
