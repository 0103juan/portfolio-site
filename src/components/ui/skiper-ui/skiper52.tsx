import { AnimatePresence, motion } from 'framer-motion'
import { useState, type ReactNode } from 'react'

import { SPRING } from '@/lib/motion'
import { cn } from '@/lib/utils'

/**
 * A pile of panels; the one under the pointer (or the one tapped or focused) opens to the height of its
 * content, the others stay closed as a spine.
 */
const HoverExpand_001 = <T,>({
  items,
  spine,
  body,
  className,
  spineHeight = '3.25rem',
}: {
  items: T[]
  spine: (item: T, index: number) => ReactNode
  body: (item: T, index: number) => ReactNode
  className?: string
  spineHeight?: string
}) => {
  const [activeItem, setActiveItem] = useState(0)

  return (
    <div className={cn('grid gap-2', className)}>
      {items.map((item, index) => {
        const active = activeItem === index
        return (
          <motion.div
            key={index}
            tabIndex={0}
            className="relative cursor-pointer overflow-hidden outline-none"
            initial={false}
            animate={{ height: active ? 'auto' : spineHeight }}
            transition={SPRING}
            onClick={() => setActiveItem(index)}
            onFocus={() => setActiveItem(index)}
            onHoverStart={() => setActiveItem(index)}
          >
            <div className={cn('absolute inset-x-0 top-0 transition-opacity', active && 'opacity-0')} style={{ height: spineHeight }}>
              {spine(item, index)}
            </div>
            <AnimatePresence initial={false}>
              {active && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.15 } }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  className="relative"
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
 * Adapted for this site: the panels are piled as a column and hold any content instead of images, the open
 * one takes the height of what is inside it, and they respond to focus as well as to the pointer.
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 *
 * Author: @gurvinder-singh02
 * Source: https://skiper-ui.com
 */
