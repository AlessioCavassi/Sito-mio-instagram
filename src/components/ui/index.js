import React from 'react';

export const Card = ({ children, className, ...props }) => (
  <div className={`bg-white shadow-md rounded-lg ${className}`} {...props}>
    {children}
  </div>
);

export const CardHeader = ({ children, ...props }) => (
  <div className="px-6 py-4" {...props}>
    {children}
  </div>
);

export const CardContent = ({ children, ...props }) => (
  <div className="px-6 py-4" {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, ...props }) => (
  <div className="px-6 py-4 bg-gray-50" {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, ...props }) => (
  <h2 className="text-xl font-semibold" {...props}>
    {children}
  </h2>
);

export const Button = ({ children, className, variant = 'primary', ...props }) => {
  const baseClasses = 'px-4 py-2 rounded font-semibold';
  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
