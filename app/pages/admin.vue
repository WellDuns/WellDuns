<script setup lang="ts">
const isLocalhost = ref(false)
const isSubmitting = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')

// Form data
const form = reactive({
  id: '',
  name: '',
  tagline: '',
  description: '',
  platforms: [] as string[],
  website: '',
  macAppStore: '',
  iosAppStore: ''
})

const iconFile = ref<File | null>(null)
const screenshotFiles = ref<File[]>([])
const iconPreview = ref('')
const screenshotPreviews = ref<string[]>([])

onMounted(() => {
  isLocalhost.value = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
})

function generateId() {
  form.id = form.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function handleIconDrop(e: DragEvent) {
  e.preventDefault()
  const file = e.dataTransfer?.files[0]
  if (file && file.type.startsWith('image/')) {
    iconFile.value = file
    iconPreview.value = URL.createObjectURL(file)
  }
}

function handleIconSelect(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    iconFile.value = file
    iconPreview.value = URL.createObjectURL(file)
  }
}

function handleScreenshotsDrop(e: DragEvent) {
  e.preventDefault()
  const files = Array.from(e.dataTransfer?.files || []).filter(f => f.type.startsWith('image/'))
  screenshotFiles.value.push(...files)
  files.forEach(f => screenshotPreviews.value.push(URL.createObjectURL(f)))
}

function handleScreenshotsSelect(e: Event) {
  const target = e.target as HTMLInputElement
  const files = Array.from(target.files || [])
  screenshotFiles.value.push(...files)
  files.forEach(f => screenshotPreviews.value.push(URL.createObjectURL(f)))
}

function removeScreenshot(index: number) {
  screenshotFiles.value.splice(index, 1)
  screenshotPreviews.value.splice(index, 1)
}

function preventDefault(e: DragEvent) {
  e.preventDefault()
}

async function submit() {
  if (!form.id || !form.name) {
    message.value = 'ID and Name are required'
    messageType.value = 'error'
    return
  }

  isSubmitting.value = true
  message.value = ''

  const formData = new FormData()
  formData.append('id', form.id)
  formData.append('name', form.name)
  formData.append('tagline', form.tagline)
  formData.append('description', form.description)
  formData.append('website', form.website)
  formData.append('macAppStore', form.macAppStore)
  formData.append('iosAppStore', form.iosAppStore)

  form.platforms.forEach(p => formData.append('platforms', p))

  if (iconFile.value) {
    formData.append('icon', iconFile.value)
  }

  screenshotFiles.value.forEach(f => {
    formData.append('screenshots', f)
  })

  try {
    const response = await fetch('/api/apps', {
      method: 'POST',
      body: formData
    })

    const result = await response.json()

    if (response.ok) {
      message.value = `App "${form.name}" created successfully!`
      messageType.value = 'success'
      // Reset form
      form.id = ''
      form.name = ''
      form.tagline = ''
      form.description = ''
      form.platforms = []
      form.website = ''
      form.macAppStore = ''
      form.iosAppStore = ''
      iconFile.value = null
      iconPreview.value = ''
      screenshotFiles.value = []
      screenshotPreviews.value = []
    } else {
      message.value = result.message || 'Failed to create app'
      messageType.value = 'error'
    }
  } catch (err) {
    message.value = 'Failed to create app'
    messageType.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="admin-page">
    <div v-if="!isLocalhost" class="access-denied">
      <h1>Access Denied</h1>
      <p>Admin page is only available on localhost.</p>
    </div>

    <div v-else class="admin-container">
      <h1>Add New App</h1>

      <div v-if="message" class="message" :class="messageType">
        {{ message }}
      </div>

      <form @submit.prevent="submit" class="admin-form">
        <div class="form-section">
          <h2>Basic Info</h2>

          <div class="form-group">
            <label for="name">App Name *</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              @blur="!form.id && generateId()"
            />
          </div>

          <div class="form-group">
            <label for="id">App ID *</label>
            <input id="id" v-model="form.id" type="text" required />
            <small>Used for folder name and URLs (auto-generated from name)</small>
          </div>

          <div class="form-group">
            <label for="tagline">Tagline</label>
            <input id="tagline" v-model="form.tagline" type="text" />
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" v-model="form.description" rows="4"></textarea>
          </div>
        </div>

        <div class="form-section">
          <h2>Platforms</h2>
          <div class="checkbox-group">
            <label class="checkbox-label">
              <input type="checkbox" v-model="form.platforms" value="macos" />
              macOS
            </label>
            <label class="checkbox-label">
              <input type="checkbox" v-model="form.platforms" value="ios" />
              iOS
            </label>
            <label class="checkbox-label">
              <input type="checkbox" v-model="form.platforms" value="web" />
              Web
            </label>
            <label class="checkbox-label">
              <input type="checkbox" v-model="form.platforms" value="windows" />
              Windows
            </label>
            <label class="checkbox-label">
              <input type="checkbox" v-model="form.platforms" value="linux" />
              Linux
            </label>
          </div>
        </div>

        <div class="form-section">
          <h2>Links</h2>

          <div class="form-group">
            <label for="website">Website URL</label>
            <input id="website" v-model="form.website" type="url" />
          </div>

          <div class="form-group">
            <label for="macAppStore">Mac App Store URL</label>
            <input id="macAppStore" v-model="form.macAppStore" type="url" />
          </div>

          <div class="form-group">
            <label for="iosAppStore">iOS App Store URL</label>
            <input id="iosAppStore" v-model="form.iosAppStore" type="url" />
          </div>
        </div>

        <div class="form-section">
          <h2>Icon</h2>
          <div
            class="dropzone"
            :class="{ 'has-file': iconPreview }"
            @drop="handleIconDrop"
            @dragover="preventDefault"
            @dragenter="preventDefault"
          >
            <img v-if="iconPreview" :src="iconPreview" alt="Icon preview" class="icon-preview" />
            <div v-else class="dropzone-text">
              <p>Drop icon here or click to select</p>
              <small>Recommended: 512x512 PNG</small>
            </div>
            <input type="file" accept="image/*" @change="handleIconSelect" class="file-input" />
          </div>
        </div>

        <div class="form-section">
          <h2>Screenshots</h2>
          <div
            class="dropzone dropzone-screenshots"
            @drop="handleScreenshotsDrop"
            @dragover="preventDefault"
            @dragenter="preventDefault"
          >
            <div v-if="screenshotPreviews.length" class="screenshots-grid">
              <div v-for="(preview, index) in screenshotPreviews" :key="index" class="screenshot-item">
                <img :src="preview" alt="Screenshot preview" />
                <button type="button" class="remove-btn" @click="removeScreenshot(index)">&times;</button>
              </div>
            </div>
            <div class="dropzone-text">
              <p>Drop screenshots here or click to add</p>
            </div>
            <input type="file" accept="image/*" multiple @change="handleScreenshotsSelect" class="file-input" />
          </div>
        </div>

        <button type="submit" class="submit-btn" :disabled="isSubmitting">
          {{ isSubmitting ? 'Creating...' : 'Create App' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.admin-page {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-lg);
}

.access-denied {
  text-align: center;
  padding: var(--spacing-2xl);
}

.access-denied h1 {
  color: #c00;
}

.admin-container h1 {
  margin-bottom: var(--spacing-xl);
}

.message {
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-lg);
}

.message.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.admin-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.form-section {
  background: var(--color-card-bg);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
}

.form-section h2 {
  font-size: 1.125rem;
  margin-bottom: var(--spacing-md);
  color: var(--color-primary-dark);
}

.form-group {
  margin-bottom: var(--spacing-md);
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-xs);
  font-weight: 500;
  color: var(--color-text);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(69, 81, 149, 0.2);
}

.form-group small {
  display: block;
  margin-top: var(--spacing-xs);
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  cursor: pointer;
}

.checkbox-label input {
  width: auto;
}

.dropzone {
  position: relative;
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
  cursor: pointer;
  transition: border-color var(--transition-fast);
}

.dropzone:hover {
  border-color: var(--color-primary);
}

.dropzone.has-file {
  border-style: solid;
}

.dropzone-text {
  color: var(--color-text-muted);
}

.dropzone-text p {
  margin: 0;
}

.file-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.icon-preview {
  width: 128px;
  height: 128px;
  object-fit: cover;
  border-radius: var(--radius-md);
}

.dropzone-screenshots {
  min-height: 150px;
}

.screenshots-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.screenshot-item {
  position: relative;
  width: 120px;
}

.screenshot-item img {
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
}

.remove-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: #c00;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-btn {
  padding: var(--spacing-md) var(--spacing-xl);
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background var(--transition-fast);
}

.submit-btn:hover:not(:disabled) {
  background: var(--color-primary-dark);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
