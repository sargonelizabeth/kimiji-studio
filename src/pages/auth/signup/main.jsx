import React from 'react'
import { createRoot } from 'react-dom/client'
import Nav from '@/components/Nav.jsx'
import AuthSignupPage from '@/components/auth/AuthSignupPage.jsx'
import '@/index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Nav />
    <AuthSignupPage />
  </React.StrictMode>
)
