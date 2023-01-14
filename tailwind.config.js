/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        reddit_gray: {
          DEFAULT: "#DAE0E6",
          brighter: "F6F7F8",
        },
      },
    },
  },
  plugins: [],
};
