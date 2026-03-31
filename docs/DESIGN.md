# Design System

## Colors — Sunbeam Amber Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `sunbeam-50` | `#fffbeb` | Hero background gradient |
| `sunbeam-100` | `#fef3c7` | Light accents |
| `sunbeam-200` | `#fde68a` | — |
| `sunbeam-300` | `#fcd34d` | — |
| `sunbeam-400` | `#fbbf24` | **Primary gold** — buttons, accents |
| `sunbeam-500` | `#f59e0b` | Button hover, CTA gradient |
| `sunbeam-600` | `#d97706` | Links, active nav |
| `sunbeam-700` | `#b45309` | Link hover, price text |
| `sunbeam-800` | `#92400e` | — |
| `sunbeam-900` | `#78350f` | — |

Text and backgrounds use Tailwind's `slate` scale.

## Typography
- **Font:** Inter (Google Fonts), weights 400/500/600/700
- **Headings:** `font-bold text-slate-900`
- **Body:** `text-slate-700` or `text-slate-600`

## Primary Button
```
bg-sunbeam-400 hover:bg-sunbeam-500 text-slate-900 font-semibold px-6 py-3 rounded-lg
```

## Layout
- **Content width:** `max-w-6xl` for pages, `max-w-3xl` for blog prose, `max-w-4xl` for inner pages
- **Section spacing:** `py-16 md:py-24`
- **Nav:** Sticky, white background, `border-b border-slate-100`
