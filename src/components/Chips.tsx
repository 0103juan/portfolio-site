import { cn } from '@/lib/utils'

const AI_TECH = /LLM|Gemini|Claude|RAG|MCP|Embeddings|Reranking/

/** `mark` picks out the chips that name a model or an AI technique, so applied AI shows inside client work too. */
export function Chips({ items, className, mark = false }: { items: string[]; className?: string; mark?: boolean }) {
  return (
    <ul className={cn('flex flex-wrap gap-1.5', className)}>
      {items.map((item) => (
        <li
          key={item}
          className={cn('label border px-2 py-1 text-[0.65rem] tracking-wider', mark && AI_TECH.test(item) && 'border-volt text-volt')}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}
