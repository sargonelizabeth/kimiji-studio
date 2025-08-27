import { useEffect } from 'react'
import Nav from '@/components/Nav.jsx'
export default function NavCommunity(){
  useEffect(() => {
    const apply = () => {
      const root = document.querySelector('.site-nav')
      if (!root) return
      const cta = root.querySelector('#nav-cta, a[href="/upload.html"], .btn-cta')
      if (cta) cta.textContent = '업로드'
    }
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(apply, 0)
    } else {
      window.addEventListener('DOMContentLoaded', apply, { once: true })
    }
  }, [])
  return <Nav />
}
