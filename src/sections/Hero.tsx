import { useScroll } from 'framer-motion'
import { useRef } from 'react'

import portrait from '@/assets/portrait.jpg'
import { LinePath } from '@/components/ui/skiper-ui/skiper19'
import { TextRoll } from '@/components/ui/skiper-ui/skiper58'
import { EMAIL, GITHUB, LINKEDIN, type Content } from '@/content'

export function Hero({ t }: { t: Pick<Content, 'role' | 'where' | 'pitch' | 'status' | 'contact'> }) {
  const hero = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] })

  return (
    <section ref={hero} className="relative flex min-h-svh flex-col overflow-clip px-5 pt-24 pb-8 md:px-10">
      <LinePath
        scrollYProgress={scrollYProgress}
        stroke="var(--color-volt)"
        className="pointer-events-none absolute top-6 -right-[30%] z-0 w-[90vw] lg:right-[9%] lg:w-[44vw] lg:max-w-[760px]"
      />
      <p className="label text-ash relative z-10">
        {t.role}
        <span className="mt-1.5 block xl:mt-0 xl:inline xl:before:mx-3 xl:before:content-['/']">{t.where}</span>
      </p>
      <h1 className="display relative z-10 mt-4 text-[clamp(4.2rem,min(22vw,24svh),17rem)]">
        Juan
        <br />
        Pablo
        <br />
        <span className="text-volt">Cuervo</span>
      </h1>

      <div className="relative z-10 mt-10 grid gap-8 lg:mt-auto lg:grid-cols-12 lg:items-end lg:pt-10">
        <p className="text-xl leading-snug lg:col-span-6 lg:text-2xl">{t.pitch}</p>
        <div className="label flex flex-wrap gap-3 lg:col-span-5 lg:col-start-8">
          <a href={`mailto:${EMAIL}`} className="bg-volt text-background px-4 py-3 font-bold" aria-label={t.contact.email}>
            <TextRoll>{`${t.contact.email} →`}</TextRoll>
          </a>
          <a href={GITHUB} className="border px-4 py-3" aria-label="GitHub">
            <TextRoll>GitHub ↗</TextRoll>
          </a>
          <a href={LINKEDIN} className="border px-4 py-3" aria-label="LinkedIn">
            <TextRoll>LinkedIn ↗</TextRoll>
          </a>
        </div>
      </div>

      <figure className="relative z-10 mt-10 w-44 lg:absolute lg:top-24 lg:right-10 lg:mt-0 lg:w-[19vw] lg:max-w-72">
        <img src={portrait} width={880} height={1100} alt="Juan Pablo Cuervo" className="border" />
        <figcaption className="label mt-2 flex items-center gap-2 text-[0.62rem]">
          <span className="bg-volt size-2 animate-pulse rounded-full" />
          {t.status}
        </figcaption>
      </figure>
    </section>
  )
}
