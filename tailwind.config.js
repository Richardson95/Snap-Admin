/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF3333',
          dark: '#E62E2E',
          light: '#FF5555',
        },
        dark: {
          DEFAULT: '#0A0E27',
          light: '#1A1E37',
          lighter: '#2A2E47',
        },
        gray: {
          light: '#F5F5F5',
          medium: '#E0E0E0',
          dark: '#9E9E9E',
        }
      },
    },
  },
  plugins: [],
}
