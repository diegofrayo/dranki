# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

**dranki** is a mobile-first English learning app built with Next.js 16 (App Router) and React 19. It has three content areas: Decks (swipeable flashcard practice), Lessons (grammar explanations in Markdown), and Texts (reading comprehension).

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run build:ts     # Type-check only (--noEmit)
npm run lint         # ESLint
npm run format       # Prettier on src/**/*.{ts,tsx,json,css,mjs,js}
```

No test suite exists.

## Path aliases

| Alias | Resolves to |
|---|---|
| `~/*` | `src/*` |
| `@diegofrayo-pkg/*` | `src/lib/@diegofrayo-pkg/*` |

## Architecture

### Page structure

Every page follows a strict layout. `src/app/` pages are thin re-exports; all logic lives under `src/features/pages/`:

```
src/app/my-page/page.tsx              → export { default } from "~/features/pages/my-page"
src/features/pages/my-page/
  my-page.page.tsx                    → default-exported React component
  my-page.types.ts                    → types scoped to this page
  my-page.config.ts                   → generateMetadata, loaders
  index.ts                            → barrel file; default export is my-page.page.tsx
  components/                         → components used only within this page
  pages/my-subpage/                   → nested routes (same structure recursively)
```

### Static data

Content lives in `src/data/` as JSON and Markdown files — no runtime API calls yet:

- `src/data/decks.json` / `src/data/lessons.json` — metadata lists
- `src/data/decks/{id}.json` — flashcard phrases (English + Spanish)
- `src/data/lessons/{id}.md` — grammar lesson content
- `src/data/texts/{id}.md` — reading texts

### API layer (when needed)

When adding remote data access, all calls must go through `src/api/`. See `.claude/skills/api-structure/SKILL.md` for the full spec. The pattern:

```
src/api/
  routes/{entity}/endpoints/{action-name}.ts   ← one file per endpoint
  routes/{entity}/index.ts                     ← entity router object
  index.ts                                     ← root `api` object
  config.ts                                    ← shared HTTP client
```

Consumers call `api.{entity}.{actionName}(...)`. Never fetch from components or hooks directly.

Each endpoint file defines: the async function (default export), `Raw{ActionName}Response`, `{ActionName}Response`, and a pure `transformResponse` function.

### Primitive components

Use primitive components from `~/components/primitive` (`Box`, `Button`, `Text`, `Title`, `Link`, `Icon`, `Image`, `InlineText`) instead of raw HTML elements. For icons, always use the `Icon` primitive with `IconCatalog` — never import from an icon library directly.

Use `@base-ui/react` for headless UI components — never `@radix-ui/*`.

## React component conventions

The `react-guidelines` skill (`.claude/skills/react-guidelines/SKILL.md`) governs all `.tsx` files. Key rules:

**Structure** — sections appear in this order, omit if empty:
```tsx
// --- HOOKS ---
// --- STATES & REFS ---
// --- COMPUTED STATES ---
// --- STYLES ---
// --- HANDLERS ---
// --- UTILS ---
// --- EFFECTS ---
```

**Types & props:**
- Use `type`, never `interface`
- Required props alphabetically, then optional props alphabetically, then event handlers last

**Classes:**
- Extract repeated Tailwind class strings into a `classes` object under `// --- STYLES ---`
- Never use `cn(...)` directly inside a `className` prop — always reference `classes.foo`

**Handlers & functions:**
- Handlers named `handle{Action}{Event}`: `handleDownloadClick`, `handleNameChange`
- Never pass inline functions as props; define named functions in `// --- HANDLERS ---`
- `useEffect` callbacks must be named: `useEffect(function myEffectName() { ... }, [])`
- Pure helpers that don't close over component state go outside the component

**JSX rules:**
- Never attach `onClick` to `<div>` — use `<button>` or `<a>`
- Boolean guard in short-circuit: `{count > 0 && <X />}`, not `{count && <X />}`
- Ternaries rendering two different elements must be extracted to a component; short-circuit (`&&`) need not be
- Use semantic HTML (`<section>`, `<article>`, `<header>`, `<nav>`, `<footer>`) where meaningful

**TypeScript:**
- `useRef` always needs an explicit type: `useRef<HTMLDivElement>(null)`
- Only annotate `useState` when inference fails (objects, arrays, unions with `null`)
- Named React imports only: `import { useState } from "react"`

**File naming:** kebab-case for all source files (`my-component.tsx`).

## Styling

Tailwind CSS v4 via PostCSS. Use `cn` from `@diegofrayo-pkg/cn` for class composition. OkLch CSS variables define the color system. CSS Modules for scoped styles (e.g. `markdown-renderer.module.css`).

Prettier auto-sorts Tailwind classes — run `npm run format` after adding class strings.
