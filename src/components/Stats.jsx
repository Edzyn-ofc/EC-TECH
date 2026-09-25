import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function Counter({ to, suffix = '', decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const dur = 1600
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1)
      setVal(to * (1 - Math.pow(1 - p, 3)))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, to])

  return <span ref={ref}>{val.toFixed(decimals)}{suffix}</span>
}

const stats = [
  { value: 99.9, suffix: '%', label: 'UPTIME', decimals: 1 },
  { value: 24, suffix: '/7', label: 'SUPORTE' },
  { value: 500, suffix: 'GB', label: 'SSD' },
  { value: 100, suffix: '+', label: 'CLIENTES' },
]

export default function Stats() {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass-strong p-4 sm:p-6 text-center"
          >
            <div className="font-display text-2xl sm:text-4xl font-bold text-gradient mb-1">
              <Counter to={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
            </div>
            <div className="text-[10px] tracking-[0.2em] text-white/40 font-semibold">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}