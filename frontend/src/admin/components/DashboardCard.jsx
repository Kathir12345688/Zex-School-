const DashboardCard = ({ title, value, description, accent = 'blue' }) => {
  return (
    <article className={`dashboard-card dashboard-card--${accent}`}>
      <div>
        <p className="dashboard-card__title">{title}</p>
        <h3 className="dashboard-card__value">{value}</h3>
      </div>
      {description && <p className="dashboard-card__description">{description}</p>}
    </article>
  )
}

export default DashboardCard
