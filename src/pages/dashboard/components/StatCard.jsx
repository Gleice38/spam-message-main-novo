import './StatCard.css'

export default function StatCard({ title, value, subtitle, icon, highlight }) {
  return (
    <div className="stat-card">
      <div className="stat-card__icon">{icon}</div>

      <p className="stat-card__title">{title}</p>

      <h2 className="stat-card__value">{value}</h2>

      {subtitle && (
        <p
          className="stat-card__subtitle"
          style={{ color: highlight || '#999' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}