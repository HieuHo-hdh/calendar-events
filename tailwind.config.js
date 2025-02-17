/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          light: '#5684AE',
          dark: '#0F4C81',
        },
        orange: {
          light: '#FFE4C8',
          dark: '#F9BE81',
        },
        grey: {
          light: '#d9d9d9',
        },
        calendarTile: '#E4F6ED',
        background: '#C9EEF6',
      },
    },
  },
  plugins: [],
}

