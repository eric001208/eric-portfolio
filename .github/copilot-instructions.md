# AI Coding Agent Instructions for Eric Portfolio

## Project Snapshot
- Static, two-page portfolio (projects + about) in vanilla HTML/CSS/JS; open [index.html](index.html) with Live Server or any static HTTP server—there is no build, bundler, or dependency install step.
- Architecture showcases live in [index.html](index.html); bio/footer copy in [about.html](about.html); media assets under `image/…` and intentionally keep original naming (spaces included).
- Styling is centralized in [style.css](style.css) with `:root` tokens and expressive grid modifiers; all runtime behavior is handled in [script.js](script.js).
- README is a placeholder, so treat this file as the authoritative onboarding guide.

## DOM & Layout Contracts
- `.site-header`/`.site-nav` are shared across pages; the "Projects" link must continue pointing to `#projects` for JS to force-scroll and reactivate the `all` category view.
- Project cards live inside `.category-view` wrappers tagged by `data-category-view`; tabs (`.category-tab`) switch these by toggling `hidden` and `is-active` states—attribute values must stay in sync.
- `.hero` grids rely on BEM-style modifiers (`.hero--reverse`, `.hero--architecture`, etc.) plus card-level classes (`hero-card--tall`, `hero-card--small-left`, …) to control CSS Grid areas; reuse these instead of redefining layouts.
- Keep every `.hero-card` focusable (`tabindex="0"`) and structured as cover `<img>` + `.hero-meta` overlay so hover/focus states remain intact on desktop and mobile fallbacks.

## Interaction Flow in script.js
- `openModalFromCard()` is the single entry for modal population; it reads `dataset` fields (`title`, `location`, `type`, `year`, `description`, `images`) and hydrates modal text + media columns, so never bypass it with manual DOM edits.
- Long-form copy lives in `PROJECT_EXTRA_TEXT`; keys must exactly match `data-title` strings to surface the READ MORE/LESS toggle that swaps between `currentBaseDescription` and extra paragraphs.
- `preloadImages()` runs on `window.load`, iterating `.hero-card` nodes and priming image URLs (videos are skipped) to avoid blank modal flashes; make sure `data-images` is complete and ordered thumbnail-first.
- Videos listed in `data-images` are converted to `<video>` elements with hover/focus autoplay plus an `IntersectionObserver` (rooted on `.modal-image-wrap`) so playback pauses when scrolled away.
- The fullscreen `#image-lightbox` mirrors the modal gallery using `currentImageUrls/currentImageIndex`; navigation is through prev/next buttons, `[data-lightbox-close]`, backdrop clicks, and Arrow/Esc handlers gated by the `is-open` class.

## UX Safeguards & Accessibility
- Scroll locking is centralized via `lockBodyScroll()` / `unlockBodyScroll()` which toggle `body-lock-scroll` and remember `scrollLockScrollTop`; reuse these helpers for any new overlays instead of duplicating logic.
- Keyboard support is already wired: `.hero-card` Enter/Space triggers the modal, while document-level Arrow/Esc are ignored unless the lightbox is open—maintain these listeners when refactoring.
- Hover overlays (`.hero-meta`) are hidden on desktop but forced visible in the mobile breakpoint; keep copy concise so the glassmorphism pill stays legible on touch devices.
- Alt text is inherited from the card `<img>` and modal images use `${title} image ${n}`; supply meaningful titles when adding projects so modal/media accessibility stays useful.

## Adding or Editing Projects
- Duplicate an existing `.hero-card` inside the correct `.category-view`, update every `data-*` attribute, keep the thumbnail `<img>` in sync with the first entry of `data-images`, and ensure asset paths match `image/<project-folder>/…` (spaces are acceptable and already used).
- When introducing a new category, add both the `.category-tab[data-category]` button and the matching `.category-view[data-category-view]` section; the JS switches purely by attribute equality.
- Extend `PROJECT_EXTRA_TEXT` with an array of paragraphs (strings) per project when longer narratives are required; absence of an entry hides the READ MORE button automatically.
- Any new media type beyond JPG/PNG/short MP4/WebM will need explicit handling in `openModalFromCard()` and the lightbox; keep current formats unless you also update the render logic.

## Styling Practices
- Reuse CSS tokens (`--bg`, `--text`, `--font-*`, `--card-radius`) and existing grid helpers before introducing new variables; responsive behavior is already tuned via the `@media (max-width: 900px)` block that linearizes hero grids and reconfigures the modal.
- Glassmorphism header/nav, grayscale-to-color hover transitions, and rounded modal/lightbox elements are intentional brand cues—match their easing/duration values when adding sibling components.
- About-page sections (`.page-main`, `.about-hero`, `.about-intro`, etc.) already have typography rules and a placeholder contact form grid; follow those selectors if you expand that page to avoid duplicating styles.

## Local Workflow & QA
- Preview with VS Code Live Server or `npx http-server .` to ensure relative asset paths resolve; there is no hot reload or bundler, so browser refresh is the feedback loop.
- Validate new media paths immediately—broken URLs surface as missing modal/lightbox panels and also defeat `preloadImages()`.
- Test both desktop hover flows and the mobile breakpoint (≤900px) since CSS swaps hover states, dialog scrolling, and hero layouts; verify modal/lightbox keyboard interactions after every structural change.