import React from 'react'
import { createRoot } from 'react-dom/client'
import Nav from '@/components/Nav.jsx'
import AuthLoginPage from '@/components/auth/AuthLoginPage.jsx'
import '@/index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Nav />
    <AuthLoginPage />
  </React.StrictMode>
)
