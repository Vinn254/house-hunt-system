/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eaf2ff',
          100: '#cddcf8',
          200: '#aac3ef',
          300: '#7d99dd',
          400: '#5d7bc8',
          500: '#3a5aa9',
          600: '#2a477f',
          700: '#1f3867',
          800: '#172f54',
          900: '#0f2140',
          950: '#081728',
        },
        accent: {
          50: '#fff4e6',
          100: '#ffe7cc',
          200: '#ffd3a0',
          300: '#ffb06a',
          400: '#ff9441',
          500: '#ff7a09',
          600: '#f15f00',
          700: '#d14c02',
          800: '#9b3604',
          900: '#6f2502',
          950: '#461602',
        },
      },
    },
  },
  plugins: [],
}
