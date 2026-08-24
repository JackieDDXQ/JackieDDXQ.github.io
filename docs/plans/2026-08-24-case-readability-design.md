# Case Readability Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the rights-management journey readable at rest and replace generic case-study tables with a coherent editorial-ledger treatment.

**Architecture:** Keep the static HTML structure and current serif-led visual system. Implement the journey contrast and responsive ledger rules in the case stylesheet, then add the same ledger language to the comparable `quality-pricing.html` case without changing the separate admin-dashboard interface.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, local HTTP preview.

---

## Approved design direction

- Preserve the warm-paper, near-black, and single red-signal palette already used by the redesign.
- Keep every journey step readable before playback; use opacity only as a modest hierarchy cue, never as a hidden state.
- Express journey progress with the red node, top rail, and a subtle active wash.
- Treat comparison tables as editorial ledgers: a strong labeled header, generous row rhythm, emphasized first column, restrained status pills, and no heavy spreadsheet grid.
- On narrow screens, convert the rights-management matrix rows into labeled vertical cards so column meaning is preserved without horizontal scrolling.
- Apply the shared visual direction to narrative case-study tables only. Preserve `projects/data-dashboard.html` as a distinct admin-product surface.

### Task 1: Fix journey contrast

**Files:**
- Modify: `assets/styles/cases/rights-management.css`

**Steps:**

1. Add explicit high-contrast colors for the journey title, summary, controls, step titles, metadata, and body copy.
2. Raise the resting step opacity to a readable level and move emphasis into color, border, and background changes.
3. Keep hover/focus and active playback states visually distinct.
4. Verify all eight steps remain readable before and during playback.

### Task 2: Rebuild the rights-management matrix

**Files:**
- Modify: `projects/rights-management.html`
- Modify: `assets/styles/cases/rights-management.css`

**Steps:**

1. Add per-cell labels used by the responsive card layout.
2. Replace the gray block with the editorial-ledger header, row, first-column, and status treatments.
3. Add a mobile card layout below the existing case breakpoint.
4. Verify keyboard and no-JavaScript readability remain unchanged.

### Task 3: Align comparable case-study tables

**Files:**
- Modify: `projects/quality-pricing.html`

**Steps:**

1. Refine the existing `.spec-table` rules to use the same ledger hierarchy without importing rights-management-specific classes.
2. Preserve its existing badges, formulas, and responsive behavior.
3. Verify all four tables remain legible at desktop and mobile widths.

### Task 4: Visual verification

**Files:**
- Verify: `projects/rights-management.html`
- Verify: `projects/quality-pricing.html`

**Steps:**

1. Start the repository-root HTTP preview.
2. Check the journey at desktop and mobile widths before and during playback.
3. Check the rights-management matrix and all quality-pricing tables at desktop and mobile widths.
4. Confirm focus visibility, reduced-motion behavior, HTTP asset responses, and browser-console output.
