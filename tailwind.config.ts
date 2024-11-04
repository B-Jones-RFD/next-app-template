import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'primary-light': 'var(--primary-light)',
        primary: 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
        'secondary-light': 'var(--secondary-light)',
        secondary: 'var(--secondary)',
        'secondary-dark': 'var(--secondary-dark)',
        error: 'var(--error)',
        success: 'var(--success)',
      },
      keyframes: {
        'slide-in-right': {
          from: {
            transform: 'translateX(-100%)',
            opacity: '0',
          },
          to: {
            transform: 'translateX(0%)',
            opacity: '1',
          },
        },
        'slide-out-left': {
          from: {
            transform: 'translateX(0%)',
            opacity: '1',
          },
          to: {
            transform: 'translateX(-100%)',
            opacity: '0',
          },
        },
      },
      animation: {
        'slide-in-right': 'slide-in-right 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-out-left': 'slide-out-left 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
export default config
