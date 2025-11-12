import defaultTheme from 'tailwindcss/defaultTheme'
import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './resources/views/**/*.blade.php',
    './resources/js/**/*.tsx',
    './resources/js/**/*.ts',
    './resources/js/**/*.jsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        aurora1: {
          '0%':   { transform: 'translate(-10%, -10%) rotate(0deg)' },
          '50%':  { transform: 'translate(20%, 10%) rotate(30deg)'  },
          '100%': { transform: 'translate(-10%, -10%) rotate(0deg)' },
        },
        aurora2: {
          '0%':   { transform: 'translate(20%, -20%) rotate(0deg)'  },
          '50%':  { transform: 'translate(-15%, 15%) rotate(-25deg)'},
          '100%': { transform: 'translate(20%, -20%) rotate(0deg)'  },
        },
        aurora3: {
          '0%':   { transform: 'translate(-25%, 15%) rotate(0deg)'  },
          '50%':  { transform: 'translate(10%, -15%) rotate(20deg)' },
          '100%': { transform: 'translate(-25%, 15%) rotate(0deg)'  },
        },
        shimmer: {
          '0%, 100%': { opacity: 0.45 },
          '50%':      { opacity: 0.8  },
        },
      },
      animation: {
        aurora1: 'aurora1 22s ease-in-out infinite',
        aurora2: 'aurora2 28s ease-in-out infinite',
        aurora3: 'aurora3 26s ease-in-out infinite',
        shimmer: 'shimmer 8s ease-in-out infinite',
      },
      blur: { '4xl': '96px' },
    },
  },
  plugins: [forms],
}
