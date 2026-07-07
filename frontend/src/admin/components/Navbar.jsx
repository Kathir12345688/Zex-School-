import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navbar = ({ title, onMenuToggle }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  return (
    <header className="admin-navbar">
      <div className="admin-navbar__left">
        <button type="button" className="admin-navbar__menu" onClick={onMenuToggle} aria-label="Toggle menu">
          ☰
        </button>
        <div>
          <p className="admin-navbar__eyebrow">School Management</p>
          <h1>{title}</h1>
        </div>
      </div>

      <div className="admin-navbar__right">
        <div className="admin-navbar__profile">
          <button type="button" className="admin-navbar__profile-toggle" onClick={() => setMenuOpen((prev) => !prev)}>
            {user?.first_name || user?.username || 'Admin'}
          </button>
          {menuOpen && (
            <div className="admin-navbar__profile-menu">
              <p>{user?.email || 'Administrator'}</p>
              <button type="button" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
