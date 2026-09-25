import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { User, Mail, Phone, MapPin, Lock, ArrowRight, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', password: '', confirm: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const nav = useNavigate()

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password.length < 6) return setError('Palavra-passe deve ter pelo menos 6 caracteres')
    if (form.password !== form.confirm) return setError('As palavras-passe não coincidem')

    setLoading(true)
    const res = await signup(form)
    setLoading(false)

    if (res.ok) nav('/dashboard')
    else setError(res.error || 'Não foi possível criar a conta.')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-strong p-6 md:p-8"
      >
        <div className="mb-6">
          <p className="section-label">// Nova conta</p>
          <h1 className="font-display text-2xl font-bold mb-1">Criar conta EC TECH</h1>
          <p className="text-white/40 text-[13px]">Preenche os teus dados para começar.</p>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="text-[11px] text-white/50 mb-1.5 block">Nome completo</label>
            <div className="relative">
              <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input type="text" value={form.name} onChange={set('name')} placeholder="Edmilson Chissano" className="input-field pl-9" required />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-white/50 mb-1.5 block">Email</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input type="email" value={form.email} onChange={set('email')} placeholder="tu@email.com" className="input-field pl-9" required />
              </div>
            </div>
            <div>
              <label className="text-[11px] text-white/50 mb-1.5 block">Telefone</label>
              <div className="relative">
                <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+258 8x xxx xxxx" className="input-field pl-9" required />
              </div>
            </div>
          </div>

          <div>
            <label className="text-[11px] text-white/50 mb-1.5 block">Morada</label>
            <div className="relative">
              <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input type="text" value={form.address} onChange={set('address')} placeholder="Av. Julius Nyerere, Maputo" className="input-field pl-9" required />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-white/50 mb-1.5 block">Palavra-passe</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input type="password" value={form.password} onChange={set('password')} placeholder="••••••••" className="input-field pl-9" required />
              </div>
            </div>
            <div>
              <label className="text-[11px] text-white/50 mb-1.5 block">Confirmar</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input type="password" value={form.confirm} onChange={set('confirm')} placeholder="••••••••" className="input-field pl-9" required />
              </div>
            </div>
          </div>

          {error && <p className="text-red-400 text-[12px]">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-secondary py-3 rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <>Criar conta <ArrowRight size={14} /></>}
          </button>
        </form>

        <p className="text-center text-[12.5px] text-white/40 mt-5">
          Já tens conta?{' '}
          <Link to="/login" className="text-primary hover:underline font-medium">Entrar</Link>
        </p>
      </motion.div>
    </div>
  )
}