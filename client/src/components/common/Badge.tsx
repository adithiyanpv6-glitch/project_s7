import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'brand' | 'success' | 'warning' | 'error' | 'neutral' | 'outline';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
  ...props
}) => {
  const variants = {
    brand: 'bg-teal-500/10 text-teal-300 border-teal-500/20',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    error: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
    neutral: 'bg-zinc-800/80 text-zinc-300 border-zinc-700/60',
    outline: 'bg-transparent text-zinc-400 border-zinc-800',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 font-normal rounded-md',
    md: 'text-xs px-2.5 py-0.5 font-normal rounded-lg',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 border select-none ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
