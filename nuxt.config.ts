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

  // TODO: https://github.com/unocss/unocss/issues/2113#issuecomment-1423045289
  sourcemap: {
    server: true,
    client: false,
  },

  typescript: {
    shim: false,
  },
});
