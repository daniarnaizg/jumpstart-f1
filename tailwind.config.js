/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'formula1-bold': ['Formula1-Bold', 'sans-serif'],
        'formula1-regular': ['Formula1-Regular', 'sans-serif'],
        'formula1-wide': ['Formula1-Wide', 'sans-serif']
      }
    },
  },
  plugins: [],
};
