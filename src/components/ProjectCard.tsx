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
 * A project, wherever the page shows one. What it is sits at the top and what backs it (the measured result,
 * the links, the tools) at the bottom, under a rule, so cards of different lengths in one row still line up
 * at both ends and the room left in a short one reads as the space above its foot.
 */
export function ProjectCard({ project, labels, wide = false, className }: Props) {
  return (
    <article className={cn('card flex flex-col gap-3', wide && 'md:grid md:grid-cols-12 md:gap-x-10', className)}>
      <div className={cn('grid content-start gap-3', wide && 'md:col-span-5')}>
        <p className="eyebrow">{project.kind}</p>
        <h3 className="title">{project.name}</h3>
        <p className="text-muted">{project.summary}</p>
      </div>
      <div className={cn('mt-auto grid gap-4 border-t pt-4', wide && 'md:col-span-7 md:mt-0 md:content-start md:border-t-0 md:pt-0')}>
        <p className="leading-snug font-medium">{project.proof}</p>
        <ProjectLinks project={project} labels={labels} />
        <Chips items={project.stack} />
      </div>
    </article>
  )
}
