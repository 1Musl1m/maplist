// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@ant-design-vue/nuxt', "nuxt3-leaflet"],
  css: ['~/assets/css/main.css',
    'leaflet/dist/leaflet.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})