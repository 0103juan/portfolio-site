import { useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

import { Reveal } from '@/components/motion/Reveal'
import { ProjectCard } from '@/components/ProjectCard'
import type { LinkLabels } from '@/components/ProjectLinks'
import { Section } from '@/components/Section'
import type { Content, Project } from '@/content'

import { Demo } from './Demo'

/**
 * The projects as one row that runs off the screen. It is the browser's own scrolling with snap points, so a
 * finger or a trackpad throws it with the platform's real momentum and bounce; the arrows are for a mouse.
 * The row is a grid of three lines that every card shares, so their parts line up across the whole row.
 */
function ProjectRow({ items, labels }: { items: Project[]; labels: LinkLabels }) {
  const row = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const step = (direction: 1 | -1) => {
    const card = row.current?.querySelector('article')
    if (!row.current || !card) return
    row.current.scrollBy({ left: direction * (card.offsetWidth + 16), behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <Reveal>
      <div
        ref={row}
        className="bleed-row grid snap-x snap-mandatory auto-cols-[min(84vw,28rem)] grid-flow-col grid-rows-[repeat(3,auto)] gap-x-4 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <ProjectCard key={item.name} project={item} labels={labels} className="snap-start" />
        ))}
      </div>
      {/* The links inside the cards already move the row for the keyboard, so the arrows stay out of its way. */}
      <div className="mt-4 hidden justify-end gap-2 md:flex" aria-hidden>
        {([-1, 1] as const).map((direction) => (
          <button
            key={direction}
            type="button"
            tabIndex={-1}
            onClick={() => step(direction)}
            className="press bg-surface grid size-10 cursor-pointer place-items-center rounded-full text-lg"
          >
            {direction < 0 ? '‹' : '›'}
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
