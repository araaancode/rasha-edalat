// frontend/src/components/LoadingPage.tsx
import React from 'react';
import { GiScales } from 'react-icons/gi';

interface LoadingPageProps {
  message?: string;
}

export const LoadingPage: React.FC<LoadingPageProps> = ({ 
  message = 'در حال بارگذاری...' 
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A1A2B] to-[#1A4B6D]">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          
          <h1 className="text-3xl font-bold text-white mt-4 tracking-tight">
            راشا <span className="text-[#4A8AB5]">عدالت</span>
          </h1>
          <p className="text-white/40 text-sm mt-1 tracking-wider uppercase">
            مشاوره حقوقی هوشمند
          </p>
        </div>

        {/* Spinner */}
        <div className="relative w-20 h-20 mx-auto">
          {/* Outer ring */}
          <div className="absolute inset-0 border-4 border-[#4A8AB5]/20 rounded-full"></div>
          {/* Inner spinning ring */}
          <div className="absolute inset-0 border-4 border-[#4A8AB5] rounded-full border-t-transparent animate-spin"></div>
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-[#4A8AB5]/10 rounded-full flex items-center justify-center">
              <GiScales className="text-[#4A8AB5] text-sm animate-pulse" />
            </div>
          </div>
        </div>

        {/* Message */}
        <p className="mt-6 text-white/60 text-sm font-light animate-pulse">
          {message}
        </p>

        {/* Progress Bar */}
        <div className="mt-4 w-48 h-1.5 bg-white/10 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#4A8AB5] to-[#2A6A8D] rounded-full animate-progress"></div>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-[#4A8AB5]/40 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            ></div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-bounce {
          animation: bounce 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};