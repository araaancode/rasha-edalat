// frontend/src/components/LoadingSpinner.tsx
import React from 'react';
import { GiScales } from 'react-icons/gi';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-[3px]',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4'
  };

  const iconSizes = {
    sm: 'text-[8px]',
    md: 'text-xs',
    lg: 'text-base',
    xl: 'text-xl'
  };

  const containerSizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        {/* Outer ring */}
        <div 
          className={`${sizeClasses[size]} rounded-full border-[#1A4B6D]/20 animate-spin`}
          style={{ 
            borderTopColor: 'transparent',
            borderRightColor: '#1A4B6D',
            borderBottomColor: '#4A8AB5',
            borderLeftColor: '#1A4B6D',
          }}
        ></div>
        
        {/* Inner icon */}
        <div className={`absolute inset-0 flex items-center justify-center ${containerSizes[size]}`}>
          <GiScales className={`${iconSizes[size]} text-[#4A8AB5] animate-pulse`} />
        </div>
      </div>
    </div>
  );
};