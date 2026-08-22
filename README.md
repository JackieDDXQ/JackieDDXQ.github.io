# Jackie Hou Portfolio

Personal portfolio published at [jackieddxq.github.io](https://jackieddxq.github.io/).

## Project structure

The main portfolio is a static multi-page website:

- `index.html`: homepage
- `about.html`, `experience.html`, `projects.html`, `contact.html`: primary pages
- `style.css`: shared visual system and responsive layout
- `script.js`: shared progressive interactions
- `projects/`: case studies and interactive product prototypes
- `shoppingMall/` and `teld/`: supporting prototype pages

Several folders under `projects/` are independent Vite applications with their own `package.json` and lockfile. The portfolio root itself does not require bundling.

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

## Branch workflow

- `main`: production site published by GitHub Pages
- `archive/v1`: snapshot of the site before the new redesign
- `redesign/v2`: active redesign branch

On either computer, pull before starting work and push all work that must be available on the other computer. Do not work on the same unpushed branch from both computers at the same time.

See `AGENTS.md` for repository rules and `docs/REFACTOR_PLAN.md` for the redesign plan.
