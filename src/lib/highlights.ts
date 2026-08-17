import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

/** The band shows at most 3 cards. Extra highlights fall through to the grid only. */
export const MAX_HIGHLIGHT_CARDS = 3;

/** More than this many highlighted posts is a signal the author is over-flagging. */
const OVER_FLAGGING_THRESHOLD = 6;

/** Length the base description is cut to when there is no explicit highlightExcerpt. */
const EXCERPT_FALLBACK_CHARS = 140;

const byDateDesc = (a: BlogPost, b: BlogPost) => b.data.date.valueOf() - a.data.date.valueOf();

function truncateAtWord(text: string, max: number): string {
  if (text.length <= max) return text;
  const slice = text.slice(0, max + 1);
  const lastSpace = slice.lastIndexOf(' ');
  const cut = lastSpace > 0 ? slice.slice(0, lastSpace) : text.slice(0, max);
  return `${cut.replace(/[\s,;:.]+$/, '')}…`;
}

/**
 * Highlight-card excerpt: the explicit override if given, otherwise the post's
 * description trimmed to a word boundary so long grid copy doesn't blow out the card.
 */
export function highlightExcerpt(post: BlogPost): string {
  return post.data.highlightExcerpt ?? truncateAtWord(post.data.description, EXCERPT_FALLBACK_CHARS);
}

async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort(byDateDesc);
}

/**
 * Ranked posts first (ascending), then unranked by date descending.
 * Drafts are already gone by this point, dropped silently per spec.
 */
function sortHighlights(pool: BlogPost[]): BlogPost[] {
  const ranked = pool
    .filter((p) => p.data.highlightRank !== undefined)
    .sort((a, b) => a.data.highlightRank! - b.data.highlightRank!);
  const unranked = pool.filter((p) => p.data.highlightRank === undefined).sort(byDateDesc);
  return [...ranked, ...unranked];
}

let warned = false;

/** Build-time validation. Warns, never fails, and only fires once per build. */
function warnOnce(pool: BlogPost[]): void {
  if (warned) return;
  warned = true;

  for (const post of pool) {
    if (post.data.highlightImage && !post.data.highlightImageAlt) {
      console.warn(
        `[highlights] "${post.id}" sets highlightImage without highlightImageAlt. ` +
          `Alt text is required for highlight images; the card will render without the image.`
      );
    }
  }

  const seenRanks = new Map<number, string>();
  for (const post of pool) {
    const rank = post.data.highlightRank;
    if (rank === undefined) continue;
    const existing = seenRanks.get(rank);
    if (existing) {
      console.warn(
        `[highlights] duplicate highlightRank ${rank} on "${existing}" and "${post.id}". ` +
          `Order between them is not stable.`
      );
    } else {
      seenRanks.set(rank, post.id);
    }
  }

  if (pool.length > OVER_FLAGGING_THRESHOLD) {
    console.warn(
      `[highlights] ${pool.length} posts are highlighted (threshold ${OVER_FLAGGING_THRESHOLD}). ` +
        `Only ${MAX_HIGHLIGHT_CARDS} render in the band; the rest appear in the grid only.`
    );
  }
}

/** The posts that render in the highlights band, in display order. At most 3. */
export async function getHighlights(): Promise<BlogPost[]> {
  const published = await getPublishedPosts();
  const pool = published.filter((p) => p.data.highlight);
  warnOnce(pool);
  return sortHighlights(pool).slice(0, MAX_HIGHLIGHT_CARDS);
}

export interface StripEntry {
  post: BlogPost;
  /** False for backfilled posts, which render without a kicker. */
  isHighlight: boolean;
}

/**
 * Homepage strip: the same top-3 highlights as the band, backfilled with the most
 * recent non-highlighted posts so the strip always renders `count` cards.
 * Overflow highlights are not used as backfill - they belong to the grid.
 */
export async function getStripPosts(count = MAX_HIGHLIGHT_CARDS): Promise<StripEntry[]> {
  const published = await getPublishedPosts();
  const highlights = await getHighlights();

  const backfill = published.filter((p) => !p.data.highlight);

  return [
    ...highlights.map((post) => ({ post, isHighlight: true })),
    ...backfill.map((post) => ({ post, isHighlight: false })),
  ].slice(0, count);
}

/** Total published posts, for the band's "3 of N posts" count. */
export async function getPublishedCount(): Promise<number> {
  return (await getPublishedPosts()).length;
}
