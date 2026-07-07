import PublicLayout from '../components/Layout/PublicLayout'
import SectionHeading from '../components/Layout/SectionHeading'
import ContactForm from '../components/ContactForm/ContactForm'
import usePageTitle from '../utils/usePageTitle'

const Contact = () => {
  usePageTitle({
    title: 'Contact | Zex School',
    description: 'Contact Zex School for admission enquiries, campus tours, and general information.',
  })

  return (
    <PublicLayout>
      <section className="hero">
        <div className="container">
          <SectionHeading eyebrow="Get in touch" title="Contact the school office" description="We are here to answer questions about admissions, campus visits and student life." />
        </div>
      </section>

      <section className="page-section">
        <div className="container grid grid--2 contact-layout">
          <div className="form-card" data-reveal data-reveal-direction="left">
            <SectionHeading eyebrow="Campus details" title="Visit or call us" />
            <p>1st Street Zex colony </p>
            <p>Phone: 9500953632</p>
            <p>Email: info@zexschool.com
            </p>

            <div className="map-placeholder" role="img" aria-label="Map placeholder showing the school campus" />
          </div>

          <div data-reveal data-reveal-direction="right">
            <ContactForm />
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

export default Contact
