'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface GraphProps {
  data: number[]
}

export default function Graph({ data }: GraphProps) {
  // Transform data for Recharts
  const chartData = data.map((value, index) => ({
    time: index,
    requests: value,
  }))

  // If no data, show empty state
  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-400">
        <p>Waiting for data...</p>
      </div>
    )
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="time" 
            label={{ value: 'Time', position: 'insideBottom', offset: -5 }}
          />
          <YAxis 
            label={{ value: 'Requests', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="requests" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

