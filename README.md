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

章节式阅读实验：`/lab/project-reading.html`，也可从 `/lab/` 首张卡片进入。以权益项目为样本，尝试连续正文、固定章节目录、条件对照表与来源旁注。移动端使用顶部目录；正文、原型链接和原生折叠材料无需 JavaScript 即可使用。
