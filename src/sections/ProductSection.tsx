import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

import { ProjectBody } from '@/components/ProjectBody'
import { ProjectLinks, type LinkLabels } from '@/components/ProjectLinks'
import { SectionHead } from '@/components/SectionHead'
import { ScrollAssemble } from '@/components/ui/skiper-ui/skiper31'
import type { Content } from '@/content'
import { shot } from '@/lib/format'

/** The screenshots start slightly small and grow to full size as they reach the middle of the screen. */
function Zoom({ children, className }: { children: ReactNode; className?: string }) {
  const frame = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: frame, offset: ['start end', 'center center'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1])

  return (
    <motion.div ref={frame} className={className} style={reducedMotion ? undefined : { scale }}>
      {children}
    </motion.div>
  )
}

function PersonalProjects({ personal, labels }: { personal: Content['personal']; labels: LinkLabels }) {
  return (
    <>
      <h3 className="text-muted mt-24 mb-4 text-[0.95rem] font-semibold">{personal.title}</h3>
      <ul className="border-t">
        {personal.items.map((item) => (
          <li key={item.name} className="grid gap-3 border-b py-7 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <h4 className="text-[1.4rem] leading-[1.12] font-semibold tracking-[-0.022em]">{item.name}</h4>
              <p className="eyebrow mt-2">{item.kind}</p>
            </div>
            <p className="text-muted lg:col-span-5">{item.summary}</p>
            <div className="grid content-start gap-3 lg:col-span-3">
              <p className="text-[0.9rem] leading-snug font-medium">{item.proof}</p>
              <ProjectLinks project={item} labels={labels} />
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

const SCREEN = 'w-full rounded-[20px] border shadow-[0_30px_70px_rgba(0,0,0,0.16)]'

export function ProductSection({ t }: { t: Pick<Content, 'nav' | 'product' | 'personal' | 'live' | 'code'> }) {
  const { captions } = t.product

  return (
    <section id="product" className="overflow-x-clip border-t">
      <div className="wrap py-24 lg:py-32">
        <SectionHead label={t.nav.product} intro={t.product.intro}>
          <ScrollAssemble text={t.product.title} className="display text-[clamp(2.1rem,5.4vw,3.6rem)]" />
        </SectionHead>

        <Zoom className="grid items-end gap-6 lg:grid-cols-12">
          <figure className="lg:col-span-9">
            <img src={shot('dashboard')} width={1920} height={1350} alt={captions.dashboard} className={SCREEN} />
            <figcaption className="text-muted mt-4 text-[0.9rem]">{captions.dashboard}</figcaption>
          </figure>
          <figure className="max-w-56 lg:col-span-3 lg:max-w-none">
            <img src={shot('mobile')} width={780} height={1688} alt={captions.mobile} loading="lazy" className={SCREEN} />
            <figcaption className="text-muted mt-4 text-[0.9rem]">{captions.mobile}</figcaption>
          </figure>
        </Zoom>

        <figure className="mt-16 grid items-center gap-8 lg:grid-cols-12">
          <figcaption className="text-[1.25rem] leading-snug font-medium tracking-[-0.018em] lg:col-span-4 lg:text-[1.45rem]">
            {captions.warning}
          </figcaption>
          <img src={shot('warning')} width={1920} height={960} alt="" loading="lazy" className={`${SCREEN} lg:col-span-8`} />
        </figure>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {t.product.parts.map((part) => (
            <article key={part.name} className="bg-surface rounded-[28px]">
              <ProjectBody project={part} labels={t} />
            </article>
          ))}
        </div>

        <PersonalProjects personal={t.personal} labels={t} />
      </div>
    </section>
  )
}
