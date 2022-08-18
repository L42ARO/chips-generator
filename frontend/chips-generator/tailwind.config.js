/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'Monofett':['Monofett', 'cursive']
      },
      colors:{
        'dark-gray':'#2E2E2E',
        'light-gray':'#d1d1d1',
        'ion-dark':'#121212',
        'df-orange':{
          400:'#ff9700',
          500: '#ef6c00',
          800:'#da532c',
          900:'#ba3611'
        },
        'theme':{
          'dark':'#121212',
          'light':'#f1f1f1'
        }
      },
      screens: {
        "2xl-a": { 'raw': '(max-height: 1536px),(max-width: 1536px)' },
        'xl-a': { 'raw': '(max-height: 1280px),(max-width: 1280px)' },
        'lg-a': { 'raw': '(max-height: 1024px),(max-width: 1024px)' },
        'md-a': { 'raw': '(max-height: 768px),(max-width: 768px)' },
        'sm-w':{ 'raw': '(max-width: 640px)' },
        'sm-a': { 'raw': '(max-height: 640px),(max-width: 640px)' },
        'xs-w':{ 'raw': '(max-width: 320px)' },
        'xs-a': { 'raw': '(max-height: 320px),(max-width: 320px)' },
        'xxs-w':{ 'raw': '(max-width: 230px)' },
      },
    },
  },
  plugins: [],
}
