import { useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Reveal } from '@/components/motion/Reveal'
import { ProjectCard } from '@/components/ProjectCard'
import type { LinkLabels } from '@/components/ProjectLinks'
import { Section } from '@/components/Section'
import type { Content, Project } from '@/content'
import { cn } from '@/lib/utils'

import { Demo } from './Demo'

/**
 * The projects as one row to move through. It is the browser's own scrolling with snap points, so a finger or
 * a trackpad throws it with the platform's real momentum and bounce; the paddles are for a mouse.
 *
 * On a wide screen the row stays inside the column and holds exactly two cards, so it ends where everything
 * else on the page ends. On a narrow one, where the column is the screen, it runs to both edges and the next
 * card peeks in. The dots say how many projects there are and which ones are on screen.
 *
 * The row is a grid of three lines that every card shares, so their parts line up across the whole row.
 */
function ProjectRow({ items, labels }: { items: Project[]; labels: LinkLabels }) {
  const row = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [view, setView] = useState({ first: 0, last: 0, start: true, end: false })

  const track = useCallback(() => {
    const el = row.current
    if (!el) return
    const { left, right } = el.getBoundingClientRect()
    // A card counts as on screen when its centre is inside the row's window.
    const shown = [...el.children].map((card) => {
      const box = card.getBoundingClientRect()
      return (box.left + box.right) / 2 > left && (box.left + box.right) / 2 < right
    })
    const next = {
      first: Math.max(0, shown.indexOf(true)),
      last: Math.max(0, shown.lastIndexOf(true)),
      start: el.scrollLeft < 4,
      end: el.scrollLeft + el.clientWidth > el.scrollWidth - 4,
    }
    setView((now) => (Object.entries(next).every(([key, value]) => now[key as keyof typeof now] === value) ? now : next))
  }, [])

  useEffect(() => {
    track()
    window.addEventListener('resize', track)
    return () => window.removeEventListener('resize', track)
  }, [track])

  /** One screenful of whole cards at a time. */
  const step = (direction: 1 | -1) => {
    const el = row.current
    const card = el?.firstElementChild
    if (!el || !card) return
    const style = getComputedStyle(el)
    const gap = parseFloat(style.columnGap)
    const unit = card.getBoundingClientRect().width + gap
    const room = el.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)
    const whole = Math.max(1, Math.floor((room + gap) / unit + 0.05))
    el.scrollBy({ left: direction * whole * unit, behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <Reveal>
      <div
        ref={row}
        onScroll={track}
        className="bleed-row grid snap-x snap-mandatory auto-cols-[min(84vw,28rem)] grid-flow-col grid-rows-[repeat(3,auto)] gap-x-4 overflow-x-auto overscroll-x-contain [scrollbar-width:none] lg:auto-cols-[calc((100%-1rem)/2)] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <ProjectCard key={item.name} project={item} labels={labels} className="snap-start" />
        ))}
      </div>

      {/* The links inside the cards already move the row for the keyboard, so these stay out of its way. */}
      <div className="mt-5 flex min-h-11 items-center justify-between gap-6" aria-hidden>
        <div className="flex gap-2">
          {items.map((item, i) => (
            <span
              key={item.name}
              className={cn('size-2 rounded-full transition-colors duration-300', i >= view.first && i <= view.last ? 'bg-foreground/70' : 'bg-border')}
            />
          ))}
        </div>
        <div className="hidden gap-3 md:flex">
          {([-1, 1] as const).map((direction) => (
            <button
              key={direction}
              type="button"
              tabIndex={-1}
              disabled={direction < 0 ? view.start : view.end}
              onClick={() => step(direction)}
              className="press bg-border/65 text-foreground/60 hover:bg-border hover:text-foreground/85 grid size-11 cursor-pointer place-items-center rounded-full disabled:pointer-events-none disabled:opacity-40"
            >
              {/* Drawn a little toward the side it points to: a chevron centred by its box looks off-centre. */}
              <svg viewBox="0 0 24 24" className={cn('size-5', direction > 0 && '-scale-x-100')} fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 5.5 8 12l6.5 6.5" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </Reveal>
  )
}

/** AI projects come first: it is the work this site is meant to show. */
export function AiSection({ t }: { t: Pick<Content, 'nav' | 'ai' | 'demo' | 'live' | 'code'> }) {
  return (
    <Section id="ai" tinted label={t.nav.ai} title={t.ai.title} intro={t.ai.intro}>
      <ProjectRow items={t.ai.items} labels={t} />
      <Demo demo={t.demo} />
    </Section>
  )
}
