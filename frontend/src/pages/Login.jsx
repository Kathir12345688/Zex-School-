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
    <div className="public-shell login-shell">
      <main className="container login-shell__inner">
        <section className="login-card" aria-label="Admin login form">
          <div className="login-card__header">
            <h1 className="login-card__title">ZEX SCHOOL</h1>
            <p className="login-card__subtitle">Admin Portal</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group login-field">
              <label className="form-label" htmlFor="username">Username</label>
              <input
                id="username"
                className="login-input"
                placeholder="Enter your username"
                value={form.username}
                onChange={(event) => setForm({ ...form, username: event.target.value })}
                required
              />
            </div>
            <div className="form-group login-field">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                id="password"
                className="login-input"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
                required
              />
              <div className={`login-error ${error ? 'is-visible' : ''}`} aria-live="polite">
                {error}
              </div>
            </div>
            <button className="login-button" type="submit" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}

export default Login
