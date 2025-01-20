/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "2xl": "1536px", // Custom breakpoint
        "3xl": "1800px", // Another custom breakpoint
      },
      colors: {
        pr: "#727D73",
        sec: "#AAB99A",
        ter: "#D0DDD0",
        delta: "#F0F0D7",
      },
      fontFamily: {
        sans: ["sans-serif", "system-ui"], // Primary font
        poppins: ["Poppins", "sans-serif"], // Add Poppins
      },
      
    },
  },
  plugins: [],
};
