'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
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

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden">
      {/* Floating "See Features" Pill */}
      {showFloatingPill && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <button
            onClick={scrollToFeatures}
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
      )}

      {/* Abstract Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-blue-50 to-cyan-100"></div>
        
        {/* Multiple repeating wave patterns for seamless coverage */}
        <div className="absolute inset-0">
          {/* Wave Layer 1 */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.3"/>
                <stop offset="50%" stopColor="#DBEAFE" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="#F0FDFA" stopOpacity="0.4"/>
              </linearGradient>
            </defs>
            <path d="M0,100 Q50,50 100,100 T200,100 Q250,150 300,100 T400,100 L400,200 L0,200 Z" fill="url(#wave1)"/>
          </svg>
          
          {/* Wave Layer 2 */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.1"/>
                <stop offset="50%" stopColor="#0EA5E9" stopOpacity="0.15"/>
                <stop offset="100%" stopColor="#FEF3C7" stopOpacity="0.2"/>
              </linearGradient>
            </defs>
            <path d="M0,150 Q75,100 150,150 T300,150 Q350,200 400,150 L400,200 L0,200 Z" fill="url(#wave2)"/>
          </svg>
          
          {/* Wave Layer 3 */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="wave3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F0FDFA" stopOpacity="0.25"/>
                <stop offset="50%" stopColor="#FEF3C7" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.1"/>
              </linearGradient>
            </defs>
            <path d="M0,50 Q100,25 200,50 T400,50 L400,200 L0,200 Z" fill="url(#wave3)"/>
          </svg>
        </div>
        
        {/* Geometric patterns and accents */}
        <div className="absolute inset-0">
          {/* Dotted pattern overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #1E40AF 1px, transparent 0)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `linear-gradient(#0EA5E9 1px, transparent 1px), linear-gradient(90deg, #0EA5E9 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }}></div>
          </div>
          
          {/* Floating geometric elements */}
          <div className="absolute inset-0">
            {/* Circles */}
            <div className="absolute w-3 h-3 bg-yellow-200 rounded-full opacity-30" style={{top: '10%', left: '15%'}}></div>
            <div className="absolute w-2 h-2 bg-blue-300 rounded-full opacity-25" style={{top: '20%', right: '20%'}}></div>
            <div className="absolute w-4 h-4 bg-cyan-200 rounded-full opacity-20" style={{top: '60%', left: '10%'}}></div>
            <div className="absolute w-2 h-2 bg-yellow-300 rounded-full opacity-30" style={{top: '80%', right: '15%'}}></div>
            <div className="absolute w-3 h-3 bg-blue-200 rounded-full opacity-25" style={{top: '40%', left: '80%'}}></div>
            <div className="absolute w-2 h-2 bg-cyan-300 rounded-full opacity-20" style={{top: '70%', right: '30%'}}></div>
            <div className="absolute w-3 h-3 bg-yellow-200 rounded-full opacity-25" style={{top: '30%', left: '60%'}}></div>
            <div className="absolute w-2 h-2 bg-blue-300 rounded-full opacity-30" style={{top: '50%', right: '10%'}}></div>
            <div className="absolute w-4 h-4 bg-cyan-200 rounded-full opacity-15" style={{top: '90%', left: '70%'}}></div>
            <div className="absolute w-2 h-2 bg-yellow-300 rounded-full opacity-25" style={{top: '15%', left: '40%'}}></div>
            
            {/* Triangles */}
            <div className="absolute w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-cyan-300 opacity-20" style={{top: '25%', left: '25%'}}></div>
            <div className="absolute w-0 h-0 border-l-3 border-r-3 border-b-5 border-l-transparent border-r-transparent border-b-yellow-300 opacity-25" style={{top: '45%', right: '25%'}}></div>
            <div className="absolute w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-blue-300 opacity-20" style={{top: '65%', left: '45%'}}></div>
            <div className="absolute w-0 h-0 border-l-3 border-r-3 border-b-5 border-l-transparent border-r-transparent border-b-cyan-200 opacity-30" style={{top: '85%', right: '40%'}}></div>
            <div className="absolute w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-yellow-200 opacity-15" style={{top: '35%', left: '75%'}}></div>
            
            {/* Subtle lines */}
            <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-yellow-200 to-transparent opacity-20" style={{top: '20%'}}></div>
            <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-15" style={{top: '60%'}}></div>
            <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent opacity-20" style={{top: '90%'}}></div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="flex justify-between items-center px-8 py-4">
          {/* Left side - Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-800">Crextio</span>
        </div>

          {/* Right side - Auth buttons */}
          <div className="flex items-center">
            <Link 
            href="/login"
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded-full transition-colors"
            >
              Sign In
            </Link>
            <Link 
            href="/register"
              className="bg-indigo-600 text-white px-4 py-1 rounded-full hover:bg-indigo-700 ml-2 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Hero Section */}
      <div className="flex items-center justify-center min-h-screen px-12 pt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-7xl w-full">
          {/* Left Section */}
          <div className="bg-transparent flex flex-col items-center justify-center text-center h-full">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold text-gray-800 mb-6">
                Welcome to Crextio
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Your one-stop platform for <strong>managing accounts</strong> and <strong>authentication templates</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link 
                  href="/login"
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-8 py-3 rounded-full font-semibold transition-colors text-center text-lg"
                >
                  Sign In
                </Link>
                <Link 
                  href="/register"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-semibold transition-colors text-center text-lg"
                >
                  Create Account
                </Link>
              </div>
            </div>
          </div>

          {/* Right Section - YouTube-style Video */}
          <div className="bg-transparent flex items-center justify-center">
            <div className="bg-white rounded-xl h-[500px] w-full max-w-2xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Video Header */}
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="flex-1"></div>
                <div className="text-sm text-gray-500">Crextio Demo</div>
              </div>
              
              {/* Video Content Area */}
              <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-gray-600 font-medium">Video Demo Coming Soon</p>
                  <p className="text-sm text-gray-500 mt-2">Watch our platform in action</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features-section" className="relative z-10">
        {/* Feature 1 - Advanced Authentication (Image left, Text right) - Left margin, 400px from left */}
        <div className="flex items-center px-8 py-16">
          <div className="w-full max-w-5xl">
            <div className="flex items-center gap-8" style={{marginLeft: '400px'}}>
              {/* Image on the left */}
              <div className="flex justify-start">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl h-72 w-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <p className="text-gray-600 font-medium">Feature 1 Image</p>
                  </div>
                </div>
              </div>
              {/* Text on the right */}
              <div className="flex justify-start">
                <div className="w-80">
                  <h2 className="text-4xl font-bold text-gray-800 mb-6">Advanced Authentication</h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Secure your applications with our cutting-edge authentication system. 
                    Features include multi-factor authentication, OAuth integration, and 
                    enterprise-grade security protocols.
                  </p>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Multi-factor authentication
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      OAuth 2.0 integration
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Enterprise security
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2 - User Management (Text left, Image right) - Right margin, 20% from center - 50px padding from Feature 1 */}
        <div className="flex items-center justify-end px-8" style={{paddingTop: '50px', paddingBottom: '50px'}}>
          <div className="w-full max-w-5xl">
            <div className="flex items-center gap-8">
              {/* Text on the left */}
              <div className="flex justify-start">
                <div className="w-80">
                  <h2 className="text-4xl font-bold text-gray-800 mb-6">User Management</h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Comprehensive user management tools that make it easy to handle 
                    user accounts, permissions, and roles. Built for scalability and 
                    enterprise needs.
                  </p>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Role-based access control
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      User analytics dashboard
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Bulk user operations
                    </li>
                  </ul>
                </div>
              </div>
              {/* Image on the right */}
              <div className="flex justify-start">
                <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl h-72 w-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    </div>
                    <p className="text-gray-600 font-medium">Feature 2 Image</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 3 - API Integration (Image left, Text right) - Left margin, 400px from left */}
        <div className="flex items-center px-8 py-16">
          <div className="w-full max-w-5xl">
            <div className="flex items-center gap-8" style={{marginLeft: '400px'}}>
              {/* Image on the left */}
              <div className="flex justify-start">
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl h-72 w-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <p className="text-gray-600 font-medium">Feature 3 Image</p>
                  </div>
                </div>
              </div>
              {/* Text on the right */}
              <div className="flex justify-start">
                <div className="w-80">
                  <h2 className="text-4xl font-bold text-gray-800 mb-6">API Integration</h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Seamlessly integrate with your existing systems using our powerful 
                    REST APIs. Built with developer experience in mind, featuring 
                    comprehensive documentation and SDKs.
                  </p>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      RESTful API design
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Webhook support
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      SDK for multiple languages
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 4 - Analytics & Insights (Text left, Image right) - Right margin, 20% from center - 50px padding from Feature 3 */}
        <div className="flex items-center justify-end px-8" style={{paddingTop: '50px', paddingBottom: '50px'}}>
          <div className="w-full max-w-5xl">
            <div className="flex items-center gap-8">
              {/* Text on the left */}
              <div className="flex justify-start">
                <div className="w-80">
                  <h2 className="text-4xl font-bold text-gray-800 mb-6">Analytics & Insights</h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Get detailed insights into user behavior and system performance 
                    with our comprehensive analytics dashboard. Make data-driven 
                    decisions with real-time metrics.
                  </p>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Real-time dashboards
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Custom reporting
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Export capabilities
                    </li>
                  </ul>
                </div>
              </div>
              {/* Image on the right */}
              <div className="flex justify-start">
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl h-72 w-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                      </svg>
                    </div>
                    <p className="text-gray-600 font-medium">Feature 4 Image</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Contact Bar */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
              <p className="text-gray-300 mb-4">
                Ready to get started? Get in touch with our team for personalized support.
              </p>
              <div className="space-y-2">
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  hello@crextio.com
                </p>
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  +1 (555) 123-4567
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link href="/login" className="block text-gray-300 hover:text-white transition-colors">
                  Sign In
                </Link>
                <Link href="/register" className="block text-gray-300 hover:text-white transition-colors">
                  Create Account
                </Link>
                <Link href="/dashboard" className="block text-gray-300 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <Link href="#" className="block text-gray-300 hover:text-white transition-colors">
                  Documentation
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21c16.29 0 25.2-13.49 25.2-25.2 0-.38 0-.76-.03-1.14C24.4 7.7 25.5 6.9 26.46 6z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 Crextio. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}