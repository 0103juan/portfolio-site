import { Chips } from '@/components/Chips'
import { SectionHead } from '@/components/SectionHead'
import type { Content } from '@/content'
import { pad } from '@/lib/format'

/** One row per layer of a product: what I have used for it and the project that proves it. */
export function FullStackSection({ t }: { t: Pick<Content, 'nav' | 'fullstack' | 'code'> }) {
  return (
    <section id="fullstack" className="border-t px-5 py-24 md:px-10 lg:py-32">
      <SectionHead id="fullstack" label={t.nav.fullstack} title={t.fullstack.title} intro={t.fullstack.intro} />
      <ol className="border-t">
        {t.fullstack.layers.map((layer, i) => (
          <li key={layer.name} className="hover:bg-coal grid gap-4 border-b py-6 transition-colors lg:grid-cols-12 lg:gap-6 lg:px-4">
            <div className="lg:col-span-4">
              <p className="label text-volt">{pad(i + 1)}</p>
              <h3 className="mt-2 text-2xl leading-none font-bold tracking-tight lg:text-3xl" style={{ fontStretch: '85%' }}>
                {layer.name}
              </h3>
            </div>
            <Chips items={layer.tech} className="content-start lg:col-span-3" />
            <div className="grid content-start gap-3 lg:col-span-5">
              <p className="text-ash">{layer.proof}</p>
              <a href={layer.repo} className="label text-volt w-fit underline decoration-2 underline-offset-4">
                {layer.project} · {t.code} ↗
              </a>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
