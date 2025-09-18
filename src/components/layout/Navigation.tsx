import Link from "next/link";

interface NavigationProps {
  variant?: "homepage" | "auth";
  className?: string;
}

export default function Navigation({ variant = "homepage", className = "" }: NavigationProps) {
  const baseClasses = variant === "homepage" 
    ? "fixed top-0 w-full bg-white shadow-md z-50" 
    : "fixed top-0 w-full bg-white/80 backdrop-blur-sm shadow-md z-50";

  return (
    <nav className={`${baseClasses} ${className}`}>
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
  );
}
