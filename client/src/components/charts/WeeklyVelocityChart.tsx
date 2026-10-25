import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface VelocityDataPoint {
  day: string;
  minutes: number;
  problems: number;
}

export const WeeklyVelocityChart: React.FC = () => {
  const data: VelocityDataPoint[] = [
    { day: 'Mon', minutes: 120, problems: 6 },
    { day: 'Tue', minutes: 90, problems: 4 },
    { day: 'Wed', minutes: 150, problems: 8 },
    { day: 'Thu', minutes: 180, problems: 9 },
    { day: 'Fri', minutes: 110, problems: 5 },
    { day: 'Sat', minutes: 210, problems: 12 },
    { day: 'Sun', minutes: 160, problems: 7 },
  ];

  return (
    <div className="w-full h-56">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0d9488" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
          <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '12px',
            }}
          />
          <Area
            type="monotone"
            dataKey="minutes"
            name="Study Time (mins)"
            stroke="#0d9488"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorMinutes)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
