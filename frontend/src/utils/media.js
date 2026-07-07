const normalizeBaseUrl = (value) => {
  if (!value) return 'http://localhost:8000'
  return value.replace(/\/$/, '').replace(/\/api\/?$/, '')
}

export const mediaBaseUrl = normalizeBaseUrl(import.meta.env.VITE_MEDIA_URL || import.meta.env.VITE_API_URL || 'http://localhost:8000')

export const getMediaUrl = (path) => {
  if (!path) return undefined
  if (/^https?:\/\//i.test(path)) return path

  const normalizedPath = String(path).trim()
  if (normalizedPath.startsWith('/')) {
    return `${mediaBaseUrl}${normalizedPath}`
  }

  if (normalizedPath.startsWith('media/')) {
    return `${mediaBaseUrl}/${normalizedPath}`
  }

  return `${mediaBaseUrl}/media/${normalizedPath}`
}
