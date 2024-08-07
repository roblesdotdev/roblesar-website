import { DateTime } from 'luxon'
import { z } from 'zod'
import { processMarkdown } from './md.server'
import { invariant, typedBoolean } from './misc'
import { type MarkdownNote, type NoteListing } from '~/types'

const FrontmatterSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  date: z.date(),
  dateDisplay: z.string().default(''),
  tags: z.array(z.string()),
  draft: z.boolean().optional().default(false),
})

const notesContentsBySlug = Object.fromEntries(
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

export async function getNoteBySlug(
  slug: string,
): Promise<MarkdownNote | null> {
  const rawNosteString = notesContentsBySlug[slug]
  if (!rawNosteString) return null
  const { attributes, html } = await processMarkdown(rawNosteString)

  const result = FrontmatterSchema.safeParse(attributes)
  if (!result.success) {
    console.log(result.error)
    throw new Error('Invalid frontmatter')
  }

  const frontmatter = result.data
  const date = frontmatter.date

  if (frontmatter.draft) return null

  const note = {
    frontmatter: { ...frontmatter, dateDisplay: formatDate(date) },
    html,
  }

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

export async function getNotes(): Promise<Array<NoteListing>> {
  const slugs = Object.keys(notesContentsBySlug)
  const notes = (
    await Promise.all(
      slugs.map(async slug => {
        const result = await getNoteBySlug(slug)
        return result ? { slug, ...result.frontmatter } : null
      }),
    )
  ).filter(typedBoolean)

  return notes
}
