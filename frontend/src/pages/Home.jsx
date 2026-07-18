import { useMemo } from 'react'
import PublicLayout from '../components/Layout/PublicLayout'
import HeroSlider from '../components/Hero/HeroSlider'
import SectionHeading from '../components/Layout/SectionHeading'
import EventCard from '../components/Events/EventCard'
import CounterStat from '../components/Common/CounterStat'
import TestimonialSlider from '../components/Testimonials/TestimonialSlider'
import Loader from '../components/Loader/Loader'
import usePageTitle from '../utils/usePageTitle'
import usePublicCollection from '../hooks/usePublicCollection'
import { getMediaUrl } from '../utils/media'

const Home = () => {
  usePageTitle({
    title: 'Home | Zex School',
    description: 'Welcome to Zex School. Explore our programs, facilities, events and community online.',
  })

  const { data: heroItems, loading: heroLoading, error: heroError } = usePublicCollection('/website/hero/')
  const { data: aboutItems, loading: aboutLoading, error: aboutError } = usePublicCollection('/website/about/')
  const { data: facilities, loading: facilitiesLoading, error: facilitiesError } = usePublicCollection('/website/facilities/')
  const { data: academics, loading: academicsLoading, error: academicsError } = usePublicCollection('/website/academics/')
  const { data: events, loading: eventsLoading, error: eventsError } = usePublicCollection('/website/events/')
  const { data: testimonials, loading: testimonialsLoading, error: testimonialsError } = usePublicCollection('/website/testimonials/')

  const hero = useMemo(() => heroItems?.[0], [heroItems])
  const about = useMemo(() => aboutItems?.[0], [aboutItems])
  const pageLoading = heroLoading || aboutLoading || facilitiesLoading || academicsLoading || eventsLoading || testimonialsLoading
  const pageError = heroError || aboutError || facilitiesError || academicsError || eventsError || testimonialsError

  const stats = useMemo(
    () => [
      { value: 1400, label: 'Students', suffix: '+' },
      { value: 80, label: 'Teaching & Non-Teaching Staff', suffix: '+' },
      { value: 1000, label: 'Awards Won', suffix: '+' },
      { value: 100, label: 'Board Exam Pass Rate', suffix: '%' },
    ],
    [],
  )

  return (
    <PublicLayout>
      <div className="home-page">
      {pageLoading && !hero ? (
        <section className="page-section">
          <div className="container">
            <Loader />
          </div>
        </section>
      ) : null}

      {pageError ? (
        <section className="page-section">
          <div className="container status-message status-message--error">{pageError}</div>
        </section>
      ) : null}

      {heroItems && heroItems.length > 0 ? (
        <HeroSlider items={heroItems} />
      ) : null}

      <section className="page-section marquee-section" aria-label="School highlights" data-reveal data-reveal-direction="left">
        <div className="container">
          <div className="marquee-banner">
            <div className="marquee-track">
              <div className="marquee-group">
                <span>Admissions Open for the New Academic Year</span>
                <span>•</span>
                <span>Modern Facilities & Safe Learning Environment</span>
                <span>•</span>
              </div>
              <div className="marquee-group" aria-hidden="true">
                <span>Admissions Open for the New Academic Year</span>
                <span>•</span>
                <span>Modern Facilities & Safe Learning Environment</span>
                <span>•</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section page-section--split" data-reveal data-reveal-direction="right">
        <div className="container">
          <div className="grid grid--2 stats-grid">
            {stats.map((stat, index) => (
              <CounterStat key={stat.label} value={stat.value} label={stat.label} revealDelay={index * 180} className="home-card-reveal" />
            ))}
          </div>
        </div>
      </section>

      <section className="page-section page-section--subtle" data-reveal data-reveal-direction="right">
        <div className="container about-principal">
          <div className="about-principal__content" data-reveal data-reveal-direction="right">
            <SectionHeading eyebrow="About our school" title={about?.heading || 'Learning with purpose'} description={about?.description || 'We nurture responsible learners who are confident, creative and ready to lead.'} />
            <p className="about-principal__message">{about?.principal_message || 'We are committed to creating a caring, inspiring environment where every child can learn, grow and thrive.'}</p>
          </div>
          <div className="about-principal__media" data-reveal data-reveal-direction="left">
            {about?.image ? <img src={getMediaUrl(about.image)} alt="Principal" /> : <div className="about-principal__placeholder">Principal Photo</div>}
          </div>
        </div>
      </section>

      <section className="page-section" data-reveal data-reveal-direction="right">
        <div className="container">
          <SectionHeading eyebrow="Upcoming moments" title="Events and activities" description="Join our vibrant calendar of community, sports and cultural experiences." />
          <div className="grid grid--3">
            {events?.slice(0, 3).map((event, index) => (
              <EventCard key={event.id} title={event.title} description={event.description} image={getMediaUrl(event.image)} event_date={event.event_date} location={event.location} reveal revealDelay={index * 150} className="home-card-reveal" />
            ))}
          </div>
        </div>
      </section>

      <section className="page-section cta-section" data-reveal data-reveal-direction="right">
        <div className="container cta-card">
          <div>
            <p className="eyebrow">Ready to learn more?</p>
            <h2>Connect with our admissions team today.</h2>
            <p>Request a campus visit, ask about enrollment, or learn more about our academic program.</p>
          </div>
          <a className="button button--ghost" href="/contact" data-reveal data-reveal-direction="up">
            Contact admissions
          </a>
        </div>
      </section>
      </div>
    </PublicLayout>
  )
}

export default Home
