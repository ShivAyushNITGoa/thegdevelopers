"use client";

import { useEffect } from 'react';
import { trackCoreWebVitals, trackResourceTiming, trackNavigationTiming } from 'performance';

export const PerformanceMonitor = () => {
  useEffect(() => {
    // Track Core Web Vitals
    trackCoreWebVitals();
    
    // Track resource timing metrics
    trackResourceTiming();
    
    // Track navigation timing metrics
    trackNavigationTiming();
    
    // Clean up listeners if needed
    return () => {
      // Any cleanup needed for performance monitoring
    };
  }, []);

  // This component doesn't render anything visible
  return null;
}; 