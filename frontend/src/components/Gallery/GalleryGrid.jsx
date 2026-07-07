const GalleryGrid = ({ items, onSelect }) => (
  <div className="gallery-grid">
    {items?.map((item) => (
      <button key={item.id} type="button" className="gallery-card" onClick={() => onSelect(item)}>
        <img src={item.image} alt={item.title} />
        <span className="gallery-card__label">{item.category || item.title}</span>
      </button>
    ))}
  </div>
)

export default GalleryGrid
