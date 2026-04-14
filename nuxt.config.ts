import Aura from '@primeuix/themes/aura'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  modules: ['@primevue/nuxt-module'],

  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },

  css: [
    'primeicons/primeicons.css',
    '~/assets/styles/main.css'
  ],

  runtimeConfig: {
    databaseUrl:
      process.env.DATABASE_URL ||
      'postgresql://postgres:postgres@localhost:5432/writing_systems?schema=public',
  },

  nitro: {
    preset: 'netlify',
    experimental: {
      openAPI: true,
    },
  },
})
