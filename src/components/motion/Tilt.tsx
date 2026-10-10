import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import type { PointerEvent, ReactNode } from 'react'

const MAX_DEGREES = 7
const SETTLE = { stiffness: 260, damping: 32 } // critically damped: it follows the pointer and never wobbles

/** A card that leans toward the mouse, as if it were held by its centre. Touch and reduced motion leave it flat. */
export function Tilt({ children, className }: { children: ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion()
  const x = useMotionValue(0) // where the pointer is over the card, from -0.5 to 0.5
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [MAX_DEGREES, -MAX_DEGREES]), SETTLE)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-MAX_DEGREES, MAX_DEGREES]), SETTLE)

  if (reducedMotion) return <div className={className}>{children}</div>

  const follow = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return
    const box = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - box.left) / box.width - 0.5)
    y.set((event.clientY - box.top) / box.height - 0.5)
  }
  const rest = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div className={className} style={{ rotateX, rotateY, transformPerspective: 900 }} onPointerMove={follow} onPointerLeave={rest}>
      {children}
    </motion.div>
  )
}
