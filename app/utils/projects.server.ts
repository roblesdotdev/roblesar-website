import yaml from 'yaml'
import { invariant, typedBoolean } from './misc'
import { type ProjectListing, type RawYAMLProject } from '~/types'

const projectsContentsBySlug = Object.fromEntries(
  Object.entries(
    import.meta.glob(`../../content/projects/*.yml`, {
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
      filePath.replace(`../../content/projects/`, '').replace(/\.yml$/, ''),
      contents,
    ]
  }),
)

function getProject(slug: string): ProjectListing | null {
  const rawProjectString = projectsContentsBySlug[slug]
  if (!rawProjectString) return null
  let rawProject
  try {
    rawProject = yaml.parse(rawProjectString) as RawYAMLProject
  } catch (error: unknown) {
    console.error(`Error parsing YAML`, error, rawProjectString)
    return null
  }
  if (!rawProject.title) {
    console.error('Project has no title', rawProject)
    return null
  }
  const {
    title,
    summary = 'This project is... indescribeable',
    tags = [],
    links = {},
    draft,
    date,
  } = rawProject

  // Ignore if not have title or date
  if (!date || !title || !links['source']) return null

  return {
    slug,
    date,
    title,
    summary,
    tags,
    links: {
      ...links,
      source: links.source,
    },
    draft,
  }
}

export function getProjects(): ProjectListing[] {
  const slugs = Object.keys(projectsContentsBySlug)
  return slugs
    .map(slug => getProject(slug))
    .filter(typedBoolean)
    .filter(project => !project.draft)
    .sort((a, b) => (a.date > b.date ? -1 : 1))
}
