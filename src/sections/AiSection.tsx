import { useReducedMotion } from 'framer-motion'
import { useRef, useState } from 'react'

import { Reveal } from '@/components/motion/Reveal'
import { ProjectCard } from '@/components/ProjectCard'
import type { LinkLabels } from '@/components/ProjectLinks'
import { Section } from '@/components/Section'
import type { Content, Project } from '@/content'
import { cn } from '@/lib/utils'

import { Demo } from './Demo'

/**
 * The projects as one row that runs off the screen. It is the browser's own scrolling with snap points, so a
 * finger or a trackpad throws it with the platform's real momentum and bounce; the paddles are for a mouse,
 * and the one that has nowhere left to go fades.
 * The row is a grid of three lines that every card shares, so their parts line up across the whole row.
 */
function ProjectRow({ items, labels }: { items: Project[]; labels: LinkLabels }) {
  const row = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [edge, setEdge] = useState({ start: true, end: false })

  const track = () => {
    const el = row.current
    if (!el) return
    const start = el.scrollLeft < 4
    const end = el.scrollLeft + el.clientWidth > el.scrollWidth - 4
    setEdge((now) => (now.start === start && now.end === end ? now : { start, end }))
  }

  const step = (direction: 1 | -1) => {
    const card = row.current?.querySelector('article')
    if (!row.current || !card) return
    row.current.scrollBy({ left: direction * (card.offsetWidth + 16), behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <Reveal>
      <div
        ref={row}
        onScroll={track}
        className="bleed-row grid snap-x snap-mandatory auto-cols-[min(84vw,28rem)] grid-flow-col grid-rows-[repeat(3,auto)] gap-x-4 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <ProjectCard key={item.name} project={item} labels={labels} className="snap-start" />
        ))}
      </div>
      {/* The links inside the cards already move the row for the keyboard, so the paddles stay out of its way. */}
      <div className="mt-5 hidden justify-end gap-3 md:flex" aria-hidden>
        {([-1, 1] as const).map((direction) => (
          <button
            key={direction}
            type="button"
            tabIndex={-1}
            disabled={direction < 0 ? edge.start : edge.end}
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
