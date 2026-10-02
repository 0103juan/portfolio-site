import { useReducedMotion, useScroll } from 'framer-motion'
import { ReactLenis } from 'lenis/react'
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'

import portrait from '@/assets/portrait.jpg'
import { StickyCard_001 } from '@/components/ui/skiper-ui/skiper16'
import { LinePath } from '@/components/ui/skiper-ui/skiper19'
import { ScrollAssemble } from '@/components/ui/skiper-ui/skiper31'
import { ProgressiveBlur } from '@/components/ui/skiper-ui/skiper41'
import { HoverExpand_001 } from '@/components/ui/skiper-ui/skiper52'
import { TextRoll } from '@/components/ui/skiper-ui/skiper58'
import { ScrollProgress } from '@/components/ui/skiper-ui/skiper89'
import { cn } from '@/lib/utils'

import { content, EMAIL, GITHUB, type Content, type Lang } from './content'

type Project = Content['ai']['items'][number]

const isLang = (value: string | null): value is Lang => value === 'es' || value === 'en'

/** ?lang= in the URL wins (so a link can be sent in one language), then the last choice, then the browser. */
function initialLang(): Lang {
  const asked = new URLSearchParams(location.search).get('lang')
  if (isLang(asked)) return asked
  try {
    const saved = localStorage.getItem('lang')
    if (isLang(saved)) return saved
  } catch {
    // storage can be blocked; the browser language is a fine fallback
  }
  return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en'
}

function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const media = matchMedia(query)
      media.addEventListener('change', onChange)
      return () => media.removeEventListener('change', onChange)
    },
    () => matchMedia(query).matches,
  )
}

const shot = (name: string) => `${import.meta.env.BASE_URL}shots/${name}.png`
const pad = (n: number) => String(n).padStart(2, '0')

function Chips({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn('flex flex-wrap gap-1.5', className)}>
      {items.map((item) => (
        <li key={item} className="label border px-2 py-1 text-[0.65rem] tracking-wider">
          {item}
        </li>
      ))}
    </ul>
  )
}

function SectionHead({ n, label, children }: { n: number; label: string; children: ReactNode }) {
  return (
    <header className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-12">
      <p className="label text-ash lg:col-span-3">
        <span className="text-volt">[ {pad(n)} ]</span> {label}
      </p>
      <div className="lg:col-span-9">{children}</div>
    </header>
  )
}

function ProjectLinks({ project, t, className }: { project: Project; t: Content; className?: string }) {
  if (!project.repo && !project.demo) return null
  return (
    <p className={cn('label flex gap-5', className)}>
      {project.demo && (
        <a href={project.demo} className="underline decoration-2 underline-offset-4">
          {t.live} ↗
        </a>
      )}
      {project.repo && (
        <a href={project.repo} className="underline decoration-2 underline-offset-4">
          {t.code} ↗
        </a>
      )}
    </p>
  )
}

/** The client work as a deck: every card sticks a little lower than the last and the pile builds up. */
function WorkDeck({ t, enabled }: { t: Content; enabled: boolean }) {
  const deck = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: deck, offset: ['start start', 'end end'] })
  const items = t.work.items

  return (
    <div ref={deck} className={cn('grid gap-4', enabled && 'pb-[30vh]')}>
      {items.map((item, i) => (
        <StickyCard_001 key={item.title} i={i} total={items.length} progress={scrollYProgress} enabled={enabled}>
          <article className="bg-coal grid border lg:grid-cols-12">
            <p className="label flex justify-between gap-4 border-b px-5 py-3 lg:col-span-12">
              <span className="text-volt">
                {pad(i + 1)} · {item.sector}
              </span>
              <span className="text-ash whitespace-nowrap">{item.period}</span>
            </p>
            <div className="p-5 lg:col-span-5 lg:p-8">
              <h3 className="text-2xl leading-[1.05] font-bold tracking-tight lg:text-4xl" style={{ fontStretch: '85%' }}>
                {item.title}
              </h3>
              <p className="text-ash mt-4">{item.summary}</p>
            </div>
            <div className="flex flex-col gap-6 border-t p-5 lg:col-span-7 lg:border-t-0 lg:border-l lg:p-8">
              <ul className="grid gap-3">
                {item.points.map((point) => (
                  <li key={point} className="grid grid-cols-[auto_1fr] gap-3 text-[0.95rem]">
                    <span className="text-volt font-mono">→</span>
                    {point}
                  </li>
                ))}
              </ul>
              <Chips items={item.stack} className="text-ash mt-auto" />
            </div>
          </article>
        </StickyCard_001>
      ))}
    </div>
  )
}

function ProjectBody({ project, t, className }: { project: Project; t: Content; className?: string }) {
  return (
    <div className={cn('flex h-full flex-col gap-4 p-5 lg:p-7', className)}>
      <p className="label opacity-70">{project.kind}</p>
      <h3 className="text-2xl leading-none font-bold tracking-tight lg:text-3xl" style={{ fontStretch: '85%' }}>
        {project.name}
      </h3>
      <p className="max-w-[58ch]">{project.summary}</p>
      <p className="max-w-[58ch] border-l-2 border-current pl-3 font-mono text-[0.8rem] leading-relaxed">{project.proof}</p>
      <div className="mt-auto grid gap-4">
        <ProjectLinks project={project} t={t} />
        <Chips items={project.stack} className="opacity-80 [&_li]:border-current/30" />
      </div>
    </div>
  )
}

export default function App() {
  const [lang, setLang] = useState(initialLang)
  const t = content[lang]
  const other: Lang = lang === 'es' ? 'en' : 'es'

  const reducedMotion = useReducedMotion()
  const wide = useMediaQuery('(min-width: 1024px) and (min-height: 640px)')
  const hero = useRef<HTMLElement>(null)
  const { scrollYProgress: heroProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] })

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = `Juan Pablo Cuervo · ${t.role}`
    try {
      localStorage.setItem('lang', lang)
    } catch {
      // not being able to remember the language is harmless
    }
  }, [lang, t.role])

  const sections = [
    ['work', t.nav.work],
    ['product', t.nav.product],
    ['ai', t.nav.ai],
    ['stack', t.nav.stack],
    ['contact', t.nav.contact],
  ] as const
  const stackItems = t.stack.groups.flatMap((group) => group.items)

  const page = (
    <>
      <ProgressiveBlur position="top" height="110px" blurAmount="6px" backgroundColor="#0a0a0a" className="fixed z-30" />
      <header className="fixed inset-x-0 top-0 z-40 flex items-center gap-6 px-5 py-4 md:px-10">
        <a href="#top" className="label font-bold">
          JPC<span className="text-volt">.</span>
        </a>
        <nav className="label ml-auto hidden gap-6 sm:flex">
          {sections.map(([id, name]) => (
            <a key={id} href={`#${id}`} aria-label={name}>
              <TextRoll>{name}</TextRoll>
            </a>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setLang(other)}
          lang={other}
          aria-label={other === 'en' ? 'Read this page in English' : 'Leer esta página en español'}
          className="label hover:bg-volt hover:text-background ml-auto cursor-pointer border px-3 py-1.5 transition-colors sm:ml-0"
        >
          {lang.toUpperCase()} → {other.toUpperCase()}
        </button>
      </header>
      {!reducedMotion && <ScrollProgress className="text-volt hidden md:block" />}

      <main id="top" className="relative overflow-x-clip">
        {/* Hero */}
        <section ref={hero} className="relative flex min-h-svh flex-col overflow-clip px-5 pt-24 pb-8 md:px-10">
          <LinePath
            scrollYProgress={heroProgress}
            stroke="var(--color-volt)"
            className="pointer-events-none absolute top-6 -right-[30%] z-0 w-[90vw] lg:right-[9%] lg:w-[44vw] lg:max-w-[760px]"
          />
          <p className="label text-ash relative z-10">{t.role}</p>
          <h1 className="display relative z-10 mt-4 text-[clamp(4.2rem,min(22vw,24svh),17rem)]">
            Juan
            <br />
            Pablo
            <br />
            <span className="text-volt">Cuervo</span>
          </h1>

          <div className="relative z-10 mt-10 grid gap-8 lg:mt-auto lg:grid-cols-12 lg:items-end lg:pt-10">
            <p className="text-xl leading-snug lg:col-span-6 lg:text-2xl">{t.pitch}</p>
            <div className="label flex flex-wrap gap-3 lg:col-span-3 lg:col-start-8 lg:flex-col lg:items-start">
              <a href={`mailto:${EMAIL}`} className="bg-volt text-background px-4 py-3 font-bold" aria-label={t.contact.email}>
                <TextRoll>{`${t.contact.email} →`}</TextRoll>
              </a>
              <a href={GITHUB} className="border px-4 py-3" aria-label="GitHub">
                <TextRoll>GitHub ↗</TextRoll>
              </a>
            </div>
          </div>

          <figure className="relative z-10 mt-10 w-44 lg:absolute lg:top-24 lg:right-10 lg:mt-0 lg:w-[19vw] lg:max-w-72">
            <img
              src={portrait}
              width={880}
              height={1100}
              alt="Juan Pablo Cuervo"
              className="border grayscale contrast-110 transition duration-500 hover:grayscale-0"
            />
            <figcaption className="label mt-2 flex items-center gap-2 text-[0.62rem]">
              <span className="bg-volt size-2 animate-pulse rounded-full" />
              {t.status}
            </figcaption>
          </figure>
        </section>

        {/* What I work with, as a moving strip */}
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

        {/* Client work */}
        <section id="work" className="px-5 py-24 md:px-10 lg:py-32">
          <SectionHead n={1} label={t.nav.work}>
            <h2 className="display text-[clamp(2.8rem,8vw,7.5rem)]">{t.work.title}</h2>
            <p className="text-ash mt-6 max-w-[62ch] text-lg">{t.work.intro}</p>
          </SectionHead>
          <WorkDeck t={t} enabled={wide && !reducedMotion} />
        </section>

        {/* The product */}
        <section id="product" className="overflow-x-clip border-t px-5 py-24 md:px-10 lg:py-32">
          <SectionHead n={2} label={t.nav.product}>
            <ScrollAssemble text={t.product.title} className="display text-volt text-[clamp(2.8rem,8vw,7.5rem)]" />
            <p className="text-ash mt-6 max-w-[62ch] text-lg">{t.product.intro}</p>
          </SectionHead>

          <div className="grid items-end gap-6 lg:grid-cols-12">
            <figure className="lg:col-span-9">
              <img src={shot('dashboard')} width={1920} height={1350} alt={t.product.captions.dashboard} className="w-full border" />
              <figcaption className="label text-ash mt-3 normal-case tracking-normal">{t.product.captions.dashboard}</figcaption>
            </figure>
            <figure className="max-w-56 lg:col-span-3 lg:max-w-none">
              <img src={shot('mobile')} width={780} height={1688} alt={t.product.captions.mobile} loading="lazy" className="w-full border" />
              <figcaption className="label text-ash mt-3 normal-case tracking-normal">{t.product.captions.mobile}</figcaption>
            </figure>
          </div>

          <figure className="mt-10 grid gap-6 border-t pt-10 lg:grid-cols-12">
            <figcaption className="text-xl leading-snug lg:col-span-4 lg:text-2xl">{t.product.captions.warning}</figcaption>
            <img src={shot('warning')} width={1920} height={960} alt="" loading="lazy" className="w-full border lg:col-span-8" />
          </figure>

          <div className="mt-10 grid gap-px border bg-[var(--color-border)] md:grid-cols-2">
            {t.product.parts.map((part) => (
              <article key={part.name} className="bg-background hover:bg-coal transition-colors">
                <ProjectBody project={part} t={t} className="[&_a]:text-volt" />
              </article>
            ))}
          </div>
        </section>

        {/* AI projects */}
        <section id="ai" className="border-t px-5 py-24 md:px-10 lg:py-32">
          <SectionHead n={3} label={t.nav.ai}>
            <h2 className="display text-[clamp(2.8rem,8vw,7.5rem)]">{t.ai.title}</h2>
            <p className="text-ash mt-6 max-w-[62ch] text-lg">{t.ai.intro}</p>
          </SectionHead>

          {wide ? (
            <HoverExpand_001
              items={t.ai.items}
              className="h-[30rem]"
              spine={(item, i, active) => (
                <div className={cn('bg-coal flex h-full flex-col items-center justify-between border py-5', active && 'opacity-0')}>
                  <span className="label text-volt">{pad(i + 1)}</span>
                  <span className="display text-2xl whitespace-nowrap [writing-mode:vertical-rl] rotate-180">{item.name}</span>
                </div>
              )}
              body={(item) => <ProjectBody project={item} t={t} className="bg-volt text-background" />}
            />
          ) : (
            <div className="grid gap-px border bg-[var(--color-border)]">
              {t.ai.items.map((item) => (
                <article key={item.name} className="bg-background">
                  <ProjectBody project={item} t={t} className="[&_a]:text-volt" />
                </article>
              ))}
            </div>
          )}

          <h3 className="label text-ash mt-20 mb-4">{t.personal.title}</h3>
          <ul className="border-t">
            {t.personal.items.map((item) => (
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
                  <ProjectLinks project={item} t={t} className="text-volt" />
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Stack */}
        <section id="stack" className="border-t px-5 py-24 md:px-10 lg:py-32">
          <SectionHead n={4} label={t.nav.stack}>
            <h2 className="display text-[clamp(2.8rem,8vw,7.5rem)]">{t.stack.title}</h2>
            <p className="text-ash mt-6 max-w-[62ch] text-lg">{t.stack.note}</p>
          </SectionHead>
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

        {/* Contact */}
        <section id="contact" className="border-t px-5 pt-24 pb-16 md:px-10 lg:pt-32">
          <SectionHead n={5} label={t.nav.contact}>
            <p className="max-w-[40ch] text-2xl leading-snug lg:text-3xl">{t.contact.text}</p>
          </SectionHead>
          <div className="display grid gap-4 text-[clamp(3rem,13vw,13rem)]">
            <a href={`mailto:${EMAIL}`} className="hover:text-volt w-fit transition-colors" aria-label={`${t.contact.title}: ${EMAIL}`}>
              <TextRoll className="leading-[0.95]">{t.contact.title}</TextRoll>
            </a>
          </div>
          <div className="label mt-10 flex flex-wrap gap-x-10 gap-y-3">
            <a href={`mailto:${EMAIL}`} className="underline decoration-2 underline-offset-4">
              {EMAIL}
            </a>
            <a href={GITHUB} className="underline decoration-2 underline-offset-4">
              github.com/0103juan ↗
            </a>
          </div>
        </section>
      </main>

      {/* The right padding keeps the credit clear of the scroll indicator in the corner. */}
      <footer className="label text-ash flex flex-wrap justify-between gap-3 border-t px-5 py-6 md:pr-24 md:pl-10">
        <span>{t.footer}</span>
        <span>
          {t.credit.replace('Skiper UI.', '')}
          <a href="https://skiper-ui.com" className="underline underline-offset-4">
            Skiper UI
          </a>
        </span>
      </footer>
    </>
  )

  // Smooth scrolling is motion too: people who ask for less of it get the browser's own scrolling.
  return reducedMotion ? page : <ReactLenis root>{page}</ReactLenis>
}
