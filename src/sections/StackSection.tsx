import { SectionHead } from '@/components/SectionHead'
import type { Content } from '@/content'
import { pad } from '@/lib/format'

export function StackSection({ t }: { t: Pick<Content, 'nav' | 'stack'> }) {
  return (
    <section id="stack" className="border-t px-5 py-24 md:px-10 lg:py-32">
      <SectionHead id="stack" label={t.nav.stack} title={t.stack.title} intro={t.stack.note} />
      <div className="grid gap-px border bg-[var(--color-border)] md:grid-cols-3">
        {t.stack.groups.map((group, i) => (
          <div key={group.name} className="bg-background p-5 lg:p-8">
            <h3 className="label text-volt mb-6">
              {pad(i + 1)} · {group.name}
            </h3>
            <ul className="grid gap-1 text-xl font-semibold tracking-tight lg:text-2xl" style={{ fontStretch: '85%' }}>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
