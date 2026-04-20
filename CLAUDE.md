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

Every page is split in two: a thin framework-attached entry under `src/app/` and a framework-agnostic implementation under `src/features/pages/`. Only the `src/app/` entry may call Next.js APIs.

```
src/app/my-page/page.tsx              → framework-attached entry; calls the loader, wires generateMetadata, exports the page component
src/features/pages/my-page/
  my-page.page.tsx                    → default-exported React component (framework-agnostic)
  my-page.types.ts                    → types scoped to this page
  my-page.loader.server.ts            → data-fetching function (framework-agnostic, server-only)
  my-page.metadata.ts                 → metadata builder (framework-agnostic)
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

<!-- autoskills:start -->

Summary generated by `autoskills`. Check the full files inside `.claude/skills`.

## Accessibility (a11y)

Audit and improve web accessibility following WCAG 2.2 guidelines. Use when asked to "improve accessibility", "a11y audit", "WCAG compliance", "screen reader support", "keyboard navigation", or "make accessible".

- `.claude/skills/accessibility/SKILL.md`
- `.claude/skills/accessibility/references/A11Y-PATTERNS.md`: Practical, copy-paste-ready patterns for common accessibility requirements. Each pattern is self-contained and linked from the main [SKILL.md](../SKILL.md).
- `.claude/skills/accessibility/references/WCAG.md`

## API Layer Guidelines

Enforces the API layer architecture for diegofrayo's TypeScript/Next.js projects. Use this skill whenever creating, editing, or reviewing files inside the `src/api/` folder, adding a new API endpoint function, creating a route module, or wiring up a new data source call. Triggers on requests like...

- `.claude/skills/api-structure/SKILL.md`

## Steps

Generates new UI from an image. Use this skill when the user attaches a screenshot or mockup and wants to build a matching React component or page.

- `.claude/skills/create-ui/SKILL.md`

## Next.js Best Practices

Next.js best practices - file conventions, RSC boundaries, data patterns, async APIs, metadata, error handling, route handlers, image/font optimization, bundling

- `.claude/skills/next-best-practices/SKILL.md`
- `.claude/skills/next-best-practices/async-patterns.md`: In Next.js 15+, `params`, `searchParams`, `cookies()`, and `headers()` are asynchronous.
- `.claude/skills/next-best-practices/bundling.md`: Fix common bundling issues with third-party packages.
- `.claude/skills/next-best-practices/data-patterns.md`: Choose the right data fetching pattern for each use case.
- `.claude/skills/next-best-practices/debug-tricks.md`: Tricks to speed up debugging Next.js applications.
- `.claude/skills/next-best-practices/directives.md`: These are React directives, not Next.js specific.
- `.claude/skills/next-best-practices/error-handling.md`: Handle errors gracefully in Next.js applications.
- `.claude/skills/next-best-practices/file-conventions.md`: Next.js App Router uses file-based routing with special file conventions.
- `.claude/skills/next-best-practices/font.md`: Use `next/font` for automatic font optimization with zero layout shift.
- `.claude/skills/next-best-practices/functions.md`: Next.js function APIs.
- `.claude/skills/next-best-practices/hydration-error.md`: Diagnose and fix React hydration mismatch errors.
- `.claude/skills/next-best-practices/image.md`: Use `next/image` for automatic image optimization.
- `.claude/skills/next-best-practices/metadata.md`: Add SEO metadata to Next.js pages using the Metadata API.
- `.claude/skills/next-best-practices/parallel-routes.md`: Parallel routes render multiple pages in the same layout. Intercepting routes show a different UI when navigating from within your app vs direct URL access. Together they enable modal patterns.
- `.claude/skills/next-best-practices/route-handlers.md`: Create API endpoints with `route.ts` files.
- `.claude/skills/next-best-practices/rsc-boundaries.md`: Detect and prevent invalid patterns when crossing Server/Client component boundaries.
- `.claude/skills/next-best-practices/runtime-selection.md`: Use the default Node.js runtime for new routes and pages. Only use Edge runtime if the project already uses it or there's a specific requirement.
- `.claude/skills/next-best-practices/scripts.md`: Loading third-party scripts in Next.js.
- `.claude/skills/next-best-practices/self-hosting.md`: Deploy Next.js outside of Vercel with confidence.
- `.claude/skills/next-best-practices/suspense-boundaries.md`: Client hooks that cause CSR bailout without Suspense boundaries.

## Cache Components (Next.js 16+)

Next.js 16 Cache Components - PPR, use cache directive, cacheLife, cacheTag, updateTag

- `.claude/skills/next-cache-components/SKILL.md`

## Upgrade Next.js

Upgrade Next.js to the latest version following official migration guides and codemods

- `.claude/skills/next-upgrade/SKILL.md`

## Node.js Backend Patterns

Build production-ready Node.js backend services with Express/Fastify, implementing middleware patterns, error handling, authentication, database integration, and API design best practices. Use when creating Node.js servers, REST APIs, GraphQL backends, or microservices architectures.

- `.claude/skills/nodejs-backend-patterns/SKILL.md`
- `.claude/skills/nodejs-backend-patterns/references/advanced-patterns.md`: Advanced patterns for dependency injection, database integration, authentication, caching, and API response formatting.

## Node.js Best Practices

Node.js development principles and decision-making. Framework selection, async patterns, security, and architecture. Teaches thinking, not copying.

- `.claude/skills/nodejs-best-practices/SKILL.md`

## Project Setup

Automates the initial setup of a new project. Use this skill when the user says "project-setup", "setup project", "run project setup", "initialize project", "set up my project", or asks to run any of the project setup steps (initial-setup, typescript-setup, eslint-setup, prettier-setup, husky-set...

- `.claude/skills/project-setup/SKILL.md`
- `.claude/skills/project-setup/references/1-initial-setup.md`: Sets up the base project using TanStack Start with pnpm, Tailwind CSS, and core dependencies.
- `.claude/skills/project-setup/references/2-typescript-setup.md`: Installs TypeScript v6+ and configures a strict `tsconfig.json`.
- `.claude/skills/project-setup/references/3-eslint-setup.md`: Installs ESLint and creates the flat config (`eslint.config.mts`) with JS, TS, React, and CSS rules.
- `.claude/skills/project-setup/references/4-prettier-setup.md`: Installs Prettier with import-sorting and Tailwind plugins, and creates `.prettierrc.js`.
- `.claude/skills/project-setup/references/5-husky-setup.md`: Installs Husky + lint-staged and configures a pre-commit hook that runs type-checking, linting, and a build.

## Guidelines

Enforces React coding conventions for diegofrayo's project. Use this skill whenever writing, editing, or reviewing any React component (.tsx/.jsx files). Triggers on requests like "create a component", "add a React component", "write a new component", "update this component", "refactor this React...

- `.claude/skills/react-guidelines/SKILL.md`

## SEO optimization

Optimize for search engine visibility and ranking. Use when asked to "improve SEO", "optimize for search", "fix meta tags", "add structured data", "sitemap optimization", or "search engine optimization".

- `.claude/skills/seo/SKILL.md`

## shadcn/ui

Manages shadcn components and projects — adding, searching, fixing, debugging, styling, and composing UI. Provides project context, component docs, and usage examples. Applies when working with shadcn/ui, component registries, presets, --preset codes, or any project with a components.json file. A...

- `.claude/skills/shadcn/SKILL.md`
- `.claude/skills/shadcn/cli.md`: Configuration is read from `components.json`.
- `.claude/skills/shadcn/customization.md`: Components reference semantic CSS variable tokens. Change the variables to change every component.
- `.claude/skills/shadcn/mcp.md`: The CLI includes an MCP server that lets AI assistants search, browse, view, and install components from registries.
- `.claude/skills/shadcn/rules/base-vs-radix.md`: API differences between `base` and `radix`. Check the `base` field from `npx shadcn@latest info`.
- `.claude/skills/shadcn/rules/composition.md`: Never render items directly inside the content container.
- `.claude/skills/shadcn/rules/forms.md`: Always use `FieldGroup` + `Field` — never raw `div` with `space-y-*`:
- `.claude/skills/shadcn/rules/icons.md`: **Always use the project's configured `iconLibrary` for imports.** Check the `iconLibrary` field from project context: `lucide` → `lucide-react`, `tabler` → `@tabler/icons-react`, etc. Never assume `lucide-react`.
- `.claude/skills/shadcn/rules/styling.md`: See [customization.md](../customization.md) for theming, CSS variables, and adding custom colors.

## Tailwind CSS Development Patterns

Provides comprehensive Tailwind CSS utility-first styling patterns including responsive design, layout utilities, flexbox, grid, spacing, typography, colors, and modern CSS best practices. Use when styling React/Vue/Svelte components, building responsive layouts, implementing design systems, or o...

- `.claude/skills/tailwind-css-patterns/SKILL.md`
- `.claude/skills/tailwind-css-patterns/references/accessibility.md`
- `.claude/skills/tailwind-css-patterns/references/animations.md`: Usage:
- `.claude/skills/tailwind-css-patterns/references/component-patterns.md`
- `.claude/skills/tailwind-css-patterns/references/configuration.md`: Use the `@theme` directive for CSS-based configuration:
- `.claude/skills/tailwind-css-patterns/references/layout-patterns.md`: Basic flex container:
- `.claude/skills/tailwind-css-patterns/references/performance.md`: Configure content sources for optimal purging:
- `.claude/skills/tailwind-css-patterns/references/reference.md`: Tailwind CSS is a utility-first CSS framework that generates styles by scanning HTML, JavaScript, and template files for class names. It provides a comprehensive design system through CSS utility classes, enabling rapid UI development without writing custom CSS. The framework operates at build-ti...
- `.claude/skills/tailwind-css-patterns/references/responsive-design.md`: Enable dark mode in tailwind.config.js:

## Tailwind v4 + shadcn/ui Production Stack

|

- `.claude/skills/tailwind-v4-shadcn/SKILL.md`
- `.claude/skills/tailwind-v4-shadcn/references/advanced-usage.md`: **Purpose**: Advanced customization and component patterns for experienced Tailwind v4 + shadcn/ui developers **When to Load**: User asks for custom colors beyond defaults, advanced component patterns, composition best practices, or component customization
- `.claude/skills/tailwind-v4-shadcn/references/common-gotchas.md`: ❌ **WRONG:**
- `.claude/skills/tailwind-v4-shadcn/references/dark-mode.md`: Tailwind v4 + shadcn/ui dark mode requires: 1. `ThemeProvider` component to manage state 2. `.dark` class toggling on `<html>` element 3. localStorage persistence 4. System theme detection
- `.claude/skills/tailwind-v4-shadcn/references/migration-guide.md`: This guide helps you migrate from hardcoded Tailwind colors (`bg-blue-600`) to semantic CSS variables (`bg-primary`).
- `.claude/skills/tailwind-v4-shadcn/references/plugins-reference.md`: **Purpose**: Complete guide to Tailwind v4 official plugins (Typography, Forms) **When to Load**: User mentions prose class, Typography plugin, Forms plugin, @plugin directive, or plugin installation errors

## TypeScript Advanced Types

Master TypeScript's advanced type system including generics, conditional types, mapped types, template literals, and utility types for building type-safe applications. Use when implementing complex type logic, creating reusable type utilities, or ensuring compile-time type safety in TypeScript pr...

- `.claude/skills/typescript-advanced-types/SKILL.md`

## React Composition Patterns

Composition patterns for building flexible, maintainable React components. Avoid boolean prop proliferation by using compound components, lifting state, and composing internals. These patterns make codebases easier for both humans and AI agents to work with as they scale.

- `.claude/skills/vercel-composition-patterns/SKILL.md`
- `.claude/skills/vercel-composition-patterns/AGENTS.md`: **Version 1.0.0** Engineering January 2026
- `.claude/skills/vercel-composition-patterns/README.md`: A structured repository for React composition patterns that scale. These patterns help avoid boolean prop proliferation by using compound components, lifting state, and composing internals.
- `.claude/skills/vercel-composition-patterns/rules/_sections.md`: This file defines all sections, their ordering, impact levels, and descriptions. The section ID (in parentheses) is the filename prefix used to group rules.
- `.claude/skills/vercel-composition-patterns/rules/_template.md`: Brief explanation of the rule and why it matters.
- `.claude/skills/vercel-composition-patterns/rules/architecture-avoid-boolean-props.md`: Don't add boolean props like `isThread`, `isEditing`, `isDMThread` to customize component behavior. Each boolean doubles possible states and creates unmaintainable conditional logic. Use composition instead.
- `.claude/skills/vercel-composition-patterns/rules/architecture-compound-components.md`: Structure complex components as compound components with a shared context. Each subcomponent accesses shared state via context, not props. Consumers compose the pieces they need.
- `.claude/skills/vercel-composition-patterns/rules/patterns-children-over-render-props.md`: Use `children` for composition instead of `renderX` props. Children are more readable, compose naturally, and don't require understanding callback signatures.
- `.claude/skills/vercel-composition-patterns/rules/patterns-explicit-variants.md`: Instead of one component with many boolean props, create explicit variant components. Each variant composes the pieces it needs. The code documents itself.
- `.claude/skills/vercel-composition-patterns/rules/react19-no-forwardref.md`: In React 19, `ref` is now a regular prop (no `forwardRef` wrapper needed), and `use()` replaces `useContext()`.
- `.claude/skills/vercel-composition-patterns/rules/state-context-interface.md`: Define a **generic interface** for your component context with three parts: can implement—enabling the same UI components to work with completely different state implementations.
- `.claude/skills/vercel-composition-patterns/rules/state-decouple-implementation.md`: The provider component should be the only place that knows how state is managed. UI components consume the context interface—they don't know if state comes from useState, Zustand, or a server sync.
- `.claude/skills/vercel-composition-patterns/rules/state-lift-state.md`: Move state management into dedicated provider components. This allows sibling components outside the main UI to access and modify state without prop drilling or awkward refs.

<!-- autoskills:end -->
