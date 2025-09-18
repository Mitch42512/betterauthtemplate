import React from 'react';
import Navigation from './layout/Navigation';
import AnimatedBackground from './background/AnimatedBackground';
import HeroSection from './sections/HeroSection';

export default function HomepageBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Navigation Bar */}
      <Navigation variant="auth" />
      
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Main Container */}
      <HeroSection />
    </div>
  );
}
