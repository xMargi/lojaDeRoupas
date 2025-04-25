/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Outfit', 'sans-serif'],
        },
        animation: {
          pingOnce: 'pingOnce 0.3s ease-out',
        },
        keyframes: {
          pingOnce: {
            '0%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.3)' },
            '100%': { transform: 'scale(1)' },
          },
        },
      },
    },
    plugins: [],
  }
  