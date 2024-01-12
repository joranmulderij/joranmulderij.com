/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#570df8",
          "secondary": "#f000b8",
          "accent": "#1dcdbc",
          "neutral": "#2b3440",
          "base-100": "#ecf2ff",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

