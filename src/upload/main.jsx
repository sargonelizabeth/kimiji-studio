import React from 'react'
import { createRoot } from 'react-dom/client'

import Nav from '@/community/components/Nav.jsx'
import UploadPage from '@/pages/Upload.jsx'

import '@/index.css'
import '@/styles/fonts.css'
import '@/styles/brand.css'

function App() {
  return (
    <>
      <Nav />
      <UploadPage />
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)
