import React from 'react';

interface AnimatedBackgroundProps {
  className?: string;
}

export default function AnimatedBackground({ className = "" }: AnimatedBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
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
  );
}
