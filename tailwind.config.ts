import type { Config } from 'tailwindcss'

/**
 * Design tokens de TecServi (Taste Skill v2, modo preserve).
 *
 * Sistema de forma (documentado):
 *  - Controles interactivos (botones, inputs, select, chips): pill (rounded-full)
 *  - Superficies (tarjetas, paneles, acordeones): rounded-2xl (16px)
 *  - Grandes paneles / visuales (mapa, hero, formulario): rounded-3xl (24px)
 * Iconos con fondo (tiles) mantienen rounded-xl (12px).
 * Un solo acento (brand cobalt) en toda la página, neutros ink (grafito frío) +
 * paper. Sombras siempre tintadas al tono de fondo (nunca negro puro).
 */
export default {
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef3ff',
          100: '#dce6ff',
          200: '#b7c8fb',
          300: '#8aa6f5',
          400: '#5b7fec',
          500: '#345edf',
          600: '#2748c8',
          700: '#1c36a1',
          800: '#182e82',
          900: '#162a68',
          950: '#0d1745',
        },
        ink: {
          50: '#f6f7f9',
          100: '#edeff3',
          200: '#d8dce4',
          300: '#b7becb',
          400: '#8e97a8',
          500: '#6f7789',
          600: '#575e6f',
          700: '#464c5a',
          800: '#383d49',
          900: '#262a33',
          950: '#12151c',
        },
        paper: {
          DEFAULT: '#fbfbfd',
          mute: '#f2f3f6',
        },
      },
      fontFamily: {
        sans: ['"Manrope Variable"', 'Manrope', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(18,21,28,0.05), 0 12px 32px -16px rgba(23,42,104,0.18)',
        'card-hover': '0 2px 6px rgba(18,21,28,0.06), 0 24px 48px -20px rgba(39,72,200,0.26)',
        cta: '0 12px 28px -14px rgba(28,54,161,0.55)',
        panel: '0 24px 56px -24px rgba(13,23,69,0.28)',
      },
      zIndex: {
        header: '40',
        grain: '45',
        callbar: '50',
        overlay: '60',
        toaster: '70',
      },
      maxWidth: {
        page: '80rem',
      },
    },
  },
  plugins: [],
} satisfies Config