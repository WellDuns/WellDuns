<script setup lang="ts">
import AppStoreBadge from '~/assets/AppStoreBadge.svg'
import MacAppStoreBadge from '~/assets/MacAppStoreBadge.svg'

defineProps<{
  type: 'website' | 'mac-app-store' | 'ios-app-store'
  url: string
}>()
</script>

<template>
  <a
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    class="store-button"
    :class="`store-button--${type}`"
  >
    <template v-if="type === 'website'">
      <span class="store-button-label">Visit Website</span>
      <span class="store-button-icon" aria-hidden="true">→</span>
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

.store-button-icon {
  font-size: 1rem;
}

.store-badge {
  height: 40px;
  width: auto;
}
</style>
