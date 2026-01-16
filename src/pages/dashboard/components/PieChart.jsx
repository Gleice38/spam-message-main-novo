import {
  PieChart as RePieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts'

import './PieChart.css'

export default function PieChart({ data = [] }) {
  if (!data.length) return null

  
  return (
    <div className="pie-chart-wrapper">
      <ResponsiveContainer width="100%" height={260}>
        <RePieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label={({ name, value }) => `${name} ${value}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
  <Cell
    key={index}
    fill={entry.color || '#0b3c5d'}
  />
))}

        
          </Pie>
        </RePieChart>
      </ResponsiveContainer>
    </div>
  )
}
