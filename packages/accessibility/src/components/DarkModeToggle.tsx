import React from 'react';
import { useAccessibility } from '../context/AccessibilityProvider';

interface DarkModeToggleProps {
  className?: string;
  showIcon?: boolean;
  showText?: boolean;
  iconOnly?: boolean;
}

/**
 * DarkModeToggle component
 * 
 * A button that toggles between light and dark mode.
 * Uses the AccessibilityProvider context to manage dark mode state.
 */
export function DarkModeToggle({
  className = '',
  showIcon = true,
  showText = true,
  iconOnly = false,
}: DarkModeToggleProps) {
  const { prefersDarkMode, toggleDarkMode } = useAccessibility();
  
  // Default classes for styling
  const baseClasses = 'inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-offset-1 transition-colors';
  const modeClasses = prefersDarkMode 
    ? 'bg-gray-800 text-gray-100 hover:bg-gray-700 focus:ring-gray-600' 
    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300';
  
  return (
    <button
      onClick={toggleDarkMode}
      className={`${baseClasses} ${modeClasses} ${className}`}
      aria-pressed={prefersDarkMode}
      aria-label="Toggle dark mode"
      title={prefersDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {showIcon && (
        <span className="w-5 h-5 flex items-center justify-center">
          {prefersDarkMode ? (
            // Sun icon for light mode
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
            </svg>
          ) : (
            // Moon icon for dark mode
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
            </svg>
          )}
        </span>
      )}
      
      {showText && !iconOnly && (
        <span className={`${showIcon ? 'ml-2' : ''} text-sm font-medium`}>
          {prefersDarkMode ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
} 