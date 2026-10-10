import { ProgressiveBlur } from '@/components/ui/skiper-ui/skiper41'
import { TextRoll } from '@/components/ui/skiper-ui/skiper58'
import type { Content, Lang } from '@/content'

import { SECTION_IDS } from './order'

type Props = { nav: Content['nav']; lang: Lang; other: Lang; onToggleLang: () => void }

export function Header({ nav, lang, other, onToggleLang }: Props) {
  return (
    <>
      <ProgressiveBlur position="top" height="110px" blurAmount="6px" backgroundColor="#0a0a0a" className="fixed z-30" />
      <header className="fixed inset-x-0 top-0 z-40 flex items-center gap-6 px-5 py-4 md:px-10">
        <a href="#top" className="label font-bold">
          JPC<span className="text-volt">.</span>
        </a>
        <nav className="label ml-auto hidden gap-6 lg:flex">
          {SECTION_IDS.map((id) => (
            <a key={id} href={`#${id}`} aria-label={nav[id]}>
              <TextRoll>{nav[id]}</TextRoll>
            </a>
          ))}
        </nav>
        <button
          type="button"
          onClick={onToggleLang}
          lang={other}
          aria-label={other === 'en' ? 'Read this page in English' : 'Leer esta página en español'}
          className="label hover:bg-volt hover:text-background ml-auto cursor-pointer border px-3 py-1.5 transition-colors lg:ml-0"
        >
          {lang.toUpperCase()} → {other.toUpperCase()}
        </button>
      </header>
    </>
  )
}
