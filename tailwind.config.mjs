import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    container: {
      center: true,
      padding: '1.25rem',
      screens: {
        lg: '75ch',
      },
    },
    extend: {
      screens: {
        xs: '475px',
      },
      fontFamily: {
        sans: ['var(--font-family)', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        canvas: 'hsl(var(--canvas))',
        panel: 'hsl(var(--panel))',
        accent: 'hsl(var(--accent))',
        fg: {
          DEFAULT: 'hsl(var(--fg-default))',
          muted: 'hsl(var(--fg-muted))',
          accent: 'hsl(var(--fg-accent))',
          error: 'hsl(var(--fg-error))',
        },
        border: 'hsl(var(--border))',
      },
    },
  },
  plugins: [],
}
