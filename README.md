# portfolio-site

My portfolio as a single page, in Spanish and English: client work described by sector, a product of my own built across four stacks, and seven AI projects with measured results.

Live at <https://0103juan.github.io/portfolio-site/>.

React 19, TypeScript, Vite and Tailwind CSS, with animated components from [Skiper UI](https://skiper-ui.com). No router, no trackers and no web fonts: the page is set in each device's system font.

## How it is built

- **All copy lives in `src/content/`**, one file per language (`es.ts`, `en.ts`), under one `Content` type (`types.ts`). If the Spanish and English versions drift apart in structure, the build fails.
- **One file per section** in `src/sections/`, composed in `src/App.tsx`. The order of the page is one list, `src/sections/order.ts`: the header's links come from it, so adding a section does not touch the others. Each section declares the part of the content it reads. Pieces used by more than one section are in `src/components/`, and the language and media-query logic in `src/hooks/`.
- The language comes from `?lang=es|en` in the URL (so a link can be sent in one language), then the last choice, then the browser's language.
- One light theme, after Apple's product pages: white, a pale grey for surfaces, near-black type and one blue accent, set as Tailwind theme tokens in `src/index.css`. The recorded terminal and the open layer of the stack are dark on purpose: `dark-surface` redefines the same tokens for whatever is inside it.
- The screenshots in `public/shots/` are of the real apps with real public data.
- People who ask their system for reduced motion get no smooth scrolling, no card deck, no moving strip and no entrances; people who ask for reduced transparency get a solid bar instead of the blurred edge.

## Motion

The rules come from Apple's talks on fluid interfaces, as far as they apply to a page that is mostly read:

- **Springs without overshoot** (`src/lib/motion.ts`) for everything that moves by itself: the pill that follows the section being read, the layers of the stack, the entrances. Nothing bounces, because no gesture threw it.
- **Feedback on the press**, not on release: buttons shrink slightly the moment they are pressed (`press`).
- **The row of AI projects is the browser's own scrolling** with snap points, not a carousel written in JavaScript, so a finger or a trackpad gets the platform's real momentum and rubber-banding. The arrows are for a mouse.
- **Content materialises**: it sharpens and rises as it arrives, instead of only fading (`Reveal`, the words of the headline).
- **The bar has no line under it.** The page scrolls beneath a progressive blur that fades away.
- The portrait leans toward the mouse, the three figures count up the first time they are seen, and the product screenshots grow to full size as they reach the middle of the screen.

## Skiper UI

Seven free components were installed with the shadcn CLI (`npx shadcn add @skiper-ui/skiper31` and so on) into `src/components/ui/skiper-ui/`, then trimmed from demo pages down to the reusable part:

| File | Used for |
|---|---|
| `skiper16` | the client work as a deck of cards that piles up while scrolling |
| `skiper19` | the stroke in the hero that draws itself with the scroll, vivid at the top and faint along its tail |
| `skiper31` | the product title whose letters assemble as it scrolls into view |
| `skiper41` | the progressive blur under the navigation |
| `skiper52` | the layers of the full-stack section, piled as a column: the one under the pointer opens |
| `skiper58` | the contact link, whose letters roll on hover |
| `skiper89` | the draggable scroll-progress ring |

Their free licence requires attribution: it is in the site footer, in this README and in each file.

## Confidentiality rule

Client work is described by sector only: no client or employer names, no screenshots of client systems, no schemas, no internal figures. Keep it that way when editing `src/content/`.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-checks, then builds to dist/
npm run lint
```

## Publish it

The build uses relative URLs, so it works under any path. `.github/workflows/deploy.yml` publishes `dist/` to GitHub Pages on every push to `main`.

## License

[MIT](LICENSE) for the code. Not covered: my photo (`src/Image.jpg`, `src/assets/portrait.jpg`), the text about me in `src/content/`, and the components in `src/components/ui/skiper-ui/`, which stay under Skiper UI's own licence.
