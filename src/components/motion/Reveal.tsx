import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

import { SPRING } from '@/lib/motion'

/** Content that arrives once, when it scrolls into view: it sharpens and rises instead of only fading. */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reducedMotion = useReducedMotion()
  if (reducedMotion) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ ...SPRING, duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  )
}
