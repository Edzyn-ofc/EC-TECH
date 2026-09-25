import { motion } from 'framer-motion'
import { Globe, Server, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

export const services = [
  {
    slug: 'dominios',
    icon: Globe,
    tag: '01',
    title: 'Domínios',
    description: 'Registe o domínio perfeito para a sua marca. Pesquisa gratuita, registo instantâneo.',
    features: ['.com', '.net', '.org', '.co.mz', '.io'],
  },
  {
    slug: 'hospedagem',
    icon: Server,
    tag: '02',
    title: 'Hospedagem',
    description: 'Servidores rápidos e seguros. Uptime garantido, SSL grátis e suporte dedicado.',
    features: ['SSD NVMe', 'SSL Grátis', 'Backups', 'cPanel'],
  },
  {
    slug: 'websites',
    icon: ShoppingBag,
    tag: '03',
    title: 'Websites & Lojas',
    description: 'Sites institucionais e lojas online completas, prontas para vender 24/7.',
    features: ['E-commerce', 'SEO', 'Design', 'Manutenção'],
  },
]

export default function Services() {
  return (
    <section id="servicos" className="py-20 md:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="section-label">// O que fazemos</p>
          <h2 className="font-display text-2xl md:text-4xl font-bold max-w-xl leading-tight">
            Três pilares para a tua <span className="text-gradient">presença digital</span>.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="glass-strong glow-border p-5 sm:p-6 flex flex-col group relative"
            >
              <div className="absolute top-5 right-5 text-3xl font-display font-bold text-white/[0.05] group-hover:text-white/[0.09] transition-colors">
                {s.tag}
              </div>

              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <s.icon size={18} className="text-primary" />
              </div>

              <h3 className="text-lg font-bold mb-2 font-display">{s.title}</h3>
              <p className="text-white/50 text-[13px] leading-relaxed mb-4">{s.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {s.features.map((f) => (
                  <span key={f} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50">
                    {f}
                  </span>
                ))}
              </div>

              <Link
                to={`/servicos/${s.slug}`}
                className="mt-auto text-[13px] font-semibold text-primary flex items-center gap-1.5 group-hover:gap-3 transition-all"
              >
                Saber mais <span>→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}