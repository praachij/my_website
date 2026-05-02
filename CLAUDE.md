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
- **`styles.css`** — All main site styles. Uses CSS custom properties defined in `:root` for theming (colors, typography, spacing, shadows). Key design tokens: `--accent: #1F3A5F` (Prussian/ink blue), `--accent-deep: #142844`, `--accent-light: #E8EEF4`, `--accent-glow: #3D6FA0`, `--warm: #C2A267` (gold), `--serif: 'Instrument Serif'` for headings, `--sans: 'Inter'` for body
- **`videos.css`** — Additional styles only for the videos page (imports after styles.css)
- **`script.js`** — Vanilla JS handling: mobile nav toggle, scroll-based nav highlight, IntersectionObserver scroll animations, contact form submission (currently simulated with setTimeout)

## Key Conventions

- Palette: Prussian blue (`--accent: #1F3A5F`) + warm gold (`--warm: #C2A267`) on cream (`--bg: #FAF8F5`) with deep navy (`#0A1A2E`) for dark sections. Avoid greens and saturated/royal blues — stick to muted, editorial-feeling tones that work across web, print (book), and podcast cover art.
- Fonts: DM Serif Display (headings) + DM Sans (body) loaded from Google Fonts. Note: `index.html` currently loads Inter/Instrument Serif while `videos.html` loads DM Sans/DM Serif Display — these should be kept consistent
- Navigation is duplicated in both HTML files; changes to nav structure must be updated in both
- Footer is duplicated in both HTML files
- Contact form submission is a placeholder — replace the `setTimeout` in `script.js` with actual backend integration (Formspree, Netlify Forms, etc.)
- Several placeholder values exist in `index.html` (marked with brackets like `[Your Field]`, `[University Name]`, `[Institution]`, etc.) — these need real content
- Video embeds use placeholder divs — replace with actual YouTube `<iframe>` embeds
- Responsive breakpoints: 900px (tablet) and 640px (mobile)
- Inline SVG icons throughout (no icon library dependency)
