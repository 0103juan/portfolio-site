import type { ReactNode } from 'react'

import { pad } from '@/lib/format'
import { sectionNumber, type SectionId } from '@/sections/order'

type Props = {
  id: SectionId
  label: string
  title?: string
  intro?: string
  /** A heading that is not the plain title (an animated one), or the whole right column when there is no title. */
  children?: ReactNode
}

export function SectionHead({ id, label, title, intro, children }: Props) {
  return (
    <header className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-12">
      <p className="label text-ash lg:col-span-3">
        <span className="text-volt">[ {pad(sectionNumber(id))} ]</span> {label}
      </p>
      <div className="lg:col-span-9">
        {title && <h2 className="display text-[clamp(2.8rem,8vw,7.5rem)]">{title}</h2>}
        {children}
        {intro && <p className="text-ash mt-6 max-w-[62ch] text-lg">{intro}</p>}
      </div>
    </header>
  )
}
