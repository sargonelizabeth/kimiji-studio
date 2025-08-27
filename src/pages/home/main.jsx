import React from 'react'
import { createRoot } from 'react-dom/client'

import Nav from '@/components/Nav.jsx'
import Hero from '@/components/Hero.jsx'
import CustomerShots from '@/components/CustomerShots.jsx'
import Portfolio from '@/components/Portfolio.jsx'
import Pricing from '@/components/Pricing.jsx'
import SocialBar from '@/components/SocialBar.jsx'
import Footer from '@/components/Footer.jsx'
import BgmController from '@/components/BgmController.jsx'

import '@/index.css'                 // 프로젝트 기본 스타일
import '@/styles/fonts.css'    // 폰트: NotoSansKR-ExtraBold/SemiBold
import '@/styles/brand.css'    // 이번에 추가: 배경·정렬·버튼·프라이싱 박스

function App(){
  return (
    <>
      <Nav />
      <Hero />
      <CustomerShots />
      <div id="portfolio"><Portfolio /></div>
      <Pricing />
      <SocialBar />
      <Footer />
      <BgmController />
    </>
  )
}
createRoot(document.getElementById('root')).render(<App />)
