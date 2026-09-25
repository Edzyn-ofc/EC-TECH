import { motion, useScroll } from 'framer-motion'
import { Menu, ShoppingCart, X, User } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const links = [
  { name: 'Serviços', to: '/#servicos' },
  { name: 'Preços', to: '/#precos' },
  { name: 'FAQ', to: '/#faq' },
  { name: 'Contacto', to: '/#contacto' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const { count } = useCart()
  const { user } = useAuth()
  const loc = useLocation()

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 30))
    return () => unsub()
  }, [scrollY])

  useEffect(() => setOpen(false), [loc.pathname, loc.hash])

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark/70 backdrop-blur-2xl border-b border-white/[0.06] py-2' : 'py-3'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="placeholder-box w-20 h-8">Logo</div>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.name}
              to={l.to}
              className="px-3 py-1.5 text-[13px] text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              {l.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/carrinho"
            className="relative p-2 hover:bg-white/5 rounded-full transition-colors"
            aria-label="Carrinho"
          >
            <ShoppingCart size={16} />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {count}
              </span>
            )}
          </Link>

          {user ? (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[13px] hover:bg-white/10 transition-colors"
            >
              <User size={14} />
              <span className="hidden sm:inline">{user.name?.split(' ')[0] || 'Conta'}</span>
            </Link>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link to="/login" className="text-[13px] text-white/70 hover:text-white px-3 py-1.5">
                Entrar
              </Link>
              <Link
                to="/registar"
                className="text-[13px] bg-gradient-to-r from-primary to-secondary px-4 py-1.5 rounded-full font-semibold hover:opacity-90"
              >
                Criar conta
              </Link>
            </div>
          )}

          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden mt-2 mx-4 glass-strong p-4 flex flex-col gap-1 overflow-hidden"
        >
          {links.map((l) => (
            <Link
              key={l.name}
              to={l.to}
              className="text-[14px] text-white/70 hover:text-white py-2 px-3 rounded-lg hover:bg-white/5"
            >
              {l.name}
            </Link>
          ))}
          {!user && (
            <div className="flex gap-2 mt-2">
              <Link to="/login" className="flex-1 text-center py-2 rounded-full bg-white/5 border border-white/10 text-[13px]">
                Entrar
              </Link>
              <Link to="/registar" className="flex-1 text-center py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-[13px] font-semibold">
                Criar conta
              </Link>
            </div>
          )}
        </motion.div>
      )}
    </motion.nav>
  )
}