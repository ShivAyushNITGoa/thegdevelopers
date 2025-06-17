"use client";

import React from 'react';
import { useAccessibility } from '../context/AccessibilityProvider';

interface AccessibilityPreferencesProps {
  title?: string;
  showTitle?: boolean;
  className?: string;
}

/**
 * AccessibilityPreferences component for user accessibility settings
 * 
 * This component provides a user interface for adjusting accessibility preferences
 * such as reduced motion, high contrast, and large text. It uses the AccessibilityProvider
 * context to store and retrieve user preferences.
 */
export function AccessibilityPreferences({
  title = 'Accessibility Preferences',
  showTitle = true,
  className = '',
}: AccessibilityPreferencesProps) {
  const { 
    prefersReducedMotion, 
    prefersHighContrast, 
    prefersLargeText,
    toggleReducedMotion,
    toggleHighContrast,
    toggleLargeText
  } = useAccessibility();
  
  return (
    <div className={`accessibility-preferences ${className}`} role="region" aria-label="Accessibility Preferences">
      {showTitle && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="reduced-motion" className="flex-1 font-medium">
            Reduced Motion
            <p className="text-sm text-gray-600 dark:text-gray-400 font-normal">
              Minimize animations and motion effects
            </p>
          </label>
          <div className="flex items-center h-6">
            <input
              id="reduced-motion"
              type="checkbox"
              checked={prefersReducedMotion}
              onChange={toggleReducedMotion}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              aria-describedby="reduced-motion-description"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <label htmlFor="high-contrast" className="flex-1 font-medium">
            High Contrast
            <p className="text-sm text-gray-600 dark:text-gray-400 font-normal">
              Increase contrast for better readability
            </p>
          </label>
          <div className="flex items-center h-6">
            <input
              id="high-contrast"
              type="checkbox"
              checked={prefersHighContrast}
              onChange={toggleHighContrast}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              aria-describedby="high-contrast-description"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <label htmlFor="large-text" className="flex-1 font-medium">
            Large Text
            <p className="text-sm text-gray-600 dark:text-gray-400 font-normal">
              Increase text size for better readability
            </p>
          </label>
          <div className="flex items-center h-6">
            <input
              id="large-text"
              type="checkbox"
              checked={prefersLargeText}
              onChange={toggleLargeText}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              aria-describedby="large-text-description"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 