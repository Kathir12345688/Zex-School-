import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const footerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = footerRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <footer ref={footerRef} className={`footer ${isVisible ? 'is-visible' : ''}`}>
      <div className="container footer__inner">
        <div className="footer__brand">
          <Link to="/" className="footer__brand-link" aria-label="Zex School home">
            <img src="/zex-school-logo.svg" alt="Zex School Logo" className="footer__logo" />
          </Link>
          <div className="footer__brand-copy">
            <h3>Zex School</h3>
            <p>Where curiosity meets excellence and every learner is encouraged to thrive.</p>
          </div>
        </div>

        <div className="footer__section">
          <h4 className="footer__section-title">Quick links</h4>
          <div className="footer__links">
            <Link to="/" className="footer__link">Home</Link>
            <Link to="/about" className="footer__link">About</Link>
            <Link to="/admissions" className="footer__link">Admissions</Link>
            <Link to="/contact" className="footer__link">Contact</Link>
          </div>
        </div>

        <div className="footer__section">
          <h4 className="footer__section-title">Contact</h4>
          <div className="footer__contact-list">
            <a href="https://maps.google.com/?q=1st+Street+Zex+Colony" className="footer__contact-item">
              <span className="footer__contact-icon" aria-hidden="true">⌂</span>
              <span>1st Street, Zex Colony</span>
            </a>
            <a href="tel:+919500953632" className="footer__contact-item">
              <span className="footer__contact-icon" aria-hidden="true">☎</span>
              <span>+91 95009 53632</span>
            </a>
            <a href="mailto:info@zexschool.com" className="footer__contact-item">
              <span className="footer__contact-icon" aria-hidden="true">✉</span>
              <span>info@zexschool.com</span>
            </a>
          </div>

          <div className="footer__social" aria-label="Social media links">
            <a href="mailto:info@zexschool.com" className="footer__social-link" aria-label="Email">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm0 2 8 5 8-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <a href="https://www.instagram.com/" className="footer__social-link" aria-label="Instagram" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="3.25" fill="none" stroke="currentColor" strokeWidth="1.6" /><circle cx="17.25" cy="6.75" r="0.9" fill="currentColor" /></svg>
            </a>
            <a href="https://www.facebook.com/" className="footer__social-link" aria-label="Facebook" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 20v-7h2.4l.3-2.8h-2.7V3.8c0-.8.2-1.4 1.4-1.4H16V.1c-.2 0-1.1-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v2.8h2.1v7h3.4Z" fill="currentColor" /></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Zex School. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
