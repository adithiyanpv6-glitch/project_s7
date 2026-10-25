import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

interface RadarDataPoint {
  subject: string;
  score: number;
  fullMark: number;
}

interface ReadinessRadarProps {
  data?: RadarDataPoint[];
}

export const ReadinessRadar: React.FC<ReadinessRadarProps> = ({ data }) => {
  const defaultData: RadarDataPoint[] = [
    { subject: 'Quant Aptitude', score: 82, fullMark: 100 },
    { subject: 'Logical Reasoning', score: 85, fullMark: 100 },
    { subject: 'Verbal Ability', score: 75, fullMark: 100 },
    { subject: 'Coding / DSA', score: 80, fullMark: 100 },
    { subject: 'Core CS (OS/DBMS)', score: 74, fullMark: 100 },
    { subject: 'Soft Skills / HR', score: 75, fullMark: 100 },
  ];

  const chartData = data && data.length > 0 ? data : defaultData;

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
          <PolarGrid stroke="#cbd5e1" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" />
          <Radar
            name="Readiness Score"
            dataKey="score"
            stroke="#0d9488"
            fill="#0d9488"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
