import React, { useEffect, ReactNode } from 'react';
import { trackCoreWebVitals } from '../utils/coreWebVitals';
import { trackNavigationTiming } from '../utils/navigationTiming';
import { trackResourceTiming } from '../utils/resourceTiming';

interface PerformanceMonitorProps {
  children: ReactNode;
  endpoint?: string;
  includeWebVitals?: boolean;
  includeNavigationTiming?: boolean;
  includeResourceTiming?: boolean;
  resourceSampleRate?: number;
  debug?: boolean;
}

/**
 * PerformanceMonitor component
 * 
 * This component tracks various performance metrics including:
 * - Core Web Vitals (LCP, FID, CLS)
 * - Navigation Timing (page load, time to interactive)
 * - Resource Timing (image loading, script execution, etc.)
 * 
 * Data can be sent to a specified endpoint for collection and analysis.
 */
export function PerformanceMonitor({
  children,
  endpoint = '/api/performance',
  includeWebVitals = true,
  includeNavigationTiming = true,
  includeResourceTiming = true,
  resourceSampleRate = 0.1, // Only track 10% of resource timing by default
  debug = false,
}: PerformanceMonitorProps) {
  // Initialize performance monitoring
  useEffect(() => {
    // Skip monitoring for bots/crawlers
    const userAgent = navigator.userAgent.toLowerCase();
    const isBot = /bot|crawler|spider|crawling/i.test(userAgent);
    if (isBot) return;
    
    // Helper function to send metrics to endpoint
    const sendMetrics = async (data: any) => {
      try {
        if (!endpoint) return;
        
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // Keep requests non-blocking for performance
          keepalive: true,
          body: JSON.stringify(data),
        });
        
        if (debug && !response.ok) {
          console.error('Failed to send performance metrics:', await response.text());
        }
      } catch (error) {
        if (debug) {
          console.error('Error sending performance metrics:', error);
        }
      }
    };
    
    // Track Core Web Vitals if enabled
    if (includeWebVitals) {
      trackCoreWebVitals((metric) => {
        if (debug) {
          console.log('Core Web Vital:', metric.name, metric.value);
        }
        
        sendMetrics({
          type: 'core-web-vitals',
          metric,
          url: window.location.href,
          timestamp: new Date().toISOString(),
        });
      });
    }
    
    // Track Navigation Timing if enabled
    if (includeNavigationTiming) {
      // Wait for the page to fully load
      window.addEventListener('load', () => {
        // Delay to ensure all metrics are available
        setTimeout(() => {
          const navigationMetrics = trackNavigationTiming();
          
          if (debug) {
            console.log('Navigation Timing:', navigationMetrics);
          }
          
          sendMetrics({
            type: 'navigation-timing',
            metrics: navigationMetrics,
            url: window.location.href,
            timestamp: new Date().toISOString(),
          });
        }, 0);
      });
    }
    
    // Track Resource Timing if enabled
    if (includeResourceTiming) {
      // Only sample a percentage of sessions for resource timing to reduce data volume
      const shouldSample = Math.random() <= resourceSampleRate;
      
      if (shouldSample) {
        window.addEventListener('load', () => {
          // Delay to ensure all resources are loaded
          setTimeout(() => {
            const resourceMetrics = trackResourceTiming();
            
            if (debug) {
              console.log('Resource Timing:', resourceMetrics);
            }
            
            sendMetrics({
              type: 'resource-timing',
              groupedMetrics: resourceMetrics,
              url: window.location.href,
              timestamp: new Date().toISOString(),
            });
          }, 0);
        });
      }
    }
    
    // Clear buffer occasionally to prevent it from filling up
    const bufferClearInterval = setInterval(() => {
      if (performance.getEntriesByType) {
        performance.clearResourceTimings();
      }
    }, 60000); // Clear every minute
    
    // Cleanup
    return () => {
      clearInterval(bufferClearInterval);
    };
  }, [
    endpoint, 
    includeWebVitals, 
    includeNavigationTiming, 
    includeResourceTiming, 
    resourceSampleRate, 
    debug,
  ]);
  
  // This component doesn't render anything additional, it just tracks performance
  return <>{children}</>;
} 