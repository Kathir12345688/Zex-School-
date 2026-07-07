import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src="/zex-school-logo.svg" alt="Zex School Logo" className="brand__mark-logo" />
          <div>
            <h3>Zex School</h3>
            <p>Where curiosity meets excellence and every learner is encouraged to thrive.</p>
          </div>
        </div>

        <div className="footer__section">
          <h4>Quick links</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/admissions">Admissions</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer__section">
          <h4>Contact</h4>
          <p>1st Street Zex colony </p>
          <p>9500953632</p>
          <p>info@zexschool.com</p>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Zex School. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
