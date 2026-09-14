# Repository guidance

## Project purpose

- This repository publishes Jackie Hou's portfolio at `jackieddxq.github.io`.
- Preserve the current public site while the redesign is developed on `redesign/v2`.
- Treat `main` as the production branch and `archive/v1` as the frozen pre-redesign snapshot.

## Architecture

- The public site is a static multi-page site built with HTML, CSS, and vanilla JavaScript.
- Top-level pages share assets from `assets/styles/` and `assets/scripts/`.
- `projects/*.html` contains the public case-study pages.
- `projects/prototypes/` groups supporting prototypes by case, including three independent Vite apps:
  - `projects/prototypes/rights-management/omni`: React
  - `projects/prototypes/rights-management/depot`: React + TypeScript
  - `projects/prototypes/rights-management/cel/frontend`: Vue
- `shoppingMall/`, `teld/`, and the legacy prototype folders under `projects/` contain generated redirect pages for old public URLs. Canonical prototype files live under `projects/prototypes/`.
- Some prototype `dist/` directories are intentionally tracked because portfolio pages link to the built demos. Do not delete or regenerate them unless the related source is changed and verified.
- After adding or renaming pure-HTML prototype pages, run `npm run generate:redirects` to refresh the compatibility paths.

## Working rules

- Pull the latest branch before making changes on either computer.
- Make redesign work on `redesign/v2`; do not commit redesign work directly to `main`.
- Do not change GitHub Pages settings, the repository name, or deployment configuration without explicit approval.
- Preserve existing public URLs unless a redirect or migration plan is included.
- Do not invent project metrics, ownership claims, dates, or outcomes. Mark unsupported content for confirmation.
- Prefer the existing static architecture for the portfolio shell. Do not introduce a framework or backend without a concrete need and explicit approval.
- Keep pages usable without JavaScript and respect `prefers-reduced-motion`.
- Never commit secrets, credentials, local environment files, dependency folders, or editor caches.

## Verification

- The root portfolio has no compilation step. `npm run build` only confirms that no build is required.
- Preview from the repository root with `python -m http.server 8080`.
- Before committing, check at minimum:
  - `index.html`
  - all top-level navigation pages
  - every changed project page and prototype link
  - desktop and mobile layouts
  - keyboard focus, reduced motion, and browser console errors
- When changing a Vite prototype, run its own build command from that prototype's directory and verify the linked `dist/` output.

## Documentation

- Keep setup and daily usage instructions in `README.md`.
- Keep redesign scope, risks, decisions, and progress in `docs/REFACTOR_PLAN.md`.
- Existing dated files in `docs/plans/` document earlier work; preserve them as historical records.
