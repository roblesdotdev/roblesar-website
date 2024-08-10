import defaultTheme from 'tailwindcss/defaultTheme'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    container: {
      center: true,
      padding: '1.25rem',
      screens: {
        lg: '80ch',
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
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
       typography: (theme: any) => ({
        DEFAULT: {
          css: {
            '--tw-prose-headings': theme('colors.fg.DEFAULT'),
            '--tw-prose-body': theme('colors.fg.muted'),
            '--tw-prose-links': theme('colors.fg.accent'),
            '--tw-prose-bold': theme('colors.fg'),
            '--tw-prose-counters': theme('colors.fg.muted'),
            '--tw-prose-bullets': theme('colors.fg.muted'),
            '--tw-prose-hr': theme('colors.border'),
            '--tw-prose-quotes': theme('colors.fg'),
            '--tw-prose-quote-borders': theme('colors.border[50]'),
            '--tw-prose-code': theme('colors.fg.DEFAULT'),
            '--tw-prose-pre-bg': theme('colors.panel'),
          },
        },
      }),
    },
  },
  plugins: [typography],
}
