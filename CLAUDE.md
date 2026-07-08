# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Orbit is an issue/project tracker built as a Laravel + Inertia.js + React (TypeScript) monolith. There is no separate API — the server renders Inertia pages and the React frontend consumes props directly. SQLite is the default database (`database/database.sqlite`).

## Commands

### Frontend (npm)
- `npm run dev` — Vite dev server (HMR). For the full stack use the composer `dev` script below.
- `npm run build` — type-check (`tsc`) then production build.
- `npm run lint` — ESLint over `resources/js` with `--fix`.
- `npm test` — Vitest (watch mode by default). `npm run test:watch`, `npm run test:coverage`.
- Run a single frontend test: `npx vitest run resources/js/Components/Atoms/Button/Button.test.tsx` (add `-t "test name"` to filter).

### Backend (php / composer)
- `composer dev` — runs `php artisan serve`, the queue listener, log tail (`pail`), and `npm run dev` concurrently. Preferred way to run the app locally.
- `composer setup` — one-time bootstrap: install deps, copy `.env`, generate key, migrate, build.
- `composer test` — clears config then runs the PHP test suite.
- Run a single PHP test: `php artisan test --filter=IssueServiceTest` (tests use Pest).
- `php artisan migrate` / `php artisan migrate:fresh --seed`.

### Docker (Makefile wraps docker compose)
The full stack also runs in Docker — two services, `app` (Laravel on :8000) and `vite` (assets on :5173). The `Makefile` is the entry point; targets run inside the containers:
- `make setup` — build images (no cache) and start detached. `make up`/`make dev` — foreground; `make down` — detached; `make clean` — stop and drop volumes.
- `make test` (PHP/Pest), `make test-js` (Vitest once), `make lint`, `make type-check` — run the suites inside the containers.
- `make shell` (app shell), `make tinker`, `make migrate`, `make fresh` (migrate:fresh --seed), `make logs`.
- Uses `.env.docker` for container config.

## Architecture

### Backend: layered Controller → Service → Repository
Every domain (Issue, Project, User, ActivityLog) follows the same three-layer split, wired via constructor injection:
- **Controllers** (`app/Http/Controllers/`) — thin. Validate the request, delegate to a Service, return an Inertia response or `redirect()->back()`. Mutating routes (`issues.store`, `issues.update`) return a redirect; Inertia re-fetches and re-renders the page props.
- **Services** (`app/Services/`) — business logic. This is where cross-cutting concerns live, e.g. `IssueService::createIssue` stamps `user_id` from `auth()` and writes an `ActivityLog` via the injected `ActivityLogService`. Services orchestrate other services.
- **Repositories** (`app/Repositories/`) — all Eloquent query logic (eager-loading, ordering, pagination, aggregations). Controllers/Services never build queries directly.

When adding a feature, keep this separation: query code goes in the Repository, orchestration/side-effects in the Service, validation/HTTP in the Controller.

### Frontend: Inertia pages + atomic-design components
- Entry: `resources/js/app.tsx` bootstraps Inertia. Pages resolve from `resources/js/Pages/**/*.tsx` by name (e.g. controller `Inertia::render('Dashboard', [...])` → `Pages/Dashboard.tsx`). Page props are the array passed from the controller — types them inline in the page component.
- Components use **atomic design**: `Components/Atoms/`, `Components/Molecules/`, `Components/Organisms/`. Each component lives in its own folder (`Button/Button.tsx`, colocated `Button/Button.test.tsx`). Compose upward — Organisms use Molecules use Atoms.
- Path alias `@/` → `resources/js/` (configured in `tsconfig.json` and Vite).
- Shared prop/domain types live in `resources/js/types/` (`Issues.ts`, `Projects.ts`, `Users.ts`, `Components.ts`).
- Utilities in `resources/js/utils/`: `cn.ts` (clsx + tailwind-merge — use it to merge Tailwind classes), plus `colors.ts`, `time.ts`.

### Styling
- Tailwind CSS. Class-variance-authority (`cva`) + `cn()` for component variants.
- Theme is **dark-only**, driven by CSS custom properties defined in `resources/css/variables.scss` and consumed in Tailwind as arbitrary values, e.g. `bg-[var(--bg-color)]`, `text-[var(--accent-color)]`. Use these variables rather than hardcoding colors.
- Icons come from `lucide-react`, wrapped by `Components/Atoms/Icon`.

## Testing

Two independent suites:
- **PHP (Pest)** in `tests/` — `Feature/` tests extend `TestCase` with `RefreshDatabase` (see `tests/Pest.php`) and run against an in-memory SQLite DB (`phpunit.xml`). Coverage is per-domain at the Service and Repository layers.
- **React (Vitest + Testing Library)** — jsdom environment, globals enabled, setup in `resources/js/tests/setup.ts` (config in `vite.config.js`). Test files are colocated with components as `*.test.tsx`.

## Conventions
- `Issue.labels` is cast to an enum array (`App\Enums\IssueLabel` via `AsEnumArrayObject`) and stored as JSON.
- Prettier is configured with single quotes and auto-organizes imports + Tailwind class ordering; run lint/format before committing.
