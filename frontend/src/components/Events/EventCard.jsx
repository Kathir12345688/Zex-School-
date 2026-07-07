const EventCard = ({ title, description, image, event_date, location, className = '', reveal = false, revealDelay = 0 }) => (
  <article className={['card card--event', className].filter(Boolean).join(' ')} data-reveal={reveal ? '' : undefined} style={reveal ? { '--reveal-delay': `${revealDelay}ms` } : undefined}>
    {image ? <img className="card__image" src={image} alt={title} /> : null}
    <div className="card__body">
      <p className="eyebrow">{new Date(event_date).toLocaleDateString()}</p>
      <h3>{title}</h3>
      <p>{description}</p>
      {location ? <p className="muted">{location}</p> : null}
    </div>
  </article>
)

export default EventCard
