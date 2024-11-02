import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'primary-light': 'var(--primary-light)',
        primary: "var(--primary)",
        'primary-dark': 'var(--primary-dark)',
        'secondary-light': 'var(--secondary-light)',
        'secondary': 'var(--secondary)',
        'secondary-dark': 'var(--secondary-dark)',
        'error': 'var(--error)',
        'success': 'var(--success)',
      },
    },
  },
  plugins: [],
};
export default config;
