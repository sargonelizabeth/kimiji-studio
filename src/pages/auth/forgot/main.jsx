import React from 'react'
import ReactDOM from 'react-dom/client'
import Nav from '@/components/Nav.jsx'
import AuthForgotPage from '@/components/auth/AuthForgotPage.jsx'
import '@/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Nav />
    <main className="page auth"><AuthForgotPage /></main>
  </React.StrictMode>
)
