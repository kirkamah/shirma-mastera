/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/renderer/index.html', './src/renderer/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Palette is defined as CSS variables in index.css (themable at runtime).
        ink: 'rgb(var(--c-ink) / <alpha-value>)', // main background (aged leather/wood)
        parchment: 'rgb(var(--c-parchment) / <alpha-value>)', // content pages
        accent: 'rgb(var(--c-accent) / <alpha-value>)', // primary accent
        'accent-deep': 'rgb(var(--c-accent-deep) / <alpha-value>)',
        sidebar: 'rgb(var(--c-sidebar) / <alpha-value>)', // book-spine sidebar
        gold: 'rgb(var(--c-gold) / <alpha-value>)', // ornament accent
        'gold-soft': 'rgb(var(--c-gold-soft) / <alpha-value>)',
        'parchment-dark': 'rgb(var(--c-parchment-dark) / <alpha-value>)',
        'parchment-line': 'rgb(var(--c-parchment-line) / <alpha-value>)',
        'ink-brown': 'rgb(var(--c-ink-brown) / <alpha-value>)', // ink text on parchment
        'ink-soft': 'rgb(var(--c-ink-soft) / <alpha-value>)',
        spell: 'rgb(var(--c-spell) / <alpha-value>)', // «spell» reference links (themed)
        cond: 'rgb(var(--c-cond) / <alpha-value>)' // condition reference links (themed)
      },
      fontFamily: {
        serif: ['"Crimson Text"', '"IM Fell English"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        panel: '0 8px 30px rgba(0,0,0,0.45)'
      },
      keyframes: {
        'dice-pop': {
          '0%': { transform: 'scale(0.6) rotate(-18deg)', opacity: '0.2' },
          '60%': { transform: 'scale(1.25) rotate(8deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' }
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' }
        }
      },
      animation: {
        'dice-pop': 'dice-pop 0.35s ease-out',
        'fade-out': 'fade-out 0.4s ease-in forwards'
      }
    }
  },
  plugins: []
}
