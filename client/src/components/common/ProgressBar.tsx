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
    brand: 'bg-brand-600',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    navy: 'bg-navy-700',
  }[color];

  const heightStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }[size];

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
          <span>Progress</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-200 dark:bg-navy-800 rounded-full overflow-hidden ${heightStyles}`}>
        <div
          className={`${colorStyles} h-full transition-all duration-500 rounded-full`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};

interface ProgressRingProps {
  score: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  label?: string;
  subtitle?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  score,
  size = 140,
  strokeWidth = 10,
  label = 'Readiness',
  subtitle = 'Placement Score',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const clamped = Math.max(0, Math.min(100, score));
  const offset = circumference - (clamped / 100) * circumference;

  let strokeColor = '#0d9488'; // brand-600
  if (clamped >= 80) strokeColor = '#10b981'; // emerald
  else if (clamped < 60) strokeColor = '#f59e0b'; // amber

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-200 dark:text-navy-800"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {clamped}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {label}
        </span>
        {subtitle && (
          <span className="text-[9px] text-slate-400 dark:text-slate-500">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};
