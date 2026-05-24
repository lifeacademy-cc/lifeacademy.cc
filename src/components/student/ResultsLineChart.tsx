'use client'

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

interface ChartData {
  month: string
  'คะแนน Pre-Test': number
  'คะแนน Post-Test': number
}

const defaultData: ChartData[] = [
  { month: 'มีนาคม', 'คะแนน Pre-Test': 45, 'คะแนน Post-Test': 68 },
  { month: 'เมษายน', 'คะแนน Pre-Test': 52, 'คะแนน Post-Test': 78 },
  { month: 'พฤษภาคม', 'คะแนน Pre-Test': 60, 'คะแนน Post-Test': 88 },
]

interface ResultsLineChartProps {
  data?: ChartData[]
}

export default function ResultsLineChart({ data = defaultData }: ResultsLineChartProps) {
  return (
    <div className="w-full h-[250px] font-thai text-xs">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis 
            dataKey="month" 
            stroke="#94a3b8" 
            tickLine={false}
            axisLine={false}
            dy={8}
          />
          <YAxis 
            stroke="#94a3b8" 
            tickLine={false}
            axisLine={false}
            domain={[0, 100]}
            dx={-8}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#ffffff', 
              border: '1px solid #e2e8f0', 
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(15,37,87,0.06)'
            }}
            labelStyle={{ fontWeight: 'bold', color: '#0f2557', marginBottom: '4px' }}
          />
          <Legend 
            verticalAlign="top" 
            height={36} 
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ paddingBottom: '10px' }}
          />
          <Line 
            type="monotone" 
            dataKey="คะแนน Pre-Test" 
            stroke="#94a3b8" 
            strokeWidth={3}
            activeDot={{ r: 6 }}
            dot={{ r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="คะแนน Post-Test" 
            stroke="#1a56db" 
            strokeWidth={3}
            activeDot={{ r: 6 }}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
