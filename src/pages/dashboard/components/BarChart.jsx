import React from 'react'
import './BarChart.css'

export default function BarChart({
  title = 'Contatos por Área Acadêmica',
  subtitle = 'Distribuição da base por área de atuação',
  data = []
}) {
  const maxValue = Math.max(...data.map(d => d.value), 0)
  const chartWidth = 520
  const chartHeight = data.length * 40 + 20
  const barMaxWidth = 380
  const startX = 120
  const startY = 20

  return (
    <div className="chart-card">
      <header className="chart-header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </header>

      <div className="chart-container">
        <svg width="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
          {data.map((item, index) => {
            const barWidth = maxValue
              ? (item.value / maxValue) * barMaxWidth
              : 0
            const y = startY + index * 40

            return (
              <g key={index}>
                {/* Label */}
                <text
                  x="0"
                  y={y + 18}
                  className="bar-label"
                >
                  {item.label}
                </text>

                {/* Barra */}
                <rect
                  x={startX}
                  y={y}
                  width={barWidth}
                  height="22"
                  rx="6"
                  fill={item.color || '#0b5ed7'}
                />

                {/* Valor */}
                <text
                  x={startX + barWidth + 8}
                  y={y + 17}
                  className="bar-value"
                >
                  {item.value}%
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
