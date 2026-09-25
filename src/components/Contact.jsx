import { motion } from 'framer-motion'
import { MessageCircle, Mail, MapPin } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contacto" className="py-20 md:py-28 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative glass-strong p-8 md:p-14 overflow-hidden text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 pointer-events-none" />
          <div className="absolute -top-32 -right-32 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
          <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-secondary/20 rounded-full blur-[100px]" />

          <div className="relative z-10">
            <p className="section-label">// Contacto</p>
            <h2 className="font-display text-2xl md:text-4xl font-bold mb-4">
              Pronto para <span className="text-gradient">começar</span>?
            </h2>
            <p className="text-white/50 text-sm mb-8 max-w-md mx-auto">
              Fala connosco agora. Respondemos em minutos.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
              <motion.a
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                href="https://wa.me/258878078645?text=Olá EC TECH! Quero saber mais sobre os vossos serviços."
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary px-6 py-3 rounded-full text-sm font-bold shadow-lg shadow-primary/25"
              >
                <MessageCircle size={16} /> +258 87 807 8645
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                href="mailto:ectech@gmail.com"
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/10"
              >
                <Mail size={16} /> ectech@gmail.com
              </motion.a>
            </div>

            <div className="flex justify-center gap-6 text-[11px] text-white/40">
              <span className="flex items-center gap-1.5"><MapPin size={11} /> Maputo, Moçambique</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Disponível</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}