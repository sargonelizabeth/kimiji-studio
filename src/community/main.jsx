import React from 'react'
import { createRoot } from 'react-dom/client'

import { AuthProvider } from '../providers/AuthProvider.jsx'
import NavCommunity from '@/components/NavCommunity.jsx'
import CommunityPage from '../pages/Community.jsx'

import '../index.css'
import '@/styles/fonts.css'
import '@/styles/brand.css'  // 추가: 배경 #BE9A60 적용

function App(){
  return (
    <AuthProvider>
      <NavCommunity />
      <CommunityPage />
    </AuthProvider>
  )
}
createRoot(document.getElementById('root')).render(<App />)
