import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import CustomCursor from './components/CustomCursor'
import Background from './components/Background'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ServiceDetail from './pages/ServiceDetail'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Cart from './pages/Cart'
import Dashboard from './pages/Dashboard'

function ScrollHandler() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const tryScroll = (attempt = 0) => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        else if (attempt < 10) setTimeout(() => tryScroll(attempt + 1), 60)
      }
      tryScroll()
      return
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-dark">
      <CustomCursor />
      <Background />
      <ScrollHandler />
      <div className="relative z-10">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicos/:slug" element={<ServiceDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registar" element={<Signup />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}