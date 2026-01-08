import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

import './lineChart.css'

const data = [
  { month: 'Jul', value: 1800 },
  { month: 'Ago', value: 2100 },
  { month: 'Set', value: 2450 },
  { month: 'Out', value: 2200 },
  { month: 'Nov', value: 2900 },
  { month: 'Dez', value: 3300 }
]

export default function LineChart() {
  return (
    <div className="line-chart-wrapper">
      <ResponsiveContainer width="100%" height={260}>
        <ReLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#667' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#667' }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#0b3c5d"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  )
}
