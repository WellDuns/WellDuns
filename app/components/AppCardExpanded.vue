<script setup lang="ts">
import type { App } from '~/composables/useApps'

const props = defineProps<{
  app: App | null
}>()

const emit = defineEmits<{
  close: []
}>()

function handleBackdropClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    emit('close')
  }
}

function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})

watch(() => props.app, (newApp) => {
  if (import.meta.client) {
    if (newApp) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
}, { immediate: true })
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="app" class="modal-backdrop" @click="handleBackdropClick">
        <div class="modal-container" role="dialog" aria-modal="true" :aria-labelledby="`modal-title-${app.id}`">
          <button class="modal-close" @click="emit('close')" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>

          <div class="modal-header">
            <div class="modal-icon">
              <img :src="app.icon" :alt="`${app.name} icon`" />
            </div>

            <div class="modal-title-section">
              <h2 :id="`modal-title-${app.id}`" class="modal-title">{{ app.name }}</h2>
              <p class="modal-tagline">{{ app.tagline }}</p>

              <div class="modal-platforms">
                <OsTag v-for="platform in app.platforms" :key="platform" :platform="platform" />
              </div>
            </div>
          </div>

          <div class="modal-body">
            <p class="modal-description">{{ app.description }}</p>

            <div v-if="app.links" class="modal-links">
              <StoreButton
                v-if="app.links.website"
                type="website"
                :url="app.links.website"
              />
              <StoreButton
                v-if="app.links.macAppStore"
                type="mac-app-store"
                :url="app.links.macAppStore"
              />
              <StoreButton
                v-if="app.links.iosAppStore"
                type="ios-app-store"
                :url="app.links.iosAppStore"
              />
            </div>

            <div v-if="app.screenshots && app.screenshots.length > 0" class="modal-screenshots">
              <h3 class="screenshots-title">Screenshots</h3>
              <div class="screenshots-grid">
                <img
                  v-for="(screenshot, index) in app.screenshots"
                  :key="index"
                  :src="screenshot"
                  :alt="`${app.name} screenshot ${index + 1}`"
                  class="screenshot"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(50, 63, 138, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
  z-index: 1000;
}

.modal-container {
  position: relative;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  background-color: var(--color-card-bg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-modal);
  padding: var(--spacing-xl);
}

.modal-close {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  width: 32px;
  height: 32px;
  border: none;
  background-color: transparent;
  color: var(--color-text-muted);
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}

.modal-close:hover {
  background-color: var(--color-background);
  color: var(--color-text);
}

.modal-header {
  display: flex;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.modal-icon {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: var(--radius-md);
  overflow: hidden;
  background-color: var(--color-background);
}

.modal-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-title-section {
  flex: 1;
  min-width: 0;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-primary-dark);
  margin-bottom: var(--spacing-xs);
}

.modal-tagline {
  font-size: 1rem;
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-sm);
}

.modal-platforms {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.modal-body {
  border-top: 1px solid var(--color-border);
  padding-top: var(--spacing-lg);
}

.modal-description {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text);
  margin-bottom: var(--spacing-lg);
}

.modal-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.modal-screenshots {
  margin-top: var(--spacing-lg);
}

.screenshots-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-primary-dark);
  margin-bottom: var(--spacing-md);
}

.screenshots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.screenshot {
  width: 100%;
  border-radius: var(--radius-md);
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: all var(--transition-normal);
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: all var(--transition-normal);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.95);
  opacity: 0;
}
</style>
