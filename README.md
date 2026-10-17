# AIRCON Automation — Business Website

A responsive, single-page marketing website for **Aircon Automation India Pvt. Ltd.**
(industrial automation, railway systems, manufacturing integration, and precision
hydraulic hose assembly — IMT Manesar, Haryana).

This repository is a **pnpm workspace monorepo**. The website lives in
`artifacts/aircon-automation`; the rest of the workspace contains Replit scaffolding and
an unused API/DB layer.

> **New here?** Read `PROJECT_PROGRESS.md` for current status and
> `IMPROVEMENT_PLAN.md` for the prioritized backlog.

---

## Tech stack

| Area | Choice |
| --- | --- |
| UI | React 19 + TypeScript 5.9 |
| Build / dev server | Vite 7 |
| Styling | Tailwind CSS 4 (+ custom CSS in `src/index.css`) |
| Icons | `lucide-react` |
| Package manager | pnpm (workspaces) |
| Runtime | Node.js (Replit targets 24; Vite 7 needs ≥ 22.12) |

---

## Prerequisites

- **Node.js** ≥ 22.12 (Node 24 recommended)
- **pnpm** — the repo pins `pnpm@10.18.3` via the `packageManager` field.
  Enable it with:

  ```bash
  corepack enable pnpm
  ```

  (If corepack misbehaves, `npm install -g pnpm@10` also works.)

---

## Quick start

From the repository root:

```bash
# 1. Install all workspace dependencies
pnpm install

# 2. Start the website dev server
#    PORT and BASE_PATH are REQUIRED by the Vite config — the build fails without them.
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/aircon-automation run dev
```

Then open **http://localhost:3000**.

### Windows (PowerShell)

Environment variables are set differently and the install needs a couple of adjustments:

```powershell
# pnpm via Corepack (already present with Node 22+)
corepack enable pnpm

# The repo pins pnpm 10.18.3; the original preinstall guard used `sh` (POSIX-only) and
# the workspace originally excluded all non-Linux native binaries. Both were adjusted
# so the project installs and runs on Windows. Then:
pnpm install

$env:PORT='3000'; $env:BASE_PATH='/'
pnpm --filter @workspace/aircon-automation run dev
```

> **Note:** `PORT` and `BASE_PATH` are mandatory. `artifacts/aircon-automation/vite.config.ts`
> throws at startup if either is missing.

---

## Common commands

Run from the repository root unless noted.

| Command | Description |
| --- | --- |
| `pnpm install` | Install all workspace dependencies (pnpm required). |
| `pnpm --filter @workspace/aircon-automation run dev` | Start the website dev server (needs `PORT` + `BASE_PATH`). |
| `pnpm --filter @workspace/aircon-automation run build` | Production build → `artifacts/aircon-automation/dist/public`. |
| `pnpm --filter @workspace/aircon-automation run serve` | Preview the production build (needs `PORT`). |
| `pnpm --filter @workspace/aircon-automation run typecheck` | Typecheck the website. |
| `pnpm run typecheck` | Typecheck every package in the workspace. |
| `pnpm run build` | Typecheck + build all packages. |

Example production build:

```bash
PORT=19416 BASE_PATH=/ pnpm --filter @workspace/aircon-automation run build
```

---

## Environment variables

| Variable | Required by | Purpose |
| --- | --- | --- |
| `PORT` | Website (`vite.config.ts`) | Dev/preview server port. |
| `BASE_PATH` | Website (`vite.config.ts`) | Vite `base` path (use `/`). |
| `DATABASE_URL` | `@workspace/db` / `@workspace/api-server` | Postgres connection string — **not needed for the website.** |

The website is presentation-first and static; it needs **no database or backend** to run.

---

## Repository structure

```
.
├── artifacts/
│   ├── aircon-automation/      # ⭐ THE WEBSITE (React + Vite + Tailwind)
│   │   ├── index.html          # HTML shell (SEO meta, fonts, favicon)
│   │   ├── vite.config.ts      # requires PORT + BASE_PATH
│   │   ├── public/
│   │   │   ├── favicon.svg
│   │   │   └── images/         # wordmark, automation cell, facility photos
│   │   └── src/
│   │       ├── App.tsx         # entire single-page site (sections, RFQ form)
│   │       ├── main.tsx        # React entry + ErrorBoundary
│   │       ├── index.css       # design tokens, layout, responsive rules
│   │       └── components/     # ErrorBoundary + unused shadcn/Radix UI kit
│   ├── api-server/             # Express 5 scaffold (health route only; NOT used by the site)
│   └── mockup-sandbox/         # Replit mockup sandbox (not the site)
├── lib/                        # api-spec, api-client-react, api-zod, db (scaffolding)
├── scripts/                    # small TS utility scripts
├── IMPROVEMENT_PLAN.md         # prioritized backlog
├── PROJECT_PROGRESS.md         # project status + handover notes
└── pnpm-workspace.yaml         # workspace + dependency catalogs/overrides
```

---

## Website notes

- **Single page, section navigation.** All content is in `artifacts/aircon-automation/src/App.tsx`:
  Hero → Stats → Company → Segments → Products (filterable) → Projects → Quality → Contact → Footer.
- **Product filter.** The four category buttons filter the product cards client-side.
- **RFQ form — DEMO MODE.** Currently the form validates input and opens a prefilled email
  draft to `info@airconautomation.com` via `mailto:`; it does **not** deliver anything
  server-side. See `IMPROVEMENT_PLAN.md` (P0-1) for wiring real delivery.
- **Assets** live in `artifacts/aircon-automation/public/images/` and are referenced by
  filename through the `asset()` helper.

---

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| `Error: PORT environment variable is required` | Set `PORT` and `BASE_PATH` before running the Vite dev/build/serve command. |
| `Cannot find module @rollup/rollup-win32-x64-msvc` (or `lightningcss`/`@tailwindcss/oxide`) | Windows native binaries are excluded in `pnpm-workspace.yaml` by default (Linux-only overrides). Re-add the `win32-x64` exceptions and run `pnpm install`. |
| `preinstall` fails with `sh: command not found` (Windows) | The original root guard used POSIX `sh`; run `pnpm install` from a shell with `sh` (e.g. Git Bash) or remove the `preinstall` script. |
| Corepack can't download pnpm | Pin a version that resolves, e.g. `corepack prepare pnpm@10.18.3 --activate`, or use `npm install -g pnpm@10`. |
| pnpm refuses to install ("Use pnpm instead") | Install with pnpm — npm/yarn are intentionally blocked. |

---

## Documentation

- `PROJECT_PROGRESS.md` — what's built, what's verified, and exact next steps.
- `IMPROVEMENT_PLAN.md` — prioritized improvement backlog (P0/P1/P2).
- `replit.md` — Replit runtime/stack notes (partly template).
