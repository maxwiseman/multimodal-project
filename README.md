# The Possible

An interactive ENGL 101 essay built with Next.js, React, TypeScript, and Tailwind CSS. The page follows the author's DevDay experience through technological possibility, human freedom, economic transition, and AI alignment.

## Run

```sh
bun install
bun run dev
```

Open http://127.0.0.1:3000. `bun run lint` checks lint rules; `bun run build` creates the production build; `bun run start` serves it. The build uses Webpack because this environment blocks Turbopack's compilation worker from binding a local port. No external services, API keys, or remote fonts are required.

## Content and structure

- `../The Possible.md`: the author's original draft, unchanged.
- `app/lib/essay.ts`: a verbatim snapshot of all 16 draft paragraphs, including source links. Update this alongside future prose revisions.
- `app/page.tsx`: editorial structure, navigation, story, and conclusion.
- `app/components/prose.tsx`: renders the prose and its inline Markdown links.
- `app/components/explorers.tsx`: keyboard-accessible evidence tabs, read-all view, expandable proposals, evaluation explainer, and source search.
- `app/lib/content.ts`: headings, evidence notes, and the seven sources from the draft.
- `app/globals.css`: shared design tokens and responsive/print/reduced-motion styles.
- `public/images/`: locally served artwork, labeled as conceptual.
- `design/essay/`: three section concepts for the revised design. Earlier files in `design/` describe the previous version.

The site is a draft, not a course submission. The assignment also requires a separate reflection about the author's actual process.
