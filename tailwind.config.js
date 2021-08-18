module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      container: {
        center: true
      },
      screens: {
        'xxs' : '360px'
      } 
    },
  },
  variants: {
    extend: {
      scrollbar: ['rounded']
    },
  },
  plugins: [
    require("tailwind-scrollbar")
  ],
}
