import type { Content, Project } from '@/content'
import { cn } from '@/lib/utils'

export type LinkLabels = Pick<Content, 'live' | 'code'>

export function ProjectLinks({ project, labels, className }: { project: Project; labels: LinkLabels; className?: string }) {
  if (!project.repo && !project.demo) return null
  return (
    <p className={cn('text-accent flex gap-5 text-[0.95rem]', className)}>
      {project.demo && (
        <a href={project.demo} className="hover:underline">
          {labels.live} ↗
        </a>
      )}
      {project.repo && (
        <a href={project.repo} className="hover:underline">
          {labels.code} ↗
        </a>
      )}
    </p>
  )
}
