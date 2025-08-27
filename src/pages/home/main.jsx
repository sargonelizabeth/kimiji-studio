import React from 'react'
import { createRoot } from 'react-dom/client'

import Nav from '@/community/components/Nav.jsx'
import Hero from '@/community/components/Hero.jsx'
import CustomerShots from '@/community/components/CustomerShots.jsx'
import Portfolio from '@/community/components/Portfolio.jsx'
import Pricing from '@/community/components/Pricing.jsx'
import SocialBar from '@/community/components/SocialBar.jsx'
import Footer from '@/community/components/Footer.jsx'
import BgmController from '@/community/components/BgmController.jsx'

import '@/index.css'                 // 프로젝트 기본 스타일
import '@/pages/styles/fonts.css'    // 폰트: NotoSansKR-ExtraBold/SemiBold
import '@/pages/styles/brand.css'    // 이번에 추가: 배경·정렬·버튼·프라이싱 박스

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
