import { DateTime } from 'luxon'
import { processMarkdown } from './md.server'
import { z } from 'zod'
import { LRUCache } from 'lru-cache'
import { invariant } from './misc'

const AttributesSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  date: z.date().or(z.string()),
  tags: z.array(z.string().min(1)),
  draft: z.boolean().optional().default(false),
})

const MarkdownNoteListingSchema = AttributesSchema.extend({
  slug: z.string().min(1),
  dateDisplay: z.string().min(1),
})

export type NoteListing = z.infer<typeof MarkdownNoteListingSchema>

export type Note = {
  frontmatter: NoteListing
  html: string
}

const noteContents = Object.fromEntries(
  Object.entries(
    import.meta.glob('../../content/notes/*.md', {
      query: '?raw',
      import: 'default',
      eager: true,
    }),
  ).map(([filePath, contents]) => {
    invariant(
      typeof contents === 'string',
      `Expected ${filePath} to be a string, but got ${typeof contents}`,
    )
    return [
      filePath.replace('../../content/notes/', '').replace(/\.md$/, ''),
      contents,
    ]
  }),
)

export async function getNoteListing(limit?: number): Promise<NoteListing[]> {
  const slugs = Object.keys(noteContents)
  const listings: Array<NoteListing> = []
  for (const slug of slugs) {
    const note = await getNoteBySlug(slug)
    if (!note.frontmatter.draft) {
      listings.push({ ...note.frontmatter, slug })
    }
  }
  return listings
    .slice(0, limit)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getNoteBySlug(slug: string): Promise<Note> {
  const cached = notesCache.get(slug)
  if (cached) return cached
  const contents = noteContents[slug]
  if (!contents) {
    throw new Response('Not Found', { status: 404, statusText: 'Not Found' })
  }

  const { attributes, html } = await processMarkdown(contents)

  const result = AttributesSchema.safeParse(attributes)
  if (!result.success) {
    throw new Error('Invalid note attributes')
  }

  const frontmatter = result.data
  const date = new Date(frontmatter.date)

  const note = {
    frontmatter: {
      dateDisplay: formatDate(date),
      slug,
      ...frontmatter,
    },
    html,
  }

  notesCache.set(slug, note)

  return note
}

function formatDate(date: Date) {
  const offset = new Date().getTimezoneOffset()
  return (
    DateTime.fromJSDate(date)
      // Necessary to set the offset for local development
      .plus({ minutes: offset })
      .toLocaleString(DateTime.DATE_FULL, {
        locale: 'en-US',
      })
  )
}

const notesCache = new LRUCache<string, Note>({
  maxSize: 1024 * 1024 * 12, // 12 mb
  sizeCalculation(value, key) {
    return JSON.stringify(value).length + (key ? key.length : 0)
  },
})
