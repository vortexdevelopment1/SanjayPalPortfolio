/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#07050c',
        panel: '#0e0b16',
        panel2: '#110d1a',
        line: 'rgba(255,255,255,0.08)',
        muted: '#9793a6',
        accent: '#8b5cf6',
        accent2: '#d946ef',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}
