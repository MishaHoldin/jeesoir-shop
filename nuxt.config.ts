// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-21',

  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
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
      graphqlEndpoint: 'https://99a6-31-148-20-67.ngrok-free.app/graphql',
    },
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://99a6-31-148-20-67.ngrok-free.app/graphql',
      },
    },
    // для SSR:
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
      query: {
        fetchPolicy: 'network-only',
      },
    },
  },
  image: {
    strapi: {
      baseURL: `https://99a6-31-148-20-67.ngrok-free.app`,
    },
  },
})
