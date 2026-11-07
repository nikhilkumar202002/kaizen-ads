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
        'chat-bg': 'var(--color-chat-bg)',
        'chat-alt-bg': 'var(--color-chat-alt-bg)',
        'chat-ink': 'var(--color-chat-ink)',
        'chat-muted': 'var(--color-chat-muted)',
        'chat-card': 'var(--color-chat-card)',
        'chat-line': 'var(--color-chat-line)',
      },
      fontFamily: {
        heading: ['"Bricolage Grotesque"', '"Noto Sans JP"', 'sans-serif'],
        sans: ['"DM Sans"', 'sans-serif'],
        kanji: ['"Bricolage Grotesque"', '"Noto Sans JP"', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        pop: 'pop 250ms ease-out forwards',
        blink: 'blink 1.2s infinite ease-in-out',
      },
      keyframes: {
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        pop: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
