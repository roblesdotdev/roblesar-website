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
  links: {
    source: string
    website?: string
    [key as string]: string
  }
  draft?: boolean
}
