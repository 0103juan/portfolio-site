import { Reveal } from '@/components/motion/Reveal'
import { SectionHead } from '@/components/SectionHead'
import type { Content } from '@/content'

export function StackSection({ t }: { t: Pick<Content, 'nav' | 'stack'> }) {
  return (
    <section id="stack" className="border-t">
      <div className="wrap py-24 lg:py-32">
        <SectionHead label={t.nav.stack} title={t.stack.title} intro={t.stack.note} />
        <div className="grid gap-4 md:grid-cols-3">
          {t.stack.groups.map((group, i) => (
            <Reveal key={group.name} delay={i * 0.08} className="bg-surface rounded-[28px] p-6 lg:p-8">
              <h3 className="eyebrow mb-5">{group.name}</h3>
              <ul className="grid gap-1.5 text-[1.15rem] leading-snug font-semibold tracking-[-0.02em]">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
