import React from 'react'
import { createRoot } from 'react-dom/client'
import Nav from '@/components/Nav.jsx'
import AuthResetPage from '@/components/auth/AuthResetPage.jsx'
import '@/index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Nav />
    <AuthResetPage />
  </React.StrictMode>
)
