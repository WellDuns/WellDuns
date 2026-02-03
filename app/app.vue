<template>
  <div class="app">
    <div class="blueprint-bg" aria-hidden="true"></div>

    <header class="header">
      <div class="header-content">
        <NuxtLink to="/" class="logo-link">
          <img src="/logo.png" alt="Well Duns" class="logo" />
        </NuxtLink>
        <p class="tagline">Small, thoughtful utility apps</p>
      </div>
    </header>

    <main class="main">
      <NuxtPage />
    </main>

    <footer class="footer">
      <p>&copy; {{ new Date().getFullYear() }} Well Duns</p>
      <NuxtLink to="/privacy" class="footer-link">Privacy Policy</NuxtLink>
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

.logo-link {
  display: block;
}

.logo {
  height: 64px;
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

.footer-link {
  display: inline-block;
  margin-top: var(--spacing-sm);
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.footer-link:hover {
  color: var(--color-primary);
}
</style>
