import {
  AnalyticsConfig,
  AnalyticsEvent,
  AnalyticsProvider,
  ClickEvent,
  CustomEvent,
  DownloadEvent,
  ErrorEvent,
  FormSubmitEvent,
  PageViewEvent,
  SearchEvent,
  VideoEvent,
} from '../types';
import { getBrowserInfo, getPerformanceMetrics } from '../utils';

export class CustomAnalyticsProvider implements AnalyticsProvider {
  private config: AnalyticsConfig = {
    enabled: false,
  };
  private endpoint: string = '/api/analytics';
  private queue: AnalyticsEvent[] = [];
  private isProcessing: boolean = false;
  private flushInterval: ReturnType<typeof setInterval> | null = null;

  async initialize(config: AnalyticsConfig): Promise<void> {
    this.config = config;

    // Set custom endpoint if provided
    if (config.trackingId) {
      this.endpoint = `/api/analytics/${config.trackingId}`;
    }

    // Set up queue processing
    if (typeof window !== 'undefined') {
      // Process queue before page unload
      window.addEventListener('beforeunload', () => {
        this.processQueue(true);
      });

      // Set up interval to process queue
      this.flushInterval = setInterval(() => {
        this.processQueue();
      }, 30000); // Flush every 30 seconds
    }

    return Promise.resolve();
  }

  async trackEvent(event: AnalyticsEvent): Promise<void> {
    if (!this.config.enabled) return Promise.resolve();

    // Add browser and performance info
    const enrichedEvent = {
      ...event,
      browser: getBrowserInfo(),
      performance: getPerformanceMetrics(),
    };

    // Add to queue
    this.queue.push(enrichedEvent);

    // Process queue if it's getting large
    if (this.queue.length >= 10) {
      this.processQueue();
    }

    return Promise.resolve();
  }

  async trackPageView(event: PageViewEvent): Promise<void> {
    return this.trackEvent(event);
  }

  async trackClick(event: ClickEvent): Promise<void> {
    return this.trackEvent(event);
  }

  async trackFormSubmit(event: FormSubmitEvent): Promise<void> {
    return this.trackEvent(event);
  }

  async trackSearch(event: SearchEvent): Promise<void> {
    return this.trackEvent(event);
  }

  async trackDownload(event: DownloadEvent): Promise<void> {
    return this.trackEvent(event);
  }

  async trackVideo(event: VideoEvent): Promise<void> {
    return this.trackEvent(event);
  }

  async trackError(event: ErrorEvent): Promise<void> {
    return this.trackEvent(event);
  }

  async trackCustom(event: CustomEvent): Promise<void> {
    return this.trackEvent(event);
  }

  private async processQueue(immediate: boolean = false): Promise<void> {
    // Don't process if already processing or queue is empty
    if (this.isProcessing || this.queue.length === 0) return;

    this.isProcessing = true;

    try {
      // In a real implementation, this would send data to a server
      // For now, we'll just log to console in debug mode
      if (this.config.debug) {
        console.log('Processing analytics queue:', this.queue);
      }

      // In a production environment, we would send the data to the server
      if (typeof window !== 'undefined' && !this.config.debug) {
        try {
          const payload = {
            events: this.queue,
            timestamp: Date.now(),
            url: window.location.href,
          };

          // Use sendBeacon for better reliability during page unload
          if (immediate && navigator.sendBeacon) {
            navigator.sendBeacon(this.endpoint, JSON.stringify(payload));
          } else {
            // Use fetch for normal operation
            await fetch(this.endpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
              // Use keepalive to ensure the request completes even if the page is unloaded
              keepalive: true,
            });
          }
        } catch (error) {
          // Silently fail in production, log in debug
          if (this.config.debug) {
            console.error('Failed to send analytics data:', error);
          }
        }
      }

      // Clear the queue
      this.queue = [];
    } finally {
      this.isProcessing = false;
    }
  }

  // Clean up resources
  public dispose(): void {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
    }
    
    // Process any remaining events
    this.processQueue(true);
  }
} 