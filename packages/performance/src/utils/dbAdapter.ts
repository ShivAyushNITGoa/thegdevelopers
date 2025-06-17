import { CoreWebVitalMetric } from './coreWebVitals';
import { NavigationTimingMetrics } from './navigationTiming';
import { ResourceTimingMetrics } from './resourceTiming';

/**
 * Interface for database adapter configuration
 */
export interface DbAdapterConfig {
  endpoint?: string;
  apiKey?: string;
  batchSize?: number;
  flushInterval?: number;
  debug?: boolean;
}

/**
 * Interface for metrics storage adapter
 */
export interface MetricsStorageAdapter {
  storeWebVital: (metric: CoreWebVitalMetric) => Promise<void>;
  storeNavigationTiming: (metrics: NavigationTimingMetrics) => Promise<void>;
  storeResourceTiming: (metrics: ResourceTimingMetrics) => Promise<void>;
  storeError: (error: any) => Promise<void>;
  flush: () => Promise<void>;
  getMetrics: (type: string, limit?: number) => Promise<any[]>;
  clearMetrics: () => Promise<void>;
}

/**
 * In-memory metrics storage adapter
 * 
 * This is a simple adapter that stores metrics in memory.
 * It's useful for development and testing, but not for production.
 */
export class InMemoryAdapter implements MetricsStorageAdapter {
  private webVitals: CoreWebVitalMetric[] = [];
  private navigationTimings: NavigationTimingMetrics[] = [];
  private resourceTimings: ResourceTimingMetrics[] = [];
  private errors: any[] = [];
  private config: DbAdapterConfig;
  
  constructor(config: DbAdapterConfig = {}) {
    this.config = {
      batchSize: 100,
      flushInterval: 0, // No auto-flush
      debug: false,
      ...config,
    };
  }
  
  async storeWebVital(metric: CoreWebVitalMetric): Promise<void> {
    this.webVitals.push({ ...metric, timestamp: new Date().toISOString() });
    if (this.config.debug) {
      console.log('Stored Web Vital:', metric);
    }
  }
  
  async storeNavigationTiming(metrics: NavigationTimingMetrics): Promise<void> {
    this.navigationTimings.push(metrics);
    if (this.config.debug) {
      console.log('Stored Navigation Timing:', metrics);
    }
  }
  
  async storeResourceTiming(metrics: ResourceTimingMetrics): Promise<void> {
    this.resourceTimings.push(metrics);
    if (this.config.debug) {
      console.log('Stored Resource Timing:', metrics);
    }
  }
  
  async storeError(error: any): Promise<void> {
    this.errors.push({
      ...error,
      timestamp: new Date().toISOString(),
    });
    if (this.config.debug) {
      console.error('Stored Error:', error);
    }
  }
  
  async flush(): Promise<void> {
    // In-memory adapter doesn't need to flush
    return Promise.resolve();
  }
  
  async getMetrics(type: string, limit: number = 100): Promise<any[]> {
    switch (type) {
      case 'web-vitals':
        return this.webVitals.slice(-limit);
      case 'navigation-timing':
        return this.navigationTimings.slice(-limit);
      case 'resource-timing':
        return this.resourceTimings.slice(-limit);
      case 'errors':
        return this.errors.slice(-limit);
      default:
        return [];
    }
  }
  
  async clearMetrics(): Promise<void> {
    this.webVitals = [];
    this.navigationTimings = [];
    this.resourceTimings = [];
    this.errors = [];
    if (this.config.debug) {
      console.log('Cleared all metrics');
    }
  }
}

/**
 * API endpoint metrics storage adapter
 * 
 * This adapter sends metrics to an API endpoint.
 * It batches metrics and sends them periodically to reduce network traffic.
 */
export class ApiAdapter implements MetricsStorageAdapter {
  private webVitals: CoreWebVitalMetric[] = [];
  private navigationTimings: NavigationTimingMetrics[] = [];
  private resourceTimings: ResourceTimingMetrics[] = [];
  private errors: any[] = [];
  private config: DbAdapterConfig;
  private flushIntervalId: number | null = null;
  
  constructor(config: DbAdapterConfig) {
    this.config = {
      endpoint: '/api/performance',
      batchSize: 10,
      flushInterval: 30000, // 30 seconds
      debug: false,
      ...config,
    };
    
    // Set up auto-flush if interval is provided
    if (this.config.flushInterval && this.config.flushInterval > 0) {
      this.flushIntervalId = window.setInterval(() => {
        this.flush().catch(err => {
          if (this.config.debug) {
            console.error('Error flushing metrics:', err);
          }
        });
      }, this.config.flushInterval);
    }
  }
  
  async storeWebVital(metric: CoreWebVitalMetric): Promise<void> {
    this.webVitals.push({ ...metric, timestamp: new Date().toISOString() });
    
    if (this.webVitals.length >= (this.config.batchSize || 10)) {
      await this.flushWebVitals();
    }
  }
  
  async storeNavigationTiming(metrics: NavigationTimingMetrics): Promise<void> {
    this.navigationTimings.push(metrics);
    
    if (this.navigationTimings.length >= (this.config.batchSize || 10)) {
      await this.flushNavigationTimings();
    }
  }
  
  async storeResourceTiming(metrics: ResourceTimingMetrics): Promise<void> {
    this.resourceTimings.push(metrics);
    
    if (this.resourceTimings.length >= (this.config.batchSize || 10)) {
      await this.flushResourceTimings();
    }
  }
  
  async storeError(error: any): Promise<void> {
    this.errors.push({
      ...error,
      timestamp: new Date().toISOString(),
    });
    
    if (this.errors.length >= (this.config.batchSize || 10)) {
      await this.flushErrors();
    }
  }
  
  async flush(): Promise<void> {
    await Promise.all([
      this.flushWebVitals(),
      this.flushNavigationTimings(),
      this.flushResourceTimings(),
      this.flushErrors(),
    ]);
  }
  
  private async flushWebVitals(): Promise<void> {
    if (this.webVitals.length === 0) return;
    
    const metrics = [...this.webVitals];
    this.webVitals = [];
    
    try {
      await this.sendToApi('web-vitals', metrics);
    } catch (error) {
      // Put the metrics back in the queue
      this.webVitals = [...metrics, ...this.webVitals];
      throw error;
    }
  }
  
  private async flushNavigationTimings(): Promise<void> {
    if (this.navigationTimings.length === 0) return;
    
    const metrics = [...this.navigationTimings];
    this.navigationTimings = [];
    
    try {
      await this.sendToApi('navigation-timing', metrics);
    } catch (error) {
      // Put the metrics back in the queue
      this.navigationTimings = [...metrics, ...this.navigationTimings];
      throw error;
    }
  }
  
  private async flushResourceTimings(): Promise<void> {
    if (this.resourceTimings.length === 0) return;
    
    const metrics = [...this.resourceTimings];
    this.resourceTimings = [];
    
    try {
      await this.sendToApi('resource-timing', metrics);
    } catch (error) {
      // Put the metrics back in the queue
      this.resourceTimings = [...metrics, ...this.resourceTimings];
      throw error;
    }
  }
  
  private async flushErrors(): Promise<void> {
    if (this.errors.length === 0) return;
    
    const errors = [...this.errors];
    this.errors = [];
    
    try {
      await this.sendToApi('errors', errors);
    } catch (error) {
      // Put the errors back in the queue
      this.errors = [...errors, ...this.errors];
      throw error;
    }
  }
  
  private async sendToApi(type: string, data: any[]): Promise<void> {
    if (!this.config.endpoint) return;
    
    try {
      const response = await fetch(this.config.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey ? { 'X-API-Key': this.config.apiKey } : {}),
        },
        body: JSON.stringify({
          type,
          data,
          timestamp: new Date().toISOString(),
          url: window.location.href,
        }),
        // Keep the request alive even if the page is unloaded
        keepalive: true,
      });
      
      if (!response.ok) {
        throw new Error(`API response error: ${response.status} ${response.statusText}`);
      }
      
      if (this.config.debug) {
        console.log(`Sent ${data.length} ${type} metrics to API`);
      }
    } catch (error) {
      if (this.config.debug) {
        console.error(`Error sending ${type} metrics to API:`, error);
      }
      throw error;
    }
  }
  
  async getMetrics(type: string, limit: number = 100): Promise<any[]> {
    if (!this.config.endpoint) return [];
    
    try {
      const response = await fetch(`${this.config.endpoint}?type=${type}&limit=${limit}`, {
        headers: {
          ...(this.config.apiKey ? { 'X-API-Key': this.config.apiKey } : {}),
        },
      });
      
      if (!response.ok) {
        throw new Error(`API response error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.metrics || [];
    } catch (error) {
      if (this.config.debug) {
        console.error(`Error getting ${type} metrics from API:`, error);
      }
      return [];
    }
  }
  
  async clearMetrics(): Promise<void> {
    if (!this.config.endpoint) return;
    
    try {
      const response = await fetch(this.config.endpoint, {
        method: 'DELETE',
        headers: {
          ...(this.config.apiKey ? { 'X-API-Key': this.config.apiKey } : {}),
        },
      });
      
      if (!response.ok) {
        throw new Error(`API response error: ${response.status} ${response.statusText}`);
      }
      
      // Clear local caches as well
      this.webVitals = [];
      this.navigationTimings = [];
      this.resourceTimings = [];
      this.errors = [];
      
      if (this.config.debug) {
        console.log('Cleared all metrics');
      }
    } catch (error) {
      if (this.config.debug) {
        console.error('Error clearing metrics:', error);
      }
      throw error;
    }
  }
  
  // Clean up interval when done
  dispose(): void {
    if (this.flushIntervalId !== null) {
      clearInterval(this.flushIntervalId);
      this.flushIntervalId = null;
    }
  }
} 