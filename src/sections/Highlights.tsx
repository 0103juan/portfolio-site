import type { Content } from '@/content'

/** Under the hero: what I work with as a moving strip, then three facts. */
export function Highlights({ t }: { t: Pick<Content, 'stack' | 'facts'> }) {
  const stackItems = t.stack.groups.flatMap((group) => group.items)

  return (
    <>
      <div className="label overflow-hidden border-y py-4" aria-hidden>
        <div className="animate-marquee flex w-max gap-10 pr-10">
          {[...stackItems, ...stackItems].map((item, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap">
              {item} <span className="text-volt">✳</span>
            </span>
          ))}
        </div>
      </div>

      <dl className="grid border-b md:grid-cols-3">
        {t.facts.map((fact) => (
          <div key={fact.label} className="border-b px-5 py-8 last:border-b-0 md:border-r md:border-b-0 md:px-10 md:last:border-r-0">
            <dt className="display text-6xl lg:text-7xl">{fact.value}</dt>
            <dd className="text-ash mt-3 max-w-[32ch]">{fact.label}</dd>
          </div>
        ))}
      </dl>
    </>
  )
}
