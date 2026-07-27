import { apps } from '../../../app/data/apps'

// Prerendered during `nuxt generate` (see nitro.prerender.routes in nuxt.config.ts),
// so this ships as a static file the TimeUtilsHelper app polls for updates.
export default defineEventHandler(() => {
  const app = apps.find(a => a.id === 'timeutils-helper')
  if (!app?.update) {
    throw createError({ statusCode: 404, message: 'No update info for timeutils-helper' })
  }
  return {
    version: app.update.version,
    build: app.update.build,
    url: `https://wellduns.com/?app=${app.id}`
  }
})
