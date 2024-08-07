export type RawYAMLProject = {
  title?: string
  summary?: string
  date?: string
  tags: Array<string>
  links: Record<string, string>
  draft?: boolean
}

export type ProjectListing = {
  slug: string
  title: string
  summary: string
  date: string
  tags: Array<string>
  links: Record<string, string>
  draft?: boolean
}

export type Frontmatter = {
  slug: string
  title: string
  summary: string
  date: string
  dateDisplay: string
  tags: Array<string>
  draft?: boolean
}

export type NoteListing = {
  title: string
  summary: string
  date: string
  dateDisplay: string
  tags: Array<string>
  slug: string
}

export type MarkdownNote<T = Record<string, unknown>> = {
  markdown: string
  attributes: T
}

type Note = {
  frontmatter: Frontmatter
  html: string
}
