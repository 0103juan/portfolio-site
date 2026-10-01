# portfolio-site

My portfolio as a single page, in Spanish and English: client work described by sector, a product of my own built across four stacks, and five AI projects with measured results.

React 19, TypeScript and Vite. No UI library, no router, no trackers.

## How it is built

- **All copy lives in `src/content.ts`**, once per language, under one `Content` type. If the Spanish and English versions drift apart in structure, the build fails.
- The language comes from `?lang=es|en` in the URL (so a link can be sent in one language), then the last choice, then the browser's language.
- Light and dark themes follow the system. Plain CSS in `src/index.css`.
- The screenshots in `public/shots/` are of the real apps with real public data.

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

The build uses relative URLs, so it works under any path. `.github/workflows/deploy.yml` publishes `dist/` to GitHub Pages on every push to `main`; in the repository settings, set Pages to "GitHub Actions" once.

To link a project to its code, add `repo: \`${GITHUB}/<name>\`` to its entry in `content.ts` once that repository is public.
