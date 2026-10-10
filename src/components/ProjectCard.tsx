import type { Project } from '@/content'
import { cn } from '@/lib/utils'

import { Chips } from './Chips'
import { ProjectLinks, type LinkLabels } from './ProjectLinks'

type Props = {
  project: Project
  labels: LinkLabels
  /** Laid out across a whole row: what it is on the left, what backs it on the right. */
  wide?: boolean
  className?: string
}

/**
 * A project, wherever the page shows one: what it is, the measured result that backs it, then its links and
 * tools. Those three parts are rows shared with the cards beside it (a subgrid), so in every card of a row
 * the result starts on the same line and so do the links, however long each text is; no card is left with a
 * hole in the middle. The parent must be a grid and give the card three rows.
 */
export function ProjectCard({ project, labels, wide = false, className }: Props) {
  return (
    <article className={cn('card grid gap-y-4', wide ? 'md:grid-cols-12 md:grid-rows-[auto_1fr] md:gap-x-10' : 'row-span-3 grid-rows-subgrid', className)}>
      <div className={cn('grid content-start gap-3', wide && 'md:col-span-5 md:row-span-2')}>
        <p className="eyebrow">{project.kind}</p>
        <h3 className="title">{project.name}</h3>
        <p className="text-muted">{project.summary}</p>
      </div>
      <p className={cn('leading-snug font-medium', wide && 'md:col-span-7')}>{project.proof}</p>
      <div className={cn('grid content-start gap-4', wide && 'md:col-span-7')}>
        <ProjectLinks project={project} labels={labels} />
        <Chips items={project.stack} />
      </div>
    </article>
  )
}
