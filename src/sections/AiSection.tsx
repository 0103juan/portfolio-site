import { useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

import { ProjectBody } from '@/components/ProjectBody'
import type { LinkLabels } from '@/components/ProjectLinks'
import { SectionHead } from '@/components/SectionHead'
import type { Content, Project } from '@/content'

import { Demo } from './Demo'

/**
 * The projects as one row that runs off the screen. It is the browser's own scrolling with snap points, so a
 * finger or a trackpad throws it with the platform's real momentum and bounce; the arrows are for a mouse.
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
    <>
      <div
        ref={row}
        className="bleed-row flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <article
            key={item.name}
            className="bg-surface w-[min(84vw,25rem)] shrink-0 snap-start rounded-[28px] transition-transform duration-300 ease-out hover:-translate-y-1"
          >
            <ProjectBody project={item} labels={labels} />
          </article>
        ))}
      </div>
      {/* The links inside the cards already move the row for the keyboard, so the arrows stay out of its way. */}
      <div className="mt-1 hidden justify-end gap-2 md:flex" aria-hidden>
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
    </>
  )
}

/** AI projects come first: it is the work this site is meant to show. */
export function AiSection({ t }: { t: Pick<Content, 'nav' | 'ai' | 'demo' | 'live' | 'code'> }) {
  return (
    <section id="ai">
      <div className="wrap py-24 lg:py-32">
        <SectionHead label={t.nav.ai} title={t.ai.title} intro={t.ai.intro} />
        <ProjectRow items={t.ai.items} labels={t} />
        <Demo demo={t.demo} />
      </div>
    </section>
  )
}
