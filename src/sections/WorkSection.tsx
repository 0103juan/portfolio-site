import { useScroll } from 'framer-motion'
import { useRef } from 'react'

import { Chips } from '@/components/Chips'
import { SectionHead } from '@/components/SectionHead'
import { StickyCard_001 } from '@/components/ui/skiper-ui/skiper16'
import type { Content, Work } from '@/content'
import { pad } from '@/lib/format'
import { cn } from '@/lib/utils'

/** The client work as a deck: every card sticks a little lower than the last and the pile builds up. */
function WorkDeck({ items, enabled }: { items: Work[]; enabled: boolean }) {
  const deck = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: deck, offset: ['start start', 'end end'] })

  return (
    <div ref={deck} className={cn('grid gap-4', enabled && 'pb-[30vh]')}>
      {items.map((item, i) => (
        <StickyCard_001 key={item.title} i={i} total={items.length} progress={scrollYProgress} enabled={enabled}>
          <article className="bg-coal grid border lg:grid-cols-12">
            <p className="label flex justify-between gap-4 border-b px-5 py-3 lg:col-span-12">
              <span className="text-volt">
                {pad(i + 1)} · {item.sector}
              </span>
              <span className="text-ash whitespace-nowrap">{item.period}</span>
            </p>
            <div className="p-5 lg:col-span-5 lg:p-8">
              <h3 className="text-2xl leading-[1.05] font-bold tracking-tight lg:text-4xl" style={{ fontStretch: '85%' }}>
                {item.title}
              </h3>
              <p className="text-ash mt-4">{item.summary}</p>
            </div>
            <div className="flex flex-col gap-6 border-t p-5 lg:col-span-7 lg:border-t-0 lg:border-l lg:p-8">
              <ul className="grid gap-3">
                {item.points.map((point) => (
                  <li key={point} className="grid grid-cols-[auto_1fr] gap-3 text-[0.95rem]">
                    <span className="text-volt font-mono">→</span>
                    {point}
                  </li>
                ))}
              </ul>
              <Chips items={item.stack} className="text-ash mt-auto" mark />
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
    <section id="work" className="border-t px-5 py-24 md:px-10 lg:py-32">
      <SectionHead id="work" label={t.nav.work} title={t.work.title} intro={t.work.intro} />
      <WorkDeck items={t.work.items} enabled={stacked} />
    </section>
  )
}
