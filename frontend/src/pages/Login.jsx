import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import usePageTitle from '../utils/usePageTitle'

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { user, login } = useAuth()
  const navigate = useNavigate()

  usePageTitle({ title: 'Admin Login', description: 'Sign in to the Zex School administrator dashboard.' })

  useEffect(() => {
    if (user) {
      navigate('/admin/dashboard')
    }
  }, [user, navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      await login(form)
      navigate('/admin/dashboard')
    } catch (err) {
      const detail = err.response?.data?.detail || err.response?.data?.non_field_errors?.[0] || 'Invalid username or password.'
      setError(detail)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="public-shell">
      <main className="container" style={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
        <section className="form-card" style={{ width: 'min(460px, 100%)' }}>
          <h2>Admin Login</h2>
          <p>Access the Zex School management dashboard.</p>
          <form onSubmit={handleSubmit} className="form-grid" style={{ marginTop: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="username">Username or Email</label>
              <input id="username" value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input id="password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
            </div>
            {error && <div className="status-message status-message--error">{error}</div>}
            <button className="btn btn--primary" type="submit" disabled={loading}>{loading ? 'Signing in…' : 'Sign In'}</button>
          </form>
        </section>
      </main>
    </div>
  )
}

export default Login
