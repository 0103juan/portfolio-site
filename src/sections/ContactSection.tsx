import { Section } from '@/components/Section'
import { TextRoll } from '@/components/ui/skiper-ui/skiper58'
import { EMAIL, GITHUB, LINKEDIN, type Content } from '@/content'

export function ContactSection({ t }: { t: Pick<Content, 'nav' | 'contact' | 'where'> }) {
  return (
    <Section
      id="contact"
      label={t.nav.contact}
      title={
        <a href={`mailto:${EMAIL}`} className="display hover:text-accent w-fit text-[clamp(3.4rem,13vw,10rem)] transition-colors" aria-label={`${t.contact.title}: ${EMAIL}`}>
          {/* The roll clips to its box, and tight tracking pulls the last letter's edge past it: leave it room. */}
          <TextRoll className="pr-[0.06em] leading-[1.15]">{t.contact.title}</TextRoll>
        </a>
      }
      intro={t.contact.text}
    >
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[0.95rem]">
        <a href={`mailto:${EMAIL}`} className="press bg-accent text-on-accent rounded-full px-6 py-3 text-[1.0625rem] font-medium">
          {EMAIL}
        </a>
        <a href={GITHUB} className="text-accent hover:underline">
          github.com/0103juan ↗
        </a>
        <a href={LINKEDIN} className="text-accent hover:underline">
          LinkedIn ↗
        </a>
        <span className="text-muted">{t.where}</span>
      </div>
    </Section>
  )
}
