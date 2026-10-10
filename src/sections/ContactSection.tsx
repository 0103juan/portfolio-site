import { SectionHead } from '@/components/SectionHead'
import { TextRoll } from '@/components/ui/skiper-ui/skiper58'
import { EMAIL, GITHUB, LINKEDIN, type Content } from '@/content'

export function ContactSection({ t }: { t: Pick<Content, 'nav' | 'contact' | 'where'> }) {
  return (
    <section id="contact" className="border-t px-5 pt-24 pb-16 md:px-10 lg:pt-32">
      <SectionHead id="contact" label={t.nav.contact}>
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
        <a href={LINKEDIN} className="underline decoration-2 underline-offset-4">
          LinkedIn ↗
        </a>
        <span className="text-ash">{t.where}</span>
      </div>
    </section>
  )
}
