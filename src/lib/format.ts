/** 3 -> "03": the numbering of sections, cards and stack groups. */
export const pad = (n: number) => String(n).padStart(2, '0')

/** A screenshot in public/shots, wherever the site is served from. */
export const shot = (name: string) => `${import.meta.env.BASE_URL}shots/${name}.png`
