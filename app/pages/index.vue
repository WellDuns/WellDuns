<script setup lang="ts">
const { apps, expandedApp, openApp, closeApp } = useApps()
</script>

<template>
  <div class="home">
    <div class="container">
      <section class="apps-section">
        <div class="apps-grid">
          <AppCard
            v-for="app in apps"
            :key="app.id"
            :app="app"
            @click="openApp(app.id)"
          />
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
  padding: var(--spacing-lg) 0;
}

.apps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--spacing-lg);
}

@media (max-width: 480px) {
  .apps-grid {
    grid-template-columns: 1fr;
  }
}
</style>
