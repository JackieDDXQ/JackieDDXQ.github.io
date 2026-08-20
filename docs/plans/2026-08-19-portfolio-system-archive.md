# Portfolio System Archive Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** Turn the existing resume-like portfolio into an accessible, responsive interactive product-system archive without breaking current URLs.

**Architecture:** Keep the existing static multi-page HTML architecture and progressively enhance it with shared CSS and small, defensive JavaScript modules. The design uses semantic links, inline SVG diagrams, CSS transitions, and IntersectionObserver so every page remains readable and navigable if JavaScript or motion is unavailable.

**Tech Stack:** HTML5, CSS custom properties and responsive grid, vanilla JavaScript, inline SVG, Python static server.

---

### Task 1: Shared archive design system

**Files:**
- Modify: `style.css`
- Test: load every top-level page at 1440px and 390px without overflow.

**Steps:**
1. Replace the legacy color, type, width, spacing, line, and motion tokens with the warm-paper, carbon-ink, mineral-blue system.
2. Add shared header, mobile navigation, focus, page-heading, footer, and reduced-motion styles.
3. Run static CSS checks and verify no `transition: all` remains.

### Task 2: Homepage hierarchy and content

**Files:**
- Modify: `index.html`
- Modify: `style.css`
- Test: verify one `h1`, semantic CTA links, evidence facts, and all destination URLs.

**Steps:**
1. Build the 7/5 editorial hero with the system-path SVG.
2. Replace large statistics with a compact evidence strip.
3. Add the featured rights-management case with a three-layer architecture diagram.
4. Add the project index, fixed preview panel, profile summary, and direct contact statement.

### Task 3: Progressive interaction system

**Files:**
- Modify: `script.js`
- Test: run the page with JavaScript enabled, disabled, and reduced motion.

**Steps:**
1. Add page-ready orchestration, selective reveal observer, and scroll progress.
2. Add an accessible mobile menu with focus management and Escape handling.
3. Add hover and keyboard project-preview switching with event delegation.
4. Add section spy and defensive guards for pages that lack each component.

### Task 4: Shared subpages and representative case

**Files:**
- Modify: `about.html`
- Modify: `experience.html`
- Modify: `projects.html`
- Modify: `contact.html`
- Modify: `projects/rights-management.html`
- Test: verify current navigation, one `h1` per page, mobile menu, shared footer, and old URLs.

**Steps:**
1. Apply the shared semantic header and page-heading treatment to all top-level pages.
2. Convert the projects page from cards to an archive index.
3. Remove body-hiding inline scripts and load the shared deferred script.
4. Bring the representative case title, floating section navigation, system diagrams, and previous/next navigation into the shared visual system.

### Task 5: Verification and polish

**Files:**
- Test: all changed files and linked local routes.

**Steps:**
1. Validate HTML structure and JavaScript syntax.
2. Crawl internal links and check target files exist.
3. Inspect 1440px, 1024px, 768px, and 390px layouts and console output.
4. Check keyboard focus, menu Escape behavior, reduced motion, and JavaScript-disabled readability.
5. Fix every observed overflow, contrast, interaction, or console issue before delivery.
