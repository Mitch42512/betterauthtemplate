import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HomepageBackground from './HomepageBackground';

interface AuthCardLayoutProps {
  title: string;
  subtitle: string;
  additionalText?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function AuthCardLayout({ title, subtitle, additionalText, children, footer }: AuthCardLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Homepage Background with Blur */}
      <div className="absolute inset-0">
        <HomepageBackground />
      </div>
      
      {/* Blur Overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-white/20"></div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="flex w-full max-w-7xl h-[900px] rounded-4xl shadow-2xl overflow-hidden backdrop-blur-md bg-white/90" style={{ maxWidth: '90rem' }}>
        {/* Left Panel */}
        <div className="w-[45%] bg-gradient-to-b from-yellow-50 to-white p-10 flex flex-col">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <div className="bg-gradient-to-b from-yellow-50 to-white px-4 py-2 rounded-full border border-black/20 shadow-sm flex items-center gap-3">
              <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-lg font-bold text-gray-800">Crextio</span>
            </div>
          </div>
          
          {/* Title + Subtitle - Fixed position */}
          <div className="text-center mb-12">
            <h2 className="text-6xl font-bold">{title}</h2>
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            {additionalText && (
              <p className="text-xs text-gray-400 mt-1 italic">{additionalText}</p>
            )}
          </div>
          
          {/* Form - Fixed position */}
          <div className="flex-1">
            {children}
          </div>
          
          {/* Footer */}
          {footer && (
            <div className="mt-6">
              {footer}
            </div>
          )}
        </div>

               {/* Right Panel */}
               <div className="w-[55%] bg-gradient-to-b from-yellow-50/80 to-white/80 rounded-r-4xl p-8 flex items-center justify-center relative backdrop-blur-sm">
                 {/* Close Button */}
                 <Link 
                   href="/"
                   className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-colors duration-200 backdrop-blur-sm"
                 >
                   <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                   </svg>
                 </Link>
                 
                 <div className="w-full h-full rounded-4xl overflow-hidden relative">
                   <Image
                     src="/auth-image.png"
                     alt="Authentication illustration"
                     fill
                     className="object-cover rounded-4xl"
                     priority
                   />
                 </div>
               </div>
        </div>
      </div>
    </div>
  );
}
