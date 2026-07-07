import { useState } from 'react'
import api from '../../services/api'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

const ContactForm = () => {
  const [form, setForm] = useState(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })
    setErrors({})

    try {
      const response = await api.post('/contact/', form)
      if (response.status === 201) {
        setStatus({ type: 'success', message: 'Your message has been sent. We will reach out soon.' })
        setForm(initialForm)
      }
    } catch (error) {
      if (error.response?.data) {
        setErrors(error.response.data)
        setStatus({ type: 'error', message: 'Please fix the fields highlighted below and try again.' })
      } else {
        setStatus({ type: 'error', message: 'Unable to submit the form right now. Please try again later.' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="form-card form-card--contact" onSubmit={handleSubmit} noValidate>
      <h3>Send us a message</h3>
      <div className="form-grid">
        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} required />
          {errors.name ? <span className="field-error">{errors.name}</span> : null}
        </label>
        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
          {errors.email ? <span className="field-error">{errors.email}</span> : null}
        </label>
        <label>
          Phone
          <input name="phone" value={form.phone} onChange={handleChange} />
          {errors.phone ? <span className="field-error">{errors.phone}</span> : null}
        </label>
        <label>
          Subject
          <input name="subject" value={form.subject} onChange={handleChange} required />
          {errors.subject ? <span className="field-error">{errors.subject}</span> : null}
        </label>
        <label className="form-grid--full">
          Message
          <textarea name="message" rows="5" value={form.message} onChange={handleChange} required />
          {errors.message ? <span className="field-error">{errors.message}</span> : null}
        </label>
      </div>

      {status.message ? (
        <div className={`status-message${status.type === 'error' ? ' status-message--error' : ''}`}>
          {status.message}
        </div>
      ) : null}

      <button type="submit" className="button button--full" disabled={isSubmitting}>
        {isSubmitting ? 'Sending message…' : 'Submit message'}
      </button>
    </form>
  )
}

export default ContactForm
