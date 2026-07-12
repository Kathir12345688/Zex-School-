const normalizeBaseUrl = (value) => {
  if (!value) return 'https://zex-school.onrender.com'
  return value.replace(/\/$/, '').replace(/\/api\/?$/, '')
}

export const mediaBaseUrl = normalizeBaseUrl(import.meta.env.VITE_MEDIA_URL || import.meta.env.VITE_API_URL || 'https://zex-school.onrender.com')

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
