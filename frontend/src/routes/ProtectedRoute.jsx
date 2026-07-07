import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = () => {
  const { user, token, loading } = useAuth()

  if (loading) {
    return <div className="loader"><div className="loader__spinner" aria-hidden="true" /></div>
  }

  return user || token ? <Outlet /> : <Navigate to="/admin/login" replace />
}

export default ProtectedRoute
