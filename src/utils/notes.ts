import { getCollection } from 'astro:content'

export async function getNotes(limit?: number) {
  const notes = (await getCollection('notes'))
    .filter(({ data }) => (import.meta.env.PROD ? !data.draft : true))
    .sort((a, b) => (a.data.date > b.data.date ? -1 : 1))
    .slice(0, limit)
  return notes
}
