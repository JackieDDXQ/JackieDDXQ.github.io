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

## Spatial portfolio experiment — Phase 0–1

- Added an isolated `/lab/` entry on the `lab/v1` branch for visual-direction testing without changing the existing homepage or public navigation.
- Kept the experiment independent from `assets/styles/` and `assets/scripts/`; lab pages load only files under `lab/assets/` and reuse the repository's static hosting and local preview flow.
- Built three desktop-only design probes from the same bounded content set: Spatial Graph, Editorial Atlas, and Spatial Canvas.
- Treated positions, connective lines, metric labels, and canvas interactions as disposable hypotheses rather than a new site-wide design system.
- No project detail migration, production routing change, GitHub Pages configuration change, or responsive redesign is included in this phase.
- Added `lab/data/portfolio-network.json` and `docs/PORTFOLIO_LOGIC_NETWORK.md` as the machine-readable and human-readable sources for the combined Spatial Graph + Spatial Canvas direction.
- Refactored the content model into one continuous multiplex semantic mesh. Project, capability, workflow, boundary, evidence, temporal, and AI-enablement forces coexist around the same nodes; nine camera profiles only reweight and spatially expose those relations, while Overlays and Narratives add emphasis and guided reading without creating disconnected graphs.

## Spatial portfolio experiment — A+C, 2026-09-05

- Added `/lab/spatial-system.html` with independent CSS and vanilla JavaScript; preserved the original A/B/C probes and all public pages.
- Interpreted the referenced “设计建筑动画页面” discussion as relationship-based information architecture: A supplies the global typographic field; C supplies the bounded local project plane. Architecture is a background/concept node, not a building-themed visual.
- Implemented seven theme focus states, related existing-case links, one rights-management project space, and five reading objects: system map, policy mechanism, business roles, metric draft, and interface fragment. Cross-links return to Systems/Product/Mechanism; existing case pages remain the destination for other projects.
- Added hash-addressable views, browser back/forward handling, a session-only exploration trail, Escape navigation, keyboard/canvas panning, reset, focus reveal, and retained project pan when returning from an object. No wheel hijacking, external animation dependencies, or 3D engine.
- Used the existing rights-management case as the source for system responsibilities and the operator/package/channel policy hierarchy. The interface fragment is explicitly a rearranged field diagram, not an original screenshot. Metrics 30→90%, 10M+, and −70% remain visibly unverified design material. Research/Notes collections and background-to-method connections remain hypotheses awaiting content review.
- Added a narrow-screen vertical project layout and static content fallback; reduced-motion CSS removes transitions and the connector animation loop becomes one frame. Browser checks covered desktop composition, the Systems → project → policy → Mechanism path, browser back, Escape, arrow-key pan/reset, and 390px layout. No warning/error console entries were observed. Static link checks and 12 local preview routes passed; JavaScript syntax passed. The redirect generator ran with no semantic redirect changes. npm is unavailable in the shell; the root build script is the documented no-op and no compilation is needed.
- Remaining design checks: continuity between the light and dark scales; whether users discover lower canvas objects; testing a second project inside the same graph rather than linking to its existing case; actual evidence assets and verified metrics. This round does not migrate the full portfolio or implement a timeline view.
- Work began after synchronizing `redesign/v2`; another workspace action subsequently switched back to `lab/v1`. Changes are intentionally left uncommitted for review, with no GitHub Pages or deployment configuration changes.

## Static admin prototype unification — 2026-08-23

- Added `projects/prototypes/shared/admin-ui.css` as a common visual foundation for the travel-equity, multi-tenant mall, and physical-mall management prototypes.
- Applied the shared shell, navigation, cards, forms, tables, buttons, focus states, responsive behavior, and reduced-motion behavior to 23 existing HTML pages without introducing a framework.
- Repaired the physical-mall case-study buttons to target the canonical prototype paths rather than legacy redirect pages.
- Repaired travel-equity detail/edit destinations, multi-tenant admin exit destinations, physical-mall staff navigation, and product association detail links.
- Verified 23 pages, ten representative button/menu navigation flows, desktop layouts, 390 px layouts, and browser consoles through the local HTTP preview.

## Homepage editorial motion refinement — 2026-08-23

- Shifted the homepage body to a warm paper-led editorial system with navy-black type and one red signal color while retaining a dark typographic opening and dark featured-case chapter.
- Retained the serif-led typography requested for the portfolio while reducing oversized homepage, interior-page, case-study, experience, contact, and results headings.
- Restored the opening frame as a full-width, dark display-type composition at a restrained maximum size and moved the role-rule-relationship system diagram into the following working-statement module.
- Added `assets/styles/motion.css` and `assets/scripts/motion.js` as a progressive motion layer using pinned Lenis and GSAP CDN builds on the homepage only.
- Added a shared animation-frame loop for smooth desktop scrolling, restrained hero parallax, section heading reveals, and a scroll-linked featured architecture sequence.
- Kept native touch scrolling on mobile, preserved static content when animation libraries are unavailable, and disabled non-essential motion for `prefers-reduced-motion`.
- Verified the homepage at desktop and 390 px widths, confirmed mobile menu focus and Escape behavior, checked the representative rights-management case, and confirmed HTTP 200 responses for all ten redesigned portfolio pages and the new motion assets.

## Spatial portfolio experiment — reference palette and depth, 2026-09-05

- Updated the existing A+C experiment in place using the two supplied visual references: cool gray/white surfaces, near-black text and pill controls, mint (#96D8D0), lime (#DAF4AA), lilac (#BEB9CC), pink and pale blue. The earlier green/serif/light-to-dark direction remains documented above as history.
- Kept the layout stylesheet and added `lab/assets/spatial-depth.css` for the new typography, rounded surfaces, tonal hierarchy and depth styling. Self-hosted the 84.8 KB variable Urbanist font with its OFL license from the Google Fonts repository: https://github.com/google/fonts/tree/main/ofl/urbanist . Chinese uses the system sans-serif fallback.
- Implemented 2.5D with CSS perspective/translateZ/rotation and Web Animations: topic elevation, reversible camera-like entry/exit, staggered project objects, pointer tilt, and lifted nested policy layers. No Three.js, framework, backend or publishing change.
- Added an in-session motion toggle. Navigation state updates immediately, cancels any prior transition, and removes the inert/aria-hidden outgoing scene snapshot; rapid input does not queue stale navigation. System reduced-motion changes cancel ongoing effects and disable the toggle. Mobile removes depth/tilt and retains short flat transitions only when allowed.
- Added five quick content links to the project canvas controls so lower objects can be opened without dragging. Preserved all case text and unverified-metric labels.
- Verified desktop homepage, project plane, policy reading, topic/project navigation, rapid entry plus repeated Escape, the off toggle, and 390px theme/policy reading. No horizontal overflow was observed at 390px; no application console warnings/errors were observed. New stylesheet/font/license/script routes returned HTTP 200, local HTML file links resolved, and JavaScript syntax passed. Reduced-motion behavior was reviewed in source; browser media emulation was not available through the selected browser controls.
- Synchronized redesign/v2 before editing. Changes remain uncommitted and unpublished. Independent network-model files from other work were preserved.

## Spatial portfolio experiment — connected network sample, 2026-09-06

- Added `/lab/network-atlas.html` as a new independent example, linked from `/lab/`; retained A/B/C, the A+C depth prototype, and the public site.
- Reads `lab/data/portfolio-network.json` v0.5.0 directly (162 nodes, 314 edges), without changing the source data. Home uses its 15 default-visible nodes. Each focused view includes the selected node, every incoming/outgoing neighbor, and all existing edges between those visible nodes. Shared activities expose cross-project connections and AI assistance within the same graph.
- Implemented three bounded camera examples: projectAnatomy, capabilityEvidence, augmentedPractice. They use semantic lanes and the source profile's node/edge emphasis while preserving neighborhood IDs and directed relationships. The other six cameras, overlays, narratives, full temporal layout, and multi-hop simultaneous subgraphs remain future work; this is a visual/interaction sample rather than the complete network specification.
- Retained gray/white, mint, lime, lilac and Urbanist styling. The home is an editorial relationship field; focus expands into typed connected objects with a persistent inspector. Newly revealed nodes use a short perspective arrival; retained nodes move continuously between camera layouts. Reduced motion disables these effects. Narrow screens use a pannable canvas plus stacked details.
- Added hash-addressable state, browser history, an exploration trail, Escape return, keyboard focus reveal, pan/zoom/fit, explicit relation directions, and real case/prototype links. Status labels distinguish supported source content, confirmation, evidence, forecasts and experiments, including cases where an edge's status differs from its node. Metrics retain their source scope and are absent from the home.
- Validation: four model tests passed, covering all 162 focused neighborhoods in all three cameras, cross-project/AI shared activities, unchanged graph/status semantics and metric attribution. JavaScript syntax passed. Browser checks covered home, project → shared activity → AI → Escape, unchanged node/edge sets across cameras, and 390 px canvas/detail layouts. All 17 source route targets exist locally; browser console showed no warnings/errors. Reduced-motion and no-JavaScript fallback were inspected in source; browser media/JavaScript emulation was not used. Redirect generation produced no semantic changes; no root compilation is required.
- Synchronized redesign/v2 before work. Changes remain uncommitted and unpublished; no production routing or deployment configuration was changed.

## Linked archive sample — 2026-09-06

- Added /lab/connected-archive.html with independent CSS/JavaScript, using Are.na-inspired cross-connections and Allume-inspired content boards. Preserved earlier experiments and public pages.
- Home offers five project content previews and seven theme entries. Projects open into readable cards, grouped by reading purpose. These groups do not create semantic edges or infer ownership. All relationships come from the JSON adjacency list, retaining direction and node/edge status; scope is identified separately.
- Card dialogs show source descriptions, explicit scope, original case/prototype links, and onward connections. A shared activity can lead to different projects. Preview tiles are textual indexes rather than original screenshots. This round does not implement an infinite canvas or reproduce the full Allume interface.
- Added restrained perspective entry and hover elevation, native modal focus behavior, hash/history navigation, responsive single-column cards and static no-JavaScript case links. Reduced-motion support reviewed in source.
- Checked desktop home/project/dialog and the rights project → prototype activity → travel project route; 390px layout, Escape closure and focus restoration, no horizontal overflow, and no browser console warnings/errors. Existing graph model tests and JavaScript syntax passed. Redirect generator ran. No compilation required.
- Synced redesign/v2 before work. Changes remain uncommitted and unpublished.

## Rights project nested canvas — 2026-09-06

- Added /lab/rights-workspace.html as a single-project Allume-inspired reading workspace. A free-positioned overview contains a problem note and four nested board previews: systems, decisions, artifacts, and work activities. These are editorial collections, not inferred semantic containment.
- Scoped content comes from explicit rights-project scope; work activities come from the project's outgoing has-activity edges. Reading dialogs retain direct relationship names, directions and confirmation states. Original prototype links are preserved. This is a read-only canvas, not a whiteboard editor.
- Added zoom-style entry, pan, zoom/fit, sidebar/breadcrumb navigation, hash/history states, native dialog focus restoration, Escape return, reduced-motion handling and a static case fallback. Preserved all previous examples and public pages.
- Verified desktop overview, system board, material dialog, Escape closure/focus return and overview return. JavaScript syntax passed; redirect generator ran. Changes remain uncommitted and unpublished.
