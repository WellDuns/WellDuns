<script setup lang="ts">
defineProps<{
  platform: 'macos' | 'ios' | 'web' | 'windows' | 'linux'
  size?: 'small' | 'default'
}>()

const platformInfo = {
  macos: { label: 'macOS', icon: '' },
  ios: { label: 'iOS', icon: '' },
  web: { label: 'Web', icon: '󰖟' },
  windows: { label: 'Windows', icon: '' },
  linux: { label: 'Linux', icon: '' }
}
</script>

<template>
  <span class="os-tag" :class="[`os-tag--${platform}`, size === 'small' && 'os-tag--small']">
    <span class="os-tag-label">{{ platformInfo[platform].label }}</span>
  </span>
</template>

<style scoped>
.os-tag {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: 2px 8px;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 9999px;
  background-color: var(--color-primary-light);
  color: var(--color-primary-dark);
  white-space: nowrap;
}

.os-tag--small {
  padding: 1px 6px;
  font-size: 0.625rem;
}

.os-tag--macos {
  background-color: rgba(69, 81, 149, 0.15);
}

.os-tag--ios {
  background-color: rgba(69, 81, 149, 0.12);
}

.os-tag--web {
  background-color: rgba(150, 164, 204, 0.3);
}

.os-tag--windows {
  background-color: rgba(0, 120, 215, 0.15);
  color: #0078d7;
}

.os-tag--linux {
  background-color: rgba(221, 76, 57, 0.15);
  color: #dd4c39;
}
</style>
