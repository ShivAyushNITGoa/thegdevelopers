"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AccessibilityContextType, AccessibilityProviderProps } from './types';

// Create the context
const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

// Provider component
export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({
  children,
  initialState = {
    reduceMotion: false,
    highContrast: false,
    largeText: false,
    screenReader: false,
  },
}) => {
  // State for accessibility preferences
  const [reduceMotion, setReduceMotion] = useState(initialState.reduceMotion);
  const [highContrast, setHighContrast] = useState(initialState.highContrast);
  const [largeText, setLargeText] = useState(initialState.largeText);
  const [screenReader, setScreenReader] = useState(initialState.screenReader);

  // Load preferences from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedPreferences = localStorage.getItem('accessibility-preferences');
    if (storedPreferences) {
      try {
        const preferences = JSON.parse(storedPreferences);
        setReduceMotion(preferences.reduceMotion ?? initialState.reduceMotion);
        setHighContrast(preferences.highContrast ?? initialState.highContrast);
        setLargeText(preferences.largeText ?? initialState.largeText);
        setScreenReader(preferences.screenReader ?? initialState.screenReader);
      } catch (error) {
        console.error('Error parsing accessibility preferences:', error);
      }
    }
  }, [initialState]);

  // Save preferences to localStorage when they change
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const preferences = {
      reduceMotion,
      highContrast,
      largeText,
      screenReader,
    };

    localStorage.setItem('accessibility-preferences', JSON.stringify(preferences));
  }, [reduceMotion, highContrast, largeText, screenReader]);

  // Apply CSS classes to body based on preferences
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const body = document.body;
    
    // Reduce motion
    if (reduceMotion) {
      body.classList.add('reduce-motion');
    } else {
      body.classList.remove('reduce-motion');
    }
    
    // High contrast
    if (highContrast) {
      body.classList.add('high-contrast');
    } else {
      body.classList.remove('high-contrast');
    }
    
    // Large text
    if (largeText) {
      body.classList.add('large-text');
    } else {
      body.classList.remove('large-text');
    }
    
    // Screen reader optimizations
    if (screenReader) {
      body.classList.add('screen-reader-optimized');
    } else {
      body.classList.remove('screen-reader-optimized');
    }
  }, [reduceMotion, highContrast, largeText, screenReader]);

  // Announcement function
  const announce = useCallback((message: string, politeness: 'polite' | 'assertive' = 'polite') => {
    if (typeof window === 'undefined') return;

    // Create or get the live region element
    let liveRegion = document.getElementById(`accessibility-announce-${politeness}`);
    
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = `accessibility-announce-${politeness}`;
      liveRegion.setAttribute('aria-live', politeness);
      liveRegion.setAttribute('aria-relevant', 'additions');
      liveRegion.setAttribute('role', politeness === 'assertive' ? 'alert' : 'status');
      liveRegion.style.position = 'absolute';
      liveRegion.style.width = '1px';
      liveRegion.style.height = '1px';
      liveRegion.style.padding = '0';
      liveRegion.style.margin = '-1px';
      liveRegion.style.overflow = 'hidden';
      liveRegion.style.clip = 'rect(0, 0, 0, 0)';
      liveRegion.style.whiteSpace = 'nowrap';
      liveRegion.style.border = '0';
      
      document.body.appendChild(liveRegion);
    }
    
    // Clear the region first
    liveRegion.textContent = '';
    
    // Set the message after a small delay to ensure it's announced
    setTimeout(() => {
      if (liveRegion) {
        liveRegion.textContent = message;
      }
    }, 50);
  }, []);

  // Toggle functions
  const toggleReduceMotion = useCallback(() => {
    setReduceMotion(prev => !prev);
  }, []);

  const toggleHighContrast = useCallback(() => {
    setHighContrast(prev => !prev);
  }, []);

  const toggleLargeText = useCallback(() => {
    setLargeText(prev => !prev);
  }, []);

  const toggleScreenReader = useCallback(() => {
    setScreenReader(prev => !prev);
  }, []);

  // Context value
  const value: AccessibilityContextType = {
    announce,
    reduceMotion,
    highContrast,
    largeText,
    screenReader,
    toggleReduceMotion,
    toggleHighContrast,
    toggleLargeText,
    toggleScreenReader,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

// Custom hook to use the accessibility context
export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  
  return context;
}; 