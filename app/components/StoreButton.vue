<script setup lang="ts">
import AppStoreBadge from '~/assets/AppStoreBadge.svg'
import MacAppStoreBadge from '~/assets/MacAppStoreBadge.svg'

const props = defineProps<{
  type: 'website' | 'mac-app-store' | 'ios-app-store' | 'download'
  url: string
  appId?: string
}>()

const { $trackEvent } = useNuxtApp()

function handleClick() {
  $trackEvent(`link-${props.appId ?? 'unknown'}-${props.type}`)
}
</script>

<template>
  <a
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    class="store-button"
    :class="`store-button--${type}`"
    @click="handleClick"
  >
    <template v-if="type === 'website'">
      <span class="store-button-label">Visit Website</span>
      <span class="store-button-icon" aria-hidden="true">→</span>
    </template>
    <template v-else-if="type === 'download'">
      <span class="store-button-icon" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </span>
      <span class="store-button-label">Download</span>
    </template>
    <img v-else-if="type === 'ios-app-store'" :src="AppStoreBadge" alt="Download on the App Store" class="store-badge" />
    <img v-else-if="type === 'mac-app-store'" :src="MacAppStoreBadge" alt="Download on the Mac App Store" class="store-badge" />
  </a>
</template>

<style scoped>
.store-button {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  text-decoration: none;
  transition: opacity var(--transition-fast);
}

.store-button:hover {
  opacity: 0.8;
}

.store-button--website {
  padding: 10px 16px;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: var(--radius-md);
  background-color: var(--color-primary);
  color: white;
}

.store-button--website:hover {
  background-color: var(--color-primary-dark);
  color: white;
  opacity: 1;
}

.store-button--download {
  padding: 10px 16px;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: var(--radius-md);
  background-color: var(--color-primary);
  color: white;
}

.store-button--download:hover {
  background-color: var(--color-primary-dark);
  color: white;
  opacity: 1;
}

.store-button-icon {
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
}

.store-badge {
  height: 40px;
  width: auto;
}
</style>
