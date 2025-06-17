/**
 * Interface for metric filtering options
 */
export interface MetricsFilterOptions {
  type?: string | null;
  limit?: number;
  page?: number;
  startDate?: string;
  endDate?: string;
  url?: string;
}

/**
 * Interface for a metric entry
 */
export interface MetricEntry {
  type: string;
  timestamp: string;
  url?: string;
  userAgent?: string;
  ip?: string;
  [key: string]: any;
}

/**
 * Class for managing performance metrics storage
 * 
 * This implementation uses in-memory storage for development,
 * but can be extended to use a real database in production.
 */
export class MetricsDatabase {
  private metricsStore: {
    coreWebVitals: MetricEntry[];
    navigationTiming: MetricEntry[];
    resourceTiming: MetricEntry[];
    errors: MetricEntry[];
    custom: MetricEntry[];
  };
  
  private readonly MAX_STORED_METRICS = 1000;
  
  constructor() {
    // Initialize the metrics store
    this.metricsStore = {
      coreWebVitals: [],
      navigationTiming: [],
      resourceTiming: [],
      errors: [],
      custom: [],
    };
  }
  
  /**
   * Store metrics in the database
   * 
   * @param data - The metrics data to store
   */
  async storeMetrics(data: MetricEntry): Promise<void> {
    // Determine the category based on the type
    let category: keyof typeof this.metricsStore;
    
    switch (data.type) {
      case 'core-web-vitals':
        category = 'coreWebVitals';
        break;
      case 'navigation-timing':
        category = 'navigationTiming';
        break;
      case 'resource-timing':
        category = 'resourceTiming';
        break;
      case 'error':
        category = 'errors';
        break;
      default:
        category = 'custom';
    }
    
    // Limit the size of the store
    if (this.metricsStore[category].length >= this.MAX_STORED_METRICS) {
      this.metricsStore[category].shift();
    }
    
    // Add the metrics to the store
    this.metricsStore[category].push({
      ...data,
      receivedAt: new Date().toISOString(),
    });
    
    // In a real application, you would store these metrics in a database
    // For example:
    // await db.insert('performance_metrics', data);
  }
  
  /**
   * Get metrics from the database
   * 
   * @param options - Filter options for the metrics
   * @returns The filtered metrics
   */
  async getMetrics(options: MetricsFilterOptions = {}): Promise<any> {
    const { type, limit = 100, page = 1, startDate, endDate, url } = options;
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Filter by type if specified
    let metrics;
    if (type === 'core-web-vitals') {
      metrics = this.filterMetrics(this.metricsStore.coreWebVitals, { startDate, endDate, url });
    } else if (type === 'navigation-timing') {
      metrics = this.filterMetrics(this.metricsStore.navigationTiming, { startDate, endDate, url });
    } else if (type === 'resource-timing') {
      metrics = this.filterMetrics(this.metricsStore.resourceTiming, { startDate, endDate, url });
    } else if (type === 'errors') {
      metrics = this.filterMetrics(this.metricsStore.errors, { startDate, endDate, url });
    } else if (type === 'custom') {
      metrics = this.filterMetrics(this.metricsStore.custom, { startDate, endDate, url });
    } else {
      // Return all metrics
      metrics = {
        coreWebVitals: this.filterMetrics(this.metricsStore.coreWebVitals, { startDate, endDate, url }),
        navigationTiming: this.filterMetrics(this.metricsStore.navigationTiming, { startDate, endDate, url }),
        resourceTiming: this.filterMetrics(this.metricsStore.resourceTiming, { startDate, endDate, url }),
        errors: this.filterMetrics(this.metricsStore.errors, { startDate, endDate, url }),
        custom: this.filterMetrics(this.metricsStore.custom, { startDate, endDate, url }),
      };
    }
    
    // Apply pagination if metrics is an array
    if (Array.isArray(metrics)) {
      return metrics.slice(skip, skip + limit);
    }
    
    // Otherwise, apply pagination to each category
    return {
      coreWebVitals: metrics.coreWebVitals.slice(skip, skip + limit),
      navigationTiming: metrics.navigationTiming.slice(skip, skip + limit),
      resourceTiming: metrics.resourceTiming.slice(skip, skip + limit),
      errors: metrics.errors.slice(skip, skip + limit),
      custom: metrics.custom.slice(skip, skip + limit),
    };
  }
  
  /**
   * Get the count of metrics in each category
   * 
   * @returns The counts of metrics
   */
  async getMetricsCounts(): Promise<Record<string, number>> {
    return {
      coreWebVitals: this.metricsStore.coreWebVitals.length,
      navigationTiming: this.metricsStore.navigationTiming.length,
      resourceTiming: this.metricsStore.resourceTiming.length,
      errors: this.metricsStore.errors.length,
      custom: this.metricsStore.custom.length,
      total: 
        this.metricsStore.coreWebVitals.length +
        this.metricsStore.navigationTiming.length +
        this.metricsStore.resourceTiming.length +
        this.metricsStore.errors.length +
        this.metricsStore.custom.length,
    };
  }
  
  /**
   * Clear all metrics from the database
   */
  async clearMetrics(): Promise<void> {
    this.metricsStore.coreWebVitals = [];
    this.metricsStore.navigationTiming = [];
    this.metricsStore.resourceTiming = [];
    this.metricsStore.errors = [];
    this.metricsStore.custom = [];
    
    // In a real application, you would clear the metrics from the database
    // For example:
    // await db.delete('performance_metrics', {});
  }
  
  /**
   * Filter metrics by date range and URL
   * 
   * @param metrics - The metrics to filter
   * @param options - Filter options
   * @returns The filtered metrics
   */
  private filterMetrics(
    metrics: MetricEntry[],
    options: { startDate?: string; endDate?: string; url?: string }
  ): MetricEntry[] {
    const { startDate, endDate, url } = options;
    
    return metrics.filter((metric) => {
      // Filter by date range
      if (startDate && metric.timestamp < startDate) {
        return false;
      }
      
      if (endDate && metric.timestamp > endDate) {
        return false;
      }
      
      // Filter by URL
      if (url && metric.url && !metric.url.includes(url)) {
        return false;
      }
      
      return true;
    });
  }
} 