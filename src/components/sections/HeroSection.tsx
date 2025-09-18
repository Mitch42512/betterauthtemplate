import Link from "next/link";

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className = "" }: HeroSectionProps) {
  return (
    <div className={`flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-12 pt-16 sm:pt-20 relative z-10 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center max-w-7xl w-full">
        {/* Left Section */}
        <div className="bg-transparent flex flex-col items-center justify-center text-center h-full order-2 lg:order-1">
          <div className="max-w-md w-full">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight">
              Welcome to Crextio
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              Your one-stop platform for <strong>managing accounts</strong> and <strong>authentication templates</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                href="/login"
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 sm:px-8 py-3 rounded-full font-semibold transition-colors text-center text-base sm:text-lg"
              >
                Sign In
              </Link>
              <Link 
                href="/register"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 sm:px-8 py-3 rounded-full font-semibold transition-colors text-center text-base sm:text-lg"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>

        {/* Right Section - YouTube-style Video */}
        <div className="bg-transparent flex items-center justify-center order-1 lg:order-2">
          <div className="bg-white rounded-xl h-[300px] sm:h-[400px] lg:h-[500px] w-full max-w-3xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Video Header */}
            <div className="bg-gray-50 px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200 flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
              <div className="flex-1"></div>
              <div className="text-xs sm:text-sm text-gray-500">Crextio Demo</div>
            </div>
            
            {/* Video Content Area */}
            <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center px-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="text-gray-600 font-medium text-sm sm:text-base">Video Demo Coming Soon</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">Watch our platform in action</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
