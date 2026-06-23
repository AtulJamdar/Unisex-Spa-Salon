/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'salon-dark': '#1A1A1A',
        'salon-gold': '#C9A84C',
        'salon-gold-light': '#E8C96A',
        'salon-cream': '#F5F0E8',
        'salon-gray': '#2A2A2A',
        'salon-muted': '#888888',
      },
    },
  },
  plugins: [],
};
