<script setup lang="ts">
import type { App } from '~/composables/useApps'

defineProps<{
  app: App
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <article
    class="app-card"
    tabindex="0"
    role="button"
    @click="emit('click')"
    @keydown.enter="emit('click')"
    @keydown.space.prevent="emit('click')"
  >
    <div class="app-card-icon">
      <img :src="app.icon" :alt="`${app.name} icon`" />
    </div>

    <div class="app-card-content">
      <h3 class="app-card-name">{{ app.name }}</h3>
      <p class="app-card-tagline">{{ app.tagline }}</p>

      <div class="app-card-platforms">
        <OsTag v-for="platform in app.platforms" :key="platform" :platform="platform" />
      </div>
    </div>
  </article>
</template>

<style scoped>
.app-card {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background-color: var(--color-card-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-card);
}

.app-card:hover {
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-2px);
}

.app-card:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.app-card-icon {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border-radius: var(--radius-md);
  overflow: hidden;
  background-color: var(--color-background);
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-card-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.app-card-content {
  flex: 1;
  min-width: 0;
}

.app-card-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-primary-dark);
  margin-bottom: var(--spacing-xs);
}

.app-card-tagline {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-sm);
  line-height: 1.4;
}

.app-card-platforms {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}
</style>
