module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        warning: '#F59E0B',
        primary: '#e24357',
        'primary-darker': '#a13446',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
