/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#0E0B07",
        dusk: "#1A150E",
        ember: "#2A2217",
        ink: "#F5EEDF",
        sand: "#BDB2A0",
        dust: "#8C8270",
        sun: "#FFC700",
        ochre: "#C07300",
      },
      fontFamily: {
        round: ["Fredoka", "ui-rounded", "system-ui", "sans-serif"],
      },
      boxShadow: {
        lip: "inset 0 -4px 0 #FFC700",
      },
    },
  },
  plugins: [],
};
