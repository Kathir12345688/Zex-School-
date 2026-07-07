import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/hero', label: 'Hero' },
  { to: '/admin/about', label: 'About' },
  { to: '/admin/facilities', label: 'Facilities' },
  { to: '/admin/academics', label: 'Academics' },
  { to: '/admin/activities', label: 'Activities' },
  { to: '/admin/events', label: 'Events' },
  { to: '/admin/admissions', label: 'Admissions' },
  { to: '/admin/contact-messages', label: 'Messages' },
]

const Sidebar = ({ mobileOpen, onClose }) => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  return (
    <aside className={`admin-sidebar ${mobileOpen ? 'is-open' : ''}`}>
      <div className="admin-sidebar__brand">
        <div>
          <p className="admin-sidebar__eyebrow">Admin Panel</p>
          <h2>Zex School</h2>
        </div>
      </div>

      <nav className="admin-sidebar__nav" aria-label="Sidebar navigation">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => `admin-sidebar__link ${isActive ? 'is-active' : ''}`} onClick={onClose}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button type="button" className="admin-sidebar__logout" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  )
}

export default Sidebar
