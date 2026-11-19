import React from 'react';

interface ProgressBarProps {
  value: number; // 0 to 100
  color?: 'brand' | 'emerald' | 'amber' | 'rose' | 'navy';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  color = 'brand',
  size = 'md',
  showLabel = false,
}) => {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));

  const colorStyles = {
    brand: 'bg-white',
    emerald: 'bg-emerald-400',
    amber: 'bg-amber-400',
    rose: 'bg-rose-400',
    navy: 'bg-zinc-400',
  }[color];

  const heightStyles = {
    sm: 'h-1',
    md: 'h-1.5',
    lg: 'h-2.5',
  }[size];

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-light text-zinc-400 mb-1.5">
          <span>Progress</span>
          <span className="text-white font-medium">{clamped}%</span>
        </div>
      )}
      <div className={`w-full bg-zinc-800/80 rounded-full overflow-hidden ${heightStyles}`}>
        <div
          className={`${colorStyles} h-full transition-all duration-500 rounded-full`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};

interface ProgressRingProps {
  value?: number;
  score?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  value,
  score,
  size = 100,
  strokeWidth = 8,
  label,
}) => {
  const actualVal = value ?? score ?? 0;
  const clamped = Math.max(0, Math.min(100, Math.round(actualVal)));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#27272a"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#ffffff"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute text-center">
        <span className="text-xl font-semibold tracking-tight text-white block">
          {clamped}%
        </span>
        {label && <span className="text-[10px] text-zinc-400 uppercase tracking-wider">{label}</span>}
      </div>
    </div>
  );
};
