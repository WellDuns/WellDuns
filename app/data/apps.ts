import type { App } from '~/composables/useApps'

export const apps: App[] = [
  {
    id: 'sample-app-1',
    name: 'Sample App',
    tagline: 'A placeholder for your first app',
    description: 'This is a sample app entry to demonstrate the portfolio layout. Replace this with your actual app details, including a full description of features and functionality.',
    icon: '/apps/sample-app-1/icon.png',
    platforms: ['macos', 'ios'],
    links: {
      website: 'https://example.com',
      macAppStore: 'https://apps.apple.com/app/sample',
      iosAppStore: 'https://apps.apple.com/app/sample-ios'
    },
    screenshots: [
      'https://picsum.photos/200/300',
      'https://picsum.photos/200/300',
      'https://picsum.photos/200/300'
    ]
  },
  {
    id: 'sample-app-2',
    name: 'Another App',
    tagline: 'Another placeholder utility',
    description: 'Another sample app to show how multiple apps appear in the grid. Add your real apps here with their actual descriptions, icons, and store links.',
    icon: '/apps/sample-app-2/icon.png',
    platforms: ['web'],
    links: {
      website: 'https://example.com'
    },
    screenshots: []
  }
]
