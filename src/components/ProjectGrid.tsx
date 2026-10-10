import type { Project } from '@/content'
import { cn } from '@/lib/utils'

import { Reveal } from './motion/Reveal'
import { ProjectCard } from './ProjectCard'
import type { LinkLabels } from './ProjectLinks'

/**
 * Projects two to a row, arriving one after another, each pair sharing its three lines. An odd one out
 * takes the whole last row, laid out across it, instead of leaving half of that row empty.
 */
export function ProjectGrid({ items, labels, className }: { items: Project[]; labels: LinkLabels; className?: string }) {
  return (
    <div className={cn('grid gap-4 md:grid-cols-2', className)}>
      {items.map((item, i) => {
        const alone = items.length % 2 === 1 && i === items.length - 1
        return (
          <Reveal key={item.name} delay={(i % 2) * 0.08} className={alone ? 'md:col-span-2' : 'row-span-3 grid grid-rows-subgrid'}>
            <ProjectCard project={item} labels={labels} wide={alone} />
          </Reveal>
        )
      })}
    </div>
  )
}
