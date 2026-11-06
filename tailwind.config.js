/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        'brand-red': 'var(--color-brand-red, #E5314D)',
        'kv-bg': 'var(--color-kv-bg)',
        'kv-alt-bg': 'var(--color-kv-alt-bg)',
        'kv-ink': 'var(--color-kv-ink)',
        'kv-muted': 'var(--color-kv-muted)',
        'kv-card': 'var(--color-kv-card)',
        'kv-line': 'var(--color-kv-line)',
      },
      fontFamily: {
        heading: ['"Bricolage Grotesque"', '"Noto Sans JP"', 'sans-serif'],
        sans: ['"DM Sans"', 'sans-serif'],
        kanji: ['"Bricolage Grotesque"', '"Noto Sans JP"', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
