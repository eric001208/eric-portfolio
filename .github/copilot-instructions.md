# AI Coding Agent Instructions for Eric Portfolio

## Overview
- Architecture portfolio site built with vanilla HTML, CSS, and JavaScript.
- Primary projects view at [index.html](index.html); static bio page at [about.html](about.html).
- Styling lives in [style.css](style.css); interaction logic for the projects page lives in [script.js](script.js) only.
- No build tooling, package.json, or tests; serve the root folder with a simple static server (e.g., VS Code Live Server) and open [index.html](index.html) for the main experience.
- Debug and iterate directly in the browser devtools; there is no separate dev/build pipeline, so HTML/CSS/JS edits take effect on reload.

## Layout & Components
- Global header `.site-header` is sticky with a glassmorphism nav `.site-nav`; both pages share this header and the "Projects/About" links.
- The projects grid is organized into `.category-view` sections (values like `all`, `architecture`, `interior`, `concept`, `Game`, `Art`) containing one or more `.hero` blocks (`.hero`, `.hero--reverse`, `.hero--architecture`, `.hero--interior`).
- Each `.hero` block is a CSS grid of `.hero-card` elements; card positioning is controlled entirely by CSS classes such as `hero-card--tall`, `hero-card--wide`, `hero-card--small-left`, `hero-card--small-right`, and `hero-card--interior-*` (tall-left/right, small-top/bottom).
- Each `.hero-card` wraps a single `<img>` thumbnail plus `.hero-meta` overlay with `.project-name` and `.project-location`; overlays are revealed on hover/focus and should keep `tabindex="0"` for keyboard access.

## Modal & Lightbox Behavior
- Clicking or keyboard-activating a `.hero-card` opens `#project-modal` via `openModalFromCard` in [script.js](script.js); do not bypass this helper when wiring new cards.
- Modal content is driven by the card’s dataset: `data-title`, `data-location`, `data-year`, `data-type`, `data-description`, and `data-images` (comma-separated URLs).
- `data-images` can mix still images and short videos (`.mp4`/`.webm`/`.ogg`); images render as `<img>` elements and videos as `<video>` elements that auto-play on hover/focus and can also open the fullscreen lightbox.
- Longer copy is stored in `PROJECT_EXTRA_TEXT` in [script.js](script.js); keys must exactly match the `data-title` string (case-sensitive) to attach extra paragraphs to the modal "READ MORE" behavior.
- The fullscreen `#image-lightbox` uses `currentImageUrls` and `currentImageIndex` to cycle through media, and supports navigation via the prev/next buttons, backdrop/cross buttons (`[data-lightbox-close]`), and keyboard (Esc, Arrow Left/Right).

## JavaScript Patterns
- Plain DOM API only; no external JS libraries. Elements are selected once at the top of [script.js](script.js) and reused; listeners are attached directly on those references.
- `preloadImages()` walks all `.hero-card` elements and preloads image URLs from `data-images` (skipping video files) or the card `<img>` as a fallback, and is started on `window.load`; when adding projects, keep `data-images` in sync so preloading stays effective.
- Category tabs `.category-tab` read `data-category` and toggle matching `[data-category-view]` sections by adding/removing `hidden` and `is-active`; the "Projects" nav link also forces the `all` category active and scrolls the page back to the top.
- Keyboard support is important: `.hero-card` keydown handlers open the modal on Enter/Space, and the lightbox listens globally for Esc/Arrow keys only while it is open.

## Working in This Repo
- To add a project, create a `.hero-card` in the appropriate `.category-view` in [index.html](index.html) with full `data-*` attributes, `tabindex="0"`, and a cover `<img>`; place assets under `image/<project-name>/` and list them in `data-images` in display order.
- When changing layout, extend existing grid and card variants in [style.css](style.css) (`.hero*`, `.hero-card*`, `.hero-meta`) rather than introducing new layout systems, and reuse design tokens from `:root` (`--bg`, `--text`, `--font-*`, `--muted`, `--card-radius`).
- The about page [about.html](about.html) shares the global styles and header; it uses only a tiny inline script to update the footer year—keep it simple and avoid moving shared logic out of [script.js](script.js) unless the pattern is clearly repeated across pages.
- When adding richer long-form descriptions, edit `PROJECT_EXTRA_TEXT` near the top of [script.js](script.js), and ensure each key exactly matches the card’s `data-title` (including case and spacing) so the modal "READ MORE" feature picks it up.