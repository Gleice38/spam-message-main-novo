import './StatCard.css'

export default function StatCard({
  title,
  value,
  subtitle,
  variation,
  variationType = 'positive', // positive | negative | neutral
  icon
}) {
  return (
    <div className="stat-card">
      
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
        {icon && <span className="stat-card-icon">{icon}</span>}
      </div>

      <div className="stat-card-value">
        {value}
      </div>

      {subtitle && (
        <div className="stat-card-subtitle">
          {subtitle}
        </div>
      )}

      {variation && (
        <div className={`stat-card-variation ${variationType}`}>
          {variation}
        </div>
      )}

    </div>
  )
}
