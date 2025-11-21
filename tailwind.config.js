/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#2D3748',
        slate: '#4A5568',
        'soft-blue': '#4299E1',
        'accent-teal': '#38B2AC',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'ibm-plex': ['IBM Plex Sans', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}