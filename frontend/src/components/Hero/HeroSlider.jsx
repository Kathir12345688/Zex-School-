import { useEffect, useRef, useState } from 'react'
import { getMediaUrl } from '../../utils/media'
import hero1 from '../../assets/hero1.jpg'
import hero2 from '../../assets/hero2.jpg'
import hero3 from '../../assets/hero3.jpg'
import hero4 from '../../assets/hero4.jpg'

const HeroSlider = ({ items = [] }) => {
  // Build slides from API items when available; otherwise use local assets fallback
  let slides = []
  if (Array.isArray(items) && items.length > 0) {
    slides = items.map((it) => ({
      ...it,
      image: it?.background_image
        ? it.background_image.startsWith('http')
          ? it.background_image
          : getMediaUrl(it.background_image)
        : undefined,
    }))
    // filter out items without images to avoid blank slides
    slides = slides.filter((s) => !!s.image)
  }

  if (slides.length === 0) {
    const local = [hero1, hero2, hero3, hero4]
    slides = local.map((img, i) => ({ id: `local-${i}`, title: 'Zex School', subtitle: 'Bright futures, strong values', image: img }))
  }
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (isPaused || slides.length <= 1) return
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timerRef.current)
  }, [isPaused, slides.length])

  const goPrev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
  const goNext = () => setIndex((i) => (i + 1) % slides.length)
  const goTo = (i) => setIndex(i % slides.length)

  return (
    <section
      className="hero hero-slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      ref={containerRef}
    >
      <div className="hero-slider__viewport">
        {slides.map((s, i) => (
          <div
            key={s.id || i}
            className={`hero-slide${i === index ? ' is-active' : ''}`}
            aria-hidden={i !== index}
          >
            <img src={s.image} alt={s.title || `Slide ${i + 1}`} loading="eager" decoding="async" />
            <div className="hero-slide__overlay" />
            <div className="hero-slide__content container">
              <div className="hero-slide__inner">
                <h1 className="hero-slide__title">{s.title}</h1>
                {s.subtitle ? <p className="hero__subtitle">{s.subtitle}</p> : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button type="button" className="hero-slider__nav hero-slider__nav--prev" onClick={goPrev} aria-label="Previous slide">
        ‹
      </button>
      <button type="button" className="hero-slider__nav hero-slider__nav--next" onClick={goNext} aria-label="Next slide">
        ›
      </button>

      <div className="hero-slider__dots">
        {slides.map((_, i) => (
          <button type="button" key={i} className={`dot${i === index ? ' is-active' : ''}`} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`} />
        ))}
      </div>
    </section>
  )
}

export default HeroSlider
