import { useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { Reveal } from './motion/Reveal'
import { ScrollAssemble } from './ui/skiper-ui/skiper31'

const TITLE = 'display max-w-[16em] text-[clamp(2.1rem,5.4vw,3.6rem)]'

type Props = {
  id: string
  label: string
  /** Text is set as the section's title and assembles as it arrives; anything else is shown as given. */
  title: ReactNode
  intro: string
  /** The pale grey band. Sections alternate, so two neighbours never share a ground. */
  tinted?: boolean
  children: ReactNode
}

/** Every section of the page: the same band, the same air and the same head, so only what is inside differs. */
export function Section({ id, label, title, intro, tinted = false, children }: Props) {
  const reducedMotion = useReducedMotion()
  const assembled = typeof title === 'string' && !reducedMotion

  return (
    <section id={id} className={cn(tinted && 'tinted')}>
      <div className="wrap section">
        <Reveal className="mb-10 grid gap-4 lg:mb-14">
          <p className="eyebrow">{label}</p>
          {assembled ? <ScrollAssemble text={title} className={TITLE} /> : typeof title === 'string' ? <h2 className={TITLE}>{title}</h2> : title}
          <p className="sub">{intro}</p>
        </Reveal>
        {children}
      </div>
    </section>
  )
}
