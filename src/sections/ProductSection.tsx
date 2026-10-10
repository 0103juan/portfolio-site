import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

import { Reveal } from '@/components/motion/Reveal'
import { ProjectCard } from '@/components/ProjectCard'
import type { LinkLabels } from '@/components/ProjectLinks'
import { Section } from '@/components/Section'
import type { Content, Project } from '@/content'
import { shot } from '@/lib/format'
import { cn } from '@/lib/utils'

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

/**
 * Projects two to a row, arriving one after another, each pair sharing its three lines. An odd one out
 * takes the whole last row, laid out across it, instead of leaving half of that row empty.
 */
function ProjectGrid({ items, labels, className }: { items: Project[]; labels: LinkLabels; className?: string }) {
  return (
    <div className={cn('grid gap-4 md:grid-cols-2', className)}>
      {items.map((item, i) => {
        const alone = items.length % 2 === 1 && i === items.length - 1
        return (
          <Reveal key={item.name} delay={(i % 2) * 0.08} className={alone ? 'md:col-span-2' : 'row-span-3 grid grid-rows-subgrid'}>
            <ProjectCard project={item} labels={labels} wide={alone} />
          </Reveal>
        )
      })}
    </div>
  )
}

const SCREEN = 'screen w-full border'

export function ProductSection({ t }: { t: Pick<Content, 'nav' | 'product' | 'personal' | 'live' | 'code'> }) {
  const { captions } = t.product

  return (
    <Section id="product" label={t.nav.product} title={t.product.title} intro={t.product.intro}>
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

      <Reveal>
        <figure className="mt-14 grid items-center gap-8 lg:grid-cols-12">
          <figcaption className="title text-balance lg:col-span-4">{captions.warning}</figcaption>
          <img src={shot('warning')} width={1920} height={960} alt="" loading="lazy" className={`${SCREEN} lg:col-span-8`} />
        </figure>
      </Reveal>

      <ProjectGrid items={t.product.parts} labels={t} className="mt-14" />

      <h3 className="title mt-16 mb-6">{t.personal.title}</h3>
      <ProjectGrid items={t.personal.items} labels={t} />
    </Section>
  )
}
