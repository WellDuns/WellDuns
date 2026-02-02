<template>
  <div class="app">
    <div class="blueprint-bg" aria-hidden="true"></div>

    <header class="header">
      <div class="header-content">
        <img src="/logo.png" alt="Well Duns" class="logo" />
        <p class="tagline">Small, thoughtful utility apps</p>
      </div>
    </header>

    <main class="main">
      <NuxtPage />
    </main>

    <footer class="footer">
      <p>&copy; {{ new Date().getFullYear() }} Well Duns</p>
    </footer>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  padding: var(--spacing-xl) var(--spacing-lg);
  text-align: center;
}

.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
}

.logo {
  height: 48px;
  width: auto;
}

.tagline {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  font-weight: 400;
}

.main {
  flex: 1;
  padding: var(--spacing-lg);
}

.footer {
  padding: var(--spacing-xl) var(--spacing-lg);
  text-align: center;
}

.footer p {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}
</style>
