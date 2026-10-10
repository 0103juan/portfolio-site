import { ProjectBody } from '@/components/ProjectBody'
import { SectionHead } from '@/components/SectionHead'
import { HoverExpand_001 } from '@/components/ui/skiper-ui/skiper52'
import type { Content } from '@/content'
import { pad } from '@/lib/format'
import { cn } from '@/lib/utils'

import { Demo } from './Demo'

type Props = { t: Pick<Content, 'nav' | 'ai' | 'demo' | 'live' | 'code'>; wide: boolean }

/** AI projects come first: it is the work this site is meant to show. */
export function AiSection({ t, wide }: Props) {
  return (
    <section id="ai" className="px-5 py-24 md:px-10 lg:py-32">
      <SectionHead id="ai" label={t.nav.ai} title={t.ai.title} intro={t.ai.intro} />

      {wide ? (
        <HoverExpand_001
          items={t.ai.items}
          className="h-[30rem]"
          spine={(item, i, active) => (
            <div className={cn('bg-coal flex h-full flex-col items-center justify-between border py-5', active && 'opacity-0')}>
              <span className="label text-volt">{pad(i + 1)}</span>
              <span className="display text-2xl whitespace-nowrap [writing-mode:vertical-rl] rotate-180">{item.name}</span>
            </div>
          )}
          body={(item) => <ProjectBody project={item} labels={t} className="bg-volt text-background" />}
        />
      ) : (
        <div className="grid gap-px border bg-[var(--color-border)]">
          {t.ai.items.map((item) => (
            <article key={item.name} className="bg-background">
              <ProjectBody project={item} labels={t} className="[&_a]:text-volt" />
            </article>
          ))}
        </div>
      )}

      <Demo demo={t.demo} />
    </section>
  )
}
