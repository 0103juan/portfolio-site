import type { Content, Project } from '@/content'
import { cn } from '@/lib/utils'

export type LinkLabels = Pick<Content, 'live' | 'code'>

export function ProjectLinks({ project, labels, className }: { project: Project; labels: LinkLabels; className?: string }) {
  if (!project.repo && !project.demo) return null
  return (
    <p className={cn('label flex gap-5', className)}>
      {project.demo && (
        <a href={project.demo} className="underline decoration-2 underline-offset-4">
          {labels.live} ↗
        </a>
      )}
      {project.repo && (
        <a href={project.repo} className="underline decoration-2 underline-offset-4">
          {labels.code} ↗
        </a>
      )}
    </p>
  )
}
