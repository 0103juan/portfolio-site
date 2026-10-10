import { cn } from '@/lib/utils'

const AI_TECH = /LLM|Gemini|Claude|RAG|MCP|Embeddings|Reranking|LangGraph/

/** `mark` picks out the chips that name a model or an AI technique, so applied AI shows inside client work too. */
export function Chips({ items, className, mark = false }: { items: string[]; className?: string; mark?: boolean }) {
  return (
    <ul className={cn('flex flex-wrap gap-1.5', className)}>
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            'text-muted rounded-full border px-2.5 py-1 text-[0.75rem] leading-none font-medium tracking-normal',
            mark && AI_TECH.test(item) && 'border-accent/40 text-accent',
          )}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}
