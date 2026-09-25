import { Mail, MessageCircle, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

const cols = [
  { title: 'Serviços', links: [['Domínios', '/servicos/dominios'], ['Hospedagem', '/servicos/hospedagem'], ['Websites', '/servicos/websites'], ['Preços', '/#precos']] },
  { title: 'Conta', links: [['Entrar', '/login'], ['Criar conta', '/registar'], ['Carrinho', '/carrinho'], ['Dashboard', '/dashboard']] },
  { title: 'Empresa', links: [['FAQ', '/#faq'], ['Contacto', '/#contacto'], ['Privacidade', '#'], ['Termos', '#']] },
]

export default function Footer() {
  return (
    <footer className="relative pt-16 pb-8 px-4 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 mb-12">
          <div className="col-span-2 md:col-span-5">
            <div className="placeholder-box w-24 h-8 mb-4 text-[10px]">Logo EC TECH</div>
            <p className="text-white/40 text-[12.5px] leading-relaxed mb-5 max-w-xs">
              EC TECH — a tua parceira tecnológica em Moçambique. Domínios, hospedagem, websites e lojas online.
            </p>
            <div className="space-y-2 text-[12.5px]">
              <a href="https://wa.me/258878078645" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-primary transition-colors">
                <MessageCircle size={12} /> +258 87 807 8645
              </a>
              <a href="mailto:ectech@gmail.com" className="flex items-center gap-2 text-white/60 hover:text-primary transition-colors">
                <Mail size={12} /> ectech@gmail.com
              </a>
              <div className="flex items-center gap-2 text-white/40">
                <MapPin size={12} /> Maputo, Moçambique
              </div>
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title} className="md:col-span-2">
              <h4 className="font-semibold mb-4 text-[12px] tracking-wider uppercase text-white/70">{c.title}</h4>
              <ul className="space-y-2.5">
                {c.links.map(([label, to]) => (
                  <li key={label}>
                    {to.startsWith('/#') ? (
                      <a href={to.slice(1)} className="text-[12.5px] text-white/40 hover:text-white transition-colors">{label}</a>
                    ) : (
                      <Link to={to} className="text-[12.5px] text-white/40 hover:text-white transition-colors">{label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1">
            <h4 className="font-semibold mb-4 text-[12px] tracking-wider uppercase text-white/70">Rede</h4>
            <div className="flex flex-wrap gap-1.5">
              {['FB', 'IG', 'IN', 'X'].map((s) => (
                <a key={s} href="#" className="w-7 h-7 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-[9px] font-bold text-white/50 hover:bg-white/10 hover:text-white transition-all">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/[0.06]">
          <p className="text-[11px] text-white/30">© {new Date().getFullYear()} EC TECH. Todos os direitos reservados.</p>
          <p className="text-[11px] text-white/30 flex items-center gap-1.5">
            Feito em Moçambique <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-secondary" />
          </p>
        </div>
      </div>
    </footer>
  )
}