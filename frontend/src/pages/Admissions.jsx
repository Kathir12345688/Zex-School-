import PublicLayout from '../components/Layout/PublicLayout'
import SectionHeading from '../components/Layout/SectionHeading'
import Loader from '../components/Loader/Loader'
import usePageTitle from '../utils/usePageTitle'
import usePublicCollection from '../hooks/usePublicCollection'
import { getMediaUrl } from '../utils/media'

const renderList = (text) => {
  if (!text) return null
  return text
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item, index) => <li key={index}>{item}</li>)
}

const Admissions = () => {
  usePageTitle({
    title: 'Admissions | Zex School',
    description: 'Learn about Zex School admissions, document requirements, eligibility and application details.',
  })

  const { data: admissions, loading, error } = usePublicCollection('/website/admissions/')
  const admission = admissions?.[0]
  const brochureUrl = admission?.brochure ? getMediaUrl(admission.brochure) : null

  return (
    <PublicLayout>
      <style>{`
        @keyframes admissionFadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .admission-banner-link {
          display: block;
          overflow: hidden;
          border-radius: 12px;
          animation: admissionFadeUp 0.7s ease-out both;
        }

        .admission-banner-image {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 12px;
          object-fit: cover;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .admission-banner-link:hover .admission-banner-image {
          transform: scale(1.02);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
        }
      `}</style>
      <section className="hero">
        <div className="container">
          <SectionHeading eyebrow="Join us" title="Admission to Zex School" description="Discover our admission process, eligibility expectations and required documents for new students." />
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          {loading ? <Loader /> : null}
          {error ? <div className="status-message status-message--error">{error}</div> : null}
          {!loading && !admission ? <div className="empty-state">Admission details are not available at the moment.</div> : null}

          {admission ? (
            <div className="form-grid" data-reveal>
              <div className="form-card" data-reveal data-reveal-direction="left">
                {brochureUrl ? (
                  <>
                    <a className="admission-banner-link" href={brochureUrl} target="_blank" rel="noreferrer">
                      <img className="admission-banner-image" src={brochureUrl} alt="Admission banner" />
                    </a>
                    <a className="button admission-banner-button" href="/contact">
                      Contact us
                    </a>
                  </>
                ) : (
                  <>
                    <p className="muted">Brochure is not available at this time.</p>
                    <a className="button admission-banner-button" href="/contact">
                      Contact us
                    </a>
                  </>
                )}
              </div>

              <div className="form-card">
                <SectionHeading eyebrow="Overview" title={admission.title} description={admission.description} />
                <div className="info-panel">
                  <h4>Eligibility</h4>
                  <p>{admission.eligibility || 'Admissions follow the school’s academic and pastoral standards for every applicant.'}</p>
                </div>
                <div className="info-panel">
                  <h4>Required documents</h4>
                  <ul>{renderList(admission.required_documents)}</ul>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </PublicLayout>
  )
}

export default Admissions
