import ManagementPage from './ManagementPage'

const formFields = [
  { name: 'title', label: 'Title' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'event_date', label: 'Event Date', type: 'date' },
  { name: 'location', label: 'Location' },
  { name: 'image', label: 'Image', type: 'image' },
  { name: 'is_featured', label: 'Featured', type: 'checkbox' },
  { name: 'is_active', label: 'Active', type: 'checkbox' },
]

const EventsManagement = () => (
  <ManagementPage
    title="Event Management"
    description="Manage upcoming school events and activities."
    endpoint="/website/events/"
    singularLabel="Event"
    pluralLabel="Events"
    formFields={formFields}
  />
)

export default EventsManagement
