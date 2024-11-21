/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}", 
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'primary-red': '#D52300', 
        'light-red-1' : '#FFF5F3', 
        'light-red-2' : '#FFC2B6', 
        'primary-black' : '#263238', 
      }
    },
    fontFamily: {
      sans: ['"DM Sans"', 'sans-serif'],
    }
  },
  plugins: [
    require('preline/plugin'),
  ],
}