import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@astrojs/mdx'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeSlug from 'rehype-slug'

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://site.roblesar.cc/',
  build: {
    inlineStylesheets: 'always',
  },
  compressHTML: true,
  prefetch: true,
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
    },
  },
  integrations: [
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        theme: 'tokyo-night',
        wrap: true,
      },
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeExternalLinks,
          { target: '_blank', rel: ['noopener', 'noreferrer'] },
        ],
      ],
    }),
    sitemap(),
  ],
  server: {
    port: 3000,
  },
})
