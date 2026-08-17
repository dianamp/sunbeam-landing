# Blog Highlights — implementation spec

Adds a **Highlights** band to the top of the blog index page, and repoints the homepage post strip at the same highlighted posts. Reference mockup: option `2b` in `Blog Highlights.dc.html`.

Assumptions to correct if wrong: posts are markdown files with YAML frontmatter; the blog index renders a 3-column card grid ordered by date descending; there is one blog index route; the homepage contains a strip of three recent posts.

---

## 1. Goal

Let the author manually flag a small number of posts they're especially proud of (a published paper, a podcast appearance) so those posts get a visually distinct, image-led treatment above the chronological grid.

Highlighting is **additive**: a highlighted post still appears in the chronological grid in its normal date position, with its normal card styling and no extra badge. The grid is not filtered, reordered, or deduplicated.

---

## 2. Authoring API (frontmatter)

```yaml
---
title: "Co-authored a study on postpartum health"
date: 2026-07-24
excerpt: "Published in JMIR Formative Research."
highlight: true
highlightKicker: "Published research"
highlightImage: "/images/postpartum-figure.png"
highlightImageAlt: "Figure 3 from the paper: retention by cohort week"
highlightExcerpt: "Published in JMIR Formative Research."
highlightRank: 1
---
```

| Field | Type | Required | Behavior |
|---|---|---|---|
| `highlight` | boolean | yes, to opt in | `true` puts the post in the highlights pool. Absent or `false` = normal post. |
| `highlightKicker` | string | no | Small uppercase label above the title (e.g. "Published research", "Podcast guest"). Free text, not an enum — do not build a taxonomy. Rendered uppercase via CSS; author writes it in sentence case. If omitted, no kicker line renders and the title moves up. |
| `highlightImage` | path | no | Image for the highlight card only. Never used in the grid card. See §5. |
| `highlightImageAlt` | string | required if `highlightImage` is set | Alt text. Build should warn if an image is set without it. |
| `highlightExcerpt` | string | no | Overrides `excerpt` in the highlight card only. Use when the grid excerpt is too long or too generic. Falls back to `excerpt`, truncated to 140 chars at a word boundary. |
| `highlightRank` | integer | no | Manual ordering. Lower = earlier. See §3. |

There is deliberately **no expiry field**. Highlights are removed by deleting `highlight: true` from the post. Do not add date-based rolloff.

Validation at build time (warn, don't fail): `highlightImage` without `highlightImageAlt`; duplicate `highlightRank` values; more than 6 highlighted posts (a signal the author is over-flagging).

---

## 3. Selection and ordering

The band shows **at most 3 cards**.

1. Collect all published posts with `highlight: true`. Drafts and unpublished posts are excluded silently — no warning, no placeholder slot.
2. Sort: posts with `highlightRank` first, ascending; then posts without a rank, by `date` descending.
3. Take the first 3. These render in the band.
4. Any remaining highlighted posts render **only** in the chronological grid, exactly as normal posts. No overflow UI, no "see all highlights" link, no carousel.

Rationale: the value of the band is scarcity. Paging or scrolling it turns it into a second feed. If the author wants a different three, they change `highlightRank`.

### Card count variants

| Highlights in pool | Band rendering |
|---|---|
| 0 | Band is not rendered at all. No empty state, no heading. Page starts with the grid, and the "Recent" label above the grid is also omitted. |
| 1 | Single full-width card, horizontal: image on the left at 380px fixed width, text block to the right, vertically centered. Card height driven by the image at 3:2. |
| 2 | Two cards, each spanning half the content width, vertical layout (image on top) same as the 3-card case. |
| 3+ | Three cards in equal thirds, vertical layout. This is the canonical case in the mockup. |

The post count line ("3 of 14 posts") in the mockup is optional and low priority — implement it only if the total published count is cheap to get. If the pool is larger than 3, it reads `3 of N posts` where N is total published posts, not total highlighted.

---

## 4. Visual spec (option `2b`)

Content column: same max width and horizontal padding as the existing grid. The band is a full-bleed background stripe; its inner content aligns to the grid's content column.

**Band**
- Background `#f4f5f7`
- 1px top and bottom border `#e6e8ec`
- Padding: 38px top, 42px bottom (horizontal from the content column)
- Sits below the page title/subtitle block, above the grid, separated by 40px above

**Band header** — single row, baseline aligned:
- `HIGHLIGHTS` — 11px / 600 / letter-spacing 0.16em / uppercase / `#0f172a`
- 28×3px rounded orange rule `#f5a524`, 14px after the label
- Optional right-aligned count — 12px / 500 / `#8b95a3`
- 24px below the header before the cards

**Highlight card**
- Background `#fff`, 1px border `#e8eaee`, radius 10px, `overflow: hidden`
- Grid gap between cards: 22px
- Entire card is one link to the post
- Image area: 150px tall, `object-fit: cover`, full card width, no radius of its own (clipped by the card)
- Text area padding: 20px 22px 24px
- Kicker: 10px / 600 / 0.12em / uppercase / `#c07f06`
- Title: 19px / 700 / line-height 1.3 / `#0f172a`, 10px below kicker. No line clamp — let it wrap; equalize card heights with the grid, not with truncation.
- Excerpt: 13.5px / 400 / line-height 1.6 / `#5b6472`, 9px below title, clamped to 3 lines
- No "Read more" link inside highlight cards (the whole card is the target)
- Hover: border `#dcdfe5`, `box-shadow: 0 2px 8px rgba(15,23,42,.06)`, 150ms ease. No lift/transform.

**Grid section below**
- `RECENT` label — 11px / 600 / 0.14em / uppercase / `#94a3b8`, 20px above the grid, 44px below the band
- Grid cards are unchanged from today.

Reuse existing type tokens where the values above match something already in the codebase rather than adding one-off literals.

---

## 5. Homepage strip

The homepage's existing three-post strip currently shows the three most recent posts. Change its data source to the highlights selection from §3 (same sort, same top-3).

- **Keep the strip's current visual design.** Do not port the `2b` band styling (gray stripe, `HIGHLIGHTS` heading, orange rule) to the homepage — it already sits in its own section with its own heading and background.
- Two things do carry over into the strip's cards: `highlightKicker` renders as a small uppercase label above the title if present, and `highlightImage` is used as the card image if the strip's cards already have an image slot. If the strip's cards have no image slot today, don't add one.
- `highlightExcerpt` overrides `excerpt` here too, same as §2.
- **Backfill:** the strip must always render three cards. If fewer than three posts are highlighted, fill the remaining slots with the most recent non-highlighted published posts, in date-descending order, appended after the highlights. Backfilled cards render with no kicker.
- If the homepage section has a heading like "Recent writing", change it to something that no longer implies recency — "From the blog".
- Extract the selection logic from §3 into one shared function used by both the blog index and the homepage. The two pages must never disagree about which posts are highlighted.

---

## 6. Images

- No `highlightImage`: render the card **without** an image area — text starts at the top of the card, same padding. Do not substitute a placeholder, gradient, or auto-generated graphic.
- Mixed image/no-image cards in one band is acceptable; cards are top-aligned and equal-height via the grid, so a text-only card simply has more whitespace.
- Aspect: the slot is 150px tall at roughly 340px wide (~2.3:1) and crops with `object-fit: cover`, center. Author guidance: supply images at least 800px wide and avoid images where important content sits near the top or bottom edge.
- Serve responsive `srcset` and `loading="lazy"` per the site's existing image handling. Highlight images are above the fold — if the site has an eager/priority mechanism for hero images, use it here instead of lazy.

---

## 7. Responsive

- ≥1024px: 3 columns as specified
- 640–1023px: highlight cards stack to 2 columns; the 1-card horizontal variant collapses to vertical (image on top) below 768px
- <640px: 1 column; band horizontal padding matches the page's mobile padding; image slot 180px tall
- The band's background stripe stays full-bleed at every width

---

## 8. Accessibility

- Band is a `<section>` with `aria-labelledby` pointing at the `HIGHLIGHTS` heading, which is a real heading element one level below the page `<h1>`
- Card titles are headings one level below that
- One link per card wrapping the whole card; image `alt` from `highlightImageAlt`; decorative-only images are not permitted here (an image with no meaningful alt should not be a `highlightImage`)
- Orange text `#c07f06` on `#fff` passes AA at the kicker's weight; do not lighten it
- Hover styles must have a matching `:focus-visible` state

---

## 9. Non-goals

- No badge, star, or border treatment on highlighted posts inside the chronological grid
- No tag/category filtering UI
- No automatic highlighting based on traffic, recency, or engagement
- No CMS or admin UI — frontmatter only
- No expiry or scheduled rolloff of highlights
- No highlight treatment on any page other than the blog index and the homepage strip
- No change to the homepage strip's layout, card design, or position on the page — data source only

---

## 10. Resolved decisions

Manual removal instead of expiry (§2), drafts excluded silently (§3), homepage heading is "From the blog" (§5). No open questions.



