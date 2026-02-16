import type { App } from '~/composables/useApps'

export const apps: App[] = [
  {
    id: 'camerascripts',
    name: 'CameraScripts.com',
    tagline: 'Scripts & Camera Cards built for the modern era',
    description: 'CameraScripts is a purpose-built script editor for television production teams, offering a powerful 4-column layout for shot numbers, visual notes, script content, and audio notes, all in your browser. Create, format, and export professional UK-style camera scripts and camera cards (full and half page), with features like locked shot numbering for revisions and read-only sharing for seamless team collaboration. Built for the modern era, it replaces outdated workflows with a streamlined, production-ready tool designed specifically for the way camera scripting actually works. ',
    icon: '/apps/camerascripts/camerascripts-icon.png',
    platforms: [
      'web'
    ],
    links: {
      website: 'https://camerascripts.com/'
    },
    screenshots: [
      '/apps/camerascripts/camerascripts-img1.jpg',
      '/apps/camerascripts/camerascripts-img2.jpg',
      '/apps/camerascripts/camerascripts-img3.jpg'
    ]
  },
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
