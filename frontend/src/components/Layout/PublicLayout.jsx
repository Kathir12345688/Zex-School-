import { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const PublicLayout = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          setIsScrolled(currentScrollY > 8)
          setIsHidden(currentScrollY > lastScrollY && currentScrollY > 96)
          lastScrollY = currentScrollY
          ticking = false
        })
        ticking = true
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const homeRoot = document.querySelector('.home-page')
    const revealElements = homeRoot ? Array.from(homeRoot.querySelectorAll('[data-reveal]')) : []

    if (!homeRoot || reduceMotion.matches) {
      revealElements.forEach((element) => element.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -80px 0px' },
    )

    revealElements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [children])

  return (
    <div className="public-shell">
      <header className={`topbar${isScrolled ? ' is-scrolled' : ''}${isHidden ? ' is-hidden' : ''}`}>
        <div className="container topbar__inner">
          <div className="brand">
            <img src="/zex-school-logo.svg" alt="Zex School Logo" className="brand__mark-logo" />
            <div>
              <strong>Zex School</strong>
              <small>Bright futures, strong values</small>
            </div>
          </div>
          <Navbar />
        </div>
      </header>

      <main>{children}</main>

      <Footer />
    </div>
  )
}

export default PublicLayout
