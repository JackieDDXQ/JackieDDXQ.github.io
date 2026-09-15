# Homepage relationship Hero implementation plan

**Goal:** Make the existing relationship map a memorable opening and a useful way into project materials.

**Architecture:** Retain static HTML links, CSS styling and vanilla JavaScript. Enhance the map with a finite opening sequence, pointer-driven depth, explanatory reading paths and an inline disclosure panel. Keep the identity visible in every state.

**Tech Stack:** HTML, CSS, SVG, Web Animations API and browser observers; no added dependencies.

## 1. Semantic content and composition

- Modify `index.html`: retain every topic destination and all content after the Hero; add topic inner surfaces, a motion toggle, relationship caption and a close control for materials.
- Modify `assets/styles/home-atlas.css`: establish a quiet spatial field, central identity, six surrounding topics and a peripheral profile link. Use a dedicated stacked mobile composition and ensure the inline material panel cannot overlap navigation.

## 2. Progressive motion and exploration

- Modify `assets/scripts/home-atlas.js`: keep native links when JavaScript is absent; use native buttons for enhanced topic disclosures. Animate entrance once, interpolate shallow pointer depth, and redraw SVG paths only while moving or geometry changes.
- Use editorial questions to explain reading associations, without implying verified business causality. Highlight paths on hover/focus; disclose existing material destinations on activation; Escape/close restores focus.
- Stop ambient effects outside the viewport and while the page is hidden. Honour live reduced-motion changes and offer a visible motion toggle. No scroll interception or automatic loops.

## 3. Verify and document

- Preview from root with Python HTTP server on port 8080 (use bundled Python if it is absent from PATH).
- Browser-check desktop, 390px and 320px; topic selection, switching, links, close/Escape, keyboard focus, motion toggle, no-script and reduced-motion states. Inspect console and overflow; check JavaScript syntax and `git diff --check`.
- Update `README.md` and append scoped progress to `docs/REFACTOR_PLAN.md`, preserving existing unrelated local changes. Keep changes local for this trial.

## Completed verification

- Browser: desktop, phone and tablet layouts; six material disclosures; keyboard Enter/Space/Escape; focus restoration; motion preference persistence. Adjusted the stacked-layout breakpoint to 1000px after detecting collisions at tablet widths.
- A sandboxed iframe with scripts disallowed verified the no-script fallback. Reduced-motion media CSS and live preference handling were reviewed in source; the manual motion-off path was tested in the browser.
- Local references, unique IDs, JavaScript syntax and whitespace checks passed. The section after the Hero is identical to HEAD. All changes remain local.

## Approved follow-up — signature and lower sections

The user subsequently requested restoring the backdrop, moving a smaller name to the Hero's lower right, and adapting the lower homepage UI and motion. This extends the original Hero-only scope; the unchanged-content statement above records the earlier verification.

- Reconnected the map to a central introductory statement and retained a separate signature through disclosure states. Restored the subtle circular background; used a stacked layout through 1000px.
- Coordinated project previews/cards, timeline, method cards, AI notes and contact panel with the Hero's palette and fine rules. Relocated existing background copy into the path introduction.
- Added `home-motion.js` for finite viewport entrances. The Hero switch dispatches the shared motion preference; reduced motion, focus and hidden tabs cancel active entrances. No permanent content-hiding styles or new dependencies.
- Browser-checked six viewport widths from 320 to 1440px, signature/panel separation, card overflow and the shared motion control. Reviewed desktop and phone layouts. All changes remain local.
