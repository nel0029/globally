/**
 * @format
 * @type {import('tailwindcss').Config}
 */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#ff2052",
        secondary: "#1DA1F2",
        secondary1: "#00a328",
        light_gray: "#D3D3D3",
        Dark100: "#121212",
        Dark200: "#282828",
        Dark300: "#3f3f3f",
        Dark400: "#575757",
        Dark500: "#717171",
        Dark600: "#8b8b8b",
      },
      aspectRatio: {
        "3/1": "3 / 1",
        "3/2": "3 / 2",
        "4/2": "4 / 2",
        "4/3": "4 / 3",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
