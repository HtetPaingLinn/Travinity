/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'cruise-sm-custom': '767px',
        'lg-custom': '1300px',
      },
    },
  },
  plugins: [],
}

