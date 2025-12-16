# AI Coding Agent Instructions for Eric Portfolio

## Overview
- Single-page portfolio built with vanilla HTML, CSS, and JavaScript.
- Entry point: [index.html](index.html); styling in [style.css](style.css); interactivity in [script.js](script.js).
- No build tools or tests; open [index.html](index.html) directly in a browser or via a static server (e.g., Live Server).

## Layout & Components
- Global header: `.site-header` is sticky with glassmorphism; navigation links live in `.site-nav`.
- Category system: `.category-tab` buttons (data-category) toggle matching `.category-view` sections (data-category-view) via JS by adding/removing `hidden` and `is-active`.
- Project grids: each `.category-view` contains one or more `.hero` grids (variants: `.hero`, `.hero--reverse`, `.hero--architecture`) made of `.hero-card` elements laid out by CSS grid areas.
- Hero cards: each `.hero-card` wraps an image and a `.hero-meta` overlay with `.project-name` and `.project-location`; layout variants (`hero-card--tall`, `--wide`, `--small-left`, `--small-right`) are defined only in CSS.
- All interactive cards include `tabindex="0"` so keyboard users can open modals with Enter/Space.

## Modal & Image Lightbox
- Clicking or keyboard-activating a `.hero-card` opens the project modal `#project-modal` via `openModalFromCard` in [script.js](script.js).
- Modal content comes from the card's data attributes: `data-title`, `data-location`, `data-year`, `data-type`, `data-description`, and `data-images` (comma-separated relative URLs).
- Extra long-form copy is stored in `PROJECT_EXTRA_TEXT` in [script.js](script.js); keys must exactly match the `data-title` string to attach additional paragraphs to the modal.
- The modal uses `.modal-backdrop` and `.modal-dialog` with `is-open` / `is-animating` classes plus `aria-hidden` toggling for open/close and animation; close via elements with `[data-modal-close]` or by clicking the backdrop.
- Modal images are rendered into `.modal-image-wrap`; each image is clickable to open the fullscreen image lightbox.
- The fullscreen lightbox `#image-lightbox` cycles through the current project's images using `currentImageUrls` and `currentImageIndex`, with navigation via prev/next buttons, backdrop/cross close buttons (`[data-lightbox-close]`), and keyboard (Esc, Arrow Left/Right).

## Styling Conventions
- Design tokens in `:root` of [style.css](style.css) (`--bg`, `--text`, font vars, `--muted`, `--card-radius`) should be reused instead of hard-coded values.
- Visual language relies on glassmorphism: semi-transparent white backgrounds with `backdrop-filter` blur/saturate and soft shadows on header, `.hero-meta`, modal dialog, and lightbox backdrop.
- Typography uses the "Rajdhani" family for brand, headings, and body; `.project-name` and `.project-location` establish hierarchy and should be reused for new project metadata.
- Cards and overlays use consistent rounded corners (`var(--card-radius)` / 10–18px) and hover/focus transitions; follow the existing `.hero-meta` pattern for any new overlays.

## JavaScript Patterns
- Plain DOM API only; no frameworks or external JS dependencies.
- Elements are selected once at the top of [script.js](script.js) and reused; event listeners are attached directly (no delegation needed for current scale).
- `preloadImages()` walks all `.hero-card` elements, collects URLs from `data-images` or fallback `<img>` sources, and preloads them on `window.load` to make first modal/lightbox interactions smoother—keep `data-images` accurate when adding/editing projects.
- Category switching and the "Projects" nav link keep views in sync by resetting the active tab to `data-category="all"` and showing only the `data-category-view="all"` section.

## Working in This Repo
- When adding a project:
  - Create a new `.hero-card` in the appropriate `.category-view` in [index.html](index.html) with full `data-*` attributes and `tabindex="0"`.
  - Place images under `image/<project-name>/` and list them in `data-images` in display order.
  - Optionally add extra paragraphs under the matching title key in `PROJECT_EXTRA_TEXT` in [script.js](script.js).
- When extending UI or layout:
  - Prefer extending existing classes and variables in [style.css](style.css) and reusing `.hero`, `.hero-card`, and `.hero-meta` patterns over inventing new layout systems.
  - Maintain keyboard accessibility (focusable elements, `aria-*` attributes) and verify modal/lightbox behavior at both desktop widths and the mobile breakpoint defined in [style.css](style.css).