import React from 'react'
import { createRoot } from 'react-dom/client'
import Nav from '@/components/Nav.jsx'
import Hero from '@/components/Hero.jsx'
import Portfolio from '@/components/Portfolio.jsx'
import Pricing from '@/components/Pricing.jsx'
import Footer from '@/components/Footer.jsx'
import SocialBar from '@/components/SocialBar.jsx'
import BgmController from '@/components/BgmController.jsx'
import CustomerShots from '@/components/CustomerShots.jsx'

function App(){
  return (
    <>
      <Nav />
      <Hero />
      <div id="portfolio"><Portfolio /></div>
      <CustomerShots />
      <Pricing />
      <div id="about"></div>
      <SocialBar />
      <Footer />
      <BgmController />
    </>
  )
}
createRoot(document.getElementById('root')).render(<App />)
