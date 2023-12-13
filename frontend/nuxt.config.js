export default {
  css: ["~/assets/css/tailwind.css"],
  modules: ["@nuxtjs/tailwindcss", "nuxt3-leaflet", "nuxt-icon"],
  runtimeConfig: {
    public: {
      apiBaseUrl: "http://localhost:8000"
    }
  }
};
