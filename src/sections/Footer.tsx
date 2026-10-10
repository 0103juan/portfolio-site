import type { Content } from '@/content'

export function Footer({ t }: { t: Pick<Content, 'footer' | 'credit'> }) {
  return (
    <footer className="tinted">
      <div className="wrap text-muted flex flex-wrap justify-between gap-3 py-6 text-[0.8rem]">
        <span>{t.footer}</span>
        <span>
          {t.credit.replace('Skiper UI.', '')}
          <a href="https://skiper-ui.com" className="underline underline-offset-4">
            Skiper UI
          </a>
        </span>
      </div>
    </footer>
  )
}
