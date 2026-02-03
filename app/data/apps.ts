import type { App } from '~/composables/useApps'

export const apps: App[] = [
  {
    id: 'ratio-calculator',
    name: 'Ratio Calculator',
    tagline: 'Ratio Calculator makes scaling ratios effortless.',
    description: 'Enter your base proportions once, then tap any part to adjust—all other values update instantly, keeping your ratios perfect. Great for cocktails, baking, DIY mixes, and anywhere proportions matter.',
    icon: '/apps/ratio-calculator/ratio-calculator-icon.png',
    platforms: ['macos', 'ios'],
    links: {
      // website: '',
      // macAppStore: '',
      iosAppStore: 'https://apps.apple.com/us/app/ratio-calculator/id1256220385'
    },
    screenshots: [
      '/apps/ratio-calculator/ratio-calculator-img1.png',
      '/apps/ratio-calculator/ratio-calculator-img2.png',
    ]
  },
  // {
  //   id: 'sample-app-2',
  //   name: 'Another App',
  //   tagline: 'Another placeholder utility',
  //   description: 'Another sample app to show how multiple apps appear in the grid. Add your real apps here with their actual descriptions, icons, and store links.',
  //   icon: 'https://picsum.photos/150/150',
  //   platforms: ['web'],
  //   links: {
  //     website: 'https://example.com'
  //   },
  //   screenshots: []
  // }
]
