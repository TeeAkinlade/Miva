/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0a314f', // Dark blue/grey
        secondary: '#e93631', // Red
        accent: '#bc9f80', // Muted gold/brown
        // Adding a color for the button similar to the image, as the provided colors don't match the button color.
        buttonPurple: '#6f42c1', // A shade of purple for the button
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}; 