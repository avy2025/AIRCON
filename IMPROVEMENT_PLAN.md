# AIRCON Automation Website — Improvement Plan

Last updated: 2026-10-17

This plan lists concrete, prioritized improvements for the AIRCON Automation site
(`artifacts/aircon-automation`). It is based on a full review of `src/App.tsx`,
`src/index.css`, `index.html`, the original brief in `attached_assets/`, and
`PROJECT_PROGRESS.md`.

Legend: **P0** = must fix before publishing · **P1** = high value · **P2** = polish.

---

## P0 — Must fix before publishing

### P0-1. Real RFQ delivery (replace the `mailto:` demo)
- **Where:** `src/App.tsx` `submitRFQ` (~L66–80) and the form `DEMO MODE` label (~L249, L258).
- **Problem:** The form opens the visitor's email client via `mailto:` and shows a
  green status box even if no mail client exists. The brief (§9) explicitly forbids
  presenting a submission as successful when nothing was sent.
- **Options:**
  1. **Backend endpoint** — the repo already contains an unused Express app
     (`artifacts/api-server`). Add `POST /api/rfq` that validates with Zod and sends
     via Resend/SMTP/Nodemailer. Store the submitter in Postgres (`lib/db`) for backup.
  2. **Form service** — Formspree / Web3Forms / Basin (no backend needed). Least effort.
- **Required regardless of option:** loading + disabled submit button, real success and
  error states, server-side validation, honeypot + rate limiting, and no secrets in the
  frontend bundle.
- **Acceptance:** Submitting a valid form delivers an email to the business inbox and
  the UI reflects the true result. Invalid input is rejected with a clear message.

### P0-2. Verify all public business claims
- **Where:** Projects table (`src/App.tsx` ~L52–58), ISO 9001 / NABL statements
  (~L129, L226–228), contact details (~L241–244), stats (~L126–129).
- **Problem:** Project codes/clients (`PRJ-21-RW`, `PRJ-22-CS`, …), ISO 9001 status, and
  NABL accreditation appear to be constructed. The brief forbids inventing credentials,
  projects, or contact details.
- **Action:** Confirm each against company-approved information, or remove it. Keep
  `PROJECT_PROGRESS.md` "Remaining" in sync.

---

## P1 — High value

### P1-1. Accessibility: reduced-motion support — ✅ DONE (see Quick Wins)
### P1-2. Accessibility: contrast & minimum text size — ⚠️ PARTIAL (see Quick Wins)
- Contrast of muted grays was raised to meet AA for small text. **Still open:** many
  labels are **9–10px**, below a comfortable minimum. Raising to ≥12px changes layout and
  should be reviewed against the Figma reference first (design fidelity is the top priority
  in the brief).

### P1-3. SEO & social
- Add `canonical`, `og:image`, `twitter:image` (absolute URLs after a domain exists).
- Add JSON-LD `Organization` / `LocalBusiness` structured data.
- Add `sitemap.xml` and a `Sitemap:` line in `robots.txt`.
- **Biggest lever:** the site is a client-rendered SPA — crawlers see an empty
  `<div id="root">`. Consider **static pre-rendering** (e.g. `react-snap`, `vite-plugin-ssr`,
  or an Astro/SSG wrapper) so the marketing content is in the initial HTML.

### P1-4. Font loading
- ✅ Fonts moved from a blocking CSS `@import` to a `<link rel="stylesheet">` with
  `preconnect` (Quick Wins).
- **Still open:** self-host the two families to remove the third-party request (privacy +
  performance) and add `font-display: swap` handling via `@font-face`.

### P1-5. Image performance
- ✅ Added intrinsic `width`/`height` and `loading="lazy"` (below the fold) + `fetchPriority`
  (hero) to reduce CLS (Quick Wins).
- **Still open:** export WebP/AVIF variants and add `srcset`/`sizes`; the current JPEGs are
  only 512×279 so they may look soft on high-DPI screens (a source-asset limitation).

### P1-6. Mobile navigation robustness
- **Where:** `src/App.tsx` header/mobile nav (~L95–102); CSS media queries in `index.css`
  (~L584–605, currently duplicated between the 1100px and 760px blocks).
- **Fixes:** close on outside click and on Escape regardless of focus, lock body scroll when
  open, move focus into the menu on open and return it to the toggle on close, add a focus
  trap, and de-duplicate the CSS.

### P1-7. Stale copyright — ✅ DONE (now dynamic, see Quick Wins)
### P1-8. Brand favicon — ✅ DONE (replaced Replit placeholder, see Quick Wins)

---

## P2 — Polish & maintainability

### P2-1. Remove dead code and unused dependencies
- `src/pages/not-found.tsx` is unused (no router).
- The entire `src/components/ui/*` shadcn/Radix kit (~57 files) is unused by the site.
- Unused heavy deps: `recharts`, `framer-motion`, `embla-carousel-react`, `react-day-picker`,
  `vaul`, `cmdk`, `input-otp`, `react-resizable-panels`, `react-icons`, and most Radix
  packages. The brief (§10) says to avoid unnecessary dependencies.
- Note: unused files are tree-shaken out of the production bundle, so this is mostly repo
  bloat and slow typecheck rather than runtime cost.

### P2-2. Two design-token systems coexist
- `index.css` defines both the custom `--ink/--blue/--mist/...` vars **and** a full unused
  shadcn theme block (`--background`, `--primary`, etc.). Consolidate to one.

### P2-3. Automated tests + CI
- Add **Vitest + Testing Library** for the product filter and RFQ validation logic.
- Add a **Playwright** smoke test: responsive widths (320/375/768/1024/1440), no horizontal
  overflow, mobile menu open/close, form validation, and an `axe` accessibility scan.
- Add a **GitHub Actions** workflow running typecheck, build, and tests. (The handover notes
  record that interactive click-through was never actually exercised.)

### P2-4. Real README / run docs — ✅ DONE
- `README.md` now documents the project, structure, prerequisites, exact run/build commands
  (including the Windows adjustments), environment variables, and troubleshooting.
- `replit.md` is still the template with `_Replace …_` placeholders and can be trimmed.

### P2-5. Cross-platform dev scripts
- The original root `preinstall` used `sh -c`, which breaks on Windows. Replace with a
  Node-based guard, and make the platform-specific `overrides` conditional so the same repo
  installs cleanly on Linux, macOS, and Windows.

### P2-6. Header UX
- Add scroll-spy to highlight the active section in the nav.
- Verify zero horizontal overflow at exactly 320px, 1024px, and 1440px.

### P2-7. Lead-gen extras
- Add privacy-friendly analytics (Plausible or GA4) and cookie/consent handling.
- "Request QA Manual" (~L229) currently just anchors to `#contact`; make it a real downloadable
  PDF or remove it.

### P2-8. Deployment hardening
- If served by the Express app: add `helmet`, compression, cache headers, and an SPA/404
  fallback. Confirm the static host serves the Vite `base` path correctly.

---

## Quick Wins — implemented 2026-10-17
- **P1-8 / P0?** Replaced the Replit-default favicon with a branded SVG mark.
- **P1-7** Copyright year is now dynamic (`new Date().getFullYear()`).
- **P1-5** Added image `width`/`height`, lazy loading (below fold), and `fetchPriority` (hero).
- **P1-1** Added `@media (prefers-reduced-motion: reduce)` handling.
- **P1-4** Moved Google Fonts from a blocking CSS `@import` into `<link>`; added
  `theme-color` and `color-scheme`; removed the unused `DM Mono` reference.
- **P1-2 (partial)** Darkened muted grays to meet WCAG AA for the small text sizes in use.

Verified after changes: `typecheck` **PASS**, production `build` **PASS**.
