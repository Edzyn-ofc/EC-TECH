import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, Check, ArrowRight } from 'lucide-react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { useRef } from 'react'
import { useCart } from '../context/CartContext'

const data = {
  dominios: {
    title: 'Domínios',
    tagline: 'O teu endereço na internet.',
    description:
      'Um domínio é a tua identidade online. É o que os clientes escrevem no browser para te encontrar. Na EC TECH registamos domínios nacionais e internacionais com gestão simples e renovação automática.',
    benefits: [
      'Registo instantâneo em minutos',
      'Gestão DNS completa',
      'Renovação automática',
      'Protecção de privacidade WHOIS',
      'Transferência gratuita',
      'Suporte técnico dedicado',
    ],
    sections: [
      { num: '01', title: 'ESCOLHE', sub: 'o nome perfeito', text: 'Curto, memorável e alinhado com a tua marca. Ajudamos-te a encontrar o melhor.' },
      { num: '02', title: 'REGISTA', sub: 'em minutos', text: 'Pagamento via M-Pesa, e-Mola ou transferência. Activação imediata.' },
      { num: '03', title: 'APONTA', sub: 'para o teu site', text: 'Configuramos o DNS para o teu servidor, loja online ou email profissional.' },
      { num: '04', title: 'PROTEGE', sub: 'a tua marca', text: 'WHOIS privacy, bloqueio de transferência e alertas de expiração.' },
    ],
    price: 9.99,
    currency: '$',
  },
  hospedagem: {
    title: 'Hospedagem',
    tagline: 'Servidores rápidos. Sempre online.',
    description:
      'Servidores SSD NVMe com uptime de 99.9%, SSL grátis, backups automáticos e painel cPanel. A base sólida para o teu projecto crescer sem limites.',
    benefits: [
      'Uptime 99.9% garantido',
      'Discos SSD NVMe ultrarrápidos',
      'SSL grátis incluído',
      'Backups automáticos diários',
      'Painel cPanel intuitivo',
      'Suporte técnico 24/7',
    ],
    sections: [
      { num: '01', title: 'RÁPIDO', sub: 'como deve ser', text: 'Servidores otimizados com SSD NVMe, cache e CDN global.' },
      { num: '02', title: 'SEGURO', sub: 'por defeito', text: 'SSL grátis, firewall, antimalware e backups automáticos.' },
      { num: '03', title: 'ESCALÁVEL', sub: 'sem limites', text: 'Aumenta recursos a qualquer momento, sem migração e sem downtime.' },
      { num: '04', title: 'SUPORTADO', sub: 'sempre', text: 'Equipa técnica disponível por WhatsApp, email e telefone.' },
    ],
    price: 499,
    currency: 'MT',
  },
  websites: {
    title: 'Websites & Lojas Online',
    tagline: 'Do design à primeira venda.',
    description:
      'Criamos websites institucionais e lojas online completas com carrinho, gestão de produtos, pagamentos e painel administrativo. Tudo pronto a vender 24/7.',
    benefits: [
      'Design profissional e responsivo',
      'Loja online com carrinho',
      'Pagamentos M-Pesa / e-Mola',
      'Painel administrativo',
      'SEO básico incluído',
      'Manutenção mensal disponível',
    ],
    sections: [
      { num: '01', title: 'DESCOBRIMOS', sub: 'a tua marca', text: 'Reunião inicial para entender o negócio, público e objectivos.' },
      { num: '02', title: 'DESENHAMOS', sub: 'a experiência', text: 'Wireframe, protótipo e design visual aprovado por ti.' },
      { num: '03', title: 'CONSTRUÍMOS', sub: 'o produto', text: 'Desenvolvimento em React, integração de pagamentos e painel.' },
      { num: '04', title: 'LANÇAMOS', sub: 'e acompanhamos', text: 'Publicação, treino e suporte contínuo para o teu negócio crescer.' },
    ],
    price: 3500,
    currency: 'MT',
  },
}

function Section({ item }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.2, 1, 1, 0.2])

  return (
    <motion.div ref={ref} style={{ y, opacity }} className="min-h-[55vh] flex items-center px-4 py-12">
      <div className="max-w-4xl mx-auto w-full grid md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-3">
          <div className="text-6xl md:text-8xl font-display font-bold leading-none text-white/[0.05]">{item.num}</div>
        </div>
        <div className="md:col-span-9">
          <p className="section-label">{item.sub}</p>
          <h3 className="font-display text-2xl md:text-4xl font-bold mb-3 text-gradient">{item.title}</h3>
          <p className="text-white/50 text-sm md:text-base max-w-lg leading-relaxed">{item.text}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const item = data[slug]
  const { addItem } = useCart()
  if (!item) return <Navigate to="/" replace />

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/" className="inline-flex items-center gap-2 text-[12px] text-white/50 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={13} /> Voltar
        </Link>

        <div className="relative mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="section-label">{item.tagline}</p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4">
              <span className="text-gradient">{item.title}</span>
            </h1>
            <p className="text-white/50 text-sm md:text-base max-w-2xl leading-relaxed mb-8">
              {item.description}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-2 mb-8">
            {item.benefits.map((b, i) => (
              <motion.div
                key={b}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2 text-[13px] text-white/70"
              >
                <Check size={14} className="text-primary shrink-0" /> {b}
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => addItem({ id: 'srv-' + slug, name: item.title, price: item.price, currency: item.currency, type: 'Serviço' })}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90"
            >
              Adicionar ao carrinho <ArrowRight size={14} />
            </button>
            <a
              href={`https://wa.me/258878078645?text=Quero saber mais sobre ${item.title}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-full text-sm font-medium hover:bg-white/10"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>

        <div className="placeholder-box aspect-video w-full mb-16">
          Espaço para imagem ou vídeo — {item.title}
        </div>

        <div className="mb-12">
          <p className="section-label">// Como funciona</p>
          <h2 className="font-display text-2xl md:text-4xl font-bold mb-6">
            Do zero ao <span className="text-gradient">online</span>.
          </h2>
        </div>
        {item.sections.map((s) => <Section key={s.num} item={s} />)}

        <div className="glass-strong p-6 md:p-10 text-center mt-12">
          <h3 className="font-display text-xl md:text-3xl font-bold mb-3">
            Pronto para <span className="text-gradient">avançar</span>?
          </h3>
          <p className="text-white/50 text-sm mb-6">Fala connosco e começamos hoje mesmo.</p>
          <a
            href={`https://wa.me/258878078645?text=Quero avançar com ${item.title}`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90"
          >
            Falar no WhatsApp <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </div>
  )
}