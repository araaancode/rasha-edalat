import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  icon,
  href,
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 rounded-full cursor-pointer';
  
  const variants = {
    primary: 'bg-gradient-to-r from-[#0A1A2B] to-[#1A4B6D] text-white hover:translate-y-[-4px] hover:scale-[1.01] hover:shadow-xl shadow-lg',
    outline: 'border-2 border-[#1A4B6D] text-[#1A4B6D] hover:bg-gradient-to-r hover:from-[#0A1A2B] hover:to-[#1A4B6D] hover:text-white hover:translate-y-[-3px] hover:shadow-lg',
    ghost: 'text-[#1A4B6D] hover:bg-gray-100 hover:translate-y-[-2px]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm min-h-[40px]',
    md: 'px-6 py-3 text-base min-h-[48px]',
    lg: 'px-8 py-4 text-lg min-h-[56px]',
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {icon && <span>{icon}</span>}
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};