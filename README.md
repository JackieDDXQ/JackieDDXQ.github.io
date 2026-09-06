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

The isolated design experiments are available at `http://localhost:8080/lab/`.
The single-project nested canvas is `http://localhost:8080/lab/rights-workspace.html`.
Click a miniature board to enter systems, decisions, artifacts or activities. Click
a card to read its source relationships. Drag empty space or use arrow keys to pan;
use zoom/fit controls for detail. Escape closes content first, then returns to the
overview. The sidebar and browser history also navigate between boards.
The latest linked-archive sample is `http://localhost:8080/lab/connected-archive.html`.
Open a project, inspect a content card, then follow its named relationships into
another project or activity. Thumbnails are JSON content indexes, not screenshots.
Escape closes the dialog; browser Back returns between archive views. Five case
links remain available without JavaScript. Reduced motion disables depth transitions.
The second-round A+C prototype is `http://localhost:8080/lab/spatial-system.html`:
select a theme, enter the rights-management project, and open a content object.
Use the exploration trail or Escape to return. Drag the project canvas background
or focus it and use arrow keys; Reset restores the initial view. On narrow screens,
the project objects become a normal vertical reading sequence. Without JavaScript,
the project content remains available as static sections. A/B/C remain comparison probes.

The combined prototype now uses the supplied gray/white, mint, lime, and lilac
visual references. Its **空间动效** toggle compares depth transitions with an
immediate view change. Desktop nodes lift on focus/hover; entering and leaving
views uses perspective, and project objects unfold in sequence. Narrow screens
use a short, flat transition; the system reduced-motion preference disables motion.
The local Urbanist font and its OFL license are in `lab/assets/fonts/`.

The JSON-driven network sample is `http://localhost:8080/lab/network-atlas.html`.
It reads `lab/data/portfolio-network.json` directly. The home shows the data's
default visible nodes; selecting any node reveals all its incoming and outgoing
neighbors. Try rights-management → prototype design → AI rapid prototyping,
or follow the shared activity into another project. Three camera controls rearrange
and emphasize the same neighborhood: project anatomy, capability/evidence, and
augmented practice. This sample does not yet implement the other six camera profiles,
overlays, or timeline. Content and relationship confirmation states remain visible.

Drag empty canvas space, use zoom/fit controls, or focus the canvas and use arrow
keys. Tab reveals focused nodes; Escape, the trail, and browser history return to
earlier nodes. Mobile keeps a pannable canvas above a readable relationship list.
Reduced motion removes depth/position transitions; without JavaScript, five static
case links remain available. The previous samples remain accessible for comparison.
Validate graph projection and camera invariants with:

```powershell
node --test lab/tests/network-model.test.mjs
```

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
