<script setup lang="ts">
const { apps, expandedApp, openApp, closeApp, initFromUrl } = useApps()

const appsGrid = ref<HTMLElement | null>(null)
const bottomBracketStyle = ref<{ left: string; right: string }>({ left: '0', right: '0' })

function updateBottomBrackets() {
  if (!appsGrid.value) return

  const children = Array.from(appsGrid.value.children) as HTMLElement[]
  if (children.length === 0) return

  const section = appsGrid.value.parentElement
  if (!section) return

  const sectionRect = section.getBoundingClientRect()

  // Find items on the last row (same offsetTop as the last item)
  const lastItem = children[children.length - 1]
  const lastRowTop = lastItem.offsetTop
  const lastRowItems = children.filter(child => child.offsetTop === lastRowTop)

  // Get the leftmost and rightmost items on the last row
  const leftmost = lastRowItems[0]
  const rightmost = lastRowItems[lastRowItems.length - 1]

  const gridRect = appsGrid.value.getBoundingClientRect()
  const leftmostRect = leftmost.getBoundingClientRect()
  const rightmostRect = rightmost.getBoundingClientRect()

  // Calculate positions relative to the section, with 25px offset from cards
  const offset = 25
  const leftPos = leftmostRect.left - sectionRect.left - offset
  const rightPos = sectionRect.right - rightmostRect.right - offset

  bottomBracketStyle.value = {
    left: `${Math.max(0, leftPos)}px`,
    right: `${Math.max(0, rightPos)}px`
  }
}

onMounted(() => {
  initFromUrl()

  nextTick(() => {
    updateBottomBrackets()
  })

  // Update on resize
  window.addEventListener('resize', updateBottomBrackets)

  // Use ResizeObserver for more reliable updates
  if (appsGrid.value) {
    const observer = new ResizeObserver(updateBottomBrackets)
    observer.observe(appsGrid.value)

    onUnmounted(() => {
      observer.disconnect()
    })
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', updateBottomBrackets)
})
</script>

<template>
  <div class="home">
    <div class="container">
      <section class="apps-section">
        <!-- Apps annotation -->
        <img src="~/assets/appsArrow.svg" alt="" class="apps-annotation" aria-hidden="true" />

        <!-- Drafting bracket - top left corner -->
        <svg class="bracket-corner bracket-top-left" viewBox="0 0 40 40" aria-hidden="true">
          <line x1="0" y1="35" x2="0" y2="-5" />
          <line x1="-5" y1="0" x2="35" y2="0" />
        </svg>

        <!-- Drafting bracket - top right corner -->
        <svg class="bracket-corner bracket-top-right" viewBox="0 0 40 40" aria-hidden="true">
          <line x1="40" y1="35" x2="40" y2="-5" />
          <line x1="5" y1="0" x2="45" y2="0" />
        </svg>

        <!-- Drafting bracket - bottom left corner -->
        <svg class="bracket-corner bracket-bottom-left" :style="{ left: bottomBracketStyle.left }" viewBox="0 0 40 40" aria-hidden="true">
          <line x1="0" y1="5" x2="0" y2="45" />
          <line x1="-5" y1="40" x2="35" y2="40" />
        </svg>

        <!-- Drafting bracket - bottom right corner -->
        <svg class="bracket-corner bracket-bottom-right" :style="{ right: bottomBracketStyle.right }" viewBox="0 0 40 40" aria-hidden="true">
          <line x1="40" y1="5" x2="40" y2="45" />
          <line x1="5" y1="40" x2="45" y2="40" />
        </svg>

        <div ref="appsGrid" class="apps-grid">
          <AppCard
            v-for="app in apps"
            :key="app.id"
            :app="app"
            @click="openApp(app.id)"
          />
          <ComingSoonCard />
        </div>
      </section>
    </div>

    <AppCardExpanded :app="expandedApp" @close="closeApp" />
  </div>
</template>

<style scoped>
.home {
  max-width: 900px;
  margin: 0 auto;
}

.apps-section {
  position: relative;
  padding: var(--spacing-2xl) var(--spacing-lg);
}

/* Apps annotation - bottom-left corner aligns with top-left corner of bracket */
.apps-annotation {
  position: absolute;
  top: 10px;
  left: 0;
  transform: translateY(-100%);
  pointer-events: none;
  user-select: none;
}

/* Drafting bracket corners with overlapping lines */
.bracket-corner {
  position: absolute;
  width: 40px;
  height: 40px;
  overflow: visible;
}

.bracket-corner line {
  stroke: var(--color-primary-light);
  stroke-width: 1.5;
  stroke-linecap: round;
}

.bracket-top-left {
  top: 10px;
  left: 0;
}

.bracket-top-right {
  top: 10px;
  right: 0;
}

.bracket-bottom-left {
  bottom: 10px;
  left: 0; /* default, overridden by dynamic style */
}

.bracket-bottom-right {
  bottom: 10px;
  right: 0; /* default, overridden by dynamic style */
}

.apps-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-lg);
}

.apps-grid > * {
  flex: 0 1 calc(50% - var(--spacing-lg) / 2);
  min-width: 320px;
  max-width: 450px;
}

@media (max-width: 480px) {
  .apps-grid > * {
    flex: 1 1 100%;
    min-width: 0;
    max-width: none;
  }
}

@media (max-width: 768px) {
  .apps-annotation,
  .bracket-corner {
    display: none;
  }

  .apps-section {
    padding: var(--spacing-lg) 0;
  }
}
</style>
