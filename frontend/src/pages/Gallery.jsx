import { useMemo, useState } from 'react'
import PublicLayout from '../components/Layout/PublicLayout'
import SectionHeading from '../components/Layout/SectionHeading'
import GalleryGrid from '../components/Gallery/GalleryGrid'
import Loader from '../components/Loader/Loader'
import usePageTitle from '../utils/usePageTitle'
import usePublicCollection from '../hooks/usePublicCollection'
import { getMediaUrl } from '../utils/media'

const Gallery = () => {
  usePageTitle({
    title: 'Gallery | Zex School',
    description: 'View the Zex School campus, activities and events in our photo gallery.',
  })

  const { data: galleryItems, loading, error } = usePublicCollection('/website/gallery/')
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedItem, setSelectedItem] = useState(null)

  const items = useMemo(
    () =>
      (galleryItems || [])
        .map((item) => ({ ...item, image: getMediaUrl(item.image) }))
        .filter((item) => (activeCategory === 'All' ? true : item.category === activeCategory)),
    [galleryItems, activeCategory],
  )

  const categories = useMemo(() => {
    const unique = new Set(galleryItems?.map((item) => item.category).filter(Boolean))
    return ['All', ...Array.from(unique)]
  }, [galleryItems])

  return (
    <PublicLayout>
      <section className="hero">
        <div className="container">
          <SectionHeading eyebrow="Gallery" title="Moments from our school life" description="Browse campus scenes, events, sports and learning experiences." />
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          {loading ? <Loader /> : null}
          {error ? <div className="status-message status-message--error">{error}</div> : null}
          {!loading && !items.length ? <div className="empty-state">No gallery images are available yet.</div> : null}

          {items.length ? (
            <>
              <div className="gallery-filter">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`pill${activeCategory === category ? ' is-active' : ''}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <GalleryGrid items={items} onSelect={setSelectedItem} />
            </>
          ) : null}

          {selectedItem ? (
            <div className="lightbox-overlay" role="dialog" aria-modal="true" aria-label="Image preview" onClick={() => setSelectedItem(null)}>
              <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
                <button type="button" className="lightbox-close" onClick={() => setSelectedItem(null)} aria-label="Close preview">
                  ×
                </button>
                <img src={selectedItem.image} alt={selectedItem.title} />
                <div className="lightbox-meta">
                  <h3>{selectedItem.title}</h3>
                  {selectedItem.category ? <p>{selectedItem.category}</p> : null}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </PublicLayout>
  )
}

export default Gallery
