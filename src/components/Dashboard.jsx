import { motion } from 'framer-motion'
import { Globe, Server, ShoppingBag, Bell, User, LayoutGrid, CreditCard, Settings, LifeBuoy } from 'lucide-react'

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
  return (
    <section id="dashboard" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="section-label">// Área de cliente</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
            Tudo sob o teu <span className="text-gradient">controlo</span>.
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Gere domínios, hospedagens, websites e facturas num único painel moderno.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong p-2 md:p-4 overflow-hidden"
        >
          {/* Topbar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
            </div>
            <span className="text-xs text-white/40">painel.ectech.co.mz</span>
            <div className="flex items-center gap-3">
              <Bell size={16} className="text-white/40" />
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <User size={14} />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-4 p-4">
            {/* Sidebar */}
            <aside className="md:col-span-3 glass p-4">
              <div className="flex flex-col gap-1">
                {sidebar.map((item) => (
                  <button
                    key={item.label}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      item.active
                        ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-white border border-white/10'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon size={16} />
                    {item.label}
                  </button>
                ))}
              </div>
            </aside>

            {/* Main */}
            <div className="md:col-span-9 space-y-4">
              <div className="glass p-6">
                <h3 className="text-xl font-bold mb-1">Olá, Edmilson 👋</h3>
                <p className="text-white/40 text-sm">Bem-vindo de volta ao teu painel EC TECH.</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Domínios', value: '3', icon: Globe, color: 'from-primary/20 to-primary/5' },
                  { label: 'Hospedagens', value: '2', icon: Server, color: 'from-secondary/20 to-secondary/5' },
                  { label: 'Pedidos', value: '7', icon: ShoppingBag, color: 'from-accent/20 to-accent/5' },
                ].map((card) => (
                  <div key={card.label} className={`glass p-5 bg-gradient-to-br ${card.color}`}>
                    <card.icon size={18} className="text-white/60 mb-3" />
                    <div className="font-display text-3xl font-bold">{card.value}</div>
                    <div className="text-xs text-white/40 mt-1">{card.label}</div>
                  </div>
                ))}
              </div>

              <div className="glass p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Serviços activos</h4>
                  <span className="text-xs text-white/40">Ver todos →</span>
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'ectech.co.mz', type: 'Domínio', status: 'Activo' },
                    { name: 'Hosting Business', type: 'Hospedagem', status: 'Activo' },
                    { name: 'loja.ectech.co.mz', type: 'Website', status: 'Activo' },
                  ].map((s) => (
                    <div key={s.name} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
                      <div>
                        <div className="text-sm font-medium">{s.name}</div>
                        <div className="text-xs text-white/40">{s.type}</div>
                      </div>
                      <span className="text-xs px-3 py-1 rounded-full bg-green-400/10 text-green-400 border border-green-400/20">
                        {s.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}