import { useReducedMotion } from 'framer-motion'
import { ReactLenis } from 'lenis/react'

import { ScrollProgress } from '@/components/ui/skiper-ui/skiper89'
import { useLanguage } from '@/hooks/useLanguage'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { AiSection } from '@/sections/AiSection'
import { ContactSection } from '@/sections/ContactSection'
import { Footer } from '@/sections/Footer'
import { Header } from '@/sections/Header'
import { Hero } from '@/sections/Hero'
import { Highlights } from '@/sections/Highlights'
import { ProductSection } from '@/sections/ProductSection'
import { StackSection } from '@/sections/StackSection'
import { WorkSection } from '@/sections/WorkSection'

/** The page: which sections there are and in what order. What each one shows lives in src/sections. */
export default function App() {
  const { lang, other, t, toggle } = useLanguage()
  const reducedMotion = useReducedMotion()
  const wide = useMediaQuery('(min-width: 1024px) and (min-height: 640px)')

  const page = (
    <>
      <Header nav={t.nav} lang={lang} other={other} onToggleLang={toggle} />
      {!reducedMotion && <ScrollProgress className="text-volt hidden md:block" />}

      <main id="top" className="relative overflow-x-clip">
        <Hero t={t} />
        <Highlights t={t} />
        <AiSection t={t} wide={wide} />
        <WorkSection t={t} stacked={wide && !reducedMotion} />
        <ProductSection t={t} />
        <StackSection t={t} />
        <ContactSection t={t} />
      </main>

      <Footer t={t} />
    </>
  )

  // Smooth scrolling is motion too: people who ask for less of it get the browser's own scrolling.
  return reducedMotion ? page : <ReactLenis root>{page}</ReactLenis>
}
