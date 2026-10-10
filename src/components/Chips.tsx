import { cn } from '@/lib/utils'

const AI_TECH = /LLM|Gemini|Claude|RAG|MCP|Embeddings|Reranking|LangGraph/

type Props = {
  items: string[]
  className?: string
  /** Picks out the chips that name a model or an AI technique, so applied AI shows inside client work too. */
  mark?: boolean
  /** For the section where the tools are the content, not a footnote of a card. */
  large?: boolean
}

/** A tool or a technique is always a chip, wherever it is named. */
export function Chips({ items, className, mark = false, large = false }: Props) {
  return (
    <ul className={cn('flex flex-wrap', large ? 'gap-2' : 'gap-1.5', className)}>
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            'rounded-full border leading-none font-medium tracking-normal',
            large ? 'px-3.5 py-2 text-[0.9rem]' : 'text-muted px-2.5 py-1 text-[0.75rem]',
            mark && AI_TECH.test(item) && 'border-accent/40 text-accent',
          )}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}
