import ManagementPage from './ManagementPage'

const formFields = [
  { name: 'title', label: 'Title' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'icon', label: 'Icon' },
  { name: 'image', label: 'Image', type: 'image' },
  { name: 'display_order', label: 'Display Order', type: 'number' },
  { name: 'is_active', label: 'Active', type: 'checkbox' },
]

const FacilitiesManagement = () => (
  <ManagementPage
    title="Facilities Management"
    description="Manage school facilities and amenities."
    endpoint="/website/facilities/"
    singularLabel="Facility"
    pluralLabel="Facilities"
    formFields={formFields}
  />
)

export default FacilitiesManagement
