// Can not be converted to an ES Module yet...
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "color-1": "#002749",
        "color-2": "#0060a0",
        "color-3": "#00a1ff",
        "color-4": "#00ebff",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
