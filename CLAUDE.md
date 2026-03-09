# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static personal website for Praachi Jain Mehta (Career Coach, Youth Mentor, Student Counsellor). No build tools, bundlers, or package managers — pure HTML/CSS/JS served directly.

## Development

Open `index.html` in a browser to preview. No build step required. To serve locally:
```
python3 -m http.server 8000
```

## Architecture

- **`index.html`** — Main single-page site with sections: Hero, About, Services, Achievements/Journey, Blog, Testimonials, Contact (with form)
- **`videos.html`** — Separate videos page (YouTube channel showcase), links back to index.html sections
- **`styles.css`** — All main site styles. Uses CSS custom properties defined in `:root` for theming (colors, typography, spacing, shadows). Key design tokens: `--color-accent: #4D7C6A` (green), `--color-warm: #C4A882` (gold), `--font-serif` for headings, `--font-sans` for body
- **`videos.css`** — Additional styles only for the videos page (imports after styles.css)
- **`script.js`** — Vanilla JS handling: mobile nav toggle, scroll-based nav highlight, IntersectionObserver scroll animations, contact form submission (currently simulated with setTimeout)

## Key Conventions

- Fonts: DM Serif Display (headings) + DM Sans (body) loaded from Google Fonts. Note: `index.html` currently loads Inter/Instrument Serif while `videos.html` loads DM Sans/DM Serif Display — these should be kept consistent
- Navigation is duplicated in both HTML files; changes to nav structure must be updated in both
- Footer is duplicated in both HTML files
- Contact form submission is a placeholder — replace the `setTimeout` in `script.js` with actual backend integration (Formspree, Netlify Forms, etc.)
- Several placeholder values exist in `index.html` (marked with brackets like `[Your Field]`, `[University Name]`, `[Institution]`, etc.) — these need real content
- Video embeds use placeholder divs — replace with actual YouTube `<iframe>` embeds
- Responsive breakpoints: 900px (tablet) and 640px (mobile)
- Inline SVG icons throughout (no icon library dependency)
