import ManagementPage from './ManagementPage'

const formFields = [
  { name: 'title', label: 'Title' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'eligibility', label: 'Eligibility', type: 'textarea' },
  { name: 'required_documents', label: 'Required Documents', type: 'textarea' },
  { name: 'admission_process', label: 'Admission Process', type: 'textarea' },
  { name: 'brochure', label: 'Brochure', type: 'file' },
  { name: 'is_active', label: 'Active', type: 'checkbox' },
]

const AdmissionsManagement = () => (
  <ManagementPage
    title="Admissions Management"
    description="Manage admission information and instructions."
    endpoint="/website/admissions/"
    singularLabel="Admission"
    pluralLabel="Admissions"
    formFields={formFields}
  />
)

export default AdmissionsManagement
