/** The sections of the page, in order. The header's links and each section's number come from this list. */
export const SECTION_IDS = ['ai', 'work', 'fullstack', 'product', 'stack', 'contact'] as const

export type SectionId = (typeof SECTION_IDS)[number]

export const sectionNumber = (id: SectionId) => SECTION_IDS.indexOf(id) + 1
