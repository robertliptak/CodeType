/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-white": "#F5F5F5",
        "main-red": "#FF6961",
        "main-green": "#77DD77",
        "main-blue": "#AEC6CF",
        "main-gray": "#2B2B2B",
        "light-gray": "#3A3A3A",
      },
    },
  },
  plugins: [],
};
