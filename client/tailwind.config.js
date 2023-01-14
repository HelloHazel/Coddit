/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        reddit_gray: {
          DEFAULT: "#DAE0E6",
          brighter: "#F6F7F8",
        },
        reddit_text: {
          DEFAULT: "#979A9C",
        },
        reddit_orange: {
          DEFAULT: "#FF4500",
        },
        reddit_blue: {
          DEFAULT: "#0079D3",
        },
      },
    },
  },
  plugins: [],
};
