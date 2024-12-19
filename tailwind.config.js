/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        '2xl': '1536px', // Custom breakpoint
        '3xl': '1800px', // Another custom breakpoint
      },
    },
  },
  plugins: [],
};
