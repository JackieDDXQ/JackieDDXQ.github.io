# Repository guidance

## Project purpose

- This repository publishes Jackie Hou's portfolio at `jackieddxq.github.io`.
- Preserve the current public site while the redesign is developed on `redesign/v2`.
- Treat `main` as the production branch and `archive/v1` as the frozen pre-redesign snapshot.

## Architecture

- The public site is a static multi-page site built with HTML, CSS, and vanilla JavaScript.
- Top-level pages share `style.css` and `script.js`.
- `projects/` contains case-study pages plus three independent Vite prototypes:
  - `projects/omni`: React
  - `projects/depot`: React + TypeScript
  - `projects/cel/frontend`: Vue
- Some prototype `dist/` directories are intentionally tracked because portfolio pages link to the built demos. Do not delete or regenerate them unless the related source is changed and verified.

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
