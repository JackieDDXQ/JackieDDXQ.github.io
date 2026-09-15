# Portfolio redesign plan

## 2026-09-15 — Mobile Hero reading order

- Moved the author signature above the six topic cards at widths up to 1000px, following the central introductory statement. Shifted the circular backdrop down with the topic grid; desktop composition and interaction order remain unchanged.

## 2026-09-15 — Varied card composition and inset signature

- Reworked the desktop map into an asymmetric ring: larger modeling and decisions cards above, a smaller collaboration card on the right, and open questions drawn inward below. Card widths scale with the viewport; the existing mobile grid is preserved.
- Inset the author signature 4% from the right and lifted it 35px. Added staggered signature entrance after the cards begin opening, plus a fine rule that extends and a small name movement on hover/keyboard focus. Existing animation cancellation, pause and reduced-motion controls apply.
- Reviewed the desktop composition and checked open material geometry at 1001, 1287, 1680 and 390px: no card/signature/panel overlap or horizontal overflow. Verified paused name translation and zero rule transition, clean console, script syntax and whitespace. Changes remain local.

## 2026-09-15 — Balance the Hero's right side

- Moved the collaboration card into the middle-right gap above the signature, moved open questions to the lower centre and slightly lowered the experience card. Preserved the background, signature and mobile grid; relationship paths follow the existing geometry observer.
- Reviewed the updated composition and checked 1001, 1287, 1680 and 390px layouts with a material disclosure open: no card/panel/signature overlap or document overflow. Changes remain local.

## 2026-09-15 — Lower-right signature and homepage continuity

- Restored the circular Hero backdrop as requested and placed the smaller name at the lower right. The relationship map now connects to the central introductory statement; material disclosures replace that statement while the author signature stays visible. On smaller screens, the signature follows the topic/material area in normal flow.
- Extended the approved UI work below the Hero: layered featured-project previews, two-column project cards with decorative diagrams, a timeline board, four pastel method cards, staggered AI notes and a soft contact panel. Moved the existing background introduction into the timeline section; retained project links and existing claims.
- Added progressive, one-time viewport entrances with cancellation on focus, hidden tabs and reduced motion. The existing pause control now controls the whole homepage. Static content stays visible without animation support or JavaScript. No dependencies or deployment changes.
- Checked 320, 390, 768, 1001, 1054 and 1440px widths: no document/card overflow or topic overlap with the signature/material panel. Reviewed desktop and mobile screenshots and verified the shared motion switch. Existing unrelated About-page changes remain intact; this is a local trial.
- Rechecked all six topic disclosures (two material links each) and Escape, homepage local references/fragment targets and unique IDs, both scripts' syntax and Git whitespace. Browser console remained clear. System reduced-motion handling was reviewed in CSS/JavaScript; manual motion-off/on was verified in the browser.

## 2026-09-15 — Hero composition after reducing the name

- Rebalanced the composition around the smaller, left-aligned identity. Removed the large circular backdrop, tightened identity spacing and fitted its width to its content so SVG endpoints follow the actual text group. Identity, reading caption and material panel now share a left edge.
- Reduced the desktop minimum Hero height from 800px to 760px, softened card rotations and lowered the default opacity of cross-topic paths. Adjusted the upper modeling card on wide screens to keep it clear of the selected identity; retained the existing small name size and interactions.
- Browser-verified 320px, 390px, 1001px, 1440px and 1680px: no document overflow or topic overlap with identity/material panel, matching left edges, working disclosure/Escape and no console errors/warnings. Reviewed mobile and desktop screenshots; JavaScript syntax and whitespace checks passed. Local trial only.

## 2026-09-15 — Hero identity typography follow-up

- Applied the browser annotation: left-aligned the identity, role label and introduction link; reduced the name to 48–62px on desktop (50px at the annotated width) and 44–52px on smaller screens. Removed the separate selected-state font size so opening materials does not enlarge the name.
- Checked the rendered desktop identity and material panel; confirmed computed left alignment, 50px desktop / 44px phone title sizes and no document overflow at 390px. This is a CSS-only adjustment to the existing Hero trial.

## 2026-09-15 — Homepage relationship Hero trial

- Added a finite, approximately 1.5-second opening sequence, shallow pointer depth and one-shot signals along selected reading paths. Chinese topic names lead the cards; English labels remain secondary. Kept the pastel palette and static site architecture.
- Topic hover/focus highlights an editorial reading association and shows its question. Native disclosure buttons progressively replace fallback links; activation opens existing project materials, retains the identity above the panel and supports Close/Escape with focus restoration. These associations are proposed reading routes, not claims of measured business causality.
- Added a persistent motion pause control, live reduced-motion preference handling and suspension outside the viewport / in hidden tabs. The animation loop stops when motion settles. At 1000px and below, topics use two columns and the panel stays in document flow.
- Browser-checked 320px, 390px, 768px, 1000px, 1001px, 1024px and 1440px layouts. Verified all six disclosures and two material links each, Enter/Space/Escape, focus restoration, pause/resume persistence and clean homepage console. Fixed tablet and 1001px panel collisions. A sandboxed iframe confirmed native links, visible content/navigation and hidden motion controls without scripts; reviewed reduced-motion CSS and the live preference/cancellation code in source.
- Checked 57 homepage/script link references for local targets, unique IDs, JavaScript syntax and Git whitespace. Confirmed that all homepage content from the project collections onward is unchanged. Existing unrelated About-page and plan edits were preserved. No dependencies, commit, push or deployment.
- Implementation notes: `docs/plans/2026-09-15-home-hero-motion.md`.

## 2026-09-14 — About page annotation follow-up

- Replaced the working-method tiles with four native disclosure folders, using the project collection's tab silhouettes and layered paper. Methods are initially open and can be collapsed/reopened by mouse or keyboard without JavaScript.
- Reorganized core capabilities into three numbered rows with their associated lists. Differentiated AI content as a tool inventory, a tabbed practice sheet and a taped note, retaining the shared pastel palette and existing content.
- Reviewed the three revised areas in desktop and mobile previews. Verified folder click/Enter behavior, 390 px and 320 px document overflow, and a clean browser console. Existing shared no-script and reduced-motion behavior is retained; no new JavaScript, dependencies, commit or deployment.

## 2026-09-14 — About page visual refinement

- Added an About-specific stylesheet while retaining the shared portfolio navigation, palette and typography. Rebuilt the opening around a personal statement and a four-stage path drawn from the existing education and employment entries.
- Kept the original biography, experience and results text; separated supporting introduction paragraphs, strengthened the method section and experience timeline, and refined capability and education cards. Existing figures were retained, not newly verified.
- Linked five project names to their case pages, expanded the native chapter navigation, and added project/lab links at the end. No new JavaScript or dependencies.
- Browser-reviewed desktop and mobile layouts, including 390 px and 320 px overflow checks, native chapter links and keyboard Enter navigation; console showed no warnings/errors. Verified all local links, fragment destinations, unique IDs and Git whitespace. No-script and reduced-motion behavior use the existing static HTML and shared CSS. No commit or deployment performed.

## 2026-09-14 — Lab styling and project reading modes

- Unified `/lab/index.html` with the portfolio's shared navigation, font, gray-blue canvas, pastel cards, footer, keyboard focus and reduced-motion rules. Kept all ten experiment destinations intact.
- Replaced the outer bottom disclosure on five project pages with a text-directory section. A shared progressive script places the directory beside the canvas in reading order and provides “卡片浏览 / 文字目录” controls above both views. Individual articles retain native expand/collapse behavior; the complete text remains available without JavaScript.
- Removed obsolete outer-disclosure scripts and preserved `#materials`, legacy rights-case anchors and existing article dialogs. All 54 article bodies were compared with HEAD and remain unchanged; local links in the six edited pages resolve and section/disclosure tags balance.
- Browser-verified all five projects' directory switching, article expansion/collapse and return to cards, with no console warnings/errors. Checked keyboard Enter-to-collapse on the rights case, desktop and mobile visuals, and no horizontal overflow at 320 px for the lab and text directory. No-JavaScript and reduced-motion behavior reviewed in source. JavaScript syntax and Git whitespace checks passed. No commit, push or deployment performed.

## 2026-09-14 — Branch workflow update

- Removed the requirement to develop on `redesign/v2`. Work may proceed on the current branch, including local changes on `main`, unless the user requests another branch.
- Updated `AGENTS.md`, `README.md`, and the active plan below. Earlier dated progress entries retain their historical branch references and do not define the current workflow.
- GitHub Pages settings and deployment configuration still require explicit approval to change.

## 2026-09-11 — 主题岛屿草图

- 用户否定文件夹标签式呈现后，新增 `lab/topic-islands.html` 及配套 CSS/JS，保留上一版。更新 lab 入口与 README。
- 三组主题错开排列，通过轻背景、主卡与次卡呈现材料集合；跨主题虚线和解释性入口提供阅读线索。主题关系聚焦只改高亮，不移动内容。
- 复用原卡片与文章滚动恢复；修正关联阅读出发主题取值，使其来自实际点击卡片而不是当前聚焦主题。
- 已成功拉取 redesign/v2；仅新增实验页和文档，未提交、未发布。
- 浏览器验证主题聚焦、多步关联阅读、返回上一篇及 Escape；页面 scrollY 410px、原卡片视口顶部 108.984375px 均准确恢复，聚焦状态保留。JS 语法检查通过；390px 与 320px 无横向溢出，390px 排版截图检查通过，控制台无错误或警告。兼容路径生成器已运行并撤回无关变化。

## 2026-09-11 — 主题文件夹与跨主题阅读草图

- 在 redesign/v2 新增独立实验页 `lab/folder-relations.html`，配套同目录 CSS/JS；不改正式项目页。
- 设计约束：主题入口保持原位，材料通过解释性问题跨主题关联；阅读层不切换背景主题，关闭时恢复原卡片焦点与页面滚动位置，返回上一篇时恢复文章内部滚动位置。
- 使用六份已有案例材料的摘要演示；关联解释为待确认的组织提案，不代表已经验证的因果或成果。
- 原生链接及展开正文支持无 JavaScript 阅读；原生 dialog 支持 Escape 和焦点约束，减少动态效果遵循系统设置。
- 当前分支与 redesign/v2 的远端拉取均在重试后因 GitHub 网络连接失败，基于本地版本制作；未提交、未发布。
- 已执行兼容跳转生成器；其产生的无关历史路径变化已撤回，lab 页面无需额外兼容路径。
- 本地浏览器验证桌面、390px、320px 无横向溢出；主题切换、跨主题打开、返回上一篇、Escape 和焦点恢复通过。实测页面滚动 593px 恢复至 593px，文章内部滚动 34px 恢复至 34px。控制台无错误或警告，JS 语法检查通过；无 JS 与 reduced-motion 通过源码检查。

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
```

Use the current branch unless the user requests another branch; a dedicated redesign branch is not required. Verify content and visuals before release. Do not change the GitHub Pages publishing source without explicit approval.

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

Deliverable: homepage, project index, and one complete case on the working branch.

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
- Release verified changes from `main`, merging the working branch first if a separate branch was used; verify GitHub Pages and tag the release.

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
- Changes pass content and visual review before release; no particular development branch is required.

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

## Homepage editorial motion refinement — 2026-08-23

- Shifted the homepage body to a warm paper-led editorial system with navy-black type and one red signal color while retaining a dark typographic opening and dark featured-case chapter.
- Retained the serif-led typography requested for the portfolio while reducing oversized homepage, interior-page, case-study, experience, contact, and results headings.
- Restored the opening frame as a full-width, dark display-type composition at a restrained maximum size and moved the role-rule-relationship system diagram into the following working-statement module.
- Added `assets/styles/motion.css` and `assets/scripts/motion.js` as a progressive motion layer using pinned Lenis and GSAP CDN builds on the homepage only.
- Added a shared animation-frame loop for smooth desktop scrolling, restrained hero parallax, section heading reveals, and a scroll-linked featured architecture sequence.
- Kept native touch scrolling on mobile, preserved static content when animation libraries are unavailable, and disabled non-essential motion for `prefers-reduced-motion`.
- Verified the homepage at desktop and 390 px widths, confirmed mobile menu focus and Escape behavior, checked the representative rights-management case, and confirmed HTTP 200 responses for all ten redesigned portfolio pages and the new motion assets.

## Project reading experiment — 2026-09-12

- Added `/lab/project-reading.html` and an entry on `/lab/`, using the existing rights-management case as the content source. Existing project pages and prototype builds are unchanged.
- Tested a chapter-based layout with continuous text, a sticky table of contents, supply comparison, object relationships, and source notes. Mobile moves the contents to a horizontal sticky bar and notes below each section.
- Preserved confirmed practice versus analysis and pending evidence; no new metrics or ownership claims. This is a selected reading path, not a replacement for the complete 12-material collection.
- HTML contains all text, native anchor navigation and native disclosure controls. JavaScript only tracks the current chapter. Reduced-motion CSS disables smooth scrolling.
- Verified desktop at 1440 px, mobile at 390 px, and overflow at 320 px; checked chapter navigation, Enter-to-expand disclosure and visible keyboard focus. Browser console showed no warnings or errors. All local links, assets and fragments on the experiment and lab index passed path and HTTP checks; JavaScript syntax and git whitespace checks passed. No-JavaScript and reduced-motion fallbacks were reviewed in source, not browser-emulated.
- Continue by reviewing this reading direction before applying it to public case pages. Work is on `redesign/v2`, with no publish or deployment changes.
