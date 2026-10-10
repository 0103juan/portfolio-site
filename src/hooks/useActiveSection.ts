import { useEffect, useState } from 'react'

/** The section the reader is in: the one crossing a line a little above the middle of the screen, or none. */
export function useActiveSection<T extends string>(ids: readonly T[]): T | null {
  const [active, setActive] = useState<T | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as T
          setActive((current) => (entry.isIntersecting ? id : current === id ? null : current))
        }
      },
      { rootMargin: '-40% 0px -59% 0px' },
    )
    for (const id of ids) {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    }
    return () => observer.disconnect()
  }, [ids])

  return active
}
