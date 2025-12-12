# AI Coding Agent Instructions for Eric Portfolio

## Project Overview
- Single-page personal portfolio site built with vanilla HTML, CSS, and (currently minimal) JavaScript.
- Entry point: [index.html](index.html) with a sticky glassmorphism header and a hero section displaying project cards.
- Styling is centralized in [style.css](style.css); [script.js](script.js) exists but is currently empty and ready for interactivity.

## Architecture & Structure
- Layout:
  - Global `<header>` with class `site-header` using `position: sticky` and a frosted glass (backdrop-filter) effect.
  - Main content in `<main>`; current primary section is `.hero`, a responsive grid of `.hero-card` elements.
- Components & classes:
  - `.site-header`, `.brand`, `.site-nav`, `.nav-icons` define the navigation/header bar.
  - `.hero` uses CSS Grid (`grid-template-columns: repeat(2, minmax(300px, 1fr))`) for layout.
  - `.hero-card` wraps an image and `.hero-meta` overlay with project metadata.
  - `.hero-meta` is absolutely positioned within `.hero-card` and uses a glassmorphism overlay revealed on hover/focus.
- Design tokens: CSS variables (`:root`) in [style.css](style.css) define `--bg`, `--text`, fonts (`--font-brand`, `--font-heading`, `--font-body`), `--muted`, and `--card-radius`. Reuse these instead of hard-coding new values when extending styles.

## Styling Conventions
- Typography & fonts:
  - Google Font "Rajdhani" is the primary font for brand, headings, and body text.
  - Classes `.project-name` and `.project-location` demonstrate the intended hierarchy and font usage; mirror these styles for new project metadata.
- Visual style:
  - Heavy use of glassmorphism: semi-transparent white backgrounds with `backdrop-filter: blur(...) saturate(...)` and subtle box-shadows.
  - Rounded corners via `var(--card-radius)` for cards and `border-radius: 18px` for overlays; keep new UI elements visually consistent.
- Interactions:
  - Project meta overlays (`.hero-meta`) are hidden by default (`opacity: 0`, `transform: translateY(10px)`, `pointer-events: none`) and shown on hover/focus (`.hero-card:hover .hero-meta`, `.hero-card:focus-within .hero-meta`).
  - Follow this pattern for any new hover/focus reveals over images or cards.

## JavaScript & Interactivity
- [script.js](script.js) is currently empty; any added JavaScript should:
  - Select elements via their existing semantic classes (e.g., `.site-nav a`, `.hero-card`, `.nav-icons button`).
  - Avoid introducing frameworks; prefer plain DOM APIs.
  - Degrade gracefully if JS is disabled (core layout and content should still work).
- Common future enhancements you may implement:
  - Smooth scrolling to sections (`#projects`, `#news`) when navigation links are clicked.
  - Keyboard and accessibility improvements for interactive elements (e.g., making hero cards focusable and triggering the same overlay behavior via keyboard).

## Assets & Paths
- Image assets live under the `image/` directory, with subfolders per project (e.g., `image/project1/cover.jpg`).
- When adding new projects/cards:
  - Place images in an appropriate `image/<project-name>/` folder.
  - Reference them with relative paths from [index.html](index.html) (e.g., `image/project2/cover.jpg`).

## Workflow & Local Development
- Static site: no build step required.
- Recommended workflow:
  - Open the folder in a browser via a simple static server (e.g., VS Code Live Server) to ensure assets load correctly with relative paths.
  - After HTML/CSS changes, refresh the browser to visually verify layout, hover states, and sticky header behavior.
- There are currently no automated tests or bundlers; changes should be validated manually via the browser.

## Patterns to Follow When Extending
- Keep the portfolio structure simple and consistent:
  - Reuse `.hero-card` and `.hero-meta` patterns when adding new project tiles instead of creating entirely new card styles.
  - Reuse typography classes (`.project-name`, `.project-location`) or extend them minimally.
- Maintain responsiveness:
  - When adjusting the `.hero` grid or adding sections, ensure layouts work from small viewports (via `meta viewport` already present) to larger screens; prefer flexible units and minmax-based grids.
- Accessibility considerations:
  - Preserve and extend ARIA labels on buttons in the header (e.g., `aria-label="Search"`, `"Call"`, `"Language"`).
  - Ensure any new interactive elements are keyboard reachable and visually indicate focus.

## How AI Agents Should Work in This Repo
- Prefer editing existing structures (HTML/CSS classes) over introducing new layout systems or frameworks.
- When adding new features, ensure class names and visual style align with existing patterns and design tokens.
- Keep scripts small and targeted; avoid global side effects and large refactors without explicit user request.
- Before large structural changes, explain the proposed impact on layout and responsiveness to the user for confirmation.