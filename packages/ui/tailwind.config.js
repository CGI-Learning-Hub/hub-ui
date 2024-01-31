/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  important: '#root',
  plugins: [],
  corePlugins: {
    preflight: false
  },
}