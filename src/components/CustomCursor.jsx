import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { damping: 20, stiffness: 200, mass: 0.5 })
  const ringY = useSpring(y, { damping: 20, stiffness: 200, mass: 0.5 })
  const [hover, setHover] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const t = e.target
      const isInteractive =
        t.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer')
      setHover(!!isInteractive)
    }
    const onLeave = () => setHidden(true)
    const onEnter = () => setHidden(false)
    const onDown = () => setHover(true)
    const onUp = () => setHover(false)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [x, y])

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999]">
      {/* dot */}
      <motion.div
        style={{ x, y }}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white mix-blend-difference"
        animate={{ opacity: hidden ? 0 : 1 }}
      />
      {/* ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 mix-blend-difference"
        animate={{
          width: hover ? 56 : 28,
          height: hover ? 56 : 28,
          opacity: hidden ? 0 : hover ? 1 : 0.6,
          backgroundColor: hover ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 250 }}
      />
    </div>
  )
}