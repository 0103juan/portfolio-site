# portfolio-site

My portfolio as a single page, in Spanish and English: client work described by sector, a product of my own built across four stacks, and seven AI projects with measured results.

Live at <https://0103juan.github.io/portfolio-site/>.

React 19, TypeScript, Vite and Tailwind CSS, with animated components from [Skiper UI](https://skiper-ui.com). No router, no trackers and no web fonts: the page is set in each device's system font.

## How it is built

- **All copy lives in `src/content/`**, one file per language (`es.ts`, `en.ts`), under one `Content` type (`types.ts`). If the Spanish and English versions drift apart in structure, the build fails.
- **One file per section** in `src/sections/`, composed in `src/App.tsx`. The order of the page is one list, `src/sections/order.ts`: the header's links come from it, so adding a section does not touch the others. Each section declares the part of the content it reads. Pieces used by more than one section are in `src/components/`, and the language and media-query logic in `src/hooks/`.
- **One set of parts, used everywhere** (see [One system](#one-system)): a section, a card, a project, a chip, a list of points. A section file only says what goes inside.
- The language comes from `?lang=es|en` in the URL (so a link can be sent in one language), then the last choice, then the browser's language.
- One light theme, after Apple's product pages: white, a pale grey, near-black type and one blue accent, set as Tailwind theme tokens in `src/index.css`. Sections alternate between a white band and a grey one; `tinted` swaps the ground and surface tokens, so the cards on a grey band turn white without any component knowing. The recorded terminal and the open layer of the stack are dark on purpose: `dark-surface` redefines the same tokens for whatever is inside it.
- The screenshots in `public/shots/` are of the real apps with real public data.
- People who ask their system for reduced motion get no smooth scrolling, no card deck, no assembling titles and no entrances; people who ask for reduced transparency get a solid bar instead of the blurred edge.

## One system

Every part exists once and means one thing, so the page reads as one piece and nothing is there only to fill a corner:

| Part | Where it lives | Rule |
|---|---|---|
| Section | `components/Section.tsx` | the band, the air above and below (`section`: one value for the whole page) and the head: label, title, introduction |
| Card | `card` in `index.css` | a tile in the surface colour with one radius and one padding, never outlined, text one step smaller than the page's |
| Project | `components/ProjectCard.tsx` | what it is, the measured result, then links and tools: three rows shared with the cards beside it (a subgrid), so the result and the links start on the same line in every card of a row; the same card in the row of AI projects, the product and the other projects |
| Screen | `screen` in `index.css` | a screenshot or the terminal: the only things that cast a shadow |
| Tool | `components/Chips.tsx` | a tool or a technique is always a chip |
| Points | `components/Points.tsx` | what was built or found, as a list that opens with the accent arrow |

Empty room is measured, not guessed. The distance from the end of one section to the label of the next is the same at every boundary; the first screen holds the whole introduction (headline, photo and the three figures); the notes of the recorded demo stay beside it for as long as it is on screen; the recording shows its steps dimmed before they run instead of an empty window; cards in a row share their rows instead of leaving a hole in the shorter ones; a project left alone in the last row takes the whole row; and the open layer of the stack is as tall as what it holds.

## Motion

The rules come from Apple's talks on fluid interfaces, as far as they apply to a page that is mostly read:

- **Springs without overshoot** (`src/lib/motion.ts`) for everything that moves by itself: the pill that follows the section being read, the layers of the stack, the entrances. Nothing bounces, because no gesture threw it.
- **One way to arrive for each kind of thing.** Every section title assembles from its letters as it scrolls in; every block under it sharpens and rises (`Reveal`). Beyond that, a section has at most one movement of its own, and it says something about the content: the projects are a row to throw, the recording replays, the client work piles up as a deck, the layers open like a stack, the product's screens grow into place.
- **Feedback on the press**, not on release: buttons shrink slightly the moment they are pressed (`press`).
- **The row of AI projects is the browser's own scrolling** with snap points, not a carousel written in JavaScript, so a finger or a trackpad gets the platform's real momentum and rubber-banding. The paddles are for a mouse, and the one with nowhere left to go fades. On a wide screen the row stays inside the column and holds exactly two cards, so it ends where the rest of the page ends; on a narrow one it runs to both edges and the next card peeks in. Dots say how many projects there are and which are on screen.
- **Content materialises**: it sharpens and rises as it arrives, instead of only fading (`Reveal`, the words of the headline). A title caught halfway is flattened and spread, never upside down, so it stays readable at the foot of the screen.
- **The bar has no line under it.** The page scrolls beneath a progressive blur that fades away.
- The portrait leans toward the mouse and the three figures count up the first time they are seen.

## Skiper UI

Five free components, installed with the shadcn CLI (`npx shadcn add @skiper-ui/skiper31` and so on) into `src/components/ui/skiper-ui/`, then trimmed from demo pages down to the reusable part. Each one is here because it carries something the content says; two that were only decoration (a stroke in the hero, a scroll ring) were removed:

| File | Used for |
|---|---|
| `skiper16` | the client work as a deck of cards that piles up while scrolling |
| `skiper31` | every section title, whose letters assemble as it scrolls into view |
| `skiper41` | the progressive blur under the navigation |
| `skiper52` | the layers of the full-stack section, piled as a column: the one under the pointer opens to the height of its content |
| `skiper58` | the contact link, whose letters roll on hover |

Their free licence requires attribution: it is in the site footer, in this README and in each file.

## Confidentiality rule

Client work is described by sector only: no client or employer names, no screenshots of client systems, no schemas, no internal figures. Keep it that way when editing `src/content/`. What a system changed is said in words (what stopped being done by hand), never with a number that is not public.

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
