import { useScroll } from 'framer-motion'
import { useRef } from 'react'

import { Chips } from '@/components/Chips'
import { Reveal } from '@/components/motion/Reveal'
import { Points } from '@/components/Points'
import { ProjectCard } from '@/components/ProjectCard'
import { Section } from '@/components/Section'
import { StickyCard_001 } from '@/components/ui/skiper-ui/skiper16'
import type { Content, Work } from '@/content'

/** The client work as a deck: every card sticks a little lower than the last and the pile builds up. */
function WorkDeck({ items, enabled }: { items: Work[]; enabled: boolean }) {
  const deck = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: deck, offset: ['start start', 'end end'] })

  return (
    <div ref={deck} className="grid gap-4">
      {items.map((item, i) => (
        <StickyCard_001 key={item.title} i={i} total={items.length} progress={scrollYProgress} enabled={enabled}>
          {/* The one card that overlaps another, so the one that needs an edge: a hairline and a shadow on its top side. */}
          <article className="card grid gap-x-10 gap-y-6 shadow-[0_-1px_0_rgba(0,0,0,0.08),0_-12px_36px_rgba(0,0,0,0.06)] lg:grid-cols-12">
            <p className="flex justify-between gap-4 lg:col-span-12">
              <span className="eyebrow">{item.sector}</span>
              <span className="text-muted text-[0.9rem] whitespace-nowrap tabular-nums">{item.period}</span>
            </p>
            <div className="lg:col-span-5">
              <h3 className="title">{item.title}</h3>
              <p className="text-muted mt-4">{item.summary}</p>
              {item.outcome && <p className="mt-4 leading-snug font-medium">{item.outcome}</p>}
            </div>
            <div className="flex flex-col gap-6 lg:col-span-7">
              <Points items={item.points} />
              <Chips items={item.stack} className="mt-auto" mark />
            </div>
          </article>
        </StickyCard_001>
      ))}
    </div>
  )
}

/** `stacked` turns the deck effect on: it needs room, and motion the reader has not asked to avoid. */
export function WorkSection({ t, stacked }: { t: Pick<Content, 'nav' | 'work' | 'background' | 'live' | 'code'>; stacked: boolean }) {
  return (
    <Section id="work" label={t.nav.work} title={t.work.title} intro={t.work.intro}>
      <WorkDeck items={t.work.items} enabled={stacked} />

      <h3 className="title mt-16 mb-6">{t.background.title}</h3>
      {/* A row each, like the cards of the deck above: these two have little in common to line up. */}
      <div className="grid gap-4">
        {t.background.items.map((item, i) => (
          <Reveal key={item.name} delay={i * 0.08}>
            <ProjectCard project={item} labels={t} wide />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
