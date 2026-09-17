# Jackie Hou Portfolio

Personal portfolio published at [jackieddxq.github.io](https://jackieddxq.github.io/).

## Project structure

The main portfolio is a static multi-page website:

- `index.html`: homepage
- `about.html`, `experience.html`, `projects.html`, `contact.html`: primary navigation pages
- `assets/styles/`: shared styles plus case-specific styles
- `assets/scripts/`: shared progressive interactions plus case-specific scripts
- `projects/*.html`: public case-study pages; these paths stay stable
- `projects/prototypes/<case>/`: prototypes grouped under the case they support
- `scripts/`: local development and migration utilities
- `shoppingMall/`, `teld/`, and the legacy prototype folders in `projects/`: redirect-only compatibility paths

See [`projects/README.md`](projects/README.md) for the prototype-to-case map. The three rights-management prototypes are independent Vite applications with their own `package.json` and lockfile; their route inventory and shared UI rules live in [`docs/RIGHTS_MANAGEMENT_PROTOTYPES.md`](docs/RIGHTS_MANAGEMENT_PROTOTYPES.md). The portfolio root itself does not require bundling.

## Local preview

From the repository root:

```powershell
python -m http.server 8080
```

Then open `http://localhost:8080/`.

The homepage Hero opens as a relationship map, with a circular backdrop and a compact author signature at the lower right. Hover or keyboard-focus a topic to see a reading association; click or press Enter/Space to open its materials, and use Close or Escape to return. Projects, the background timeline, working methods and AI notes share the soft paper styling and reveal once when entering view. The top-right motion control governs the whole homepage and remembers your preference in this browser; the system's reduced-motion setting takes priority. At widths up to 1000px, topics use a two-column layout with materials and the right-aligned signature below. With JavaScript disabled, all content remains visible and topics remain direct project links.

The root build command is intentionally a no-op:

```powershell
npm run build
```

Run a prototype's own install/build commands only from its directory when that prototype is being changed.

On Windows, `scripts/start-prototype-servers.bat` starts the portfolio and all three Vite development servers.

## URL compatibility

Case-study URLs remain unchanged. Older prototype URLs are small redirect pages generated from the canonical prototype tree:

```powershell
npm run generate:redirects
```

Run this after adding or renaming a pure-HTML prototype page. Do not hand-edit files under the legacy `shoppingMall/`, `teld/`, `projects/emall/`, `projects/depot/`, `projects/omni/`, or `projects/cel/` paths.

## Branch workflow

- `main`: production site published by GitHub Pages
- `archive/v1`: snapshot of the site before the new redesign
- Work on the current branch (including `main`) unless another branch is requested. A dedicated redesign branch is no longer required.

On either computer, pull before starting work and push all work that must be available on the other computer. Do not work on the same unpushed branch from both computers at the same time.

See `AGENTS.md` for repository rules and `docs/REFACTOR_PLAN.md` for the redesign plan.

## 交互草图

`/lab/` 使用与全站一致的导航和卡片样式，分为当前实验与实验档案。五个项目收藏页提供顶部“卡片浏览 / 文字目录”切换；文字目录中的材料可独立展开、收起，禁用 JavaScript 时仍可直接阅读正文。

从仓库根目录启动预览后，访问 /lab/folder-relations.html，或通过 /lab/ 进入。草图支持主题切换、跨主题材料阅读、返回上一篇和 Escape 返回原卡片；关闭阅读层会恢复页面位置与焦点。

主题岛屿新版草图：`/lab/topic-islands.html`。上一版文件夹草图保留供对照。

文件夹阅读合并版：`/lab/folder-focus.html`。沿用项目字体与配色，展开文件夹后先突出核心判断，再展示依据、实践与追问；材料可独立展开并强调相关区域。原生折叠支持无 JavaScript 阅读，减少动态效果偏好下关闭动画。

两种视觉方向：`/lab/visual-directions.html`。顶部切换“展开的资料夹”和“轻量观点图谱”，使用同一组内容比较材质、排版与关系呈现。此页仅为静态视觉稿，材料与文件夹暂不提供展开交互；禁用 JavaScript 时两稿连续显示。

章节式阅读实验：`/lab/project-reading.html`，也可从 `/lab/` 进入。以权益项目为样本，尝试连续正文、固定章节目录、条件对照表与来源旁注。移动端使用顶部目录；正文、原型链接和原生折叠材料无需 JavaScript 即可使用。

五个文件夹项目页现提供“文章式阅读”入口，可用 `#article` 直接访问。文章模式复用已有材料并生成章节目录；无 JavaScript 时仍可阅读原生文字材料。权益项目的供给选择详情增加了条件对照、实际步骤和来源边界。

文件夹论证图实验：`/lab/argument-folders.html`。点击卡片聚焦直接联系，点击“查看材料”打开来源摘录；虚线入口可跨文件夹并返回，浏览器前进后退与深链接保留聚焦状态。手机将关系转换为卡片旁的文字线索。此页为独立实验，正式项目页不受影响。

可选交互验证：预览服务运行于 8080 后，在已有 Playwright 与 Microsoft Edge 的环境中运行 `node lab/tests/argument-folders-check.cjs`。Playwright 非本地依赖时用 `PLAYWRIGHT_PATH` 指定模块路径；截图默认写入系统临时目录，也可用 `SNAPSHOT_DIR` 指定现有目录。
### 项目文章阅读

五个主项目页顶部的“阅读全文”入口可直接打开完整案例，也可用阅读方式切换按钮进入。`#article` 支持直接分享，文内目录定位到具体章节，文末可返回文件夹浏览。文章正文保存在各项目 HTML 中，关闭 JavaScript 仍可阅读；它不再由卡片详情自动拼接。资料选用与版本边界见 [项目文章来源记录](docs/PROJECT_ARTICLE_SOURCES.md)。
