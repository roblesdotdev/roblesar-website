export function getMetaTags({
  url,
  title = 'Aldo R. Robles',
  description = 'Full-Stack Web Developer, React, Remix, Typescript, Node and more.',
  keywords = '',
  image = '',
}: {
  url: string
  title?: string
  description?: string
  keywords?: string
  template?: boolean
  image?: string
}) {
  return [
    { title },
    { name: 'description', content: description },
    { name: 'keywords', content: keywords },
    { name: 'image', content: image },
    { name: 'og:url', content: url },
    { name: 'og:title', content: title },
    { name: 'og:description', content: description },
    { name: 'og:image', content: image },
    {
      name: 'twitter:card',
      content: image ? 'summary_large_image' : 'summary',
    },
    { name: 'twitter:creator', content: '@roblesdotdev' },
    { name: 'twitter:site', content: '@roblesdotdev' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
    { name: 'twitter:image:alt', content: title },
  ]
}
