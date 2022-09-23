/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#222831',
        'primary-purple': '#52057B',
        'secondary-purple': '#892CDC',
        'light-purple': '#BC6FF1',
        'pastel-black': '#121824',
        'pastel-purple': '#b3aae2',
        'pastel-blue': '#7cafd1',
        'pastel-gray': '#bfd1e2'
      },
      fontFamily: {
        'sans': ['"Always Together"', ...defaultTheme.fontFamily.sans]
      },
      keyframes: {
        blink: {
          '50%': { opacity: 0 }
        }
      },
      animation: {
        blink: 'blink 1s linear infinite'
      }
    }
  },
  plugins: []
}
