'use client';

import React from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  as?: 'button' | 'a';
  href?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  as = 'button',
  href,
  ...props
}) => {
  // Style variations based on variant
  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white border border-transparent focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 border border-transparent dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:ring-gray-500',
    outline: 'bg-transparent hover:bg-gray-100 text-gray-700 border border-gray-300 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800 focus:ring-gray-500',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 border border-transparent dark:text-gray-300 dark:hover:bg-gray-800 focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white border border-transparent focus:ring-red-500',
    success: 'bg-green-600 hover:bg-green-700 text-white border border-transparent focus:ring-green-500',
  };
  
  // Size variations
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
    xl: 'px-6 py-3 text-lg',
  };
  
  // Common styles
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';
  
  // Spacing for icons
  const leftIconSpacing = leftIcon ? 'space-x-2' : '';
  const rightIconSpacing = rightIcon ? 'space-x-2' : '';
  
  // Width
  const widthStyle = fullWidth ? 'w-full' : '';

  // Combined styles
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${leftIconSpacing} ${rightIconSpacing} ${widthStyle} ${className}`;

  // Loading spinner
  const spinner = (
    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  // Handle rendering as link
  if (as === 'a' && href) {
    return (
      <Link href={href} className={buttonStyles}>
        {isLoading && spinner}
        {!isLoading && leftIcon && <span>{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span>{rightIcon}</span>}
      </Link>
    );
  }

  // Render as button
  return (
    <button className={buttonStyles} disabled={isLoading || props.disabled} {...props}>
      {isLoading && spinner}
      {!isLoading && leftIcon && <span>{leftIcon}</span>}
      <span>{children}</span>
      {!isLoading && rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};

export default Button; 