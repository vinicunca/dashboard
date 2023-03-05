// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '@unocss/reset/tailwind.css',
  ],

  modules: [
    '@pinia/nuxt',
    '@unocss/nuxt',
  ],

  postcss: {
    plugins: {
      'postcss-nested': {},
    },
  },

  typescript: {
    shim: false,
  },
});
