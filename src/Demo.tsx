import { useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

import type { Content } from './content'

const MARK = { ok: '✓', empty: '∅', error: '✕' } as const

/**
 * A recorded secop-mcp session, replayed one step at a time when it scrolls into view. Nothing is called:
 * the script lives in content.ts. Every step is in the page from the start and only fades in, so the
 * layout does not jump and a reader who asked for reduced motion sees it all at once.
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
    const timer = setTimeout(() => setPlayed(played + 1), 900)
    return () => clearTimeout(timer)
  }, [inView, played, total])

  const reveal = (visible: boolean) => cn('transition-opacity duration-500', visible ? 'opacity-100' : 'opacity-0')

  return (
    <div className="mt-20 grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <p className="label text-volt">{demo.label}</p>
        <h3 className="mt-3 text-3xl leading-none font-bold tracking-tight lg:text-4xl" style={{ fontStretch: '85%' }}>
          {demo.title}
        </h3>
        <p className="text-ash mt-4">{demo.note}</p>
        <h4 className="label mt-8 mb-3">{demo.findings.title}</h4>
        <ul className="grid gap-3">
          {demo.findings.items.map((item) => (
            <li key={item} className="grid grid-cols-[auto_1fr] gap-3 text-[0.95rem]">
              <span className="text-volt font-mono">→</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="label mt-6">
          <a href={demo.more.href} className="text-volt underline decoration-2 underline-offset-4">
            {demo.more.text} ↗
          </a>
        </p>
      </div>

      <div ref={box} className="bg-coal border font-mono text-[0.8rem] leading-relaxed lg:col-span-8">
        <p className="label text-ash flex items-center justify-between gap-4 border-b px-4 py-3">
          <span>{demo.stats}</span>
          {!reducedMotion && (
            <button
              type="button"
              onClick={() => setPlayed(0)}
              disabled={played < total}
              className="hover:text-volt cursor-pointer whitespace-nowrap disabled:cursor-default disabled:opacity-40"
            >
              ↻ {demo.replay}
            </button>
          )}
        </p>
        <div className="grid gap-4 p-4 lg:p-6">
          <p className="text-[0.95rem]">
            <span className="text-volt">&gt;</span> {demo.question}
          </p>
          <ol className="grid gap-3">
            {demo.steps.map((step, i) => (
              <li key={i} className={cn('border-l-2 pl-3', reveal(i < shown))}>
                <p>
                  <span className="text-volt">{step.tool}</span> <span className="text-ash">{step.query}</span>
                </p>
                <p className={cn(step.status === 'ok' && 'text-ash')}>
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
                  <tr className="text-ash border-b">
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
            <ul className="text-ash grid gap-2 font-sans text-[0.9rem]">
              {demo.answer.warnings.map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
