import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    throw createError({ statusCode: 403, message: 'Admin API not available in production' })
  }

  const formData = await readMultipartFormData(event)
  if (!formData) {
    throw createError({ statusCode: 400, message: 'No form data received' })
  }

  // Parse form fields
  const fields: Record<string, string> = {}
  const platforms: string[] = []
  let iconFile: { data: Buffer; filename: string; type: string } | null = null
  const screenshotFiles: { data: Buffer; filename: string; type: string }[] = []

  for (const field of formData) {
    if (field.name === 'icon' && field.data.length > 0) {
      iconFile = {
        data: field.data,
        filename: field.filename || 'icon.png',
        type: field.type || 'image/png'
      }
    } else if (field.name === 'screenshots' && field.data.length > 0) {
      screenshotFiles.push({
        data: field.data,
        filename: field.filename || 'screenshot.png',
        type: field.type || 'image/png'
      })
    } else if (field.name === 'platforms') {
      platforms.push(field.data.toString())
    } else if (field.name) {
      fields[field.name] = field.data.toString()
    }
  }

  const { id, name, tagline, description, website, macAppStore, iosAppStore } = fields

  if (!id || !name) {
    throw createError({ statusCode: 400, message: 'ID and Name are required' })
  }

  // Create app folder
  const publicDir = join(process.cwd(), 'public', 'apps', id)
  if (!existsSync(publicDir)) {
    mkdirSync(publicDir, { recursive: true })
  }

  // Save icon
  let iconPath = ''
  if (iconFile) {
    const ext = iconFile.filename.split('.').pop() || 'png'
    const iconFilename = `${id}-icon.${ext}`
    writeFileSync(join(publicDir, iconFilename), iconFile.data)
    iconPath = `/apps/${id}/${iconFilename}`
  }

  // Save screenshots
  const screenshotPaths: string[] = []
  for (let i = 0; i < screenshotFiles.length; i++) {
    const file = screenshotFiles[i]
    const ext = file.filename.split('.').pop() || 'png'
    const filename = `${id}-img${i + 1}.${ext}`
    writeFileSync(join(publicDir, filename), file.data)
    screenshotPaths.push(`/apps/${id}/${filename}`)
  }

  // Build links object
  const links: Record<string, string> = {}
  if (website) links.website = website
  if (macAppStore) links.macAppStore = macAppStore
  if (iosAppStore) links.iosAppStore = iosAppStore

  // Build app object
  const newApp = {
    id,
    name,
    tagline: tagline || '',
    description: description || '',
    icon: iconPath || `/apps/${id}/${id}-icon.png`,
    platforms: platforms.length > 0 ? platforms : ['web'],
    links: Object.keys(links).length > 0 ? links : undefined,
    screenshots: screenshotPaths.length > 0 ? screenshotPaths : undefined
  }

  // Update apps.ts
  const appsFilePath = join(process.cwd(), 'app', 'data', 'apps.ts')
  let appsFileContent = readFileSync(appsFilePath, 'utf-8')

  // Find the apps array and add the new app
  const appString = JSON.stringify(newApp, null, 2)
    .replace(/"([^"]+)":/g, '$1:') // Remove quotes from keys
    .replace(/"/g, "'") // Use single quotes for strings

  // Find the closing bracket of the array
  const arrayEndMatch = appsFileContent.match(/\n\][\s]*$/)
  if (arrayEndMatch && arrayEndMatch.index !== undefined) {
    const insertPosition = arrayEndMatch.index
    const beforeArray = appsFileContent.slice(0, insertPosition)
    const afterArray = appsFileContent.slice(insertPosition)

    // Check if array is empty or has items
    const hasItems = beforeArray.trim().endsWith('}') || beforeArray.trim().endsWith(',')
    const comma = hasItems ? ',' : ''

    appsFileContent = beforeArray + comma + '\n  ' + appString.split('\n').join('\n  ') + afterArray
  }

  writeFileSync(appsFilePath, appsFileContent)

  return { success: true, app: newApp }
})
