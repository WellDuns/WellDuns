<script setup lang="ts">
defineProps<{
  type: 'website' | 'mac-app-store' | 'ios-app-store'
  url: string
}>()

const buttonInfo = {
  website: { label: 'Visit Website', icon: '→' },
  'mac-app-store': { label: 'Mac App Store', icon: '' },
  'ios-app-store': { label: 'App Store', icon: '' }
}
</script>

<template>
  <a
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    class="store-button"
    :class="`store-button--${type}`"
  >
    <span class="store-button-icon" aria-hidden="true">{{ buttonInfo[type].icon }}</span>
    <span class="store-button-label">{{ buttonInfo[type].label }}</span>
  </a>
</template>

<style scoped>
.store-button {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: 10px 16px;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: all var(--transition-fast);
}

.store-button-icon {
  font-size: 1rem;
}

.store-button--website {
  background-color: var(--color-primary);
  color: white;
}

.store-button--website:hover {
  background-color: var(--color-primary-dark);
  color: white;
}

.store-button--mac-app-store,
.store-button--ios-app-store {
  background-color: #000000;
  color: white;
}

.store-button--mac-app-store:hover,
.store-button--ios-app-store:hover {
  background-color: #333333;
  color: white;
}
</style>
