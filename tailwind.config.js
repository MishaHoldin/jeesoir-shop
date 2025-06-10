/** @type {import('tailwindcss').Config} */
export default {
  content: [
   "./components/**/*.{js,vue,ts}",
   "./layouts/**/*.vue",
   "./pages/**/*.vue",
   "./plugins/**/*.{js,ts}",
   "./app.vue",
   "./error.vue",
 ],
 css: ['~/assets/css/main.css', '~/assets/css/fonts.css'],
 theme: {
   extend: {
     screens: {
       'xs': '320px',
       'ml': '975px',
       '2xl': '1480px'
     },

   },
   fontFamily: {
    raleway: ['Raleway'],
  },
 },
 plugins: [],
}

