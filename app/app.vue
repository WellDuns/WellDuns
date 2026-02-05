<template>
  <div class="app">
    <div class="blueprint-bg" aria-hidden="true"></div>

    <header class="header">
      <div class="header-content">
        <div class="logo-wrapper">
          <!-- WD Logo annotation - combined text and arrow -->
          <img src="~/assets/logoArrow.svg" alt="" class="logo-annotation" aria-hidden="true" />
          <NuxtLink to="/" class="logo-link">
            <img src="/logo.png" alt="Well Duns" class="logo" />
          </NuxtLink>
        </div>

        <div class="tagline-wrapper">
          <p class="tagline">Small, thoughtful utility apps</p>
          <!-- Tagline annotation -->
          <img src="~/assets/taglineArrow.svg" alt="" class="tagline-annotation" aria-hidden="true" />
        </div>
      </div>
    </header>

    <main class="main">
      <NuxtPage />
    </main>

    <footer class="footer">
      <p>&copy; {{ new Date().getFullYear() }} Well Duns</p>
      <div class="privacy-wrapper">
        <NuxtLink to="/privacy" class="footer-link">Privacy Policy</NuxtLink>
        <img src="~/assets/privacyArrow.svg" alt="" class="privacy-annotation" aria-hidden="true" />
      </div>
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
  gap: var(--spacing-lg);
}

.logo-wrapper {
  position: relative;
}

.logo-link {
  display: block;
}

.logo {
  height: 112px;
  width: auto;
}

/* WD Logo annotation - absolutely positioned to the left of centered logo */
.logo-annotation {
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  height: 112px;
  width: auto;
  pointer-events: none;
  user-select: none;
}

.annotation {
  pointer-events: none;
  user-select: none;
}

.annotation span {
  font-family: 'Coming Soon', cursive;
  font-size: 1rem;
  color: var(--color-primary);
  opacity: 0.7;
}

.arrow {
  width: 50px;
  height: auto;
  opacity: 0.5;
}

/* Tagline annotation */
.tagline-wrapper {
  position: relative;
}

.tagline {
  font-size: 1.125rem;
  color: var(--color-text-muted);
  font-weight: 400;
}

/* Tagline annotation - absolutely positioned to the right, aligned to top */
.tagline-annotation {
  position: absolute;
  left: 100%;
  top: 0;
  pointer-events: none;
  user-select: none;
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

.privacy-wrapper {
  position: relative;
  display: inline-block;
}

/* Privacy annotation - aligned to bottom of link, positioned to the right */
.privacy-annotation {
  position: absolute;
  left: 100%;
  bottom: 0;
  pointer-events: none;
  user-select: none;
}

@media (max-width: 600px) {
  .logo-annotation,
  .tagline-annotation,
  .privacy-annotation {
    display: none;
  }
}
</style>
