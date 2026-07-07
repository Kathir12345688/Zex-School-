import ManagementPage from './ManagementPage'

const formFields = [
  { name: 'title', label: 'Title' },
  { name: 'subtitle', label: 'Subtitle' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'button_text', label: 'Button Text' },
  { name: 'button_link', label: 'Button Link' },
  { name: 'background_image', label: 'Background Image', type: 'image' },
  { name: 'is_active', label: 'Active', type: 'checkbox' },
]

const HeroManagement = () => (
  <ManagementPage
    title="Hero Management"
    description="Create and update the homepage hero section."
    endpoint="/website/hero/"
    singularLabel="Hero"
    pluralLabel="Heroes"
    formFields={formFields}
  />
)

export default HeroManagement
