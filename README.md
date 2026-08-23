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
- `redesign/v2`: active redesign branch

On either computer, pull before starting work and push all work that must be available on the other computer. Do not work on the same unpushed branch from both computers at the same time.

See `AGENTS.md` for repository rules and `docs/REFACTOR_PLAN.md` for the redesign plan.
