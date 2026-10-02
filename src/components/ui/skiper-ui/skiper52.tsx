import { AnimatePresence, motion } from 'framer-motion'
import { useState, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

/**
 * A row of narrow panels; the one under the pointer (or the one tapped or focused) grows and
 * shows its full content, the others collapse to a spine.
 */
const HoverExpand_001 = <T,>({
  items,
  spine,
  body,
  className,
}: {
  items: T[]
  spine: (item: T, index: number, active: boolean) => ReactNode
  body: (item: T, index: number) => ReactNode
  className?: string
}) => {
  const [activeItem, setActiveItem] = useState(0)

  return (
    <div className={cn('flex w-full gap-1', className)}>
      {items.map((item, index) => {
        const active = activeItem === index
        return (
          <motion.div
            key={index}
            tabIndex={0}
            className="relative min-w-0 cursor-pointer overflow-hidden outline-none"
            style={{ flexBasis: 0 }}
            initial={false}
            animate={{ flexGrow: active ? 9 : 1 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            onClick={() => setActiveItem(index)}
            onFocus={() => setActiveItem(index)}
            onHoverStart={() => setActiveItem(index)}
          >
            {spine(item, index, active)}
            <AnimatePresence>
              {active && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.2 } }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  className="absolute inset-0"
                >
                  {body(item, index)}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}

export { HoverExpand_001 }

/**
 * Skiper 52 HoverExpand_001 — React + Framer Motion
 * Adapted for this site: panels hold any content instead of images, and respond to focus.
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 *
 * Author: @gurvinder-singh02
 * Source: https://skiper-ui.com
 */
