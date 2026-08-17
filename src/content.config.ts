import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),

    // Highlights band (see docs/blog-highlights-spec.md). All optional and
    // additive: a highlighted post still appears in the chronological grid
    // unchanged. Cross-field rules (image needs alt, unique ranks, pool size)
    // are warnings at build time, not schema errors - see src/lib/highlights.ts.
    highlight: z.boolean().default(false),
    highlightKicker: z.string().optional(),
    highlightImage: z.string().optional(),
    highlightImageAlt: z.string().optional(),
    highlightExcerpt: z.string().optional(),
    highlightRank: z.number().int().optional(),
  }),
});

export const collections = { blog };
