import { useEffect, useState } from 'react'
import AdminLayout from '../layouts/AdminLayout'
import DashboardCard from '../components/DashboardCard'
import Loader from '../../components/Loader/Loader'
import api from '../../services/api'
import usePageTitle from '../../utils/usePageTitle'

const Dashboard = () => {
  const [stats, setStats] = useState({})
  const [events, setEvents] = useState([])
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  usePageTitle({ title: 'Dashboard | Admin', description: 'Overview of the school management dashboard.' })

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const [facilities, academics, activities, eventsRes, testimonials, contactMessages] = await Promise.all([
          api.get('/website/facilities/'),
          api.get('/website/academics/'),
          api.get('/website/activities/'),
          api.get('/website/events/'),
          api.get('/website/testimonials/'),
          api.get('/contact/'),
        ])

        setStats({
          facilities: facilities.data.results?.length || facilities.data.length || 0,
          academics: academics.data.results?.length || academics.data.length || 0,
          activities: activities.data.results?.length || activities.data.length || 0,
          events: eventsRes.data.results?.length || eventsRes.data.length || 0,
          testimonials: testimonials.data.results?.length || testimonials.data.length || 0,
          messages: contactMessages.data.results?.length || contactMessages.data.length || 0,
        })
        setEvents((eventsRes.data.results || eventsRes.data).slice(0, 4))
        setMessages((contactMessages.data.results || contactMessages.data).slice(0, 4))
      } catch (err) {
        setError(err.response?.data?.detail || 'Unable to load dashboard data.')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <AdminLayout title="Dashboard">
      <div className="page-header">
        <div>
          <h2>Dashboard Overview</h2>
          <p>Monitor your school website content and recent inquiries at a glance.</p>
        </div>
      </div>

      {loading && <Loader message="Loading dashboard data..." />}
      {error && <div className="empty-state">{error}</div>}
      {!loading && !error && (
        <>
          <div className="dashboard-grid">
            <DashboardCard title="Facilities" value={stats.facilities} description="Active facilities" accent="blue" />
            <DashboardCard title="Academics" value={stats.academics} description="Academic sections" accent="green" />
            <DashboardCard title="Activities" value={stats.activities} description="Programs and clubs" accent="purple" />
            <DashboardCard title="Events" value={stats.events} description="Scheduled events" accent="blue" />
            <DashboardCard title="Testimonials" value={stats.testimonials} description="Parent feedback" accent="green" />
            <DashboardCard title="Messages" value={stats.messages} description="Contact inquiries" accent="purple" />
          </div>

          <div className="card-grid">
            <section className="panel">
              <h3>Latest Events</h3>
              {events.length === 0 ? <div className="empty-state">No upcoming events yet.</div> : (
                <div className="table-wrapper">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Event</th>
                        <th>Date</th>
                        <th>Location</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.map((event) => (
                        <tr key={event.id}>
                          <td>{event.title}</td>
                          <td>{event.event_date}</td>
                          <td>{event.location || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <section className="panel">
              <h3>Recent Messages</h3>
              {messages.length === 0 ? <div className="empty-state">No messages yet.</div> : (
                <div className="table-wrapper">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Subject</th>
                      </tr>
                    </thead>
                    <tbody>
                      {messages.map((message) => (
                        <tr key={message.id}>
                          <td>{message.name}</td>
                          <td>{message.subject || 'No subject'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        </>
      )}
    </AdminLayout>
  )
}

export default Dashboard
