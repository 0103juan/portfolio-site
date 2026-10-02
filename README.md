# portfolio-site

My portfolio as a single page, in Spanish and English: client work described by sector, a product of my own built across four stacks, and five AI projects with measured results.

Live at <https://0103juan.github.io/portfolio-site/>.

React 19, TypeScript, Vite and Tailwind CSS, with animated components from [Skiper UI](https://skiper-ui.com). No router, no trackers; the two fonts are self-hosted.

## How it is built

- **All copy lives in `src/content.ts`**, once per language, under one `Content` type. If the Spanish and English versions drift apart in structure, the build fails.
- The language comes from `?lang=es|en` in the URL (so a link can be sent in one language), then the last choice, then the browser's language.
- One dark theme on purpose: near-black, bone white and a single accent, set as Tailwind theme tokens in `src/index.css`. The dashboard and the mobile app of the product share it.
- The screenshots in `public/shots/` are of the real apps with real public data.
- People who ask their system for reduced motion get no smooth scrolling, no card deck and no moving strip.

## Skiper UI

Seven free components were installed with the shadcn CLI (`npx shadcn add @skiper-ui/skiper31` and so on) into `src/components/ui/skiper-ui/`, then trimmed from demo pages down to the reusable part:

| File | Used for |
|---|---|
| `skiper16` | the client work as a deck of cards that piles up while scrolling |
| `skiper19` | the stroke in the hero that draws itself with the scroll |
| `skiper31` | the product title whose letters assemble as it scrolls into view |
| `skiper41` | the progressive blur under the navigation |
| `skiper52` | the AI projects as panels that expand on hover |
| `skiper58` | text that rolls on hover in the navigation and the contact link |
| `skiper89` | the draggable scroll-progress ring |

Their free licence requires attribution: it is in the site footer, in this README and in each file.

## Confidentiality rule

Client work is described by sector only: no client or employer names, no screenshots of client systems, no schemas, no internal figures. Keep it that way when editing `content.ts`.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-checks, then builds to dist/
npm run lint
```

## Publish it

The build uses relative URLs, so it works under any path. `.github/workflows/deploy.yml` publishes `dist/` to GitHub Pages on every push to `main`.
