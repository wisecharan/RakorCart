/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        'background': '#FAF8F5', // Off-white background
        'text-dark': '#333333',   // Main text color
        'primary': '#6B5B4B',     // Dark brown for buttons and accents
        'primary-hover': '#574A3D', // Darker brown for hover
        'border-light': '#E0D8CC', // Light border color
      },
    },
  },
  plugins: [],
};