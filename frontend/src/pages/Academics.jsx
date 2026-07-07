import { useEffect, useRef } from 'react'
import PublicLayout from '../components/Layout/PublicLayout'
import SectionHeading from '../components/Layout/SectionHeading'
import Loader from '../components/Loader/Loader'
import usePageTitle from '../utils/usePageTitle'
import usePublicCollection from '../hooks/usePublicCollection'
import { getMediaUrl } from '../utils/media'

const Academics = () => {
  usePageTitle({
    title: 'Academics | Zex School',
    description: 'Discover the academic programs, curriculum focus and learning pathways at Zex School.',
  })

  const { data: academics, loading, error } = usePublicCollection('/website/academics/')
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
  }, [academics])

  return (
    <PublicLayout>
      <section className="hero">
        <div className="container">
          <SectionHeading eyebrow="Learning excellence" title="Academic programs that inspire achievement" description="We offer a balanced curriculum with strong fundamentals and real-world readiness." />
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          {loading ? <Loader /> : null}
          {error ? <div className="status-message status-message--error">{error}</div> : null}
          {!loading && !academics?.length ? <div className="empty-state">Academic program details are not available right now.</div> : null}

          <div className="academics-stack">
            {academics?.map((item, index) => {
              const isImageLeft = index % 2 === 0
              return (
                <section
                  key={item.id}
                  className={`academic-section${isImageLeft ? '' : ' academic-section--reverse'}`}
                  ref={(node) => {
                    sectionRefs.current[index] = node
                  }}
                >
                  <div className="academic-section__media">
                    {item.image ? (
                      <img src={getMediaUrl(item.image)} alt={item.title} />
                    ) : (
                      <div className="academic-section__placeholder">{item.title}</div>
                    )}
                  </div>

                  <div className="academic-section__content">
                    <p className="eyebrow">Academic program</p>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <a className="button academic-section__button" href="/admissions">
                      Learn more
                    </a>
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

export default Academics
