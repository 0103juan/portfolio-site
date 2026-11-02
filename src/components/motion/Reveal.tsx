import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

import { SPRING } from '@/lib/motion'

/** Content that arrives once, when it scrolls into view: it fades and rises a little. The blur is kept for the hero headline, so the page has one moment that sharpens. */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reducedMotion = useReducedMotion()
  if (reducedMotion) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ ...SPRING, duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}
