<template>
  <div class="privacy">
    <div class="container">
      <div class="privacy-card">
        <h1>Privacy Policy</h1>
        <p class="privacy-message">
          It's your data, we don't access it, we don't sell it.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.privacy {
  max-width: 700px;
  margin: 0 auto;
}

.privacy-card {
  background: var(--color-card-bg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  padding: var(--spacing-2xl);
  text-align: center;
}

.privacy-card h1 {
  margin-bottom: var(--spacing-lg);
}

.privacy-message {
  font-size: 1.25rem;
  line-height: 1.6;
}
</style>
