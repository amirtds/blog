const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  future: {
    purgeLayersByDefault: true,
    applyComplexClasses: true,
  },
  purge: {
    content: [
      './src/components/**/*.{js,ts,jsx,tsx}',
      './src/pages/**/*.{js,ts,jsx,tsx}',
    ],
    options: {
      safelist: {
        standard: [/^text-/, /^bg-/, /^hover:border-/, /^focus:/, /^border-/, /^hover:text-/, /^hover:bg-/],
      },
    },
  },
  theme: {
    screens: {
      'xs': '100px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    colors: {
      rose: colors.rose,
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      blue: colors.blue
    },
    extend: {},
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ],
}
