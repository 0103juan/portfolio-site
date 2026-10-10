import { useScroll } from 'framer-motion'
import { useRef } from 'react'

import { Chips } from '@/components/Chips'
import { SectionHead } from '@/components/SectionHead'
import { StickyCard_001 } from '@/components/ui/skiper-ui/skiper16'
import type { Content, Work } from '@/content'
import { cn } from '@/lib/utils'

/** The client work as a deck: every card sticks a little lower than the last and the pile builds up. */
function WorkDeck({ items, enabled }: { items: Work[]; enabled: boolean }) {
  const deck = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: deck, offset: ['start start', 'end end'] })

  return (
    <div ref={deck} className={cn('grid gap-4', enabled && 'pb-[30vh]')}>
      {items.map((item, i) => (
        <StickyCard_001 key={item.title} i={i} total={items.length} progress={scrollYProgress} enabled={enabled}>
          {/* The shadow falls upward, onto the card underneath: it is what separates the sheets of the pile. */}
          <article className="bg-surface grid gap-x-10 gap-y-6 rounded-[28px] border p-6 shadow-[0_-12px_36px_rgba(0,0,0,0.06)] lg:grid-cols-12 lg:p-10">
            <p className="flex justify-between gap-4 lg:col-span-12">
              <span className="eyebrow">{item.sector}</span>
              <span className="text-muted text-[0.9rem] whitespace-nowrap tabular-nums">{item.period}</span>
            </p>
            <div className="lg:col-span-5">
              <h3 className="text-[1.6rem] leading-[1.1] font-semibold tracking-[-0.025em] lg:text-[2rem]">{item.title}</h3>
              <p className="text-muted mt-4">{item.summary}</p>
            </div>
            <div className="flex flex-col gap-6 lg:col-span-7">
              <ul className="grid gap-3">
                {item.points.map((point) => (
                  <li key={point} className="grid grid-cols-[auto_1fr] gap-3 text-[0.95rem]">
                    <span className="text-accent">→</span>
                    {point}
                  </li>
                ))}
              </ul>
              <Chips items={item.stack} className="mt-auto" mark />
            </div>
          </article>
        </StickyCard_001>
      ))}
    </div>
  )
}

/** `stacked` turns the deck effect on: it needs room, and motion the reader has not asked to avoid. */
export function WorkSection({ t, stacked }: { t: Pick<Content, 'nav' | 'work'>; stacked: boolean }) {
  return (
    <section id="work" className="border-t">
      <div className="wrap py-24 lg:py-32">
        <SectionHead label={t.nav.work} title={t.work.title} intro={t.work.intro} />
        <WorkDeck items={t.work.items} enabled={stacked} />
      </div>
    </section>
  )
}
