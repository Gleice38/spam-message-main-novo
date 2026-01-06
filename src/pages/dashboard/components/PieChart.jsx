import './PieChart.css'

export default function PieChart({
  title = 'Contatos por Região',
  subtitle = 'Distribuição geográfica da base de dados',
  data = []
}) {
  // soma total (segurança)
  const total = data.reduce((sum, item) => sum + item.value, 0)

  // cálculo dos arcos
  let cumulative = 0

  const slices = data.map((item, index) => {
    const value = item.value / total
    const startAngle = cumulative * 2 * Math.PI
    const endAngle = (cumulative + value) * 2 * Math.PI
    cumulative += value

    return {
      ...item,
      startAngle,
      endAngle,
      index
    }
  })

  const radius = 90
  const center = 120

  function polarToCartesian(angle) {
    return {
      x: center + radius * Math.cos(angle - Math.PI / 2),
      y: center + radius * Math.sin(angle - Math.PI / 2)
    }
  }

  function describeArc(startAngle, endAngle) {
    const start = polarToCartesian(endAngle)
    const end = polarToCartesian(startAngle)
    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0

    return `
      M ${center} ${center}
      L ${start.x} ${start.y}
      A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}
      Z
    `
  }

  return (
    <div className="chart-card">
      <header className="chart-header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </header>

      <div className="pie-chart-container">
        <svg width="240" height="240">
          {slices.map(slice => (
            <path
              key={slice.index}
              d={describeArc(slice.startAngle, slice.endAngle)}
              fill={slice.color}
            />
          ))}
        </svg>

        <ul className="pie-legend">
          {data.map((item, index) => (
            <li key={index}>
              <span
                className="legend-color"
                style={{ backgroundColor: item.color }}
              />
              <span className="legend-label">
                {item.label} {item.value}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
