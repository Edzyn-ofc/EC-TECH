import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  { q: 'Quanto tempo demora a activação?', a: 'Após confirmação do pagamento via WhatsApp, o teu serviço fica activo em poucos minutos.' },
  { q: 'Aceitam M-Pesa e e-Mola?', a: 'Sim. Também aceitamos transferência bancária e pagamento em numerário.' },
  { q: 'A hospedagem inclui SSL grátis?', a: 'Sim, todos os planos incluem certificado SSL grátis (HTTPS).' },
  { q: 'Posso migrar o meu site actual?', a: 'Sim, fazemos migração gratuita sem downtime e sem perder dados.' },
  { q: 'Criam lojas online completas?', a: 'Sim, com carrinho, gestão de produtos, pagamentos e painel administrativo.' },
  { q: 'Existe fidelização?', a: 'Não. Podes cancelar em qualquer momento, sem taxas adicionais.' },
]

function Item({ faq, open, onToggle }) {
  return (
    <div className="border-b border-white/[0.06] last:border-0">
      <button onClick={onToggle} className="w-full flex items-center justify-between py-4 text-left group">
        <span className="text-[13.5px] font-medium pr-3 group-hover:text-primary transition-colors">{faq.q}</span>
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }}
          className="shrink-0 w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <Plus size={12} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <p className="text-white/50 text-[13px] pb-4 pr-8 leading-relaxed">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="py-20 md:py-28 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
          <p className="section-label">// Perguntas frequentes</p>
          <h2 className="font-display text-2xl md:text-4xl font-bold mb-2">Tens <span className="text-gradient">dúvidas</span>?</h2>
          <p className="text-white/50 text-sm">Reunimos as perguntas mais comuns.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-strong p-5 sm:p-7">
          {faqs.map((f, i) => (
            <Item key={i} faq={f} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}