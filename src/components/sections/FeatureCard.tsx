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
    <div className={`flex items-center justify-center ${isLeftLayout ? 'lg:justify-end pr-4 lg:pr-20' : 'lg:justify-start pl-4 lg:pl-20'} py-16 ${className}`}>
      <div className="flex flex-col lg:flex-row items-center gap-8 max-w-2xl lg:max-w-6xl">
        {/* Image */}
        <div className={`bg-gradient-to-br ${imageColor} rounded-2xl h-104 w-110 lg:w-150 flex items-center justify-center ${isLeftLayout ? 'order-1' : 'order-2'}`}>
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
              {icon}
            </div>
            <p className="text-gray-600 font-medium">Feature Image</p>
          </div>
        </div>
        
        {/* Text */}
        <div className={`w-112 ${isLeftLayout ? 'order-2' : 'order-1'}`}>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">{title}</h2>
          <p className="text-lg text-gray-600 mb-6">
            {description}
          </p>
          <ul className="space-y-3 text-gray-600">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
