import { useEffect, useState } from 'react'
import api from '../services/api'

const usePublicCollection = (endpoint, initialValue) => {
  const initial = initialValue ?? []
  const [data, setData] = useState(initial)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    const load = async () => {
      try {
        setLoading(true)
        setError('')
        const response = await api.get(endpoint)
        if (!ignore) {
          const payload = response?.data
          setData(Array.isArray(payload) ? payload : payload?.results || payload || initial)
        }
      } catch {
        if (!ignore) {
          setError('We could not load this content right now. Please try again shortly.')
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      ignore = true
    }
  }, [endpoint])

  return { data, loading, error }
}

export default usePublicCollection
