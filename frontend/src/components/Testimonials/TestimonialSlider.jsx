import { useEffect, useMemo, useState } from 'react'

const TestimonialSlider = ({ items = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeItem = useMemo(() => items[activeIndex], [items, activeIndex])

  useEffect(() => {
    if (!items.length) return undefined

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [items.length])

  if (!items.length || !activeItem) return null

  return (
    <section className="testimonial-slider">
      <article className="card card--testimonial">
        <div className="card__body">
          <div key={`${activeItem.id}-${activeIndex}`} className="testimonial__content">
            <p className="testimonial__message">“{activeItem.message}”</p>
            <div className="testimonial__meta">
              <div>
                <strong>{activeItem.name}</strong>
                <p>{activeItem.role}</p>
              </div>
              <div className="rating" aria-label={`Rating: ${activeItem.rating} out of 5`}>
                {'★'.repeat(activeItem.rating)}
              </div>
            </div>
          </div>
        </div>
      </article>
      <div className="testimonial-slider__controls">
        {items.map((item, index) => (
          <button key={item.id} type="button" className={index === activeIndex ? 'pill is-active' : 'pill'} onClick={() => setActiveIndex(index)}>
            {item.name}
          </button>
        ))}
      </div>
    </section>
  )
}

export default TestimonialSlider
