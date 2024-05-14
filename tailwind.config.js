/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {


      gridTemplateColumns:{
        'ram':'repeat(auto-fit, minmax(325px,2fr))',
        'ram2':'repeat(auto-fit, minmax(400px,1fr))',
        'ram3':'repeat(4, minmax(150px,1fr))',
      },


      fontFamily: {
        burtons: "burtons",
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
