import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'

import { cn } from '@/lib/utils'

type CharacterProps = {
  char: string
  index: number
  centerIndex: number
  scrollYProgress: MotionValue<number>
}

const CharacterV1 = ({ char, index, centerIndex, scrollYProgress }: CharacterProps) => {
  const distanceFromCenter = index - centerIndex

  // Viewport units instead of the original pixels, so the spread never outruns a phone screen.
  const x = useTransform(scrollYProgress, [0, 0.5], [`${distanceFromCenter * 3}vw`, '0vw'])
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0])

  return (
    <motion.span className="inline-block" style={{ x, rotateX }}>
      {char}
    </motion.span>
  )
}

/** A line whose letters fly in from both sides and settle into place as it scrolls into view. */
const ScrollAssemble = ({ text, className }: { text: string; className?: string }) => {
  const targetRef = useRef<HTMLHeadingElement | null>(null)
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start end', 'end center'] })

  const centerIndex = Math.floor(text.length / 2)
  const words = text.split(' ')
  // Where each word starts in the whole line; letters animate by their distance from the centre of the line.
  const starts = words.map((_, i) => words.slice(0, i).join(' ').length + (i > 0 ? 1 : 0))

  return (
    <h2 ref={targetRef} aria-label={text} className={cn(className)} style={{ perspective: '500px' }}>
      {words.map((word, wordIndex) => {
        const start = starts[wordIndex]
        return (
          <span key={wordIndex} aria-hidden className="mr-[0.25em] inline-block whitespace-nowrap">
            {word.split('').map((char, i) => (
              <CharacterV1 key={i} char={char} index={start + i} centerIndex={centerIndex} scrollYProgress={scrollYProgress} />
            ))}
          </span>
        )
      })}
    </h2>
  )
}

export { CharacterV1, ScrollAssemble }

/**
 * Skiper 31 ScrollAnimation_002 — React + framer motion
 * Adapted for this site: only the letter-by-letter variant is kept, wrapped as ScrollAssemble.
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.me
 * Source: https://skiper-ui.com
 */
