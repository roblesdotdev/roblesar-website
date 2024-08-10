import { getCollection } from 'astro:content'

export async function getProjects() {
  return (await getCollection('projects')).sort((a, b) =>
    a.data.date > b.data.date ? -1 : 1,
  )
}
