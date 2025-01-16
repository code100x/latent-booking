/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "src/**/*.{ts,tsx,js,jsx,mdx}",
    "app/**/*.{ts,tsx,js,jsx,mdx}",
    "components/**/*.{ts,tsx,js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: {
          gold: '#F8D48D',
        },
        background: {
          dark: '#171717',
          primaryblack: '#0A0A0A'
        }
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        figtree: ['Figtree', 'sans-serif']
      },
    },
  },
  plugins: [],
}