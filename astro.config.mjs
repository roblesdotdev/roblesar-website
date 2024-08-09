import { defineConfig } from 'astro/config'

// import cloudflare from "@astrojs/cloudflare";

import tailwind from '@astrojs/tailwind'

import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
  output: 'static',
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
    mdx(),
  ],
})
