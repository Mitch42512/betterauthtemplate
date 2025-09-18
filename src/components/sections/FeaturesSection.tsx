import React from 'react';
import FeatureCard from './FeatureCard';

const features = [
  {
    title: "Advanced Authentication",
    description: "Secure your applications with our cutting-edge authentication system. Features include multi-factor authentication, OAuth integration, and enterprise-grade security protocols.",
    features: [
      "Multi-factor authentication",
      "OAuth 2.0 integration", 
      "Enterprise security"
    ],
    icon: (
      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    imageColor: "from-blue-100 to-blue-200",
    layout: "left" as const
  },
  {
    title: "User Management",
    description: "Comprehensive user management tools that make it easy to handle user accounts, permissions, and roles. Built for scalability and enterprise needs.",
    features: [
      "Role-based access control",
      "User analytics dashboard",
      "Bulk user operations"
    ],
    icon: (
      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
      </svg>
    ),
    imageColor: "from-green-100 to-green-200",
    layout: "right" as const
  },
  {
    title: "API Integration",
    description: "Seamlessly integrate with your existing systems using our powerful REST APIs. Built with developer experience in mind, featuring comprehensive documentation and SDKs.",
    features: [
      "RESTful API design",
      "Webhook support",
      "SDK for multiple languages"
    ],
    icon: (
      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    imageColor: "from-purple-100 to-purple-200",
    layout: "left" as const
  },
  {
    title: "Analytics & Insights",
    description: "Get detailed insights into user behavior and system performance with our comprehensive analytics dashboard. Make data-driven decisions with real-time metrics.",
    features: [
      "Real-time dashboards",
      "Custom reporting",
      "Export capabilities"
    ],
    icon: (
      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
      </svg>
    ),
    imageColor: "from-orange-100 to-orange-200",
    layout: "right" as const
  }
];

interface FeaturesSectionProps {
  className?: string;
}

export default function FeaturesSection({ className = "" }: FeaturesSectionProps) {
  return (
    <div id="features-section" className={`relative z-10 py-8 sm:py-12 lg:py-16 ${className}`}>
      {/* Mobile: Single column, Desktop: Two equal columns with snaking pattern */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        
        {/* Left Column - Features 1 & 3 */}
        <div className="flex flex-col">
          <FeatureCard {...features[0]} />
          <FeatureCard {...features[2]} className="mt-0 lg:mt-8 xl:mt-34" />
        </div>

        {/* Right Column - Features 2 & 4 */}
        <div className="flex flex-col">
          <FeatureCard {...features[1]} className="mt-0 lg:mt-8 xl:mt-50" />
          <FeatureCard {...features[3]} className="mt-0 lg:mt-8 xl:mt-50" />
        </div>
      </div>
    </div>
  );
}
