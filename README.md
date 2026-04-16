# dranki

A mobile-first web app to learn English through flashcard decks, grammar lessons, and reading comprehension texts. Built primarily with Next.js and also integrated with TanStack Start for experimentation — both frameworks coexist and can be switched at any time without disabling code.

**URL:** [dranki.diegofrayo.dev](https://dranki.diegofrayo.dev)

## 🛠️ Tech stack

- **Next.js 16** — main framework (App Router)
- **TanStack Start + TanStack Router** — secondary framework, runs in parallel via Vite
- **React 19**
- **TypeScript 6**
- **Tailwind CSS v4**
- **Base UI** — headless UI primitives
- **react-markdown + remark-gfm + rehype-raw** — Markdown rendering
- **Vercel Analytics** — usage tracking
- **Sonner** — toast notifications
- **Zod** — schema validation
- **Remeda** — utility functions
- **ESLint + Prettier + Husky** — code quality and formatting

## ⚡ Setup

```bash
# Install dependencies
npm install

# Run with Next.js (default)
npm run dev

# Run with TanStack Start
npm run dev:tns

# Type-check
npm run build:ts

# Lint
npm run lint

# Format
npm run format
```
