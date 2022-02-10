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
      },
      colors: {
        'primary' : '#222831',
        'secondary' : '#393E46',
        'tertiary' : '#00ADB5',
        'quarternary' : '#EEEEEE'
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
