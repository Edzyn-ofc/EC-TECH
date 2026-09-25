import { motion } from 'framer-motion'
import { Globe, Server, ShoppingBag, LogOut, Settings, CreditCard, LifeBuoy, LayoutGrid } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

const sidebar = [
  { icon: LayoutGrid, label: 'Dashboard', active: true },
  { icon: Globe, label: 'Domínios' },
  { icon: Server, label: 'Hospedagem' },
  { icon: ShoppingBag, label: 'Websites' },
  { icon: CreditCard, label: 'Facturas' },
  { icon: LifeBuoy, label: 'Suporte' },
  { icon: Settings, label: 'Definições' },
]

export default function Dashboard() {
  const { user, loading, logout } = useAuth()
  const nav = useNavigate()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-12">
        <div className="w-6 h-6 border-2 border-white/20 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-12">
        <div className="glass-strong p-8 text-center max-w-sm w-full">
          <h1 className="font-display text-xl font-bold mb-2">Precisas de entrar</h1>
          <p className="text-white/40 text-[13px] mb-5">Faz login para aceder ao teu painel.</p>
          <Link to="/login" className="inline-block bg-gradient-to-r from-primary to-secondary px-5 py-2.5 rounded-full text-[13px] font-semibold">
            Entrar
          </Link>
        </div>
      </div>
    )
  }

  const handleLogout = async () => {
    await logout()
    nav('/')
  }

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="section-label">// Painel</p>
            <h1 className="font-display text-2xl md:text-3xl font-bold">
              Olá, {user.name?.split(' ')[0] || 'Cliente'} 👋
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-[12px] text-white/50 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <LogOut size={13} /> Sair
          </button>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-4">
          <aside className="md:col-span-3 glass-strong p-3">
            <div className="flex flex-col gap-1">
              {sidebar.map((item) => (
                <button
                  key={item.label}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors ${
                    item.active
                      ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-white border border-white/10'
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon size={14} />
                  {item.label}
                </button>
              ))}
            </div>
          </aside>

          <div className="md:col-span-9 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Domínios', value: '0', icon: Globe },
                { label: 'Hospedagens', value: '0', icon: Server },
                { label: 'Pedidos', value: '0', icon: ShoppingBag },
              ].map((c) => (
                <div key={c.label} className="glass-strong p-4">
                  <c.icon size={15} className="text-white/50 mb-2" />
                  <div className="font-display text-2xl font-bold">{c.value}</div>
                  <div className="text-[10px] tracking-wider text-white/40 uppercase">{c.label}</div>
                </div>
              ))}
            </div>

            <div className="glass-strong p-5">
              <h4 className="text-[13px] font-semibold mb-3">Serviços activos</h4>
              <p className="text-white/40 text-[13px]">Ainda não tens serviços activos. Adiciona algo ao carrinho.</p>
            </div>

            <div className="glass-strong p-5">
              <h4 className="text-[13px] font-semibold mb-3">Dados da conta</h4>
              <div className="grid sm:grid-cols-2 gap-3 text-[12.5px]">
                <div><span className="text-white/40">Nome:</span> {user.name}</div>
                {user.email && <div><span className="text-white/40">Email:</span> {user.email}</div>}
                {user.phone && <div><span className="text-white/40">Telefone:</span> {user.phone}</div>}
                {user.address && <div><span className="text-white/40">Morada:</span> {user.address}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}