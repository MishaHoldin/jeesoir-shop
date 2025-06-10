// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-21',

  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css', '~/assets/css/fonts.css'],
  modules: [
    "@pinia-plugin-persistedstate/nuxt",
    '@pinia/nuxt',
    '@nuxtjs/apollo',
    'nuxt-swiper',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      graphqlEndpoint: 'https://lovely-dinosaurs-e33bc56888.strapiapp.com/graphql',
    },
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://lovely-dinosaurs-e33bc56888.strapiapp.com/graphql',
      },
    },
  },
  image: {
    strapi: {
      baseURL: ``,
    },
  },
})
