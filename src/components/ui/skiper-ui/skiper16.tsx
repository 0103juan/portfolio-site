import { motion, useTransform, type MotionValue } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * One card of a deck that piles up while scrolling: each card sticks a little lower than the one
 * before, and shrinks slightly as the cards after it arrive.
 */
const StickyCard_001 = ({
  i,
  total,
  progress,
  enabled,
  children,
}: {
  i: number
  total: number
  progress: MotionValue<number> // scroll progress of the whole deck, 0 to 1
  enabled: boolean // off on small screens, where a card can be taller than the viewport
  children: ReactNode
}) => {
  const targetScale = 1 - (total - i - 1) * 0.02
  const scale = useTransform(progress, [i / total, 1], [1, targetScale])

  if (!enabled) return <div>{children}</div>

  return (
    <div className="sticky" style={{ top: `calc(4.5rem + ${i * 14}px)` }}>
      <motion.div style={{ scale }} className="origin-top">
        {children}
      </motion.div>
    </div>
  )
}

export { StickyCard_001 }

/**
 * Skiper 16 StickyCard_001 — React + Framer Motion
 * Adapted for this site: the card takes any content instead of an image.
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 *
 * Author: @gurvinder-singh02
 * Source: https://skiper-ui.com
 */
