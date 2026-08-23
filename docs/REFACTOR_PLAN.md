# Portfolio redesign plan

## Objective

Evolve the current portfolio into a clearer, more credible product-management case archive while keeping the existing production site available throughout the work.

The redesign should reuse the strongest editorial qualities of the Chinese serif demo as visual reference, but the GitHub repository remains the only source of truth for production code and content.

## Current baseline

- The production entry is a static HTML/CSS/JavaScript site at the repository root.
- There is no required root compilation step and no GitHub Actions workflow in the repository.
- The main navigation pages and the representative rights-management case run from a simple local HTTP server.
- The repository also contains React, React + TypeScript, and Vue prototype applications.
- Source code exists for the three Vite prototypes, and their compiled `dist/` files are tracked.
- Several older supporting prototypes contain missing internal links or starter asset references. These are legacy risks, not blockers for the main portfolio shell.
- `README.md` previously contained no usable setup guidance.

## Branch protection strategy

```text
main          current production site
archive/v1    frozen snapshot before redesign
redesign/v2   active redesign work
```

Do not change the GitHub Pages publishing source while the redesign is in progress. Merge to `main` only after the redesigned core pages pass content and visual review.

## Phase 1: content and evidence audit

- Inventory every public case, prototype, metric, date, and ownership claim.
- Classify each item as verified, needs confirmation, private, or removable.
- Select one representative case with enough evidence for a complete narrative.
- Preserve useful material from the old computer later through a separate backup branch; do not merge its structure wholesale.

Deliverable: a confirmed content matrix and a short list of pages for the first release.

## Phase 2: redesign the core experience

- Refine the homepage hierarchy and positioning statement.
- Build a focused selected-work section.
- Rework one representative project detail page around problem, constraints, product decisions, contribution, and results.
- Maintain accessible navigation, keyboard use, reduced motion, and no-JavaScript readability.
- Validate desktop and mobile layouts before expanding scope.

Deliverable: homepage, project index, and one complete case on `redesign/v2`.

## Phase 3: migrate remaining material

- Apply the approved system to About, Experience, Contact, and remaining cases.
- Repair or retire broken legacy prototype links.
- Rebuild tracked prototype output only when its source changes.
- Add redirects if any public URL must move.

Deliverable: a coherent portfolio with no knowingly broken public navigation.

## Phase 4: release

- Crawl internal links and verify all published destinations.
- Test representative desktop, tablet, and mobile widths.
- Check keyboard navigation, focus, reduced motion, console errors, metadata, and social sharing fields.
- Review the final diff against `archive/v1`.
- Merge `redesign/v2` into `main`, verify GitHub Pages, and tag the release.

## Known risks and decisions still needed

- Confirm whether GitHub Pages is configured directly from `main` in repository settings before release; the repository contents strongly indicate direct static publishing, but settings are not stored in Git.
- Decide whether the three large Vite prototypes remain public portfolio evidence or should be replaced by lighter curated demonstrations.
- Confirm unsupported metrics and role descriptions before retaining them in public copy.
- Reconcile any unique assets or uncommitted work from the old computer through a dedicated backup branch.

## Definition of done for the first redesign slice

- The homepage communicates role, specialty, and representative work without relying on decorative claims.
- One case study clearly separates business context, product decisions, personal contribution, and verified outcome.
- All links in the slice resolve locally.
- The slice works at desktop and mobile widths and remains readable without JavaScript.
- Changes are committed and pushed to `redesign/v2`; `main` remains untouched until approval.

## Progress update — 2026-08-22

- Translated the Chinese serif demo into a reusable dark editorial system: near-black canvas, four-column guide grid, warm-white serif typography, mono metadata, and a single orange-red accent.
- Rebuilt the homepage opening frame and extended the same visual language through evidence, featured work, project archive, profile, contact, and footer sections.
- Applied the system to About, Experience, Projects, Contact, all four standard case pages, and the rights-management interactive atlas without changing their public URLs.
- Unified the navigation order and Chinese labels across all ten portfolio pages.
- Verified the ten redesigned pages and shared assets over the local HTTP preview; all returned HTTP 200 and all referenced local files resolved.
- Kept the redesign isolated to `redesign/v2`; no publishing configuration or `main` branch changes were made.

## Repository structure update — 2026-08-22

- Moved shared CSS and JavaScript into `assets/styles/` and `assets/scripts/`, with rights-management assets nested under `cases/`.
- Kept top-level navigation pages and `projects/*.html` case-study URLs unchanged.
- Consolidated all supporting prototypes under `projects/prototypes/`, grouped by the case they support.
- Added generated compatibility pages for the former `projects/omni`, `projects/depot`, `projects/cel`, `projects/emall`, `shoppingMall`, and `teld` public paths.
- Moved the multi-server Windows launcher into `scripts/` and updated it for the canonical prototype paths.
- Added `projects/README.md` as the page-to-prototype map and `npm run generate:redirects` for maintaining legacy URLs.

## Rights-management prototype unification — 2026-08-22

- Audited the three supporting applications and documented 59 meaningful routes in `docs/RIGHTS_MANAGEMENT_PROTOTYPES.md`.
- Added `/projects/prototypes/rights-management/index.html` as the human-readable prototype directory and linked it from the case evidence dialog.
- Kept the existing React, React + TypeScript, and Vue architectures while introducing a shared visual foundation in `projects/prototypes/rights-management/shared/`.
- Standardized the application shell, navigation language, colors, spacing, card, table, form, focus, responsive, and reduced-motion behavior across all three systems.
- Exposed previously unreachable prototype work: the Omni write-off pages and the CEL member, app-config, user, role, and log pages.
- Preserved the canonical entry URLs and generated legacy redirects; no publishing configuration was changed.

Follow-up navigation review removed the Omni write-off menu and the CEL member and role menu entries while retaining their direct prototype routes for reference.

## Static admin prototype unification — 2026-08-23

- Added `projects/prototypes/shared/admin-ui.css` as a common visual foundation for the travel-equity, multi-tenant mall, and physical-mall management prototypes.
- Applied the shared shell, navigation, cards, forms, tables, buttons, focus states, responsive behavior, and reduced-motion behavior to 23 existing HTML pages without introducing a framework.
- Repaired the physical-mall case-study buttons to target the canonical prototype paths rather than legacy redirect pages.
- Repaired travel-equity detail/edit destinations, multi-tenant admin exit destinations, physical-mall staff navigation, and product association detail links.
- Verified 23 pages, ten representative button/menu navigation flows, desktop layouts, 390 px layouts, and browser consoles through the local HTTP preview.
