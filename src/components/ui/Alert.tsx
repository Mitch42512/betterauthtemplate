import React from 'react';

interface AlertProps {
  type?: 'error' | 'success' | 'warning' | 'info';
  children: React.ReactNode;
  className?: string;
}

export default function Alert({ type = 'error', children, className = "" }: AlertProps) {
  const typeClasses = {
    error: "bg-red-50 text-red-700 border-red-200",
    success: "bg-green-50 text-green-700 border-green-200",
    warning: "bg-yellow-50 text-yellow-700 border-yellow-200",
    info: "bg-blue-50 text-blue-700 border-blue-200"
  };

  return (
    <div className={`rounded-md p-4 border ${typeClasses[type]} ${className}`}>
      <div className="text-sm">{children}</div>
    </div>
  );
}
