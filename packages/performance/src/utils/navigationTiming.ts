/**
 * Navigation Timing API utilities
 * 
 * This module provides functions for tracking navigation timing metrics
 * based on the Navigation Timing API.
 */

interface NavigationTimingOptions {
  reportingEndpoint?: string;
  debug?: boolean;
}

interface NavigationMetrics {
  // DNS lookup
  dnsLookup: number;
  // TCP connection
  tcpConnection: number;
  // TLS negotiation
  tlsNegotiation: number;
  // Server processing
  serverProcessing: number;
  // Download time
  contentDownload: number;
  // Time to first byte
  ttfb: number;
  // Total page load time
  pageLoad: number;
  // DOM interactive
  domInteractive: number;
  // DOM content loaded
  domContentLoaded: number;
  // DOM complete
  domComplete: number;
}

/**
 * Interface for Navigation Timing metrics
 */
export interface NavigationTimingMetrics {
  // Page load times
  pageLoadTime: number;
  domContentLoaded: number;
  firstContentfulPaint?: number;
  
  // Connection times
  redirectTime: number;
  dnsLookupTime: number;
  tcpConnectionTime: number;
  tlsNegotiationTime: number;
  serverResponseTime: number;
  downloadTime: number;
  
  // Processing times
  domProcessingTime: number;
  domInteractive: number;
  resourceLoadTime: number;
  
  // Navigation type
  navigationType: string;
  
  // Additional metrics
  transferSize: number;
  decodedBodySize: number;
  
  // Timestamps
  navigationStart: number;
  timestamp: string;
}

/**
 * Track navigation timing metrics using the Navigation Timing API
 */
export function trackNavigationTiming({
  reportingEndpoint = '/api/performance',
  debug = false,
}: NavigationTimingOptions = {}) {
  // Only run on client-side
  if (typeof window === 'undefined') return;
  
  // Wait for the page to load completely
  window.addEventListener('load', () => {
    // Use setTimeout to ensure all metrics are available
    setTimeout(() => {
      // Get navigation timing data
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (!navigation) {
        if (debug) {
          console.warn('Navigation Timing API not supported');
        }
        return;
      }
      
      // Calculate metrics
      const metrics: NavigationMetrics = {
        // DNS lookup time
        dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
        
        // TCP connection time
        tcpConnection: navigation.connectEnd - navigation.connectStart,
        
        // TLS negotiation time (if applicable)
        tlsNegotiation: navigation.secureConnectionStart > 0 
          ? navigation.connectEnd - navigation.secureConnectionStart 
          : 0,
        
        // Server processing time
        serverProcessing: navigation.responseStart - navigation.requestStart,
        
        // Content download time
        contentDownload: navigation.responseEnd - navigation.responseStart,
        
        // Time to first byte (TTFB)
        ttfb: navigation.responseStart - navigation.fetchStart,
        
        // Total page load time
        pageLoad: navigation.loadEventEnd - navigation.fetchStart,
        
        // DOM interactive time
        domInteractive: navigation.domInteractive - navigation.fetchStart,
        
        // DOM content loaded time
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
        
        // DOM complete time
        domComplete: navigation.domComplete - navigation.fetchStart,
      };
      
      if (debug) {
        console.log('Navigation Timing Metrics:', metrics);
      }
      
      // Send metrics to API endpoint
      if (reportingEndpoint) {
        fetch(reportingEndpoint, {
          method: 'POST',
          body: JSON.stringify({
            type: 'navigation-timing',
            metrics,
            url: window.location.href,
            userAgent: navigator.userAgent,
            timestamp: performance.now(),
            navigationType: navigation.type,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          keepalive: true,
        }).catch(() => {
          // Ignore fetch errors for metrics reporting
        });
      }
    }, 0);
  });
}

/**
 * Track Navigation Timing metrics
 * 
 * This function collects detailed metrics about page load performance:
 * - Page load times (total load, DOM content loaded)
 * - Connection times (DNS lookup, TCP connection, TLS negotiation)
 * - Processing times (DOM processing, resource loading)
 * - Size metrics (transfer size, decoded body size)
 * 
 * @returns Navigation timing metrics object
 */
export function trackNavigationTiming(): NavigationTimingMetrics {
  // Ensure we're running in the browser
  if (typeof window === 'undefined' || !window.performance) {
    throw new Error('Navigation Timing API not supported');
  }
  
  // Get the navigation timing entry
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  
  if (!navigation) {
    throw new Error('Navigation Timing data not available');
  }
  
  // Get the first contentful paint if available
  let firstContentfulPaint;
  const paintEntries = performance.getEntriesByType('paint');
  const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
  if (fcpEntry) {
    firstContentfulPaint = fcpEntry.startTime;
  }
  
  // Calculate timing metrics
  const metrics: NavigationTimingMetrics = {
    // Page load times
    pageLoadTime: navigation.loadEventEnd - navigation.startTime,
    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.startTime,
    firstContentfulPaint,
    
    // Connection times
    redirectTime: navigation.redirectEnd - navigation.redirectStart,
    dnsLookupTime: navigation.domainLookupEnd - navigation.domainLookupStart,
    tcpConnectionTime: navigation.connectEnd - navigation.connectStart,
    tlsNegotiationTime: navigation.secureConnectionStart > 0 ? 
      navigation.connectEnd - navigation.secureConnectionStart : 0,
    serverResponseTime: navigation.responseStart - navigation.requestStart,
    downloadTime: navigation.responseEnd - navigation.responseStart,
    
    // Processing times
    domProcessingTime: navigation.domComplete - navigation.responseEnd,
    domInteractive: navigation.domInteractive - navigation.startTime,
    resourceLoadTime: navigation.loadEventStart - navigation.domContentLoadedEventEnd,
    
    // Navigation type
    navigationType: navigation.type,
    
    // Additional metrics
    transferSize: navigation.transferSize,
    decodedBodySize: navigation.decodedBodySize,
    
    // Timestamps
    navigationStart: navigation.startTime,
    timestamp: new Date().toISOString(),
  };
  
  return metrics;
} 