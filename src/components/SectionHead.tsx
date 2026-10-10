import type { ReactNode } from 'react'

import { Reveal } from './motion/Reveal'

type Props = {
  label: string
  title?: string
  intro?: string
  /** A heading that is not the plain title (an animated one), or the whole head when there is no title. */
  children?: ReactNode
}

export function SectionHead({ label, title, intro, children }: Props) {
  return (
    <Reveal className="mb-12 grid gap-4 lg:mb-16">
      <p className="eyebrow">{label}</p>
      {title && <h2 className="display max-w-[16em] text-[clamp(2.1rem,5.4vw,3.6rem)]">{title}</h2>}
      {children}
      {intro && <p className="sub">{intro}</p>}
    </Reveal>
  )
}
