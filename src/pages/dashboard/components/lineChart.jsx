import './LineChart.css'

export default function LineChart({
  title = 'Histórico de Mensagens Enviadas',
  subtitle = 'Evolução nos últimos meses',
  data = []
}) {
  return (
    <div className="chart-card">
      
      <header className="chart-header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </header>

      <div className="chart-container">
        <svg viewBox="0 0 600 300" className="line-chart">
          
          {/* eixo Y (grid) */}
          {[50, 100, 150, 200, 250].map((y, i) => (
            <line
              key={i}
              x1="50"
              y1={y}
              x2="550"
              y2={y}
              className="chart-grid"
            />
          ))}

          {/* eixo X */}
          <line x1="50" y1="250" x2="550" y2="250" className="chart-axis" />

          {/* linha do gráfico (placeholder) */}
          <polyline
            points="50,220 150,200 250,170 350,190 450,140 550,120"
            className="chart-line"
          />

          {/* pontos */}
          {[50,150,250,350,450,550].map((x, i) => (
            <circle
              key={i}
              cx={x}
              cy={[220,200,170,190,140,120][i]}
              r="5"
              className="chart-point"
            />
          ))}

        </svg>
      </div>

    </div>
  )
}
///Quando você quiser trocar o SVG por Chart.js:apaga só o <svg>, mantém estrutura, título e CSS