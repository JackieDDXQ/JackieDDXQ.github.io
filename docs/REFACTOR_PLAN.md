# Portfolio redesign plan

## 会员商城项目收藏页 — 2026-09-10

- 修改前已成功拉取当前分支；按用户要求在当前 codex 分支实现，保留实物商城等已有未提交改动。未提交、未发布。
- 将 multi-tenant-mall.html 改为与权益页一致的收藏式画布、主题文件夹、关联阅读器及路线进度。组织 9 篇材料，提供会员旅程、配置边界、运营与用户三个阅读视角。
- 旧页的“一套代码、多租户配置”、子公司独立运营、品牌配置与租户/角色 RBAC 保留为项目方向或方案记录；现有原型未提供隔离实现和品牌配置中心证据，明确注明实施情况待确认。
- 核对原型：套餐配置提供价格、计费周期（月/季/年）、合约时长、立即/次月生效、上架应用、办理方式与权益关联；移动端提供开通、单项领取、有效期与取消订阅说明；管理端订单保留领取状态与发放订单入口。字段、示例状态不代表生产执行结果。
- 移除旧页 5+ 租户、预计 50 万用户、接入周期缩短 70% 及缺少来源的日期；保留待确认范围及证据说明，与 CONTENT_AUDIT.md 的指标口径风险一致。
- 保留两个原始原型入口、公开页面 URL 和前后项目链接，并添加套餐配置、领取和订单原型作为材料出处。原型源文件未改动。
- HTML 为唯一正文来源；无 JS 可展开 9 篇原生 details，主导航和原型链接可用。增强阅读支持深链接、关联跳转、路线继续、Escape 关闭、焦点恢复与减少动态效果。
- 本地 Edge/Chromium 检查三条完整路线、文件夹、Enter/Space/Escape、关联阅读与浏览器返回、材料深链接、静态全文入口和手机菜单。1920/1440/768/390/320px 页面与阅读器无横向溢出；检查桌面、手机和无 JS 阅读。
- 案例本地链接和资源返回 HTTP 200，管理端列表、套餐配置、移动端首页均可加载且无页面脚本异常；案例与主导航冒烟检查通过。JS 语法、静态 build 与 diff 空白检查通过。原型支付和领取仍是模拟交互，不作为真实交易验证。

## 实物商城项目收藏页 — 2026-09-10

- 在用户指定的当前 codex 分支完成；拉取远端在默认权限和提权重试中均因 GitHub 网络连接失败，未同步成功。未提交、未发布。
- 替换前一版仅有卡片弹窗的页面，采用权益页一致的画布、主题文件夹、关联阅读与路线进度。提供商品旅程、运营判断、门店协作三个视角及 8 篇材料；桌面可平移，手机单列阅读。
- 保留旧页“从权益运营扩展实物销售”的背景，并以来源标注限定其范围。依据现有原型保留分类/品牌、批量导入、快递配送/线下自提、发货/核销、门店与员工入口。
- 证据核对：商品列表 index.html 的批量导入说明为 xlsx/csv、最多 1000 条，但 submitImport 仅模拟提示；order-manage.html 包含发货、核销、批量结果及订单历史；h5-new.html 提供配送方式、地址、门店与凭证，订单保存在 localStorage。以上均作为设计/原型材料，不证明生产结果。
- 移除旧页 500+ 商品、99.5% 履约准确率、60% 效率提升及未经确认的起止时间；库存扣减、物流接口与个人交付范围留作待补记录。保留原有两个原型 URL 和前后项目链接，未修改原型或部署配置。
- 正文仅维护于 HTML，脚本从静态材料读取；无 JS 时原生 details 可展开，主导航与所有原型入口可用。阅读器提供标签、关联材料、Escape 关闭、焦点恢复及材料深链接；尊重减少动态效果设置。
- 使用本地 Edge/Chromium 验证三条完整路线、文件夹展开收起、Enter/Space 打开、Escape 与焦点恢复、关联阅读及浏览器返回、直接深链接和完整文字入口。1920/1440/768/390/320px 页面及阅读器无横向溢出，检查桌面和手机截图、无 JS 的 8 篇正文和导航。
- 本地链接及资源返回 HTTP 200，管理后台与用户端原型首页可加载；案例及顶层导航冒烟检查无页面脚本异常。JS 语法检查、静态 build 与 diff 空白检查通过。原型内模拟提交不作为本次生产功能验证范围。

## Homepage network opening — 2026-09-08

- Replaced the split homepage opening with a spatial relationship map based on the user-selected `lab/spatial-system.html` reference. Retained its centered identity, pastel topic nodes and thin connections, with new reading topics grounded in existing project material.
- Six topics expand into a question and two real material destinations. The rights collection remains a clear project entry; the existing lower homepage and rights case are unchanged.
- Added isolated home-atlas CSS/JS, responsive line geometry, text masking, focus handling and static link fallback. Editorial links are not business-flow or capability-validation claims.
- See [the network refinement notes](plans/2026-09-08-home-network-refinement.md). Current-branch work remains uncommitted and unpublished.

## Collection homepage and rights case — 2026-09-08

- Rebuilt the homepage and rights-management case around the latest co-created collection design: gray canvas, pastel semantic colors, thematic folders and linked reading materials.
- The homepage offers project and question entry points. The rights page retains 12 source-qualified materials and three reading perspectives, with guided routes, related content, real prototype links, keyboard navigation and static text fallback.
- Preserved public page paths and eight legacy case fragments. Other pages, prototype sources and tracked dist output remain unchanged.
- The user explicitly authorized this work on the current `codex/codexthreads01a0702d6ff57da2860a5cc9a939a78e-ac` branch, overriding the usual redesign/v2 rule for this task. Pulled that branch before edits; no production or deployment changes.
- Desktop and 390px checks covered navigation, modal reading, view changes, history, Escape and focus restoration. Static checks covered 10 HTTP routes, local references, complete perspective membership and relationship targets. Reduced motion was inspected in source; no browser media emulation. A script-free temporary copy verified text fallback.
- See [design, evidence boundaries and maintenance notes](plans/2026-09-08-collection-home-and-rights-design.md). Changes are uncommitted and unpublished.

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

## 首页内容补充 — 2026-09-09

- 首屏重复项目卡改为个人路径入口，新增教育与工作路径、四个阅读视角、AI 实践和邮件联系。来源和验证记录见 docs/plans/2026-09-08-home-content-expansion.md。
- 保留静态架构与既有链接；桌面、390px 和 320px 布局及主题交互已检查。按用户授权在当前分支修改，远端同步网络失败，尚未提交或发布。

## 出行项目收藏页 — 2026-09-09

- 将原深色线性案例重组为与新版首页、权益项目一致的浅色收藏体系，采用项目专属的路线、站点、状态和资金轨迹语言。
- 提供“跟随一次充电”“理解产品决策”“看三方如何协作”三条路线及 13 份材料；详情阅读器保留来源边界与关联阅读。
- 内容来自原出行页面及本站既有原型，明确标注为方案设计与联调前对齐，不使用未验证的上线结果或业务指标。
- 保留页面 URL、原型链接、旧 fragment 入口和无 JavaScript 文字材料。修改留在当前分支，尚未提交或发布。
- 后续按用户指定的权益项目页对齐：直接复用其画布、总览、文件夹、卡片与阅读器样式，替换出行页的纵向列表；13 份出行材料与三条叙事路线保留。权益页面未改动。

## 2026-09-09 全站视觉统一

### 原始地址预览缓存修复
- 复现：首页导航进入无参数的 projects.html 时仍展示旧 HTML，而带 revision 参数的预览显示新内容。
- 本地预览改用 scripts/preview.py，禁用缓存和条件 GET 的旧文件复用，服务根目录固定为仓库根目录。
- 保持公开页面 URL 不变；验证首页→项目、顶栏内页、多租户详情→项目收藏以及权益材料深链接。
- 在当前分支将项目索引、经历、关于、联系和三个传统项目详情页接入 collection 导航及 portfolio-theme.css。
- 延续首页的浅灰画布、Urbanist 字体、柔和彩色卡片和圆角。保留内容、公共 URL 及业务原型。
- 手机端十个主要页面未发现横向溢出或控制台错误。独立原型与 lab 示例不在此次视觉统一范围。

### 关于与经历合并
- 工作经历合并到 about.html#experience，首页入口同步更新，作品集顶栏移除独立经历项。
- experience.html 保留为兼容跳转页，提供无脚本可用的链接。
- 验证旧地址跳转、章节定位与 390px 布局。

## 智数平台项目收藏页 — 2026-09-09

- 将 `projects/zhishu-platform.html` 从线性案例改为与权益、出行项目一致的浅色画布、主题文件夹、材料卡片与详情阅读器，标题为「一道题背后的协作与激励」。
- 组织 12 份材料，提供「命题协作」「质量与激励」「商业复盘」三个视角及各自的五站阅读路线；支持关联阅读、路线继续、键盘操作与材料深链接。
- 正文保留原项目背景、2024.05—09 时间、18,000+ 题目、500+ 活跃专家与商业未达预期的记录，补充原有数字口径待确认的说明。生态健康指标与动态酬金明确属于复盘方向，质量分层定价明确属于后续原型，不作为已实施政策。
- 复用参考页的公共样式，以独立 `zhishu-collection.css` 和 `zhishu-collection.js` 承接专属内容及交互，未改动权益和出行页面。正文仅维护于 HTML，脚本从静态材料读取供详情展示；无 JavaScript 时可直接展开阅读。
- 保留既有页面 URL、用户端和管理后台外部入口、本站质量定价原型及前后项目链接。未修改原型源文件、构建产物或部署配置。
- Chromium 实测：三条完整路线、关联阅读与浏览器返回、直接加载材料深链接、Escape 关闭与焦点恢复、手机菜单、减少动态效果和无 JavaScript 阅读；1440、768、390、320px 无页面横向溢出，手机阅读器无横向溢出，16 个本地链接及资源请求返回 200，未发现控制台错误。外部入口保留原地址，未验证远端登录或访问权限。
- 修改前已成功拉取当前分支。用户明确授权在当前 codex 分支完成本次修改，不提交、不发布。

## 项目收藏页宽屏布局 — 2026-09-09

- 修复权益、出行、智数三页共用画布固定 1510px、文件夹固定在 1460px 边界换行而导致宽屏内容偏左的问题。
- 桌面画布跟随容器宽度；主题文件夹根据实际可用宽度分行并逐行居中，保留原卡片尺寸与可读行宽。宽屏项目介绍和总览整体居中，移除画布 950px 高度上限。
- 增加容器宽度监听，兼容窗口缩放和应用分栏宽度变化；手机维持单列布局。
- Chromium 检查三页在 1920、2560、3440px 下的行居中、总览居中、文件夹无重叠及高窗口利用情况，并回查 1440px 和 390px；测试文件夹收起/展开、视角切换、阅读路线、详情打开及 Escape 关闭。未发现页面横向溢出或控制台错误，脚本语法与 diff 空白检查通过。
- 已同步当前分支；延续用户授权在当前分支修改，未提交或发布。
