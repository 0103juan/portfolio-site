import { motion } from 'framer-motion'

import { ProgressiveBlur } from '@/components/ui/skiper-ui/skiper41'
import type { Content, Lang } from '@/content'
import { useActiveSection } from '@/hooks/useActiveSection'
import { SPRING } from '@/lib/motion'

import { SECTION_IDS } from './order'

type Props = { nav: Content['nav']; lang: Lang; other: Lang; onToggleLang: () => void }

/** The bar floats on a blurred edge instead of a line: the page scrolls under it and fades away. */
export function Header({ nav, lang, other, onToggleLang }: Props) {
  const active = useActiveSection(SECTION_IDS)

  return (
    <>
      <ProgressiveBlur position="top" height="104px" blurAmount="10px" backgroundColor="var(--color-background)" className="header-edge fixed z-30" />
      <header className="fixed inset-x-0 top-0 z-40">
        <div className="wrap flex h-14 items-center gap-4 text-[0.82rem]">
          <a href="#top" className="text-[0.98rem] font-semibold tracking-[-0.02em]">
            Juan Pablo Cuervo
          </a>
          <nav className="ml-auto hidden items-center lg:flex">
            {SECTION_IDS.map((id) => (
              <a key={id} href={`#${id}`} aria-current={active === id ? 'true' : undefined} className="press relative rounded-full px-3 py-1.5">
                {/* One pill for the whole bar: it slides to the section being read. */}
                {active === id && <motion.span layoutId="nav-pill" transition={SPRING} className="bg-surface absolute inset-0 rounded-full" />}
                {/* Above the pill of any link: while it slides it passes under the names, not over them. */}
                <span className="relative z-10">{nav[id]}</span>
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={onToggleLang}
            lang={other}
            aria-label={other === 'en' ? 'Read this page in English' : 'Leer esta página en español'}
            className="press bg-surface ml-auto cursor-pointer rounded-full px-3 py-1.5 font-medium lg:ml-2"
          >
            {lang.toUpperCase()} → {other.toUpperCase()}
          </button>
        </div>
      </header>
    </>
  )
}
