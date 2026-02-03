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
  {
    id: 'time-utils',
    name: 'Time Utils',
    tagline: 'Customizable timers, countdowns, and clocks right on your desktop.',
    description: 'Create floating widgets to track time however you need, whether counting up, counting down to a deadline, or displaying the current time, all with a quick command from the omnibox launcher.',
    icon: '/apps/time-utils/time-utils-icon.png',
    platforms: [
      'macos'
    ],
    links: {
      macAppStore: 'https://apps.apple.com/us/app/time-utils/id6758682107'
    },
    screenshots: [
      '/apps/time-utils/time-utils-img1.jpg',
      '/apps/time-utils/time-utils-img2.jpg',
      '/apps/time-utils/time-utils-img3.jpg',
      '/apps/time-utils/time-utils-img4.jpg'
    ]
  }
]
