import { cn } from '@/lib/utils'

type ProgressiveBlurProps = {
  className?: string
  backgroundColor?: string
  position?: 'top' | 'bottom'
  height?: string
  blurAmount?: string
}

/** A band at the top or bottom edge where the content behind fades and blurs away. */
const ProgressiveBlur = ({
  className = '',
  backgroundColor = '#f5f4f3',
  position = 'top',
  height = '150px',
  blurAmount = '4px',
}: ProgressiveBlurProps) => {
  const isTop = position === 'top'

  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute left-0 w-full select-none', className)}
      style={{
        [isTop ? 'top' : 'bottom']: 0,
        height,
        background: isTop
          ? `linear-gradient(to top, transparent, ${backgroundColor})`
          : `linear-gradient(to bottom, transparent, ${backgroundColor})`,
        maskImage: isTop
          ? `linear-gradient(to bottom, ${backgroundColor} 50%, transparent)`
          : `linear-gradient(to top, ${backgroundColor} 50%, transparent)`,
        WebkitBackdropFilter: `blur(${blurAmount})`,
        backdropFilter: `blur(${blurAmount})`,
      }}
    />
  )
}

export { ProgressiveBlur }

/**
 * Skiper 41 Canvas_Landing_004 — progressive blur
 * Inspired by and adapted from https://devouringdetails.com/ (an independent recreation, not associated with it).
 * Adapted for this site: the demo page is removed and class names are merged, so it can be fixed.
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 *
 * Author: @gurvinder-singh02
 * Source: https://skiper-ui.com
 */
