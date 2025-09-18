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
        <div className="flex flex-col lg:flex-row w-full max-w-8xl h-auto lg:h-[900px] rounded-2xl lg:rounded-4xl shadow-2xl overflow-hidden backdrop-blur-md bg-white/90" style={{ maxWidth: '100rem' }}>
        {/* Left Panel */}
        <div className="w-full lg:w-[45%] bg-gradient-to-b from-yellow-50 to-white p-6 sm:p-8 lg:p-10 flex flex-col">
          {/* Logo */}
          <div className="flex items-center mb-6 sm:mb-8">
            <div className="bg-gradient-to-b from-yellow-50 to-white px-3 sm:px-4 py-2 rounded-full border border-black/20 shadow-sm flex items-center gap-2 sm:gap-3">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-600 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-base sm:text-lg font-bold text-gray-800">Crextio</span>
            </div>
          </div>
          
          {/* Title + Subtitle - Fixed position */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">{title}</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">{subtitle}</p>
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
               <div className="w-full lg:w-[55%] bg-gradient-to-b from-yellow-50/80 to-white/80 rounded-b-2xl lg:rounded-r-4xl lg:rounded-b-none p-6 sm:p-8 flex items-center justify-center relative backdrop-blur-sm min-h-[200px] sm:min-h-[300px] lg:min-h-0">
                 {/* Close Button */}
                 <Link 
                   href="/"
                   className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 w-7 h-7 sm:w-8 sm:h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-colors duration-200 backdrop-blur-sm"
                 >
                   <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                   </svg>
                 </Link>
                 
                 <div className="w-full h-full rounded-2xl lg:rounded-4xl overflow-hidden relative">
                  <Image
                    src="/auth-image.png"
                    alt="Authentication illustration"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover rounded-2xl lg:rounded-4xl"
                    priority
                  />
                 </div>
               </div>
        </div>
      </div>
    </div>
  );
}
