'use client';

import React from "react";
import Navigation from "@/components/layout/Navigation";
import AnimatedBackground from "@/components/background/AnimatedBackground";
import FloatingPill from "@/components/ui/FloatingPill";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden">
      {/* Floating "See Features" Pill */}
      <FloatingPill onScrollToFeatures={scrollToFeatures} />

      {/* Abstract Gradient Background */}
      <AnimatedBackground />

      {/* Navigation Bar */}
      <Navigation variant="homepage" />

      {/* Main Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Bottom Contact Bar */}
      <Footer />
    </div>
  );
}