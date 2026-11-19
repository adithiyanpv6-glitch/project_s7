import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98] cursor-pointer';

  const variants = {
    primary:
      'bg-white hover:bg-zinc-200 text-black shadow-sm font-medium border border-transparent',
    secondary:
      'bg-zinc-800 hover:bg-zinc-750 text-white border border-zinc-700/80',
    outline:
      'border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800/60 text-zinc-300',
    ghost:
      'text-zinc-400 hover:text-white hover:bg-zinc-850',
    destructive:
      'bg-rose-950/60 hover:bg-rose-900/80 text-rose-200 border border-rose-800/80',
  };

  const sizes = {
    sm: 'text-xs h-8 px-3 gap-1.5',
    md: 'text-xs sm:text-sm h-9 px-4 gap-2',
    lg: 'text-sm h-11 px-5 gap-2.5 font-medium',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-3.5 w-3.5 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};
