import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
// import cloudflare from "@astrojs/cloudflare";
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeSlug from 'rehype-slug'

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://roblesar.cc/',
  build: {
    inlineStylesheets: 'always',
  },
  compressHTML: true,
  prefetch: true,
  // adapter: cloudflare({
  //   platformProxy: {
  //     enabled: true
  //   }
  // })
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
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
    port: 5173,
  },
})
