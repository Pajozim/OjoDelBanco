/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      backgroundColor: {
        "nubank-purple-200": "#BA4DE3",
        "nubank-purple-400": "#8A05BE",
        "nubank-purple-500": "#530082",
        "nubank-black": "#191919",
        "nubank-gray": "#27272a ",
      },
      colors: {
        "nubank-white": "#F5F5F5",
      },
      padding: {
        "app-padding": "2rem 1.5rem",
      },
    },
  },
  plugins: [],
};
