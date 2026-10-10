import { cn } from '@/lib/utils'

/** A list whose items open with the accent arrow: what was built, what was found. */
export function Points({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn('grid gap-3 text-[0.95rem]', className)}>
      {items.map((item) => (
        <li key={item} className="grid grid-cols-[auto_1fr] gap-3">
          <span className="text-accent" aria-hidden>
            →
          </span>
          {item}
        </li>
      ))}
    </ul>
  )
}
