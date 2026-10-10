import { Chips } from '@/components/Chips'
import { Reveal } from '@/components/motion/Reveal'
import { Section } from '@/components/Section'
import type { Content } from '@/content'

/** One row per group, its name beside its tools: a row is as tall as what it holds, however long the list. */
export function StackSection({ t }: { t: Pick<Content, 'nav' | 'stack'> }) {
  return (
    <Section id="stack" tinted label={t.nav.stack} title={t.stack.title} intro={t.stack.note}>
      <div className="grid gap-4">
        {t.stack.groups.map((group, i) => (
          <Reveal key={group.name} delay={i * 0.08} className="card grid gap-x-10 gap-y-4 md:grid-cols-12 md:items-center">
            <h3 className="title md:col-span-3">{group.name}</h3>
            <Chips items={group.items} large className="md:col-span-9" />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
