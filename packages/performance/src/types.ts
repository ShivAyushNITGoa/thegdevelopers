// Performance Metrics Types
export interface PerformanceMetrics {
  // Core Web Vitals
  lcp: number | null;  // Largest Contentful Paint
  fid: number | null;  // First Input Delay
  cls: number | null;  // Cumulative Layout Shift
  
  // Additional Web Vitals
  fcp: number | null;  // First Contentful Paint
  ttfb: number | null; // Time to First Byte
  inp: number | null;  // Interaction to Next Paint
  
  // Navigation Metrics
  navigationStart: number | null;
  loadEventEnd: number | null;
  domComplete: number | null;
  domInteractive: number | null;
  
  // Resource Metrics
  resourceCount: number | null;
  resourceLoadTime: number | null;
  
  // Memory Metrics
  jsHeapSizeLimit: number | null;
  totalJSHeapSize: number | null;
  usedJSHeapSize: number | null;
  
  // Custom Metrics
  customMetrics: Record<string, number>;
}

// Performance Observer Types
export interface PerformanceObserverOptions {
  entryTypes: EntryType[];
}

export type EntryType = 
  | 'element'
  | 'event'
  | 'first-input'
  | 'largest-contentful-paint'
  | 'layout-shift'
  | 'longtask'
  | 'mark'
  | 'measure'
  | 'navigation'
  | 'paint'
  | 'resource';

// Performance Config
export interface PerformanceConfig {
  enabled: boolean;
  debug?: boolean;
  sampleRate?: number;
  reportingEndpoint?: string;
  reportingInterval?: number;
  trackResourceTiming?: boolean;
  trackLongTasks?: boolean;
  trackUserTiming?: boolean;
  trackMemory?: boolean;
  trackNetworkInfo?: boolean;
}

// Performance Report
export interface PerformanceReport {
  url: string;
  timestamp: number;
  userAgent: string;
  metrics: PerformanceMetrics;
  networkInformation?: NetworkInformation;
  resourceEntries?: ResourceEntry[];
}

// Network Information
export interface NetworkInformation {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

// Resource Entry
export interface ResourceEntry {
  name: string;
  initiatorType: string;
  duration: number;
  transferSize?: number;
  decodedBodySize?: number;
  encodedBodySize?: number;
}

// Performance Threshold Configuration
export interface PerformanceThresholds {
  lcp?: number; // ms
  fid?: number; // ms
  cls?: number; // score
  fcp?: number; // ms
  ttfb?: number; // ms
  inp?: number; // ms
}

// Performance Score
export enum PerformanceScore {
  GOOD = 'good',
  NEEDS_IMPROVEMENT = 'needs-improvement',
  POOR = 'poor',
}

// Performance Score Result
export interface PerformanceScoreResult {
  metric: keyof PerformanceMetrics;
  value: number | null;
  score: PerformanceScore;
  threshold: {
    good: number;
    poor: number;
  };
} 