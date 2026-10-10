import type { Content } from '@/content'

/** Under the hero: what I work with, as a strip that drifts by and fades at both edges. */
export function StackMarquee({ stack }: { stack: Content['stack'] }) {
  const items = stack.groups.flatMap((group) => group.items)

  return (
    <div
      className="text-muted overflow-hidden border-y py-4 text-[0.9rem] font-medium [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      aria-hidden
    >
      <div className="animate-marquee flex w-max gap-8 pr-8">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            {item} <span className="text-accent">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
