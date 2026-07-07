import { useEffect, useRef } from 'react'
import PublicLayout from '../components/Layout/PublicLayout'
import SectionHeading from '../components/Layout/SectionHeading'
import Loader from '../components/Loader/Loader'
import usePageTitle from '../utils/usePageTitle'
import usePublicCollection from '../hooks/usePublicCollection'
import { getMediaUrl } from '../utils/media'

const Facilities = () => {
  usePageTitle({
    title: 'Facilities | Zex School',
    description: 'Explore the modern, student-centered facilities available at Zex School.',
  })

  const { data: facilities, loading, error } = usePublicCollection('/website/facilities/')
  const sectionRefs = useRef([])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduceMotion.matches) {
      sectionRefs.current.forEach((section) => section?.classList.add('is-visible'))
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
      { threshold: 0.16, rootMargin: '0px 0px -40px 0px' },
    )

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [facilities])

  return (
    <PublicLayout>
      <section className="hero">
        <div className="container">
          <SectionHeading eyebrow="Campus spaces" title="Facilities designed for discovery and comfort" description="Our learning environment supports both academic focus and joyful engagement." />
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          {loading ? <Loader /> : null}
          {error ? <div className="status-message status-message--error">{error}</div> : null}
          {!loading && !facilities?.length ? <div className="empty-state">No facility information is available at the moment.</div> : null}

          <div className="facilities-stack">
            {facilities?.map((item, index) => {
              const isImageLeft = index % 2 === 0
              return (
                <section
                  key={item.id}
                  className={`facility-section${isImageLeft ? '' : ' facility-section--reverse'}`}
                  ref={(node) => {
                    sectionRefs.current[index] = node
                  }}
                >
                  <div className="facility-section__media">
                    {item.image ? (
                      <img src={getMediaUrl(item.image)} alt={item.title} />
                    ) : (
                      <div className="facility-section__placeholder">{item.title}</div>
                    )}
                  </div>
                  <div className="facility-section__content">
                    {item.icon ? <div className="card__icon facility-section__icon">{item.icon}</div> : null}
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </section>
              )
            })}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

export default Facilities
