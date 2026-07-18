import { useEffect, useMemo, useState } from 'react'
import AdminLayout from '../layouts/AdminLayout'
import Loader from '../../components/Loader/Loader'
import api from '../../services/api'
import usePageTitle from '../../utils/usePageTitle'
import { confirmDeleteItem, showDeleteError, showDeleteSuccess } from '../../utils/sweetAlert'

const ContactMessages = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [selectedMessage, setSelectedMessage] = useState(null)

  usePageTitle({ title: 'Contact Messages | Admin', description: 'Review and manage incoming contact messages.' })

  const fetchMessages = async () => {
    try {
      setLoading(true)
      const response = await api.get('/contact/')
      setMessages(response.data.results || response.data)
      setError('')
    } catch (err) {
      setError(err.response?.data?.detail || 'Unable to load messages.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const filteredMessages = useMemo(() => {
    const query = search.toLowerCase()
    return messages.filter((message) => JSON.stringify(message).toLowerCase().includes(query))
  }, [messages, search])

  const markAsRead = async (message) => {
    try {
      await api.patch(`/contact/${message.id}/`, { is_read: true })
      await fetchMessages()
    } catch (err) {
      setError(err.response?.data?.detail || 'Unable to update the message.')
    }
  }

  const deleteMessage = async (message) => {
    const result = await confirmDeleteItem()
    if (!result.isConfirmed) return

    try {
      await api.delete(`/contact/${message.id}/`)
      await fetchMessages()
      await showDeleteSuccess()
    } catch (err) {
      setError(err.response?.data?.detail || 'Unable to delete the message.')
      await showDeleteError()
    }
  }

  return (
    <AdminLayout title="Contact Messages">
      <div className="page-header">
        <div>
          <h2>Contact Messages</h2>
          <p>Review and manage incoming inquiries from the public website.</p>
        </div>
      </div>

      <div className="search-bar">
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search messages..." />
      </div>

      {loading && <Loader message="Loading messages..." />}
      {error && <div className="empty-state">{error}</div>}
      {!loading && !error && (
        <div className="card-grid">
          <div className="panel">
            {filteredMessages.length === 0 ? (
              <div className="empty-state">No messages found.</div>
            ) : (
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Subject</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMessages.map((message) => (
                      <tr key={message.id}>
                        <td>{message.name}</td>
                        <td>{message.subject || 'No subject'}</td>
                        <td>{message.is_read ? 'Read' : 'Unread'}</td>
                        <td>
                          <div className="table-actions">
                            <button className="edit" type="button" onClick={() => setSelectedMessage(message)}>
                              Read
                            </button>
                            <button className="edit" type="button" onClick={() => markAsRead(message)}>
                              Mark Read
                            </button>
                            <button className="delete" type="button" onClick={() => deleteMessage(message)}>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="panel">
            {selectedMessage ? (
              <>
                <h3>{selectedMessage.subject || 'Message Details'}</h3>
                <p><strong>Name:</strong> {selectedMessage.name}</p>
                <p><strong>Email:</strong> {selectedMessage.email}</p>
                <p><strong>Phone:</strong> {selectedMessage.phone || '—'}</p>
                <p><strong>Message:</strong></p>
                <p>{selectedMessage.message}</p>
                <div className="form-actions">
                  <button className="btn btn--primary" type="button" onClick={() => markAsRead(selectedMessage)}>
                    Mark as Read
                  </button>
                  <button className="btn btn--danger" type="button" onClick={() => deleteMessage(selectedMessage)}>
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <div className="empty-state">Choose a message to read the full content.</div>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default ContactMessages
