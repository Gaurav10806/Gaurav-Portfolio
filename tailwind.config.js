/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#d1d5db",
        tertiary: "#1a1a1a",
        "black-100": "#0a0a0a",
        "black-200": "#050505",
        "white-100": "#f5f5f5",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #1a1a1a",
        glow: "0 0 20px rgba(255, 255, 255, 0.15)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
