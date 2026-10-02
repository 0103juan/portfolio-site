import { motion } from 'framer-motion'
import type React from 'react'

import { cn } from '@/lib/utils'

const STAGGER = 0.035

/** Text that rolls upward letter by letter on hover, replaced by a copy coming from below. */
const TextRoll: React.FC<{
  children: string
  className?: string
  center?: boolean
}> = ({ children, className, center = false }) => {
  const delayOf = (i: number) => (center ? STAGGER * Math.abs(i - (children.length - 1) / 2) : STAGGER * i)

  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      whileFocus="hovered"
      // The line box must be taller than the glyphs, or the hidden copy peeks in from below.
      className={cn('relative block overflow-hidden leading-[1.35] whitespace-pre', className)}
    >
      <span className="block">
        {children.split('').map((l, i) => (
          <motion.span
            variants={{ initial: { y: 0 }, hovered: { y: '-100%' } }}
            transition={{ ease: 'easeInOut', delay: delayOf(i) }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </span>
      <span aria-hidden className="absolute inset-0 block">
        {children.split('').map((l, i) => (
          <motion.span
            variants={{ initial: { y: '100%' }, hovered: { y: 0 } }}
            transition={{ ease: 'easeInOut', delay: delayOf(i) }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </span>
    </motion.span>
  )
}

export { TextRoll }

/**
 * Skiper 58 — navigation text roll, React + framer motion
 * Adapted for this site: only TextRoll is kept; it also rolls on keyboard focus.
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 *
 * Author: @gurvinder-singh02
 * Source: https://skiper-ui.com
 */
