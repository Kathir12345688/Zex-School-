import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/facilities', label: 'Facilities' },
  { to: '/academics', label: 'Academics' },
  { to: '/activities', label: 'Activities' },
  { to: '/admissions', label: 'Admissions' },
  { to: '/contact', label: 'Contact' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="navbar" aria-label="Main navigation">
      <button
        type="button"
        className={`navbar__toggle${isOpen ? ' is-open' : ''}`}
        aria-expanded={isOpen}
        aria-label="Toggle menu"
        onClick={() => setIsOpen((current) => !current)}
      >
        <span />
        <span />
        <span />
      </button>
      <div className={`navbar__menu${isOpen ? ' is-open' : ''}`}>
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `navbar__link${isActive ? ' is-active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
