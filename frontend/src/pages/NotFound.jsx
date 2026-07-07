import { Link } from 'react-router-dom'
import PublicLayout from '../components/Layout/PublicLayout'
import SectionHeading from '../components/Layout/SectionHeading'
import usePageTitle from '../utils/usePageTitle'

const NotFound = () => {
  usePageTitle({
    title: '404 Not Found | Zex School',
    description: 'The page you were looking for could not be found on the Zex School website.',
  })

  return (
    <PublicLayout>
      <section className="hero">
        <div className="container">
          <SectionHeading eyebrow="Page missing" title="404 — Page not found" description="We could not find the page you were looking for. Please use the menu or return home." />
          <Link className="button" to="/">Return to Home</Link>
        </div>
      </section>
    </PublicLayout>
  )
}

export default NotFound
