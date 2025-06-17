import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface AccessibilityContextType {
  // User preferences
  prefersReducedMotion: boolean;
  prefersHighContrast: boolean;
  prefersLargeText: boolean;
  prefersDarkMode: boolean;
  // Action functions
  toggleReducedMotion: () => void;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  toggleDarkMode: () => void;
  // Announcement function
  announce: (message: string, politeness?: 'polite' | 'assertive') => void;
}

// Default values
const defaultContext: AccessibilityContextType = {
  prefersReducedMotion: false,
  prefersHighContrast: false,
  prefersLargeText: false,
  prefersDarkMode: false,
  toggleReducedMotion: () => {},
  toggleHighContrast: () => {},
  toggleLargeText: () => {},
  toggleDarkMode: () => {},
  announce: () => {},
};

// Create context
const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

// Hook for using accessibility context
export function useAccessibility(): AccessibilityContextType {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}

interface AccessibilityProviderProps {
  children: ReactNode;
}

/**
 * AccessibilityProvider component for managing accessibility settings
 * 
 * This component provides a context for managing accessibility preferences,
 * including reduced motion, high contrast, and large text. It also provides
 * a function for announcing messages to screen readers.
 */
export function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  // State for accessibility preferences
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [prefersHighContrast, setPrefersHighContrast] = useState<boolean>(false);
  const [prefersLargeText, setPrefersLargeText] = useState<boolean>(false);
  const [prefersDarkMode, setPrefersDarkMode] = useState<boolean>(false);
  
  // State for announcements
  const [announcement, setAnnouncement] = useState<string>('');
  const [politeness, setPoliteness] = useState<'polite' | 'assertive'>('polite');
  
  // Load preferences from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check for stored preferences
      const storedPreferences = localStorage.getItem('accessibility-preferences');
      if (storedPreferences) {
        try {
          const preferences = JSON.parse(storedPreferences);
          setPrefersReducedMotion(preferences.reducedMotion ?? false);
          setPrefersHighContrast(preferences.highContrast ?? false);
          setPrefersLargeText(preferences.largeText ?? false);
          setPrefersDarkMode(preferences.darkMode ?? false);
        } catch (error) {
          console.error('Failed to parse accessibility preferences:', error);
        }
      } else {
        // Check for system preferences
        const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(reducedMotionQuery.matches);
        
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setPrefersDarkMode(darkModeQuery.matches);
      }
    }
  }, []);
  
  // Save preferences to localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessibility-preferences', JSON.stringify({
        reducedMotion: prefersReducedMotion,
        highContrast: prefersHighContrast,
        largeText: prefersLargeText,
        darkMode: prefersDarkMode,
      }));
      
      // Apply preferences to document
      if (prefersHighContrast) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
      
      if (prefersLargeText) {
        document.documentElement.classList.add('large-text');
      } else {
        document.documentElement.classList.remove('large-text');
      }
      
      if (prefersDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [prefersReducedMotion, prefersHighContrast, prefersLargeText, prefersDarkMode]);
  
  // Toggle functions
  const toggleReducedMotion = () => setPrefersReducedMotion(prev => !prev);
  const toggleHighContrast = () => setPrefersHighContrast(prev => !prev);
  const toggleLargeText = () => setPrefersLargeText(prev => !prev);
  const toggleDarkMode = () => setPrefersDarkMode(prev => !prev);
  
  // Announcement function
  const announce = (message: string, announcePoliteness: 'polite' | 'assertive' = 'polite') => {
    setAnnouncement(message);
    setPoliteness(announcePoliteness);
    
    // Clear announcement after 5 seconds
    setTimeout(() => {
      setAnnouncement('');
    }, 5000);
  };
  
  // Context value
  const contextValue: AccessibilityContextType = {
    prefersReducedMotion,
    prefersHighContrast,
    prefersLargeText,
    prefersDarkMode,
    toggleReducedMotion,
    toggleHighContrast,
    toggleLargeText,
    toggleDarkMode,
    announce,
  };
  
  return (
    <AccessibilityContext.Provider value={contextValue}>
      {/* Live region for announcements */}
      <div 
        aria-live={politeness}
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      {children}
    </AccessibilityContext.Provider>
  );
} 