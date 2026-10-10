import type { Content } from '@/content'

/** The right padding keeps the credit clear of the scroll indicator in the corner. */
export function Footer({ t }: { t: Pick<Content, 'footer' | 'credit'> }) {
  return (
    <footer className="label text-ash flex flex-wrap justify-between gap-3 border-t px-5 py-6 md:pr-24 md:pl-10">
      <span>{t.footer}</span>
      <span>
        {t.credit.replace('Skiper UI.', '')}
        <a href="https://skiper-ui.com" className="underline underline-offset-4">
          Skiper UI
        </a>
      </span>
    </footer>
  )
}
