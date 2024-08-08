import { vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'
import { defineConfig } from 'vite'
import { vercelPreset } from '@vercel/remix/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

installGlobals()

const ENV_MODE = process.env.NODE_ENV

export default defineConfig({
  build: {
    cssMinify: ENV_MODE === 'production',
    sourcemap: true,
  },
  plugins: [
    remix({ serverModuleFormat: 'esm', presets: [vercelPreset()] }),
    tsconfigPaths(),
  ],
})
