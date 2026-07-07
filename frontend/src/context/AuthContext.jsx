import { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api'
import { clearRefreshToken, clearToken, getRefreshToken, getToken, setRefreshToken, setToken } from '../utils/tokenStorage'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setTokenState] = useState(getToken())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const bootstrapAuth = async () => {
      const storedToken = getToken()
      if (!storedToken) {
        clearRefreshToken()
        clearToken()
        sessionStorage.clear()
        setLoading(false)
        return
      }

      try {
        const response = await api.get('/auth/me/')
        setUser(response.data)
      } catch {
        clearToken()
        clearRefreshToken()
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    bootstrapAuth()
  }, [])

  const login = async (credentials) => {
    const response = await api.post('/auth/login/', credentials)
    const { access, refresh, user: authUser } = response.data
    setToken(access)
    setRefreshToken(refresh)
    setTokenState(access)
    setUser(authUser)
    return authUser
  }

  const logout = async () => {
    try {
      const refresh = getRefreshToken()
      await api.post('/auth/logout/', { refresh })
    } catch {
      // ignore logout errors and clear local state
    } finally {
      clearToken()
      clearRefreshToken()
      sessionStorage.clear()
      setTokenState(null)
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken: setTokenState, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthContext
