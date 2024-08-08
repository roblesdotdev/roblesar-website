import { DateTime } from 'luxon'
import { processMarkdown } from './md.server'
import {
  type NoteListing,
  type Frontmatter,
  type MarkdownNote,
  type Note,
} from '~/types'
import { z } from 'zod'
import { LRUCache } from 'lru-cache'

const AttributesSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  date: z.string().min(1),
  tags: z.array(z.string().min(1)),
  draft: z.boolean().optional().default(false),
})

type AttributesType = z.infer<typeof AttributesSchema>

const noteContents = Object.fromEntries(
  Object.entries(
    import.meta.glob<MarkdownNote<AttributesType>>('../../content/notes/*.md', {
      eager: true,
    }),
  ).map(([filePath, contents]) => {
    const parsedAttrs = AttributesSchema.safeParse(contents.attributes)
    if (!parsedAttrs.success)
      throw new Error(`Invalid note attrs: ${parsedAttrs.error.message}`)

    const result = { markdown: contents.markdown, attributes: parsedAttrs.data }

    return [
      filePath.replace('../../content/notes/', '').replace(/\.md$/, ''),
      result,
    ]
  }),
)

export function getNoteListing(limit?: number): NoteListing[] {
  return Object.entries(noteContents)
    .map(([key, contents]) => {
      const date = new Date(contents.attributes.date)
      // preprocess notes
      getNoteBySlug(key)
      return {
        ...contents.attributes,
        dateDisplay: formatDate(date),
        slug: key,
      }
    })
    .filter(listing => !listing.draft)
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .slice(0, limit)
}

export async function getNoteBySlug(
  slug: Frontmatter['slug'],
): Promise<Note | null> {
  const cached = notesCache.get(slug)
  if (cached) return cached
  const content = noteContents[slug]
  if (!content || content.attributes.draft) return null

  const attributes = content.attributes
  const { html } = await processMarkdown(content.markdown)
  const date = new Date(attributes.date)

  const note = {
    frontmatter: {
      ...attributes,
      slug,
      dateDisplay: formatDate(date),
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
