# Sunbeam Consulting — Implementation Plan

See the full plan in the project's Claude conversation history.

## Build Status
- [x] Step 0/1: Pre-build setup, sunbeam-summary.md
- [x] Session 1: Astro foundation (project init, Tailwind, layout, nav, footer)
- [x] Session 2: Home page (hero, credentials, service cards, CTA, blog preview)
- [x] Session 3: Inner pages (services, about, contact)
- [x] Session 4: Blog setup + 15 posts migrated
- [x] Session 5: Polish (mobile nav, SEO meta, sitemap, favicon, responsive)
- [x] Session 6: GitHub Pages deployment workflow

## Remaining TODOs

### Before Launch
- [x] **Reclaim.ai link** — integrated in `src/pages/contact.astro`
- [x] **Formspree ID** — integrated in `src/components/ContactForm.astro`
- [ ] **Photo** — drop your headshot at `public/images/diana-headshot.jpg` (the about page picks it up automatically)
- [ ] **Enable GitHub Pages** — in repo Settings > Pages, set source to "GitHub Actions"

### Post-Launch
- [ ] **Custom domain** — register domain, add CNAME record, put a `CNAME` file in `public/`, update `site` in `astro.config.mjs`
- [ ] **Google Analytics** — add GA snippet to `src/layouts/BaseLayout.astro` `<head>`
- [ ] **Review blog posts** — spot-check migrated posts for formatting, especially posts with images
- [ ] **LinkedIn links** — verify the LinkedIn company page URL in `src/components/Footer.astro` and personal LinkedIn in `src/pages/about.astro`
