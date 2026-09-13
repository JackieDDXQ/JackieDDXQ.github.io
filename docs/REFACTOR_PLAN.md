# Portfolio redesign plan

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
