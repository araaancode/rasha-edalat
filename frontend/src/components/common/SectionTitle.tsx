import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  highlight?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, highlight }) => {
  return (
    <div className="text-center mb-8 md:mb-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A1A2B]">
        {title} {highlight && <span className="text-[#1A4B6D]">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-sm sm:text-base opacity-80">
          {subtitle}
        </p>
      )}
    </div>
  );
};