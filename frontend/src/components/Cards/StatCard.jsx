const StatCard = ({ value, label }) => (
  <article className="card card--stat">
    <div className="card__body">
      <p className="stat-value">{value}</p>
      <p>{label}</p>
    </div>
  </article>
)

export default StatCard
