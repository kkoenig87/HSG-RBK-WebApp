/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'brand-pink': '#ff2d8f',
        'brand-black': '#000000',
        'brand-white': '#ffffff'
      },
    },
  },
  plugins: [],
}
