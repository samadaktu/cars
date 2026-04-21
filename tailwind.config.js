/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        black:   '#0A0A0A',
        dark:    '#141414',
        card:    '#1C1C1C',
        card2:   '#222222',
        gold:    '#C9A84C',
        gold2:   '#E5C76B',
        'gold-dim': '#8B6E2A',
        cream:   '#F5F5F5',
        muted:   '#9A9A9A',
        border:  '#2A2A2A',
      },
      fontFamily: {
        serif:   ['"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['Montserrat', 'system-ui', 'sans-serif'],
        mono:    ['"Roboto Mono"', 'monospace'],
      },
      animation: {
        pulse2:    'pulse2 1.5s ease-in-out infinite',
        bounce2:   'bounce2 2s ease-in-out infinite',
        fadeUp:    'fadeUp 0.5s ease both',
        shimmer:   'shimmer 1.5s infinite',
      },
      keyframes: {
        pulse2:  { '0%,100%': { opacity: 1, transform: 'scale(1)' }, '50%': { opacity: 0.5, transform: 'scale(1.3)' } },
        bounce2: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(8px)' } },
        fadeUp:  { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      backgroundImage: {
        'grid-gold': "linear-gradient(rgba(201,168,76,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,.04) 1px,transparent 1px)",
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
    },
  },
  plugins: [],
}
