import ManagementPage from './ManagementPage'

const formFields = [
  { name: 'title', label: 'Title' },
  { name: 'category', label: 'Category', type: 'select', options: [
    { value: 'Campus', label: 'Campus' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Events', label: 'Events' },
    { value: 'Laboratory', label: 'Laboratory' },
    { value: 'Cultural', label: 'Cultural' },
    { value: 'Classroom', label: 'Classroom' },
    { value: 'Other', label: 'Other' },
  ] },
  { name: 'image', label: 'Image', type: 'image' },
  { name: 'display_order', label: 'Display Order', type: 'number' },
  { name: 'is_active', label: 'Active', type: 'checkbox' },
]

const GalleryManagement = () => (
  <ManagementPage
    title="Gallery Management"
    description="Upload and manage school gallery content."
    endpoint="/website/gallery/"
    singularLabel="Gallery Item"
    pluralLabel="Gallery"
    formFields={formFields}
  />
)

export default GalleryManagement
