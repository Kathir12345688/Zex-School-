import ManagementPage from './ManagementPage'

const formFields = [
  { name: 'heading', label: 'Heading' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'principal_message', label: 'Principal Message', type: 'textarea' },
  { name: 'image', label: 'Image', type: 'image' },
]

const AboutManagement = () => (
  <ManagementPage
    title="About Management"
    description="Manage the school overview and leadership message."
    endpoint="/website/about/"
    singularLabel="About"
    pluralLabel="About Sections"
    formFields={formFields}
  />
)

export default AboutManagement
