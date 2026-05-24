# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Humbly Read is a Vite + React SPA that tracks comic book reading progress from Humble Bundle and Fanatical purchases. It has no backend — all data lives in `public/comics.json` and all logic runs client-side.

## Commands

```bash
npm run dev        # Vite dev server with hot reload
npm run build      # tsc + vite build → dist/
npm run typecheck  # TypeScript check only (no emit)
npm run preview    # Preview production build locally
```

No test suite exists.

## Architecture

**Data model** (`src/types.ts`): `Bundles` is a nested map — bundle name → comic title → status string. Status values are `"unread"`, `"read"`, `"not interested"`, `"pass"`, `"read elsewhere"`. The type is intentionally loose (`string`) to accommodate future statuses.

**`public/comics.json`** is the single source of truth. Edit it directly to add/update comics. It's copied to `dist/` at build time and fetched client-side via `fetch("/comics.json")` on mount.

**`src/utils.ts`** holds all business logic: progress calculations and the color thresholds (green ≥75%, blue ≥50%, purple <50%). When the `calculateBundle*` functions count "completed," they treat anything that isn't `"unread"` as done — including "not interested" and "pass."

**Deployment**: GitHub Pages at `/humbly-read/`. The `base: "/humbly-read/"` in `vite.config.ts` is required; don't remove it. CI deploys via `.github/workflows/build-deploy.yml`.

## Styling

Tailwind CSS v4 via `@tailwindcss/vite` plugin. Dark mode uses `dark:` prefix throughout. Always add dark-mode variants when adding new UI. Color scheme for progress: purple/blue/green (never red/yellow — intentionally non-alarming).
