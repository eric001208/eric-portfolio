# AI Coding Agent Instructions for Eric Portfolio

## Overview
- Single-page architecture portfolio built with vanilla HTML, CSS, and JavaScript.
- Primary projects grid at [index.html](index.html); minimal bio/footer page at [about.html](about.html).
- Styles are centralized in [style.css](style.css); all interactive behavior for the projects page lives in [script.js](script.js).
- No build tooling, bundler, or tests – run as a static site (e.g., VS Code Live Server) and reload the browser to see changes.

## Layout & Components
- Global header `.site-header` is sticky with glassmorphism nav `.site-nav`; both pages share this header and the "Projects/About" links (projects is an in-page `#projects` link on the index, a file link on the about page).
- The projects grid is split into `.category-view` sections (currently `all`, `architecture`, `interior`, `concept`), each containing one or more `.hero` blocks (`.hero`, `.hero--reverse`, `.hero--architecture`, `.hero--interior`).
- Each `.hero` is a CSS grid of `.hero-card` items; layout is controlled via classes such as `hero-card--tall`, `hero-card--wide`, `hero-card--small-left`, `hero-card--small-right`, `hero-card--small-top`, `hero-card--small-bottom`, and `hero-card--interior-*`.
- Each `.hero-card` contains a single `<img>` thumbnail plus `.hero-meta` with `.project-name` and `.project-location`; `.hero-meta` appears on hover/focus, and cards must keep `tabindex="0"` so keyboard users can open the modal.

## Modal, Media & Lightbox
- Clicking or keyboard-activating a `.hero-card` must go through `openModalFromCard(card)` in [script.js](script.js); do not manually populate the modal.
- Modal content is read from the card dataset: `data-title`, `data-location`, `data-year`, `data-type`, `data-description`, and `data-images` (comma-separated URLs in display order).
- `data-images` may mix images and short videos (`.mp4`/`.webm`/`.ogg`); images render as `<img>`, videos as `<video>` that auto-play on hover/focus and when scrolled into view (via an `IntersectionObserver` rooted on the modal image column).
- Longer text lives in `PROJECT_EXTRA_TEXT` in [script.js](script.js); keys must exactly match the card’s `data-title` string (case-sensitive) to enable the modal "READ MORE" expansion.
- The fullscreen `#image-lightbox` uses `currentImageUrls` and `currentImageIndex` to cycle media, with navigation via prev/next buttons, backdrop/cross (`[data-lightbox-close]`), and keyboard (Esc, Arrow Left/Right) only while the lightbox is open.

## JavaScript Patterns
- Plain DOM API only, no external JS libraries; elements are queried once at the top of [script.js](script.js) and reused.
- `preloadImages()` walks all `.hero-card` elements on `window.load`, preloading URLs from `data-images` (skipping videos) or the cover `<img>` as fallback; keep `data-images` accurate so the first modal open stays smooth.
- Category tabs `.category-tab` read `data-category` and toggle `[data-category-view]` sections by adding/removing `hidden` and the `is-active` class; when the "Projects" nav is clicked, it also scrolls to top and forces the `all` view active.
- Keyboard support is first-class: `.hero-card` has keydown handlers for Enter/Space to open the modal, and the lightbox listens globally for Esc/Arrow keys only when it has the `is-open` class.

## Working in This Repo
- To add a project, duplicate an existing `.hero-card` in the appropriate `.category-view` in [index.html](index.html), set full `data-*` attributes, keep `tabindex="0"`, and point the `<img>` and `data-images` to assets under `image/<project-name>/` (paths may include spaces, matching current folders).
- When adding a new category, create a `.category-tab` button with `data-category="<name>"` and a matching `.category-view` section with `data-category-view="<name>"`; the JS relies on these attributes matching exactly.
- For layout adjustments, extend existing grid and card variants in [style.css](style.css) (`.hero*`, `.hero-card*`, `.hero-meta`) and reuse tokens from `:root` (`--bg`, `--text`, `--font-*`, `--muted`, `--card-radius`) rather than introducing new layout systems.
- The about page [about.html](about.html) shares global styles and uses a tiny inline script to update the footer year; keep it self-contained unless the same pattern starts repeating across multiple pages.
- When enriching long-form descriptions, update `PROJECT_EXTRA_TEXT` in [script.js](script.js) and verify the keys align with `data-title` so the "READ MORE" button appears.