/**
 * Resource Timing API utilities
 * 
 * This module provides functions for tracking resource timing metrics
 * based on the Resource Timing API.
 */

interface ResourceTimingOptions {
  reportingEndpoint?: string;
  debug?: boolean;
  resourceTypes?: string[];
  maxEntries?: number;
  minDuration?: number;
}

interface ResourceMetric {
  name: string;
  initiatorType: string;
  duration: number;
  transferSize: number;
  decodedBodySize: number;
  dnsLookup: number;
  tcpConnection: number;
  tlsNegotiation: number;
  requestTime: number;
  responseTime: number;
  cacheHit: boolean;
}

/**
 * Interface for Resource Timing metrics for a specific resource type
 */
export interface ResourceTypeMetrics {
  count: number;
  totalSize: number;
  averageSize: number;
  totalDuration: number;
  averageDuration: number;
  slowestResource: string;
  slowestDuration: number;
  largestResource: string;
  largestSize: number;
}

/**
 * Interface for grouped Resource Timing metrics
 */
export interface ResourceTimingMetrics {
  [resourceType: string]: ResourceTypeMetrics;
}

/**
 * Track resource timing metrics using the Resource Timing API
 */
export function trackResourceTiming({
  reportingEndpoint = '/api/performance',
  debug = false,
  resourceTypes = ['script', 'css', 'img', 'fetch', 'xmlhttprequest', 'link', 'iframe'],
  maxEntries = 50,
  minDuration = 0,
}: ResourceTimingOptions = {}) {
  // Only run on client-side
  if (typeof window === 'undefined') return;
  
  // Wait for the page to load completely
  window.addEventListener('load', () => {
    // Use setTimeout to ensure all metrics are available
    setTimeout(() => {
      // Get all resource timing entries
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      
      if (!resources || resources.length === 0) {
        if (debug) {
          console.warn('Resource Timing API not supported or no resources found');
        }
        return;
      }
      
      // Filter and process resources
      const metrics = resources
        // Filter by resource type
        .filter((resource) => resourceTypes.includes(resource.initiatorType))
        // Filter by minimum duration
        .filter((resource) => resource.duration >= minDuration)
        // Take only the maximum number of entries
        .slice(0, maxEntries)
        // Map to simplified metrics
        .map((resource): ResourceMetric => {
          const isCached = resource.transferSize === 0 && resource.decodedBodySize > 0;
          
          return {
            name: resource.name,
            initiatorType: resource.initiatorType,
            duration: resource.duration,
            transferSize: resource.transferSize,
            decodedBodySize: resource.decodedBodySize,
            dnsLookup: resource.domainLookupEnd - resource.domainLookupStart,
            tcpConnection: resource.connectEnd - resource.connectStart,
            tlsNegotiation: resource.secureConnectionStart > 0 
              ? resource.connectEnd - resource.secureConnectionStart 
              : 0,
            requestTime: resource.responseStart - resource.requestStart,
            responseTime: resource.responseEnd - resource.responseStart,
            cacheHit: isCached,
          };
        });
      
      if (debug) {
        console.log(`Resource Timing Metrics (${metrics.length} resources):`, metrics);
      }
      
      // Send metrics to API endpoint
      if (reportingEndpoint && metrics.length > 0) {
        // Group resources by type for more compact reporting
        const groupedMetrics = resourceTypes.reduce((acc, type) => {
          const typeResources = metrics.filter((metric) => metric.initiatorType === type);
          
          if (typeResources.length > 0) {
            acc[type] = {
              count: typeResources.length,
              totalSize: typeResources.reduce((sum, m) => sum + m.transferSize, 0),
              totalDuration: typeResources.reduce((sum, m) => sum + m.duration, 0),
              avgDuration: typeResources.reduce((sum, m) => sum + m.duration, 0) / typeResources.length,
              cacheHitCount: typeResources.filter((m) => m.cacheHit).length,
              slowestResources: typeResources
                .sort((a, b) => b.duration - a.duration)
                .slice(0, 3)
                .map((m) => ({ url: m.name, duration: m.duration })),
            };
          }
          
          return acc;
        }, {} as Record<string, any>);
        
        fetch(reportingEndpoint, {
          method: 'POST',
          body: JSON.stringify({
            type: 'resource-timing',
            groupedMetrics,
            totalResources: metrics.length,
            url: window.location.href,
            userAgent: navigator.userAgent,
            timestamp: performance.now(),
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          keepalive: true,
        }).catch(() => {
          // Ignore fetch errors for metrics reporting
        });
      }
      
      // Clear the resource timing buffer to prevent memory buildup
      performance.clearResourceTimings();
    }, 0);
  });
}

/**
 * Track Resource Timing metrics
 * 
 * This function collects metrics about resource loading performance:
 * - Groups resources by type (script, css, img, font, fetch, etc.)
 * - Calculates total and average sizes and durations
 * - Identifies slowest and largest resources
 * 
 * @returns Object with resource timing metrics grouped by resource type
 */
export function trackResourceTiming(): ResourceTimingMetrics {
  // Ensure we're running in the browser
  if (typeof window === 'undefined' || !performance.getEntriesByType) {
    return {};
  }
  
  // Get all resource timing entries
  const resources = performance.getEntriesByType('resource');
  
  // Group resources by type
  const groupedResources: ResourceTimingMetrics = {};
  
  resources.forEach((resource) => {
    // Extract resource type from initiatorType or file extension
    let resourceType = (resource as PerformanceResourceTiming).initiatorType;
    
    if (resourceType === 'link') {
      // Check if it's a CSS file or font
      const url = resource.name.toLowerCase();
      if (url.endsWith('.css') || url.includes('.css?')) {
        resourceType = 'css';
      } else if (url.match(/\.(woff2?|ttf|otf|eot)/)) {
        resourceType = 'font';
      }
    } else if (resourceType === 'img' && resource.name.toLowerCase().endsWith('.svg')) {
      resourceType = 'svg';
    } else if (resourceType === 'xmlhttprequest' || resourceType === 'fetch') {
      resourceType = 'api';
    }
    
    // Initialize group if it doesn't exist
    if (!groupedResources[resourceType]) {
      groupedResources[resourceType] = {
        count: 0,
        totalSize: 0,
        averageSize: 0,
        totalDuration: 0,
        averageDuration: 0,
        slowestResource: '',
        slowestDuration: 0,
        largestResource: '',
        largestSize: 0,
      };
    }
    
    const group = groupedResources[resourceType];
    
    // Calculate resource size and duration
    const size = (resource as PerformanceResourceTiming).transferSize || 0;
    const duration = resource.responseEnd - resource.startTime;
    
    // Update group metrics
    group.count += 1;
    group.totalSize += size;
    group.totalDuration += duration;
    
    // Track slowest resource
    if (duration > group.slowestDuration) {
      group.slowestDuration = duration;
      group.slowestResource = resource.name;
    }
    
    // Track largest resource
    if (size > group.largestSize) {
      group.largestSize = size;
      group.largestResource = resource.name;
    }
  });
  
  // Calculate averages
  Object.keys(groupedResources).forEach((type) => {
    const group = groupedResources[type];
    group.averageSize = group.count > 0 ? group.totalSize / group.count : 0;
    group.averageDuration = group.count > 0 ? group.totalDuration / group.count : 0;
  });
  
  return groupedResources;
} 