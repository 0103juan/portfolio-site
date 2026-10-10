import NumberFlow from '@number-flow/react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Fragment, useRef } from 'react'

import portrait from '@/assets/portrait.jpg'
import { Tilt } from '@/components/motion/Tilt'
import { EMAIL, GITHUB, LINKEDIN, type Content } from '@/content'
import { SPRING } from '@/lib/motion'
import { cn } from '@/lib/utils'

/** Words that sharpen into place one after another when the page opens. `from` continues the count of an earlier run. */
function Words({ text, from = 0, className }: { text: string; from?: number; className?: string }) {
  const reducedMotion = useReducedMotion()
  return text.split(' ').map((word, i) => (
    <Fragment key={i}>
      <motion.span
        className={cn('inline-block', className)}
        initial={reducedMotion ? false : { opacity: 0, y: '0.35em', filter: 'blur(12px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ ...SPRING, duration: 0.9, delay: 0.06 * (from + i) }}
      >
        {word}
      </motion.span>{' '}
    </Fragment>
  ))
}

/** A figure that counts up from zero the first time it is seen. */
function Fact({ fact }: { fact: Content['facts'][number] }) {
  const tile = useRef<HTMLDivElement>(null)
  const seen = useInView(tile, { once: true, amount: 0.6 })

  return (
    <div ref={tile} className="card grid content-start gap-2">
      <dt className="text-[clamp(2.2rem,4.4vw,3rem)] leading-none font-bold tracking-[-0.04em] whitespace-nowrap tabular-nums">
        <NumberFlow value={seen ? fact.value : 0} suffix={fact.unit && ` ${fact.unit}`} />
      </dt>
      <dd className="text-muted text-[0.95rem] leading-snug">{fact.label}</dd>
    </div>
  )
}

type Props = { t: Pick<Content, 'role' | 'where' | 'headline' | 'pitch' | 'status' | 'contact' | 'facts'> }

export function Hero({ t }: Props) {
  const leadWords = t.headline.lead.split(' ').length

  // The first screen is the whole introduction: who, the photo beside it and the three figures under both.
  return (
    <section>
      <div className="wrap grid gap-10 pt-28 pb-16 lg:pt-32 lg:pb-20">
        <div className="grid items-center gap-x-10 gap-y-10 md:grid-cols-[minmax(0,1fr)_240px] lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-x-14">
          <div className="grid justify-items-start gap-5">
            <p className="eyebrow">
              {t.role} <span className="text-muted font-normal">· {t.where}</span>
            </p>
            <h1 className="display text-[clamp(2.5rem,5.6vw,4.5rem)]">
              <Words text={t.headline.lead} />
              {/* One block, so the phrase moves to the next line whole when it fits there. */}
              <span className="text-accent inline-block">
                <Words text={t.headline.key} from={leadWords} />
              </span>
            </h1>
            <p className="sub">{t.pitch}</p>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-3 pt-2">
              <a href={`mailto:${EMAIL}`} className="press bg-accent text-on-accent rounded-full px-6 py-3 font-medium">
                {t.contact.email}
              </a>
              <a href={GITHUB} className="text-accent hover:underline">
                GitHub ↗
              </a>
              <a href={LINKEDIN} className="text-accent hover:underline">
                LinkedIn ↗
              </a>
            </div>
          </div>

          <Tilt className="w-full max-w-[320px]">
            <figure className="relative">
              <img
                src={portrait}
                width={880}
                height={1100}
                alt="Juan Pablo Cuervo"
                className="aspect-[4/5] w-full rounded-[28px] object-cover shadow-[0_24px_60px_rgba(0,0,0,0.16)]"
              />
              <figcaption className="bg-background/70 absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-full border border-white/60 px-4 py-2 text-[0.8rem] font-medium backdrop-blur-xl">
                <span className="size-2 shrink-0 rounded-full bg-[#30d158]" />
                {t.status}
              </figcaption>
            </figure>
          </Tilt>
        </div>

        <dl className="grid gap-4 md:grid-cols-3">
          {t.facts.map((fact) => (
            <Fact key={fact.label} fact={fact} />
          ))}
        </dl>
      </div>
    </section>
  )
}
