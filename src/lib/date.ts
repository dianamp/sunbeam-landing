/**
 * Format a post date for display.
 *
 * Frontmatter dates are bare `YYYY-MM-DD`, which `z.coerce.date()` parses as UTC
 * midnight. Formatting that in a timezone behind UTC lands on the previous day, so
 * a post dated 2026-08-14 renders as "August 13, 2026". Pin the output to UTC so
 * the date shown always matches the date the author wrote, on any build machine.
 */
export function formatPostDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Machine-readable `YYYY-MM-DD` for a <time datetime> attribute. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
