// src/upload/main.jsx
import React from "react"
import { createRoot } from "react-dom/client"

import Nav from "@/components/NavPure.jsx"
import UploadPage from "@/pages/Upload.jsx"

import "@/styles/fonts.css"
import "@/styles/brand.css"
import "@/index.css"

function UploadEntry(){
  return (
    <>
      <Nav />
      <main>
        <UploadPage />
      </main>
    </>
  )
}

createRoot(document.getElementById("root")).render(<UploadEntry />)
