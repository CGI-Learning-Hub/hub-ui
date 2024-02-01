/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "black": "#0C2340",
      }
    },
  },
  important: '#root',
  plugins: [],
  corePlugins: {
    preflight: false
  },
}