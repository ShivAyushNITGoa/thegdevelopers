import {
  EntryType,
  PerformanceMetrics,
  PerformanceScore,
  PerformanceScoreResult,
  PerformanceThresholds,
  ResourceEntry,
} from './types';

// Default thresholds based on Google's Core Web Vitals recommendations
export const DEFAULT_THRESHOLDS: PerformanceThresholds = {
  lcp: 2500,  // Good: <= 2.5s, Poor: > 4s
  fid: 100,   // Good: <= 100ms, Poor: > 300ms
  cls: 0.1,   // Good: <= 0.1, Poor: > 0.25
  fcp: 1800,  // Good: <= 1.8s, Poor: > 3s
  ttfb: 800,  // Good: <= 800ms, Poor: > 1800ms
  inp: 200,   // Good: <= 200ms, Poor: > 500ms
};

// Initialize empty performance metrics
export const initializeMetrics = (): PerformanceMetrics => ({
  lcp: null,
  fid: null,
  cls: null,
  fcp: null,
  ttfb: null,
  inp: null,
  navigationStart: null,
  loadEventEnd: null,
  domComplete: null,
  domInteractive: null,
  resourceCount: null,
  resourceLoadTime: null,
  jsHeapSizeLimit: null,
  totalJSHeapSize: null,
  usedJSHeapSize: null,
  customMetrics: {},
});

// Check if performance API is available
export const isPerformanceSupported = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    typeof window.performance !== 'undefined'
  );
};

// Check if PerformanceObserver is supported
export const isPerformanceObserverSupported = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    typeof window.PerformanceObserver !== 'undefined'
  );
};

// Create a performance observer for specific entry types
export const createPerformanceObserver = (
  entryType: EntryType,
  callback: (entries: PerformanceObserverEntryList) => void
): PerformanceObserver | undefined => {
  if (!isPerformanceObserverSupported()) {
    return undefined;
  }

  try {
    const observer = new PerformanceObserver(callback);
    observer.observe({ type: entryType, buffered: true });
    return observer;
  } catch (error) {
    console.error(`Error creating performance observer for ${entryType}:`, error);
    return undefined;
  }
};

// Get navigation timing metrics
export const getNavigationTiming = (): Partial<PerformanceMetrics> => {
  if (!isPerformanceSupported()) {
    return {};
  }

  try {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (!navigation) {
      return {};
    }

    return {
      navigationStart: navigation.startTime,
      loadEventEnd: navigation.loadEventEnd,
      domComplete: navigation.domComplete,
      domInteractive: navigation.domInteractive,
      ttfb: navigation.responseStart - navigation.startTime,
    };
  } catch (error) {
    console.error('Error getting navigation timing:', error);
    return {};
  }
};

// Get resource timing metrics
export const getResourceTiming = (): { 
  resourceCount: number; 
  resourceLoadTime: number;
  resourceEntries: ResourceEntry[];
} => {
  if (!isPerformanceSupported()) {
    return { resourceCount: 0, resourceLoadTime: 0, resourceEntries: [] };
  }

  try {
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    const resourceEntries: ResourceEntry[] = resources.map((resource) => ({
      name: resource.name,
      initiatorType: resource.initiatorType,
      duration: resource.duration,
      transferSize: resource.transferSize,
      decodedBodySize: resource.decodedBodySize,
      encodedBodySize: resource.encodedBodySize,
    }));

    const totalLoadTime = resources.reduce((total, resource) => total + resource.duration, 0);
    
    return {
      resourceCount: resources.length,
      resourceLoadTime: totalLoadTime,
      resourceEntries,
    };
  } catch (error) {
    console.error('Error getting resource timing:', error);
    return { resourceCount: 0, resourceLoadTime: 0, resourceEntries: [] };
  }
};

// Get memory usage metrics
export const getMemoryInfo = (): Partial<PerformanceMetrics> => {
  if (
    !isPerformanceSupported() ||
    !(performance as any).memory
  ) {
    return {};
  }

  try {
    const memory = (performance as any).memory;
    
    return {
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
      totalJSHeapSize: memory.totalJSHeapSize,
      usedJSHeapSize: memory.usedJSHeapSize,
    };
  } catch (error) {
    console.error('Error getting memory info:', error);
    return {};
  }
};

// Get network information
export const getNetworkInformation = () => {
  if (
    typeof window === 'undefined' ||
    !(navigator as any).connection
  ) {
    return null;
  }

  try {
    const connection = (navigator as any).connection;
    
    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData,
    };
  } catch (error) {
    console.error('Error getting network information:', error);
    return null;
  }
};

// Score a performance metric against thresholds
export const scoreMetric = (
  metric: keyof PerformanceMetrics,
  value: number | null,
  thresholds: PerformanceThresholds = DEFAULT_THRESHOLDS
): PerformanceScoreResult => {
  if (value === null || thresholds[metric] === undefined) {
    return {
      metric,
      value,
      score: PerformanceScore.NEEDS_IMPROVEMENT,
      threshold: {
        good: thresholds[metric] || 0,
        poor: thresholds[metric] ? thresholds[metric] * 2 : 0,
      },
    };
  }

  const threshold = thresholds[metric] as number;
  const poorThreshold = metric === 'cls' ? threshold * 2.5 : threshold * 2;

  let score: PerformanceScore;
  
  if (value <= threshold) {
    score = PerformanceScore.GOOD;
  } else if (value > poorThreshold) {
    score = PerformanceScore.POOR;
  } else {
    score = PerformanceScore.NEEDS_IMPROVEMENT;
  }

  return {
    metric,
    value,
    score,
    threshold: {
      good: threshold,
      poor: poorThreshold,
    },
  };
};

// Create a performance mark
export const mark = (name: string): void => {
  if (isPerformanceSupported()) {
    try {
      performance.mark(name);
    } catch (error) {
      console.error(`Error creating performance mark '${name}':`, error);
    }
  }
};

// Create a performance measure between two marks
export const measure = (name: string, startMark: string, endMark: string): PerformanceEntry | undefined => {
  if (isPerformanceSupported()) {
    try {
      performance.measure(name, startMark, endMark);
      return performance.getEntriesByName(name)[0];
    } catch (error) {
      console.error(`Error creating performance measure '${name}':`, error);
    }
  }
  return undefined;
};

// Clear performance marks and measures
export const clearMarks = (markName?: string): void => {
  if (isPerformanceSupported()) {
    try {
      if (markName) {
        performance.clearMarks(markName);
      } else {
        performance.clearMarks();
      }
    } catch (error) {
      console.error('Error clearing performance marks:', error);
    }
  }
};

// Clear performance measures
export const clearMeasures = (measureName?: string): void => {
  if (isPerformanceSupported()) {
    try {
      if (measureName) {
        performance.clearMeasures(measureName);
      } else {
        performance.clearMeasures();
      }
    } catch (error) {
      console.error('Error clearing performance measures:', error);
    }
  }
}; 