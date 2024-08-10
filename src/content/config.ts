import { defineCollection, z } from 'astro:content'

const notesCollection = defineCollection({
  type: 'content',
  schema: () =>
    // using zod to define type-safe frontmatter of our mdx files
    // astro will generate types definitions for our project so we can use them in templates
    // also it will check every newly created frontmatter in the content/blog directory
    z.object({
      title: z.string(),
      tags: z.array(z.string()),
      date: z.coerce.date(),
      summary: z.string(),
      draft: z.boolean().optional().default(false),
    }),
})

const projectsCollection = defineCollection({
  type: 'data',
  schema: () =>
    z.object({
      title: z.string(),
      date: z.date(),
      summary: z.string(),
      links: z.object({
        source: z.string().min(1),
        website: z.string().optional(),
      }),
      tags: z.array(z.string()),
    }),
})

// This key should match your collection directory name in "src/content"
export const collections = {
  notes: notesCollection,
  projects: projectsCollection,
}
