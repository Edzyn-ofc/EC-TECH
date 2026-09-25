import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

const plans = [
  {
    id: 'plan-starter', name: 'Starter', subtitle: 'Para começar', price: 499, currency: 'MT',
    features: ['1 Domínio .com', '10 GB SSD', 'SSL Grátis', '1 Website', 'Email profissional', 'Suporte WhatsApp'],
  },
  {
    id: 'plan-business', name: 'Business', subtitle: 'Mais popular', price: 999, currency: 'MT', highlight: true,
    features: ['3 Domínios', '50 GB SSD', 'SSL Grátis', '10 Websites', 'Emails ilimitados', 'Loja Online Básica', 'Suporte 24/7', 'Backups auto'],
  },
  {
    id: 'plan-pro', name: 'Pro', subtitle: 'Para empresas', price: 1999, currency: 'MT',
    features: ['Domínios ilimitados', '500 GB SSD', 'SSL Grátis', 'Websites ilimitados', 'Emails ilimitados', 'Loja Completa', 'Suporte dedicado', 'CDN Global'],
  },
]

export default function Pricing() {
  const { addItem } = useCart()
  const [added, setAdded] = useState(null)

  const handleAdd = (p) => {
    addItem({ id: p.id, name: 'Plano ' + p.name, price: p.price, currency: p.currency, type: 'Plano' })
    setAdded(p.id)
    setTimeout(() => setAdded(null), 1600)
  }

  return (
    <section id="precos" className="py-20 md:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="section-label">// Preços</p>
          <h2 className="font-display text-2xl md:text-4xl font-bold mb-3">
            Pacotes <span className="text-gradient">flexíveis</span>.
          </h2>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            Sem taxas escondidas. Cancelamento em qualquer altura.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className={`glass-strong p-5 sm:p-6 flex flex-col relative ${
                plan.highlight ? 'border-primary/40 shadow-xl shadow-primary/10 md:scale-[1.02]' : ''
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Star size={10} fill="currentColor" /> POPULAR
                </div>
              )}

              <div className="mb-4">
                <h3 className="font-display text-xl font-bold">{plan.name}</h3>
                <p className="text-white/40 text-[11px]">{plan.subtitle}</p>
              </div>

              <div className="mb-5">
                <span className="font-display text-3xl font-bold">{plan.price}</span>
                <span className="text-white/40 ml-1 text-sm">{plan.currency}</span>
                <span className="text-white/40 text-xs">/mês</span>
              </div>

              <ul className="space-y-2 mb-5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[12.5px] text-white/65">
                    <Check size={13} className="text-primary shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleAdd(plan)}
                  className={`w-full py-2.5 rounded-full text-[13px] font-semibold transition-all ${
                    added === plan.id
                      ? 'bg-green-500/20 text-green-300 border border-green-400/30'
                      : 'bg-gradient-to-r from-primary to-secondary hover:opacity-90'
                  }`}
                >
                  {added === plan.id ? 'Adicionado ✓' : 'Adicionar ao carrinho'}
                </button>
                <a
                  href={`https://wa.me/258878078645?text=Quero contratar o plano ${plan.name} da EC TECH`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-full text-[12px] text-center font-medium bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}