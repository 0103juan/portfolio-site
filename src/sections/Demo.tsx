import { useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import { Reveal } from '@/components/motion/Reveal'
import { Points } from '@/components/Points'
import type { Content } from '@/content'
import { cn } from '@/lib/utils'

const MARK = { ok: '✓', empty: '∅', error: '✕' } as const

/**
 * A recorded secop-mcp session, replayed one step at a time when it scrolls into view. Nothing is called:
 * the script lives in src/content. Every step is in the page from the start, dimmed until its turn, so the
 * window is never an empty box, the layout does not jump and a reader who asked for reduced motion sees it
 * all at once. The notes stay beside the recording for as long as it is on screen.
 */
export function Demo({ demo }: { demo: Content['demo'] }) {
  const box = useRef<HTMLDivElement>(null)
  const inView = useInView(box, { once: true, amount: 0.15 })
  const reducedMotion = useReducedMotion()
  const total = demo.steps.length + 1 // the tool calls, then the answer
  const [played, setPlayed] = useState(0)
  const shown = reducedMotion ? total : played

  useEffect(() => {
    if (!inView || played >= total) return
    const timer = setTimeout(() => setPlayed(played + 1), 700)
    return () => clearTimeout(timer)
  }, [inView, played, total])

  const reveal = (visible: boolean) => cn('transition-opacity duration-500', visible ? 'opacity-100' : 'opacity-20')

  return (
    <Reveal className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12">
      <div className="lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
        <p className="eyebrow">{demo.label}</p>
        <h3 className="display mt-3 text-[clamp(1.7rem,3.4vw,2.4rem)]">{demo.title}</h3>
        <p className="text-muted mt-4">{demo.note}</p>
        <h4 className="mt-8 mb-3 text-[0.95rem] font-semibold">{demo.findings.title}</h4>
        <Points items={demo.findings.items} />
        <p className="mt-6 text-[0.95rem]">
          <a href={demo.more.href} className="text-accent hover:underline">
            {demo.more.text} ↗
          </a>
        </p>
      </div>

      <div
        ref={box}
        className="dark-surface screen overflow-hidden font-mono text-[0.8rem] leading-relaxed tracking-normal lg:col-span-8"
      >
        <p className="text-muted flex items-center justify-between gap-4 border-b px-5 py-3 text-[0.75rem]">
          <span>{demo.stats}</span>
          {!reducedMotion && (
            <button
              type="button"
              onClick={() => setPlayed(0)}
              disabled={played < total}
              className="hover:text-accent cursor-pointer whitespace-nowrap disabled:cursor-default disabled:opacity-40"
            >
              ↻ {demo.replay}
            </button>
          )}
        </p>
        <div className="grid gap-4 p-5 lg:p-7">
          <p className="text-[0.95rem]">
            <span className="text-accent">&gt;</span> {demo.question}
          </p>
          <ol className="grid gap-3">
            {demo.steps.map((step, i) => (
              <li key={i} className={cn('border-l-2 pl-3', reveal(i < shown))}>
                <p>
                  <span className="text-accent">{step.tool}</span> <span className="text-muted">{step.query}</span>
                </p>
                <p className={cn(step.status === 'ok' && 'text-muted')}>
                  {MARK[step.status]} {step.result}
                </p>
              </li>
            ))}
          </ol>
          <div className={cn('grid gap-4 border-t pt-4', reveal(shown >= total))}>
            <p className="font-sans text-[0.95rem]">{demo.answer.intro}</p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[34rem] text-left">
                <thead>
                  <tr className="text-muted border-b">
                    {demo.answer.columns.map((column) => (
                      <th key={column} className="py-1.5 pr-4 font-normal">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {demo.answer.rows.map((row) => (
                    <tr key={row[0]} className="border-b">
                      {row.map((cell, i) => (
                        <td key={i} className="py-1.5 pr-4">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="text-muted grid gap-2 font-sans text-[0.9rem]">
              {demo.answer.warnings.map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
