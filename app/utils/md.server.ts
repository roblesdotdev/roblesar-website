let processor: Awaited<ReturnType<typeof getProcessor>>

export async function processMarkdown(content: string) {
  processor = processor || (await getProcessor())
  const vfile = await processor.process(content)
  const html = vfile.value.toString()
  return { html }
}

async function getProcessor() {
  const [
    { unified },
    { default: remarkParse },
    { default: remarkGfm },
    { default: remarkRehype },
    { default: rehypeSlug },
    { default: rehypeExternalLinks },
    { default: rehypePrettyCode },
    { default: rehypeStringify },
  ] = await Promise.all([
    import('unified'),
    import('remark-parse'),
    import('remark-gfm'),
    import('remark-rehype'),
    import('rehype-slug'),
    import('rehype-external-links'),
    import('rehype-pretty-code'),
    import('rehype-stringify'),
  ])

  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeExternalLinks, {
      target: '_blank',
      rel: ['noopener', 'noreferrer'],
    })
    .use(rehypePrettyCode, { keepBackground: false, theme: 'tokyo-night' })
    .use(rehypeStringify, { allowDangerousHtml: true })
}
