// frontend/src/components/LoadingSkeleton.tsx
import React from 'react';

interface LoadingSkeletonProps {
  type?: 'card' | 'list' | 'profile' | 'chat' | 'lawyer' | 'dashboard';
  count?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  type = 'card', 
  count = 1 
}) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
            <div className="mt-4 flex gap-2">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8 animate-pulse">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="mt-6 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        );

      case 'chat':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <div className="h-3 bg-gray-200 rounded w-3/4 ml-auto"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3 ml-auto"></div>
            </div>
          </div>
        );

      case 'lawyer':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 bg-gray-200 rounded-2xl"></div>
              <div className="flex-1">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="flex gap-2">
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
            <div className="mt-4 flex gap-2">
              <div className="h-10 bg-gray-200 rounded-xl w-full"></div>
            </div>
          </div>
        );

      case 'dashboard':
        return (
          <div className="space-y-4 animate-pulse">
            <div className="bg-gradient-to-br from-[#0A1A2B]/50 to-[#1A4B6D]/50 rounded-2xl p-8">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="w-48 h-48 lg:w-64 lg:h-64 bg-gray-300/20 rounded-2xl"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-8 bg-gray-300/20 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-300/20 rounded w-1/2"></div>
                  <div className="flex gap-4">
                    <div className="h-12 bg-gray-300/20 rounded-xl w-32"></div>
                    <div className="h-12 bg-gray-300/20 rounded-xl w-32"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-32 bg-gray-200 rounded-xl"></div>
              <div className="h-32 bg-gray-200 rounded-xl"></div>
              <div className="h-32 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>{renderSkeleton()}</div>
      ))}
    </>
  );
};