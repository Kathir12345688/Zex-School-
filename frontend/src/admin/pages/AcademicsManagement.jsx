import ManagementPage from './ManagementPage'

const formFields = [
  { name: 'title', label: 'Title' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'image', label: 'Image', type: 'image' },
  { name: 'display_order', label: 'Display Order', type: 'number' },
  { name: 'is_active', label: 'Active', type: 'checkbox' },
]

const AcademicsManagement = () => (
  <ManagementPage
    title="Academics Management"
    description="Manage academic programs and content."
    endpoint="/website/academics/"
    singularLabel="Academic"
    pluralLabel="Academics"
    formFields={formFields}
  />
)

export default AcademicsManagement
