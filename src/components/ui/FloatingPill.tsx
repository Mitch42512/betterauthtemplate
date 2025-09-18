import React, { useState, useEffect } from 'react';

interface FloatingPillProps {
  onScrollToFeatures: () => void;
  className?: string;
}

export default function FloatingPill({ onScrollToFeatures, className = "" }: FloatingPillProps) {
  const [showFloatingPill, setShowFloatingPill] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowFloatingPill(false);
      } else {
        setShowFloatingPill(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!showFloatingPill) return null;

  return (
    <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 ${className}`}>
      <button
        onClick={onScrollToFeatures}
        className="bg-white/90 backdrop-blur-sm text-gray-800 px-6 py-3 rounded-full shadow-lg border border-gray-200 hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
      >
        <span className="font-medium">See Features</span>
        <svg 
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
    </div>
  );
}
