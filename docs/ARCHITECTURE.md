# Site Architecture

## Tech Stack
- **Framework:** Astro v6 (static site generation)
- **Styling:** Tailwind CSS v4
- **Content:** Astro Content Collections (Markdown)
- **Deployment:** GitHub Pages via GitHub Actions
- **Contact:** Calendly embed + Formspree form

## Pages
| Path | File | Description |
|------|------|-------------|
| `/` | `src/pages/index.astro` | Home — hero, credentials, services, blog preview, CTA |
| `/about` | `src/pages/about.astro` | Diana's story, credentials, work style |
| `/services` | `src/pages/services.astro` | Detailed service offerings + FAQ |
| `/contact` | `src/pages/contact.astro` | Calendly embed + Formspree form |
| `/blog` | `src/pages/blog/index.astro` | Blog listing grid |
| `/blog/[slug]` | `src/pages/blog/[...slug].astro` | Individual blog posts |

## Components
| Component | Purpose |
|-----------|---------|
| `Nav.astro` | Sticky nav with mobile hamburger menu |
| `Footer.astro` | Site footer with links |
| `Hero.astro` | Home page hero section |
| `CredentialStrip.astro` | Horizontal credential badges |
| `ServiceCard.astro` | Compact service preview card |
| `CTASection.astro` | Full-width call-to-action banner |
| `BlogPostCard.astro` | Blog post preview card |
| `ContactForm.astro` | Formspree contact form |

## Layouts
- `BaseLayout.astro` — HTML shell, meta/OG tags, nav, footer
- `BlogPost.astro` — Blog post wrapper with title, date, tags, prose styling

## Content Collection
- `src/content/blog/*.md` — 15 migrated blog posts
- Schema: title, description, date, tags, draft
