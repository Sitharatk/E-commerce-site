/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['"Cinzel Decorative"', 'cursive'],
        parisienne: ['Parisienne', 'cursive'], 
        engagement: ['Engagement', 'cursive'],
        ewert: ['Ewert', 'cursive'],
        italianno: ['Italianno', 'cursive'],
      },
    },
  },
  plugins: [],
}

