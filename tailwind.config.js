/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff2052',
        secondary: '#1DA1F2',
        secondary1: '#00a328',
        light_gray: '#D3D3D3'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}

