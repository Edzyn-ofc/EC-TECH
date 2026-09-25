import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  { num: '01', title: 'REGISTA', subtitle: 'o teu domínio', desc: 'Escolhe o endereço perfeito para a tua marca.' },
  { num: '02', title: 'ESCOLHE', subtitle: 'a hospedagem', desc: 'Servidores rápidos e seguros para o teu projecto.' },
  { num: '03', title: 'CRIA', subtitle: 'o teu website', desc: 'Design profissional, responsivo e optimizado.' },
  { num: '04', title: 'LANÇA', subtitle: 'o teu negócio', desc: 'Estás online. O mundo está à tua espera.' },
]

function Step({ step, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.2, 1, 1, 0.2])
  const y = useTransform(scrollYProgress, [0, 1], [80, -80])

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="min-h-[70vh] flex items-center px-6"
    >
      <div className="max-w-5xl mx-auto w-full grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-4">
          <div className="text-[8rem] md:text-[12rem] font-display font-bold leading-none text-white/[0.06]">
            {step.num}
          </div>
        </div>
        <div className="md:col-span-8">
          <p className="section-label">{step.subtitle}</p>
          <h3 className="font-display text-5xl md:text-7xl font-bold mb-4 text-gradient">
            {step.title}
          </h3>
          <p className="text-white/50 text-lg max-w-xl">{step.desc}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Storytelling() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <p className="section-label">// Como funciona</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold max-w-3xl">
          Do zero ao <span className="text-gradient">online</span> em 4 passos.
        </h2>
      </div>
      {steps.map((step, i) => (
        <Step key={step.num} step={step} index={i} />
      ))}
    </section>
  )
}