// src/pages/home/main.jsx
import React from "react"
import { createRoot } from "react-dom/client"

import Nav from "@/components/NavPure.jsx"
import Hero from "@/components/Hero.jsx"
import CustomerShots from "@/components/CustomerShots.jsx"
import Portfolio from "@/components/Portfolio.jsx"
import Pricing from "@/components/Pricing.jsx"
import Footer from "@/components/Footer.jsx"

import "@/styles/fonts.css"
import "@/styles/brand.css"
import "@/index.css"

function Home(){
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <CustomerShots />
        <Portfolio />
        <Pricing />
      </main>
      <Footer />
    </>
  )
}

createRoot(document.getElementById("root")).render(<Home />)
