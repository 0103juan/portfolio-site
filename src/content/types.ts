// Everything the site says, in both languages. The types make the two versions keep the same shape.
//
// Client work is described by sector on purpose: no client or employer names, no screenshots,
// no schemas and no internal figures. Keep it that way when editing.

export type Lang = 'es' | 'en'

export type Work = { sector: string; period: string; title: string; summary: string; points: string[]; stack: string[] }
export type Project = { name: string; kind: string; summary: string; proof: string; stack: string[]; repo?: string; demo?: string }

// One layer of a product, the tools I have used for it and the project that proves it.
export type Layer = { name: string; tech: string[]; proof: string; project: string; repo: string }

export type Content = {
  nav: { ai: string; work: string; fullstack: string; product: string; stack: string; contact: string }
  role: string
  pitch: string
  facts: { value: string; label: string }[]
  work: { title: string; intro: string; items: Work[] }
  fullstack: { title: string; intro: string; layers: Layer[] }
  product: {
    title: string
    intro: string
    parts: Project[]
    captions: { dashboard: string; warning: string; mobile: string }
  }
  ai: { title: string; intro: string; items: Project[] }
  // The script of the recorded demo: one real secop-mcp session. Change it only from a real run's output.
  demo: {
    label: string
    title: string
    note: string
    stats: string
    replay: string
    question: string
    steps: { tool: string; query: string; result: string; status: 'ok' | 'empty' | 'error' }[]
    answer: { intro: string; columns: string[]; rows: string[][]; warnings: string[] }
    findings: { title: string; items: string[] }
    more: { text: string; href: string }
  }
  personal: { title: string; items: Project[] }
  stack: { title: string; note: string; groups: { name: string; items: string[] }[] }
  contact: { title: string; text: string; email: string; github: string }
  where: string // city and languages, shown in the hero and next to the contact links
  live: string
  code: string
  status: string
  credit: string
  footer: string
}
