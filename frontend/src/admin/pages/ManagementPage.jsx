import { useEffect, useMemo, useState } from 'react'
import AdminLayout from '../layouts/AdminLayout'
import Loader from '../../components/Loader/Loader'
import Modal from '../components/Modal'
import ImageUpload from '../components/ImageUpload'
import api from '../../services/api'
import usePageTitle from '../../utils/usePageTitle'

const defaultForm = {
  title: '',
  description: '',
  subtitle: '',
  heading: '',
  mission: '',
  vision: '',
  principal_message: '',
  name: '',
  role: '',
  message: '',
  image: '',
  photo: '',
  icon: '',
  button_text: '',
  button_link: '',
  category: 'Other',
  display_order: 0,
  is_active: true,
  is_featured: false,
  event_date: '',
  location: '',
  eligibility: '',
  required_documents: '',
  admission_process: '',
  background_image: '',
  email: '',
  phone: '',
  subject: '',
  is_read: false,
}

const ManagementPage = ({
  title,
  description,
  endpoint,
  singularLabel,
  pluralLabel,
  formFields,
  listFormatter,
  itemDescription,
  itemKey = 'id',
  useModal = true,
}) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [formData, setFormData] = useState(defaultForm)
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  usePageTitle({ title: `${title} | Admin`, description })

  const fetchItems = async () => {
    try {
      setLoading(true)
      const response = await api.get(endpoint)
      setItems(response.data.results || response.data)
      setError('')
    } catch (err) {
      setError(err.response?.data?.detail || 'Unable to load records right now.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [endpoint])

  const filteredItems = useMemo(() => {
    const query = search.toLowerCase()
    return items.filter((item) => JSON.stringify(item).toLowerCase().includes(query))
  }, [items, search])

  const openCreate = () => {
    setSelectedItem(null)
    setFormData(defaultForm)
    setFormError('')
    setIsModalOpen(true)
  }

  const openEdit = (item) => {
    setSelectedItem(item)
    const nextFormData = { ...defaultForm }
    Object.entries(item).forEach(([key, value]) => {
      if (key.endsWith('_image') || key === 'image' || key === 'photo' || key === 'brochure') {
        nextFormData[key] = value || ''
      } else {
        nextFormData[key] = value
      }
    })
    setFormData(nextFormData)
    setFormError('')
    setIsModalOpen(true)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setFormError('')

    const form = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (value === null || value === undefined) return
      if (typeof value === 'boolean') {
        form.append(key, value ? 'true' : 'false')
      } else if (value instanceof File) {
        form.append(key, value)
      } else if (typeof value === 'string' && (key.endsWith('_image') || key === 'image' || key === 'photo' || key === 'brochure')) {
        if (value && !value.startsWith('http')) {
          form.append(key, value)
        }
      } else {
        form.append(key, value)
      }
    })

    try {
      if (selectedItem) {
        await api.patch(`${endpoint}${selectedItem.id}/`, form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      } else {
        await api.post(endpoint, form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      }
      await fetchItems()
      setIsModalOpen(false)
    } catch (err) {
      setFormError(err.response?.data?.detail || 'Unable to save the record.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete ${singularLabel.toLowerCase()}?`)) return
    try {
      await api.delete(`${endpoint}${item.id}/`)
      await fetchItems()
    } catch (err) {
      setError(err.response?.data?.detail || 'Unable to delete the record.')
    }
  }

  return (
    <AdminLayout title={title}>
      <div className="page-header">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <button className="btn btn--primary" type="button" onClick={openCreate}>
          Add {singularLabel}
        </button>
      </div>

      <div className="search-bar">
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={`Search ${pluralLabel.toLowerCase()}...`} />
      </div>

      {loading && <Loader message={`Loading ${pluralLabel.toLowerCase()}...`} />}
      {error && <div className="empty-state">{error}</div>}
      {!loading && !error && (
        <>
          {filteredItems.length === 0 ? (
            <div className="empty-state">No {pluralLabel.toLowerCase()} found.</div>
          ) : (
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item[itemKey]}>
                      <td>{listFormatter?.(item) || item.title || item.heading || item.name || item.subject}</td>
                      <td>{itemDescription?.(item) || item.description || item.message || item.principal_message || '—'}</td>
                      <td>{item.is_active === false ? 'Inactive' : item.is_read ? 'Read' : 'Active'}</td>
                      <td>
                        <div className="table-actions">
                          <button className="edit" type="button" onClick={() => openEdit(item)}>
                            Edit
                          </button>
                          <button className="delete" type="button" onClick={() => handleDelete(item)}>
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
        </>
      )}

      {useModal && (
        <Modal isOpen={isModalOpen} title={selectedItem ? `Edit ${singularLabel}` : `Add ${singularLabel}`} onClose={() => setIsModalOpen(false)}>
          <form onSubmit={handleSubmit}>
            {formError && <div className="empty-state">{formError}</div>}
            <div className="form-grid">
              {formFields.map((field) => {
                if (field.type === 'textarea') {
                  return (
                    <div className="form-group" key={field.name} style={{ gridColumn: '1 / -1' }}>
                      <label className="form-label" htmlFor={field.name}>{field.label}</label>
                      <textarea id={field.name} className="form-textarea" value={formData[field.name] || ''} onChange={(event) => setFormData((prev) => ({ ...prev, [field.name]: event.target.value }))} />
                    </div>
                  )
                }

                if (field.type === 'select') {
                  return (
                    <div className="form-group" key={field.name}>
                      <label className="form-label" htmlFor={field.name}>{field.label}</label>
                      <select id={field.name} className="form-select" value={formData[field.name] || ''} onChange={(event) => setFormData((prev) => ({ ...prev, [field.name]: event.target.value }))}>
                        {field.options.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                  )
                }

                if (field.type === 'checkbox') {
                  return (
                    <div className="form-group" key={field.name}>
                      <label className="form-label" htmlFor={field.name}>
                        <input id={field.name} type="checkbox" checked={Boolean(formData[field.name])} onChange={(event) => setFormData((prev) => ({ ...prev, [field.name]: event.target.checked }))} /> {field.label}
                      </label>
                    </div>
                  )
                }

                if (field.type === 'image') {
                  return (
                    <div className="form-group" key={field.name} style={{ gridColumn: '1 / -1' }}>
                      <ImageUpload label={field.label} existingImage={formData[field.name]} onFileChange={(file) => setFormData((prev) => ({ ...prev, [field.name]: file }))} />
                    </div>
                  )
                }

                if (field.type === 'file') {
                  return (
                    <div className="form-group" key={field.name}>
                      <label className="form-label" htmlFor={field.name}>{field.label}</label>
                      <input id={field.name} className="form-input" type="file" onChange={(event) => setFormData((prev) => ({ ...prev, [field.name]: event.target.files?.[0] || null }))} />
                    </div>
                  )
                }

                return (
                  <div className="form-group" key={field.name}>
                    <label className="form-label" htmlFor={field.name}>{field.label}</label>
                    <input id={field.name} className="form-input" type={field.type || 'text'} value={formData[field.name] || ''} onChange={(event) => setFormData((prev) => ({ ...prev, [field.name]: event.target.value }))} />
                  </div>
                )
              })}
            </div>

            <div className="form-actions">
              <button className="btn btn--primary" type="submit" disabled={submitting}>
                {submitting ? 'Saving...' : 'Save'}
              </button>
              <button className="btn btn--secondary" type="button" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </AdminLayout>
  )
}

export default ManagementPage
