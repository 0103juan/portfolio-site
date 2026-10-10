import type { Project } from '@/content'
import { cn } from '@/lib/utils'

import { Chips } from './Chips'
import { ProjectLinks, type LinkLabels } from './ProjectLinks'

export function ProjectBody({ project, labels, className }: { project: Project; labels: LinkLabels; className?: string }) {
  return (
    <div className={cn('flex h-full flex-col gap-3 p-6 lg:p-8', className)}>
      <p className="eyebrow">{project.kind}</p>
      <h3 className="text-[1.5rem] leading-[1.12] font-semibold tracking-[-0.022em]">{project.name}</h3>
      <p className="text-muted">{project.summary}</p>
      <p className="text-[0.95rem] leading-snug font-medium">{project.proof}</p>
      <div className="mt-auto grid gap-4 pt-3">
        <ProjectLinks project={project} labels={labels} />
        <Chips items={project.stack} />
      </div>
    </div>
  )
}
