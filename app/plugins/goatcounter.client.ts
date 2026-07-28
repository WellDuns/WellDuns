interface CountOptions {
  path?: string
  title?: string
  event?: boolean
}

declare global {
  interface Window {
    goatcounter?: {
      count: (opts?: CountOptions) => void
    }
  }
}

export default defineNuxtPlugin(() => {
  const router = useRouter()

  // count.js loads async, so buffer anything fired before it's ready
  // (e.g. an app-view event from a /?app=... deep link on first load).
  const pending: CountOptions[] = []
  let flushTimer: ReturnType<typeof setInterval> | null = null

  function count(opts: CountOptions) {
    if (window.goatcounter?.count) {
      window.goatcounter.count(opts)
      return
    }
    pending.push(opts)
    if (!flushTimer) {
      let attempts = 0
      flushTimer = setInterval(() => {
        if (window.goatcounter?.count) {
          pending.splice(0).forEach(o => window.goatcounter!.count(o))
        }
        if (pending.length === 0 || ++attempts > 50) {
          clearInterval(flushTimer!)
          flushTimer = null
        }
      }, 200)
    }
  }

  // count.js only records the initial page load, so count SPA navigations
  // ourselves. Only when the path changes: modal opens/closes mutate the
  // ?app= query and are tracked as events instead of pageviews.
  router.afterEach((to, from) => {
    if (to.path === from.path) return
    count({ path: to.path })
  })

  return {
    provide: {
      trackEvent(name: string) {
        count({ path: name, event: true })
      }
    }
  }
})
