import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.25rem',
      screens: {
        lg: '85ch',
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
} satisfies Config
