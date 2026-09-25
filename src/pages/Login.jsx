import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await login({ identifier, password })
    setLoading(false)
    if (res.ok) nav('/dashboard')
    else setError(res.error || 'Não foi possível entrar.')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm glass-strong p-6 md:p-8"
      >
        <div className="mb-6">
          <p className="section-label">// Bem-vindo de volta</p>
          <h1 className="font-display text-2xl font-bold mb-1">Entrar na EC TECH</h1>
          <p className="text-white/40 text-[13px]">Acede à tua conta para gerir serviços.</p>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="text-[11px] text-white/50 mb-1.5 block">Email</label>
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="tu@email.com"
                className="input-field pl-9"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] text-white/50 mb-1.5 block">Palavra-passe</label>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field pl-9"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-[12px]">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-secondary py-3 rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <>Entrar <ArrowRight size={14} /></>}
          </button>
        </form>

        <p className="text-center text-[12.5px] text-white/40 mt-5">
          Ainda não tens conta?{' '}
          <Link to="/registar" className="text-primary hover:underline font-medium">Criar conta</Link>
        </p>
      </motion.div>
    </div>
  )
}