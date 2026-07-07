import PublicLayout from '../components/Layout/PublicLayout'
import SectionHeading from '../components/Layout/SectionHeading'
import Loader from '../components/Loader/Loader'
import usePageTitle from '../utils/usePageTitle'
import usePublicCollection from '../hooks/usePublicCollection'
import { getMediaUrl } from '../utils/media'

const About = () => {
  usePageTitle({
    title: 'About | Zex School',
    description: 'Learn about Zex School history, vision, mission and the principal’s message.',
  })

  const { data: aboutItems, loading, error } = usePublicCollection('/website/about/')
  const about = aboutItems?.[0]

  return (
    <PublicLayout>
      <section className="hero">
        <div className="container">
          <SectionHeading eyebrow="Our story" title={about?.heading || 'Learning with purpose'} description={about?.description || 'We nurture students to become confident, ethical and lifelong learners.'} />
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          {loading ? <Loader /> : null}
          {error ? <div className="status-message status-message--error">{error}</div> : null}
          {!loading && !about ? <div className="empty-state">About details are not available right now.</div> : null}

          {about ? (
            <div className="about-principal">
              <div className="about-principal__content" data-reveal data-reveal-direction="right">
                <SectionHeading eyebrow="About our school" title={about.heading || 'Learning with purpose'} description={about.description || 'We nurture students to become confident, ethical and lifelong learners.'} />
                <p className="about-principal__message">{about.principal_message || 'At Zex School, we believe every learner deserves a nurturing environment where curiosity, discipline, and care can flourish.'}</p>
              </div>
              <div className="about-principal__media" data-reveal data-reveal-direction="left">
                {about.image ? <img src={getMediaUrl(about.image)} alt={about.heading || 'About Zex School'} /> : <div className="about-principal__placeholder">Principal Photo</div>}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </PublicLayout>
  )
}

export default About
