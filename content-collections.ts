import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';
import remarkGfm from 'remark-gfm';
import { z } from 'zod';

// const postContentSchema = z.object({
//   type: z.enum(['paragraph', 'heading', 'list', 'image', 'code', 'blockquote']),
//   value: z.any(),
// });

export const postSchema = z.object({
  title: z.string(),
  slug: z.string(),
  image: z.string(), // Changed from 'coverImage' to match JSON
  summary: z.string(),
  content: z.string(),
  categories: z.array(z.string()),
  author: z.string(),
  createdAt: z.coerce.date().transform((d) => d.toISOString()),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export type PostValues = z.infer<typeof postSchema>;

const posts = defineCollection({
  name: 'posts',
  directory: 'generated-posts',
  include: '**/*.md',
  schema: postSchema,
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm],
    });
    return {
      ...document,
      mdx,
    };
  },
});

export default defineConfig({
  collections: [posts],
});
