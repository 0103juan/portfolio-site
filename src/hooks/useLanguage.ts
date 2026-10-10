import { useEffect, useState } from 'react'

import { content, type Lang } from '@/content'

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

/** The page's language, its content, and what changing it touches: <html lang>, the title and the saved choice. */
export function useLanguage() {
  const [lang, setLang] = useState(initialLang)
  const t = content[lang]
  const other: Lang = lang === 'es' ? 'en' : 'es'

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = `Juan Pablo Cuervo · ${t.role}`
    try {
      localStorage.setItem('lang', lang)
    } catch {
      // not being able to remember the language is harmless
    }
  }, [lang, t.role])

  return { lang, other, t, toggle: () => setLang(other) }
}
