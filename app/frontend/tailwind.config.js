/** @type {import('tailwindcss').Config} */
module.exports = {
    blocklist: ["overline"],
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0B0C0E',
        panel: '#14161B',
        elevated: '#1A1D24',
        edge: '#222630',
        edgehi: '#313745',
        volt: '#CCFF00',
        neon: '#00F0FF',
        ember: '#FF5500'
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif']
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
