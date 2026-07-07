const TestimonialCard = ({ name, role, message, rating }) => (
  <article className="card card--testimonial">
    <div className="card__body">
      <p className="testimonial__message">“{message}”</p>
      <div className="testimonial__meta">
        <div>
          <strong>{name}</strong>
          <p>{role}</p>
        </div>
        <div className="rating" aria-label={`Rating: ${rating} out of 5`}>{'★'.repeat(rating)}</div>
      </div>
    </div>
  </article>
)

export default TestimonialCard
