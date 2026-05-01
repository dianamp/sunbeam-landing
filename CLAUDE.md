# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Requires Node >= 22.12.0. Uses npm.

- `npm run dev` — local dev server at `localhost:4321`
- `npm run build` — static build to `./dist/`
- `npm run preview` — serve the built site locally
- `npm run astro -- <cmd>` — Astro CLI passthrough (`astro check`, `astro add`, etc.)

There is no test suite, linter, or formatter configured. Validation is `npm run build` (Astro will report content-collection schema errors and broken references at build time).

## Architecture

Static marketing site for Sunbeam Consulting. Astro v6 + Tailwind v4 + MDX, deployed to GitHub Pages.

**Routing.** File-based via `src/pages/`. Top-level pages: `index`, `about`, `services`, `contact`. Blog lives at `src/pages/blog/index.astro` (listing) and `src/pages/blog/[...slug].astro` (dynamic post route, uses `getStaticPaths` over the `blog` collection).

**Content collection.** Blog posts are Markdown in `src/content/blog/*.md`, loaded via the glob loader in `src/content.config.ts`. Schema enforces `title`, `description`, `date`, `tags[]`, `draft`. Adding a post = drop a `.md` file with valid frontmatter; the dynamic route picks it up automatically. Slug = filename. `[...slug].astro` does not currently filter `draft: true`, so draft posts render if you build.

**Layouts vs components.** `src/layouts/BaseLayout.astro` is the HTML shell — sets `<title>`, description, canonical URL, Open Graph / Twitter meta, loads Inter from Google Fonts, and includes `Nav`/`Footer`. Every page wraps in `BaseLayout`. `BlogPost.astro` wraps individual posts with prose styling. `src/components/` holds presentational pieces (`Hero`, `ServiceCard`, `CTASection`, `Testimonials`, `ContactForm`, etc.).

**Styling.** Tailwind v4 is wired through the Vite plugin (`@tailwindcss/vite` in `astro.config.mjs`), not a PostCSS config. The theme is defined inline in `src/styles/global.css` under `@theme { ... }` — this is where the custom `sunbeam-*` amber palette and the `Inter` font family live. To add a new color/token, edit that block. Blog post prose styles (`.prose h1`, etc.) are also in `global.css` and use `@apply`.

**Site config.** `astro.config.mjs` sets `site: 'https://sunbeamconsulting.com'` (used for canonical URLs, sitemap, OG tags) and registers the `sitemap()` and `mdx()` integrations. If the production domain changes, update `site` here.

**Deployment.** `.github/workflows/deploy.yml` builds on push to `main` and publishes `./dist` via `actions/deploy-pages@v4`. No staging environment.

**Third-party integrations.** Calendly link in `src/pages/contact.astro`, Formspree form action in `src/components/ContactForm.astro`. These are hardcoded — change them in those files.

## Conventions

- Design tokens live in `src/styles/global.css` (`@theme` block). Use `bg-sunbeam-400`, `text-sunbeam-700`, etc. — don't hardcode hex.
- Section pattern: `py-16 md:py-24` with `max-w-6xl` (pages), `max-w-4xl` (inner pages), or `max-w-3xl` (blog prose) inside `mx-auto px-6`.
- Primary button: `bg-sunbeam-400 hover:bg-sunbeam-500 text-slate-900 font-semibold px-6 py-3 rounded-lg`.
- Images go in `public/images/` and are referenced with absolute paths (`/images/foo.jpg`).
- `backgound/` (sic) and `.playwright-mcp/` are gitignored — raw source docs and tooling artifacts, not site content.

## Reference docs

`docs/ARCHITECTURE.md`, `docs/DESIGN.md`, `docs/CONTENT.md`, `docs/PLAN.md` — internal notes from the initial build. `sunbeam-summary.md` at the repo root captures business positioning and copy reference.
