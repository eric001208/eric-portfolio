# AI Coding Agent Instructions for Eric Portfolio

## Project Shape
- Static two-page site; serve [index.html](index.html) or [about.html](about.html) with Live Server/`npx http-server .`—there is no build, bundler, or dependency install step.
- Projects grid, modal, and lightbox all live in [index.html](index.html); biography/footer text sits in [about.html](about.html) with a small inline year script.
- Runtime logic is entirely in [script.js](script.js); visual language, breakpoints, and component tokens are centralized in [style.css](style.css).
- Media stays in `image/...`; keep folder names (including spaces) because JS datasets point to those exact strings.

## DOM + Data Contracts
- `.site-header`/`.site-nav` are shared; the Projects nav entry must point to `#projects` so [script.js](script.js) can reselect the `all` tab and smooth-scroll to top.
- Category tabs (`.category-tab[data-category]`) toggle visibility on `.category-view[data-category-view]` via `hidden`/`is-active`; attribute values must match exactly for the switcher loop in [script.js](script.js) to work.
- `.hero` grids rely on modifier classes (`.hero--reverse`, `.hero--architecture`, `.hero--interior`, `.hero--concept`) plus card-level roles (`hero-card--tall`, `--wide`, `--small-*`) defined in [style.css](style.css); reuse these areas instead of redefining grid templates.
- Every `.hero-card` stays focusable (`tabindex="0"`) and structured as thumbnail `<img>` + `.hero-meta` overlay; hover shows metadata on desktop, while the mobile media query forces overlays visible.

## Runtime Behavior (see [script.js](script.js))
- `openModalFromCard()` consumes card `dataset` fields (`title`, `location`, `type`, `year`, `description`, `images`) to hydrate modal text/media; populate new cards through data attributes rather than touching modal DOM directly.
- Narrative expansions live in `PROJECT_EXTRA_TEXT`; keys must match the exact `data-title` string to reveal the READ MORE toggle that flips between `currentBaseDescription` and appended paragraphs.
- `preloadImages()` runs on `window.load`, splitting `data-images` CSV strings, skipping videos, and warming the browser cache so modal and lightbox opens are instant.
- The modal image column supports both `<img>` and `<video>` elements; videos auto-play on hover/focus and via an `IntersectionObserver` rooted on `.modal-image-wrap`, so keep files short (`.mp4/.webm`) and order arrays thumbnail-first to maintain cover/sequence parity.
- The fullscreen `#image-lightbox` mirrors `currentImageUrls/currentImageIndex`; prev/next buttons, `[data-lightbox-close]`, backdrop clicks, and Arrow/Esc events are conditioned on the `is-open` class.

## UX Safeguards
- Body scroll locking funnels through `lockBodyScroll()`/`unlockBodyScroll()` which pin `body.body-lock-scroll`, store `scrollLockScrollTop`, and restore the previous position; reuse them for any future overlays.
- Keyboard support already exists: cards respond to Enter/Space, modal READ MORE toggles re-scroll columns, and document-level Arrow/Esc handlers ignore input unless the lightbox is open—preserve these listeners if refactoring.
- Alt text in cards is reused inside the modal (`${title} image ${n}`); provide meaningful `data-title` strings so accessibility copy stays descriptive.

## Styling System (see [style.css](style.css))
- `:root` tokens (`--bg`, `--text`, `--font-*`, `--card-radius`) feed all components; prefer extending these instead of hardcoding new colors or font stacks.
- Glassmorphism header/nav, grayscale-to-color hover transitions, and rounded modal/lightbox shells establish the brand—match the existing easing/duration pairings when you add siblings.
- The mobile breakpoint (`@media (max-width: 900px)`) linearizes grids, pins the header, converts the modal into a scrollable sheet, and forces overlays visible; test additions at ≤900px to ensure the stacked layout and scroll locks remain intact.

## Adding or Editing Projects
- Duplicate a `.hero-card` inside the right `.category-view`, update all `data-*` attributes, and align the inline `<img src>` with the first entry of `data-images` so cards, modal, and lightbox stay in sync.
- When introducing a new discipline, add both a `.category-tab[data-category]` button and a `.category-view[data-category-view]` container; the tab loop only checks for matching attribute strings.
- Extend `PROJECT_EXTRA_TEXT` arrays when longer copy is needed; missing entries automatically hide the READ MORE button.
- If you need new media types beyond JPG/PNG/short MP4/WebM, update both the modal renderer and lightbox detection logic before shipping.

## Local Workflow & QA
- Preview changes through Live Server/`npx http-server .` so relative media paths resolve; there is no bundler or hot reload.
- Validate every `data-images` path immediately—broken URLs appear as empty modal slots and defeat `preloadImages()`.
- Regression-test desktop hover/focus flows plus the ≤900px breakpoint after any structural change, ensuring modals/lightbox interactions, scroll locking, and keyboard shortcuts still behave.