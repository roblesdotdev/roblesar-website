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
  title: string
  summary: string
  date: string | Date
  dateDisplay: string
  tags: Array<string>
  draft?: boolean
}

export type NoteListing = {
  title: string
  summary: string
  date: string | Date
  dateDisplay: string
  tags: Array<string>
  slug: string
}

export type MarkdownNote = {
  frontmatter: Frontmatter
  html: string
}
