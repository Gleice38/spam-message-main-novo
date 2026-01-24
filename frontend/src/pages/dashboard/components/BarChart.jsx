import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts'

import './BarChart.css'

export default function BarChart({ data = [] }) {
  if (!data.length) return null

  return (
    <div className="bar-chart-wrapper">
      <ResponsiveContainer width="100%" height={300}>
        <ReBarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 20, left: 40, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fontSize: 12, fill: '#667' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="label"
            tick={{ fontSize: 13, fill: '#0b3c5d' }}
            axisLine={false}
            tickLine={false}
          />
          <Bar
            dataKey="value"
            radius={[0, 6, 6, 0]}
            fill="#0b3c5d"
          />
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  )
}
