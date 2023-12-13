/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "components/**/*.{vue,js,ts}",
    "components/*.{vue,js,ts}",
    "layouts/**/*.vue",
    "pages/**/*.vue",
    "app.vue",
    "plugins/**/*.{js,ts}",
    "nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1840px',
        '4xl': '2000px',
      },
    },
  },
  plugins: [],
}

