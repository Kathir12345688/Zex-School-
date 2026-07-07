const InfoCard = ({ title, description, image, icon, actionLabel, actionHref, className = '', reveal = false, revealDirection = 'left', revealDelay = 0 }) => {
  const cardClassName = ['card', className].filter(Boolean).join(' ')
  const revealStyle = reveal ? { '--reveal-delay': `${revealDelay}ms` } : undefined

  return (
    <article className={cardClassName} data-reveal={reveal ? '' : undefined} data-reveal-direction={reveal ? revealDirection : undefined} style={revealStyle}>
      {image ? <img className="card__image" src={image} alt={title} /> : null}
      <div className="card__body">
        {icon ? <div className="card__icon">{icon}</div> : null}
        <h3>{title}</h3>
        <p>{description}</p>
        {actionLabel && actionHref ? (
          <a className="text-link" href={actionHref}>
            {actionLabel}
          </a>
        ) : null}
      </div>
    </article>
  )
}

export default InfoCard
