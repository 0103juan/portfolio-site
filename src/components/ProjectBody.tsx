import type { Project } from '@/content'
import { cn } from '@/lib/utils'

import { Chips } from './Chips'
import { ProjectLinks, type LinkLabels } from './ProjectLinks'

export function ProjectBody({ project, labels, className }: { project: Project; labels: LinkLabels; className?: string }) {
  return (
    <div className={cn('flex h-full flex-col gap-4 p-5 lg:p-7', className)}>
      <p className="label opacity-70">{project.kind}</p>
      <h3 className="text-2xl leading-none font-bold tracking-tight lg:text-3xl" style={{ fontStretch: '85%' }}>
        {project.name}
      </h3>
      <p className="max-w-[58ch]">{project.summary}</p>
      <p className="max-w-[58ch] border-l-2 border-current pl-3 font-mono text-[0.8rem] leading-relaxed">{project.proof}</p>
      <div className="mt-auto grid gap-4">
        <ProjectLinks project={project} labels={labels} />
        <Chips items={project.stack} className="opacity-80 [&_li]:border-current/30" />
      </div>
    </div>
  )
}
