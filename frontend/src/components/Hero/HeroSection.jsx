const HeroSection = ({ title, subtitle, description, buttonText, buttonLink, image, eyebrow = 'Welcome to Zex School' }) => {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="hero__subtitle">{subtitle}</p>
          <p className="hero__description">{description}</p>
          {buttonText && (
            <a className="button" href={buttonLink || '/admissions'}>
              {buttonText}
            </a>
          )}
        </div>
        {image && (
          <div className="hero__media">
            <img src={image} alt={title} />
          </div>
        )}
      </div>
    </section>
  )
}

export default HeroSection
