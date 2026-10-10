import { en } from './en'
import { es } from './es'
import type { Content, Lang } from './types'

export * from './links'
export type * from './types'

export const content: Record<Lang, Content> = { es, en }
