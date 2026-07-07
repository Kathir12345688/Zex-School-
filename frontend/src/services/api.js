import axios from 'axios'
import { clearRefreshToken, clearToken, getRefreshToken, getToken, setToken } from '../utils/tokenStorage'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = getRefreshToken()
      if (!refreshToken) {
        clearToken()
        clearRefreshToken()
        window.location.href = '/admin/login'
        return Promise.reject(error)
      }

      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/auth/refresh/`, { refresh: refreshToken })
        const newAccessToken = response.data.access
        setToken(newAccessToken)
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        clearToken()
        clearRefreshToken()
        window.location.href = '/admin/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default api
