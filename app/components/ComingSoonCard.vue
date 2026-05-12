<template>
  <article class="coming-soon-card">
    <div class="sketch-icon">
      <svg viewBox="0 0 64 64" class="icon-sketch">
        <rect x="4" y="4" width="56" height="56" rx="8" />
        <circle cx="32" cy="28" r="12" />
        <path d="M 16 52 Q 32 40, 48 52" />
      </svg>
    </div>
    <div class="sketch-content">
      <div class="sketch-line title-line"></div>
      <div class="sketch-line tagline-line"></div>
      <div class="sketch-tags">
        <div class="sketch-tag"></div>
        <div class="sketch-tag"></div>
      </div>
    </div>
    <span class="coming-soon-label">Coming Soon...</span>
  </article>
</template>

<style scoped>
.coming-soon-card {
  position: relative;
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background-color: transparent;
  border: 2px dashed var(--color-primary-light);
  border-radius: var(--radius-lg);
  opacity: 0.6;
}

.sketch-icon {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
}

.icon-sketch {
  width: 100%;
  height: 100%;
  stroke: var(--color-primary-light);
  stroke-width: 2;
  stroke-dasharray: 4 2;
  fill: none;
}

.sketch-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding-top: var(--spacing-xs);
}

.sketch-line {
  height: 12px;
  background: repeating-linear-gradient(
    90deg,
    var(--color-primary-light) 0px,
    var(--color-primary-light) 8px,
    transparent 8px,
    transparent 12px
  );
  border-radius: 2px;
  opacity: 0.5;
}

.title-line {
  width: 60%;
  height: 14px;
}

.tagline-line {
  width: 80%;
  height: 10px;
}

.sketch-tags {
  display: flex;
  gap: var(--spacing-xs);
  margin-top: auto;
}

.sketch-tag {
  width: 40px;
  height: 16px;
  border: 1.5px dashed var(--color-primary-light);
  border-radius: 9999px;
  opacity: 0.5;
}

.coming-soon-label {
  position: absolute;
  bottom: var(--spacing-sm);
  right: var(--spacing-md);
  font-family: 'Coming Soon', cursive;
  font-size: 0.875rem;
  color: var(--color-primary);
  transform: rotate(-3deg);
}
</style>
