/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        linoBlue: "#102542",
        desertSand: "#F87060",
      },
    },
  },
  plugins: [],
}

