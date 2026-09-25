import { motion } from 'framer-motion'
import { Search, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function Hero() {
  const [domain, setDomain] = useState('')
  const [results, setResults] = useState(null)
  const { addItem } = useCart()
  const [added, setAdded] = useState(null)

  const handleSearch = (e) => {
    e.preventDefault()
    if (!domain.trim()) return
    const name = domain.replace(/\..+$/, '').toLowerCase()
    setResults([
      { ext: '.com', price: 9.99, currency: '$', available: true },
      { ext: '.net', price: 11.99, currency: '$', available: true },
      { ext: '.org', price: 10.99, currency: '$', available: true },
      { ext: '.co.mz', price: 500, currency: 'MT', available: true },
      { ext: '.io', price: 29.99, currency: '$', available: false },
    ].map((r) => ({ ...r, full: name + r.ext, id: 'dom-' + name + r.ext })))
  }

  const handleAdd = (r) => {
    addItem({ id: r.id, name: r.full, price: r.price, currency: r.currency, type: 'Domínio' })
    setAdded(r.id)
    setTimeout(() => setAdded(null), 1600)
  }

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 pt-32 pb-16">
      <div className="max-w-3xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 glass px-3 py-1.5 mb-6 text-[11px] tracking-wider"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          EC TECH · Presença digital sem limites
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-[2.5rem] sm:text-6xl md:text-7xl leading-[1.05] font-bold tracking-tight mb-5"
        >
          O teu negócio.
          <br />
          <span className="text-gradient">Online.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-sm sm:text-base text-white/50 max-w-md mx-auto mb-8"
        >
          Domínios, hospedagem e websites profissionais. Tudo num só lugar, com a EC TECH.
        </motion.p>

        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="max-w-md mx-auto"
        >
          <div className="glass-strong flex items-center p-1.5 rounded-full glow-border">
            <Search size={16} className="ml-3 text-white/40 shrink-0" />
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="meusite.com"
              className="flex-1 bg-transparent px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none"
            />
            <button type="submit" className="bg-gradient-to-r from-primary to-secondary px-4 sm:px-5 py-2.5 rounded-full text-[13px] font-semibold flex items-center gap-1.5 hover:opacity-90">
              Buscar <ArrowRight size={13} />
            </button>
          </div>
        </motion.form>

        {results && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto mt-4 glass-strong p-3 text-left"
          >
            {results.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between py-2.5 px-2 border-b border-white/5 last:border-0"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className={`w-1.5 h-1.5 rounded-full ${r.available ? 'bg-green-400' : 'bg-red-400'}`} />
                  <span className="text-[13px] font-medium truncate">{r.full}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span className="text-white/50 text-[12px]">{r.currency} {r.price}</span>
                  <button
                    disabled={!r.available}
                    onClick={() => handleAdd(r)}
                    className={`text-[11px] font-semibold px-3 py-1.5 rounded-full transition-all ${
                      !r.available
                        ? 'bg-white/5 text-white/30 cursor-not-allowed'
                        : added === r.id
                        ? 'bg-green-500/20 text-green-300 border border-green-400/30'
                        : 'bg-gradient-to-r from-primary to-secondary hover:opacity-90'
                    }`}
                  >
                    {added === r.id ? 'Adicionado ✓' : r.available ? 'Adicionar' : 'Ocupado'}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-10 text-[11px] text-white/40 tracking-wider"
        >
          <span>99.9% UPTIME</span>
          <span>·</span>
          <span>SUPORTE 24/7</span>
          <span>·</span>
          <span>SSL GRÁTIS</span>
          <span>·</span>
          <span>M-PESA / E-MOLA</span>
        </motion.div>
      </div>
    </section>
  )
}