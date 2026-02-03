// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,

  app: {
baseURL: '/',
    head: {
      title: 'Well Duns - Small Utility Apps',
      meta: [
        { name: 'description', content: 'A portfolio of small, thoughtful utility apps for macOS, iOS, and the web.' },
        { name: 'msapplication-TileColor', content: '#455195' },
        { name: 'msapplication-TileImage', content: '/favicons/favicon-144-precomposed.png' },
        { name: 'theme-color', content: '#455195' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicons/favicon-192.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/favicon-180-precomposed.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/favicons/favicon-152-precomposed.png' },
        { rel: 'apple-touch-icon', sizes: '144x144', href: '/favicons/favicon-144-precomposed.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/favicons/favicon-120-precomposed.png' },
        { rel: 'apple-touch-icon', sizes: '114x114', href: '/favicons/favicon-114-precomposed.png' },
        { rel: 'apple-touch-icon', sizes: '72x72', href: '/favicons/favicon-72-precomposed.png' },
        { rel: 'manifest', href: '/favicons/manifest.json' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap' }
      ]
    }
  },

  css: ['~/assets/css/main.css']
})
