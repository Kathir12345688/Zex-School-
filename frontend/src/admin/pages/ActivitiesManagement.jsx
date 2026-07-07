import ManagementPage from './ManagementPage'

const formFields = [
  { name: 'title', label: 'Title' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'image', label: 'Image', type: 'image' },
  { name: 'display_order', label: 'Display Order', type: 'number' },
  { name: 'is_active', label: 'Active', type: 'checkbox' },
]

const ActivitiesManagement = () => (
  <ManagementPage
    title="Activities Management"
    description="Manage extracurricular activities and programs."
    endpoint="/website/activities/"
    singularLabel="Activity"
    pluralLabel="Activities"
    formFields={formFields}
  />
)

export default ActivitiesManagement
