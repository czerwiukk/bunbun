/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Lato", "sans-serif"],
    },
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["bumblebee"],
  },
};
