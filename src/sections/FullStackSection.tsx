import { Chips } from '@/components/Chips'
import { Reveal } from '@/components/motion/Reveal'
import { Section } from '@/components/Section'
import { HoverExpand_001 } from '@/components/ui/skiper-ui/skiper52'
import type { Content } from '@/content'

/**
 * The layers of a product, piled like the stack they are. The one under the pointer (or tapped, or focused)
 * opens to show the project that proves it; the others stay as a line with their name and tools.
 */
export function FullStackSection({ t }: { t: Pick<Content, 'nav' | 'fullstack' | 'code'> }) {
  return (
    <Section id="fullstack" tinted label={t.nav.fullstack} title={t.fullstack.title} intro={t.fullstack.intro}>
      <Reveal>
        <HoverExpand_001
          items={t.fullstack.layers}
          className="[&>*]:rounded-[1.75rem]"
          spine={(layer) => (
            <div className="bg-surface flex h-full items-center justify-between gap-6 px-6 lg:px-8">
              <span className="text-[1.15rem] font-semibold tracking-[-0.02em]">{layer.name}</span>
              <span className="text-muted hidden truncate text-[0.9rem] sm:block">{layer.tech.join(' · ')}</span>
            </div>
          )}
          body={(layer) => (
            // The four corners of the open layer: its name and its tools on one side, the proof and the code on
            // the other. One height on wide screens, where it opens on hover: the pile keeps its size under the pointer.
            <div className="dark-surface card grid gap-6 lg:min-h-[13rem] lg:grid-cols-2 lg:gap-14">
              <div className="flex flex-col justify-between gap-5">
                <h3 className="display text-[clamp(1.7rem,3.4vw,2.4rem)]">{layer.name}</h3>
                <Chips items={layer.tech} />
              </div>
              <div className="flex flex-col justify-between gap-5">
                <p className="text-[1.15rem] leading-snug tracking-[-0.015em]">{layer.proof}</p>
                <a href={layer.repo} className="text-accent w-fit text-[0.95rem] hover:underline">
                  {layer.project} · {t.code} ↗
                </a>
              </div>
            </div>
          )}
        />
      </Reveal>
    </Section>
  )
}
