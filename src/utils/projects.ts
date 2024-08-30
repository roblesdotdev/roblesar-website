import { getCollection } from 'astro:content'

export async function getProjects(limit?: number) {
  return (await getCollection('projects'))
    .sort((a, b) => (a.data.date > b.data.date ? -1 : 1))
    .slice(0, limit)
}
