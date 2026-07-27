<script setup lang="ts">
const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const iframeLoaded = ref(false)

function handleBackdropClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    emit('close')
  }
}

function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})

watch(() => props.open, (isOpen) => {
  if (import.meta.client) {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }
  if (!isOpen) {
    iframeLoaded.value = false
  }
}, { immediate: true })
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="modal-backdrop" @click="handleBackdropClick">
        <div class="modal-container" role="dialog" aria-modal="true" aria-label="Contact">
          <button class="modal-close" @click="emit('close')" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>

          <div v-if="!iframeLoaded" class="iframe-loading" aria-hidden="true">
            <span class="loading-spinner"></span>
          </div>
          <iframe
            src="https://feedback.wellduns.com?tags=WD.com"
            class="feedback-frame"
            :class="{ loaded: iframeLoaded }"
            title="Feedback form"
            @load="iframeLoaded = true"
          ></iframe>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(50, 63, 138, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
  z-index: 1000;
}

.modal-container {
  position: relative;
  width: 100%;
  max-width: 600px;
  background-color: var(--color-card-bg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-modal);
  overflow: hidden;
}

.modal-close {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-lg);
  z-index: 1;
  width: 36px;
  height: 36px;
  border: none;
  background-color: transparent;
  color: var(--color-text-muted);
  font-size: 1.7rem;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}

.modal-close:hover {
  background-color: var(--color-background);
  color: var(--color-text);
}

.feedback-frame {
  display: block;
  width: 100%;
  height: min(85vh, 737px);
  border: none;
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.feedback-frame.loaded {
  opacity: 1;
}

.iframe-loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: all var(--transition-normal);
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: all var(--transition-normal);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.95);
  opacity: 0;
}
</style>
