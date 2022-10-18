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
        'pastel-gray': '#bfd1e2',
        'pastel-red': '#ff6961',
        'dark-blue': '#122333',
        'switch-red': '#ad4c4a',
        'switch-yellow': '#b69d4e',
        'switch-blue': '#3c598a',
        'switch-gray': '#8c98a6'
      },
      fontFamily: {
        'mono': ['"Super Legend Boy"', ...defaultTheme.fontFamily.mono],
        'sans': ['"Nintendo Switch UI"', ...defaultTheme.fontFamily.sans]
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
