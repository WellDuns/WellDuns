// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,

  app: {
    // If deploying to https://<user>.github.io/<repo>/, set baseURL: '/<repo>/'
    // If using a custom domain or root github.io, leave as '/'
    baseURL: '/',
    head: {
      title: 'Well Duns - Small Utility Apps',
      meta: [
        { name: 'description', content: 'A portfolio of small, thoughtful utility apps for macOS, iOS, and the web.' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap' }
      ]
    }
  },

  css: ['~/assets/css/main.css']
})
