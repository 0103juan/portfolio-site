import { Chips } from '@/components/Chips'
import { SectionHead } from '@/components/SectionHead'
import { HoverExpand_001 } from '@/components/ui/skiper-ui/skiper52'
import type { Content } from '@/content'
import { cn } from '@/lib/utils'

/**
 * The layers of a product, piled like the stack they are. The one under the pointer (or tapped, or focused)
 * opens to show the project that proves it; the others stay as a line with their name and tools.
 */
export function FullStackSection({ t }: { t: Pick<Content, 'nav' | 'fullstack' | 'code'> }) {
  return (
    <section id="fullstack" className="border-t">
      <div className="wrap py-24 lg:py-32">
        <SectionHead label={t.nav.fullstack} title={t.fullstack.title} intro={t.fullstack.intro} />
        <HoverExpand_001
          items={t.fullstack.layers}
          grow={5}
          className="h-[44rem] flex-col gap-2 sm:h-[36rem] lg:h-[33rem]"
          spine={(layer, _, open) => (
            <div className={cn('bg-surface flex h-full items-center justify-between gap-6 rounded-[20px] px-6 lg:px-8', open && 'opacity-0')}>
              <span className="text-[1.15rem] font-semibold tracking-[-0.02em]">{layer.name}</span>
              <span className="text-muted hidden truncate text-[0.9rem] sm:block">{layer.tech.join(' · ')}</span>
            </div>
          )}
          body={(layer) => (
            <div className="dark-surface flex h-full flex-col justify-between gap-5 rounded-[20px] p-6 lg:flex-row lg:items-end lg:gap-12 lg:p-8">
              <div className="grid content-start gap-4 lg:self-start">
                <h3 className="display text-[clamp(1.7rem,3.4vw,2.6rem)]">{layer.name}</h3>
                <Chips items={layer.tech} />
              </div>
              <div className="grid gap-3 lg:max-w-[26rem]">
                <p className="leading-snug">{layer.proof}</p>
                <a href={layer.repo} className="text-accent w-fit text-[0.95rem] hover:underline">
                  {layer.project} · {t.code} ↗
                </a>
              </div>
            </div>
          )}
        />
      </div>
    </section>
  )
}
