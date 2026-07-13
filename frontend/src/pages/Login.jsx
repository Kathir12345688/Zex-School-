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
          <div className="login-card__brand" aria-hidden="true">
            <img src="/zex-school-logo.svg" alt="" className="login-card__logo" />
            <div className="login-card__lock">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M8 10V8a4 4 0 1 1 8 0v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                <rect x="5" y="10" width="14" height="10" rx="2.2" stroke="currentColor" strokeWidth="1.7" />
                <circle cx="12" cy="14.5" r="1.3" fill="currentColor" />
              </svg>
            </div>
          </div>

          <div className="login-card__heading">
            <p className="login-card__eyebrow">Welcome Back</p>
            <h2>Admin Login</h2>
            <p className="login-card__subtitle">Access the Zex School management dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="form-grid login-form">
            <div className="form-group login-field">
              <label className="form-label" htmlFor="username">Username or Email</label>
              <div className="login-input-wrap">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-3 9a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input id="username" value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} required />
              </div>
            </div>
            <div className="form-group login-field">
              <label className="form-label" htmlFor="password">Password</label>
              <div className="login-input-wrap">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="5" y="10" width="14" height="10" rx="2.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M8 10V8a4 4 0 1 1 8 0v2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
                <input id="password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
              </div>
            </div>
            {error && <div className="status-message status-message--error">{error}</div>}
            <button className="login-button" type="submit" disabled={loading}>{loading ? 'Signing in…' : 'Sign In'}</button>
          </form>
        </section>
      </main>
    </div>
  )
}

export default Login
