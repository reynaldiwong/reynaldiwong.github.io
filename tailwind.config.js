/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        koi: {
          dark: 'rgb(var(--koi-dark) / <alpha-value>)', // Deep Pond Blue
          water: 'rgb(var(--koi-water) / <alpha-value>)', // Teal Water
          'water-light': 'rgb(var(--koi-water-light) / <alpha-value>)', // Light Teal
          'fish-orange': 'rgb(var(--koi-fish-orange) / <alpha-value>)', // Koi Orange
          'fish-red': 'rgb(var(--koi-fish-red) / <alpha-value>)', // Koi Red
          'fish-white': 'rgb(var(--koi-fish-white) / <alpha-value>)', // Koi White/Scale
          leaf: 'rgb(var(--koi-leaf) / <alpha-value>)', // Lily Pad Green
          sand: 'rgb(var(--koi-sand) / <alpha-value>)', // Sand/Detail
        }
      },
      fontFamily: {
        'pixel-title': ['"Press Start 2P"', 'cursive'],
        'pixel-body': ['"VT323"', 'monospace'],
      },
      backgroundImage: {
        'pixel-pattern': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z' fill='%23114b5f' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
      }
    },
  },
  plugins: [],
}
