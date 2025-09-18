import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  imageColor: string;
  layout: 'left' | 'right';
  className?: string;
}

export default function FeatureCard({ 
  title, 
  description, 
  features, 
  icon, 
  imageColor, 
  layout,
  className = "" 
}: FeatureCardProps) {
  const isLeftLayout = layout === 'left';
  
  return (
    <div className={`flex items-center justify-center ${isLeftLayout ? 'lg:justify-end lg:pr-4 xl:pr-20' : 'lg:justify-start lg:pl-4 xl:pl-20'} py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-0 ${className}`}>
      <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 max-w-4xl lg:max-w-7xl w-full">
        {/* Image */}
        <div className={`bg-gradient-to-br ${imageColor} rounded-2xl h-48 sm:h-64 lg:h-80 xl:h-104 w-full sm:w-80 lg:w-120 xl:w-160 flex items-center justify-center ${isLeftLayout ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="text-center px-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 text-white">
                {icon}
              </div>
            </div>
            <p className="text-gray-600 font-medium text-sm sm:text-base">Feature Image</p>
          </div>
        </div>
        
        {/* Text */}
        <div className={`w-full lg:w-128 xl:w-144 ${isLeftLayout ? 'lg:order-2' : 'lg:order-1'}`}>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight">{title}</h2>
          <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
            {description}
          </p>
          <ul className="space-y-2 sm:space-y-3 text-gray-600">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start sm:items-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 sm:mt-0 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm sm:text-base">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
