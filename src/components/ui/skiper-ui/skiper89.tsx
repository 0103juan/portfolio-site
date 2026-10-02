import NumberFlow from '@number-flow/react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { useState } from 'react'

import { cn } from '@/lib/utils'

/** A small ring in the corner that fills as the page scrolls. It can be dragged out of the way. */
const ScrollProgress = ({ className }: { className?: string }) => {
  const { scrollYProgress } = useScroll()
  const [progressPercent, setProgressPercent] = useState(0)

  const clampedProgress = useTransform(scrollYProgress, (value) => Math.min(Math.max(value, 0), 1))
  const progressAsPercent = useTransform(clampedProgress, (value) => Math.round(value * 100))

  useMotionValueEvent(progressAsPercent, 'change', (value) => {
    setProgressPercent(value)
  })

  const svgRadius = 18
  const circumference = 2 * Math.PI * svgRadius

  return (
    <motion.div
      drag
      dragMomentum={false}
      aria-hidden
      className={cn('group fixed bottom-4 right-4 z-40 cursor-grab items-center gap-1 active:cursor-grabbing', className)}
    >
      <NumberFlow
        value={progressPercent}
        className="text-foreground/60 absolute top-1 flex h-8 -translate-y-full items-center justify-center px-3 text-xs font-medium tabular-nums opacity-0 group-hover:opacity-100"
        suffix="%"
      />
      <div className="bg-background/40 flex size-12 items-center justify-center border backdrop-blur">
        <svg className="size-10" viewBox="0 0 48 48" role="presentation">
          <circle cx="24" cy="24" r={svgRadius} stroke="currentColor" strokeWidth="3" className="opacity-20" fill="none" />
          <motion.circle
            cx="24"
            cy="24"
            r={svgRadius}
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeDasharray={`${circumference}`}
            style={{ pathLength: clampedProgress, rotate: -90, transformOrigin: '50% 50%' }}
          />
        </svg>
      </div>
    </motion.div>
  )
}

export { ScrollProgress }

/**
 * Skiper 89 — draggable scroll progress, React + motion
 * Adapted for this site: the demo page around the indicator is removed.
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 *
 * Author: @gurvinder-singh02
 * Source: https://skiper-ui.com
 */
