import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import PublicLayout from '../components/Layout/PublicLayout'
import SectionHeading from '../components/Layout/SectionHeading'
import Loader from '../components/Loader/Loader'
import usePageTitle from '../utils/usePageTitle'
import usePublicCollection from '../hooks/usePublicCollection'
import { getMediaUrl } from '../utils/media'

const Activities = () => {
  usePageTitle({
    title: 'Activities | Zex School',
    description: 'Explore school activities that support student growth, leadership and community.',
  })

  const { data: activities, loading, error } = usePublicCollection('/website/activities/')
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
  }, [activities])

  return (
    <PublicLayout>
      <section className="hero">
        <div className="container">
          <SectionHeading eyebrow="Student life" title="Engaging activities for every learner" description="From clubs to community events, our school supports curiosity, cooperation and leadership." />
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          {loading ? <Loader /> : null}
          {error ? <div className="status-message status-message--error">{error}</div> : null}
          {!loading && !activities?.length ? <div className="empty-state">No activities are available right now. Please check back soon.</div> : null}

          <div className="facilities-stack">
            {activities?.map((item, index) => {
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
                    <p className="eyebrow">Student life</p>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <Link className="button facility-section__button" to="/admissions">
                      Learn more
                    </Link>
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

export default Activities
