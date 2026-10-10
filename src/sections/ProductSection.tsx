import { ProjectBody } from '@/components/ProjectBody'
import { ProjectLinks, type LinkLabels } from '@/components/ProjectLinks'
import { SectionHead } from '@/components/SectionHead'
import { ScrollAssemble } from '@/components/ui/skiper-ui/skiper31'
import type { Content } from '@/content'
import { shot } from '@/lib/format'

function PersonalProjects({ personal, labels }: { personal: Content['personal']; labels: LinkLabels }) {
  return (
    <>
      <h3 className="label text-ash mt-20 mb-4">{personal.title}</h3>
      <ul className="border-t">
        {personal.items.map((item) => (
          <li key={item.name} className="hover:bg-coal grid gap-3 border-b py-6 transition-colors lg:grid-cols-12 lg:gap-6 lg:px-4">
            <div className="lg:col-span-4">
              <h4 className="text-2xl leading-none font-bold tracking-tight" style={{ fontStretch: '85%' }}>
                {item.name}
              </h4>
              <p className="label text-volt mt-2">{item.kind}</p>
            </div>
            <p className="text-ash lg:col-span-5">{item.summary}</p>
            <div className="grid content-start gap-3 lg:col-span-3">
              <p className="font-mono text-[0.8rem]">{item.proof}</p>
              <ProjectLinks project={item} labels={labels} className="text-volt" />
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export function ProductSection({ t }: { t: Pick<Content, 'nav' | 'product' | 'personal' | 'live' | 'code'> }) {
  const { captions } = t.product

  return (
    <section id="product" className="overflow-x-clip border-t px-5 py-24 md:px-10 lg:py-32">
      <SectionHead id="product" label={t.nav.product} intro={t.product.intro}>
        <ScrollAssemble text={t.product.title} className="display text-volt text-[clamp(2.8rem,8vw,7.5rem)]" />
      </SectionHead>

      <div className="grid items-end gap-6 lg:grid-cols-12">
        <figure className="lg:col-span-9">
          <img src={shot('dashboard')} width={1920} height={1350} alt={captions.dashboard} className="w-full border" />
          <figcaption className="label text-ash mt-3 normal-case tracking-normal">{captions.dashboard}</figcaption>
        </figure>
        <figure className="max-w-56 lg:col-span-3 lg:max-w-none">
          <img src={shot('mobile')} width={780} height={1688} alt={captions.mobile} loading="lazy" className="w-full border" />
          <figcaption className="label text-ash mt-3 normal-case tracking-normal">{captions.mobile}</figcaption>
        </figure>
      </div>

      <figure className="mt-10 grid gap-6 border-t pt-10 lg:grid-cols-12">
        <figcaption className="text-xl leading-snug lg:col-span-4 lg:text-2xl">{captions.warning}</figcaption>
        <img src={shot('warning')} width={1920} height={960} alt="" loading="lazy" className="w-full border lg:col-span-8" />
      </figure>

      <div className="mt-10 grid gap-px border bg-[var(--color-border)] md:grid-cols-2">
        {t.product.parts.map((part) => (
          <article key={part.name} className="bg-background hover:bg-coal transition-colors">
            <ProjectBody project={part} labels={t} className="[&_a]:text-volt" />
          </article>
        ))}
      </div>

      <PersonalProjects personal={t.personal} labels={t} />
    </section>
  )
}
