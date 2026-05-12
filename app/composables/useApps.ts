import { apps } from '~/data/apps'

export interface App {
  id: string
  name: string
  tagline: string
  description: string
  icon: string
  platforms: ('macos' | 'ios' | 'web' | 'windows' | 'linux')[]
  links?: {
    website?: string
    macAppStore?: string
    iosAppStore?: string
  }
  screenshots?: string[]
}

export function useApps() {
  const route = useRoute()
  const router = useRouter()
  const expandedAppId = useState<string | null>('expandedApp', () => null)

  const expandedApp = computed(() => {
    if (!expandedAppId.value) return null
    return apps.find(app => app.id === expandedAppId.value) || null
  })

  function openApp(id: string) {
    expandedAppId.value = id
    router.replace({ query: { app: id } })
  }

  function closeApp() {
    expandedAppId.value = null
    router.replace({ query: {} })
  }

  // Initialize from URL on mount
  function initFromUrl() {
    const appId = route.query.app as string | undefined
    if (appId && apps.find(app => app.id === appId)) {
      expandedAppId.value = appId
    }
  }

  return {
    apps,
    expandedAppId,
    expandedApp,
    openApp,
    closeApp,
    initFromUrl
  }
}
