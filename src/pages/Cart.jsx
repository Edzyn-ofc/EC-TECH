import { motion } from 'framer-motion'
import { Trash2, Minus, Plus, ShoppingBag, MessageCircle, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, removeItem, updateQty, total, clear } = useCart()

  const whatsappMsg = encodeURIComponent(
    'Olá EC TECH! Quero finalizar este pedido:\n\n' +
    items.map((i) => `• ${i.name} (x${i.qty}) — ${i.currency} ${(i.price * i.qty).toFixed(2)}`).join('\n') +
    `\n\nTotal: ${items[0]?.currency || 'MT'} ${total.toFixed(2)}`
  )

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center glass-strong p-10 max-w-sm w-full">
          <div className="w-14 h-14 rounded-full bg-white/5 mx-auto flex items-center justify-center mb-4">
            <ShoppingBag size={22} className="text-white/40" />
          </div>
          <h1 className="font-display text-xl font-bold mb-2">Carrinho vazio</h1>
          <p className="text-white/40 text-[13px] mb-6">Adiciona serviços ou planos para continuar.</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary px-5 py-2.5 rounded-full text-[13px] font-semibold">
            <ArrowLeft size={13} /> Voltar à loja
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-[12px] text-white/50 hover:text-white mb-6 transition-colors">
          <ArrowLeft size={13} /> Continuar a comprar
        </Link>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="section-label">// Carrinho</p>
          <h1 className="font-display text-2xl md:text-3xl font-bold">O teu pedido</h1>
        </motion.div>

        <div className="glass-strong p-4 md:p-6 mb-4">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between gap-3 py-4 border-b border-white/[0.06] last:border-0"
            >
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium truncate">{item.name}</p>
                <p className="text-[11px] text-white/40 uppercase tracking-wider">{item.type}</p>
              </div>

              <div className="flex items-center gap-1.5">
                <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-7 h-7 rounded-md bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10">
                  <Minus size={11} />
                </button>
                <span className="text-[13px] w-6 text-center">{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-7 h-7 rounded-md bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10">
                  <Plus size={11} />
                </button>
              </div>

              <div className="text-right min-w-[70px]">
                <p className="text-[13px] font-semibold">{item.currency} {(item.price * item.qty).toFixed(2)}</p>
              </div>

              <button onClick={() => removeItem(item.id)} className="text-white/30 hover:text-red-400 transition-colors p-1">
                <Trash2 size={14} />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="glass-strong p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[13px] text-white/60">Total</span>
            <span className="font-display text-2xl font-bold">{items[0]?.currency} {total.toFixed(2)}</span>
          </div>

          <a
            href={`https://wa.me/258878078645?text=${whatsappMsg}`}
            target="_blank" rel="noopener noreferrer"
            className="w-full bg-gradient-to-r from-primary to-secondary py-3 rounded-xl text-sm font-semibold hover:opacity-90 flex items-center justify-center gap-2 mb-2"
          >
            <MessageCircle size={15} /> Finalizar via WhatsApp
          </a>

          <button onClick={clear} className="w-full py-2.5 rounded-xl text-[12px] text-white/50 hover:text-white hover:bg-white/5 transition-colors">
            Limpar carrinho
          </button>
        </div>
      </div>
    </div>
  )
}