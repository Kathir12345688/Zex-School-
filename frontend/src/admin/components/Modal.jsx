const Modal = ({ isOpen, title, children, onClose, size = 'medium' }) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div className={`modal ${size}`} role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(event) => event.stopPropagation()}>
        <div className="modal__header">
          <h3 id="modal-title">{title}</h3>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close modal">
            ×
          </button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  )
}

export default Modal
