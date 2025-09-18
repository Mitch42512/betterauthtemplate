import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function Button({ 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  className = "", 
  children, 
  disabled,
  ...props 
}: ButtonProps) {
  const baseClasses = "font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-yellow-400 hover:bg-yellow-500 text-white focus:ring-yellow-400",
    secondary: "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-400",
    outline: "bg-gray-200 hover:bg-gray-300 text-gray-700 focus:ring-gray-400"
  };
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-full",
    md: "px-6 py-3 text-base rounded-full",
    lg: "px-8 py-4 text-lg rounded-full"
  };
  
  const heightClasses = {
    sm: "h-8",
    md: "h-12", 
    lg: "h-14"
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${heightClasses[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
}
