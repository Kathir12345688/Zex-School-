import { useState } from 'react'

const ImageUpload = ({ label, existingImage, onFileChange, accept = 'image/*' }) => {
  const [preview, setPreview] = useState(existingImage || '')

  const handleChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const isValidType = file.type.startsWith('image/')
    if (!isValidType) {
      alert('Please upload a valid image file.')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB.')
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
    onFileChange(file)
  }

  return (
    <div className="image-upload">
      <label className="form-label">{label}</label>
      <input type="file" accept={accept} onChange={handleChange} />
      {preview && <img src={preview} alt="Preview" className="image-upload__preview" />}
    </div>
  )
}

export default ImageUpload
