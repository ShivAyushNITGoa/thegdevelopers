# Performance Package

A comprehensive performance monitoring package for The GDevelopers Portal, providing components and utilities to track, analyze, and visualize performance metrics.

## Features

- **Core Web Vitals Tracking**: Monitor LCP, FID, CLS, FCP, TTFB, and INP metrics
- **Navigation Timing**: Detailed metrics about page load performance
- **Resource Timing**: Metrics about resource loading performance
- **PerformanceMonitor**: Client-side component for collecting metrics
- **PerformanceDashboard**: Component for visualizing metrics
- **Database Adapters**: Adapters for storing metrics in memory or via API

## Installation

```bash
npm install performance
```

## Usage

### Basic Setup

To set up basic performance monitoring, wrap your application with the `PerformanceMonitor` component:

```tsx
import { PerformanceMonitor } from 'performance';

function App({ children }) {
  return (
    <PerformanceMonitor endpoint="/api/performance">
      {children}
    </PerformanceMonitor>
  );
}
```

This will:
- Track Core Web Vitals metrics
- Monitor navigation timing
- Track resource timing
- Send metrics to the specified endpoint

### PerformanceMonitor

The `PerformanceMonitor` component tracks performance metrics and sends them to an API endpoint:

```tsx
import { PerformanceMonitor } from 'performance';

function App({ children }) {
  return (
    <PerformanceMonitor
      endpoint="/api/performance"
      includeWebVitals={true}
      includeNavigationTiming={true}
      includeResourceTiming={true}
      sampleRate={100}
      debug={process.env.NODE_ENV === 'development'}
    >
      {children}
    </PerformanceMonitor>
  );
}
```

### PerformanceDashboard

The `PerformanceDashboard` component visualizes performance metrics:

```tsx
import { PerformanceDashboard } from 'performance';

function DashboardPage() {
  return (
    <div>
      <h1>Performance Dashboard</h1>
      <PerformanceDashboard endpoint="/api/performance" />
    </div>
  );
}
```

### Core Web Vitals Tracking

You can use the Core Web Vitals utilities directly:

```tsx
import { trackCoreWebVitals } from 'performance';

function MyComponent() {
  React.useEffect(() => {
    trackCoreWebVitals((metric) => {
      console.log(metric.name, metric.value, metric.rating);
      
      // Send to analytics
      analytics.track('web-vital', metric);
    });
  }, []);
  
  return <div>My Component</div>;
}
```

### Navigation Timing

You can use the Navigation Timing utilities directly:

```tsx
import { trackNavigationTiming } from 'performance';

function MyComponent() {
  React.useEffect(() => {
    const metrics = trackNavigationTiming();
    console.log('Page load time:', metrics.pageLoadTime);
    console.log('DOM content loaded:', metrics.domContentLoaded);
    
    // Send to analytics
    analytics.track('navigation-timing', metrics);
  }, []);
  
  return <div>My Component</div>;
}
```

### Resource Timing

You can use the Resource Timing utilities directly:

```tsx
import { trackResourceTiming } from 'performance';

function MyComponent() {
  React.useEffect(() => {
    const metrics = trackResourceTiming();
    console.log('JS resources:', metrics.script);
    console.log('CSS resources:', metrics.css);
    
    // Send to analytics
    analytics.track('resource-timing', metrics);
  }, []);
  
  return <div>My Component</div>;
}
```

### Database Adapters

The package provides database adapters for storing metrics:

```tsx
import { createInMemoryAdapter, createApiAdapter } from 'performance';

// In-memory adapter
const inMemoryAdapter = createInMemoryAdapter();
inMemoryAdapter.storeMetrics({ type: 'core-web-vitals', metric: { name: 'LCP', value: 2500 } });
const metrics = inMemoryAdapter.getMetrics();

// API adapter
const apiAdapter = createApiAdapter('/api/performance');
await apiAdapter.storeMetrics({ type: 'core-web-vitals', metric: { name: 'LCP', value: 2500 } });
const apiMetrics = await apiAdapter.getMetrics();
```

## API Reference

### PerformanceMonitor

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| endpoint | string | '/api/performance' | API endpoint to send metrics to |
| includeWebVitals | boolean | true | Whether to track Core Web Vitals |
| includeNavigationTiming | boolean | true | Whether to track Navigation Timing |
| includeResourceTiming | boolean | true | Whether to track Resource Timing |
| sampleRate | number | 100 | Percentage of users to track (1-100) |
| debug | boolean | false | Whether to log metrics to console |
| children | ReactNode | | Child components |

### PerformanceDashboard

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| endpoint | string | '/api/performance' | API endpoint to fetch metrics from |
| activeTab | string | 'core-web-vitals' | Initial active tab |
| refreshInterval | number | 0 | Auto-refresh interval in seconds (0 = disabled) |
| className | string | '' | Additional CSS class |

### Core Web Vitals

```ts
interface CoreWebVitalMetric {
  name: string;          // 'LCP', 'FID', 'CLS', 'FCP', 'TTFB', or 'INP'
  value: number;         // The metric value
  rating: 'good' | 'needs-improvement' | 'poor'; // Performance rating
  delta?: number;        // Change from previous value
  id?: string;           // Unique identifier
  navigationType?: string; // Navigation type
}

function trackCoreWebVitals(onReport: (metric: CoreWebVitalMetric) => void): void;
```

### Navigation Timing

```ts
interface NavigationTimingMetrics {
  pageLoadTime: number;      // Total page load time
  domContentLoaded: number;  // Time until DOMContentLoaded event
  firstContentfulPaint?: number; // Time until first contentful paint
  redirectTime: number;      // Time spent in redirects
  dnsLookupTime: number;     // DNS lookup time
  tcpConnectionTime: number; // TCP connection time
  tlsNegotiationTime: number; // TLS negotiation time
  serverResponseTime: number; // Server response time
  downloadTime: number;      // Content download time
  domProcessingTime: number; // DOM processing time
  domInteractive: number;    // Time until interactive
  resourceLoadTime: number;  // Resource loading time
  navigationType: string;    // Navigation type
  transferSize: number;      // Transfer size in bytes
  decodedBodySize: number;   // Decoded body size in bytes
  navigationStart: number;   // Navigation start timestamp
  timestamp: string;         // ISO timestamp
}

function trackNavigationTiming(): NavigationTimingMetrics;
```

### Resource Timing

```ts
interface ResourceTypeMetrics {
  count: number;           // Number of resources
  totalSize: number;       // Total size in bytes
  averageSize: number;     // Average size in bytes
  totalDuration: number;   // Total loading duration
  averageDuration: number; // Average loading duration
  slowestResource: string; // URL of slowest resource
  slowestDuration: number; // Duration of slowest resource
  largestResource: string; // URL of largest resource
  largestSize: number;     // Size of largest resource
}

interface ResourceTimingMetrics {
  [resourceType: string]: ResourceTypeMetrics; // 'script', 'css', 'img', etc.
}

function trackResourceTiming(): ResourceTimingMetrics;
```

### Database Adapters

```ts
interface MetricsAdapter {
  storeMetrics(data: any): Promise<void>;
  getMetrics(options?: any): Promise<any>;
  clearMetrics(): Promise<void>;
}

function createInMemoryAdapter(): MetricsAdapter;
function createApiAdapter(endpoint: string): MetricsAdapter;
```

## Best Practices

1. **Track Core Web Vitals** to understand user experience and meet Google's performance criteria.

2. **Monitor Navigation Timing** to identify bottlenecks in page loading.

3. **Analyze Resource Timing** to optimize resource loading and reduce page weight.

4. **Set an appropriate sample rate** to balance data collection with performance impact.

5. **Use the PerformanceDashboard** to visualize metrics and identify trends.

6. **Store metrics** for historical analysis and comparison.

7. **Set performance budgets** and monitor them over time.

8. **Optimize critical rendering path** to improve LCP and FCP.

9. **Minimize JavaScript execution** to improve FID and INP.

10. **Prevent layout shifts** to improve CLS.

## Performance Metrics Explained

### Core Web Vitals

- **LCP (Largest Contentful Paint)**: Measures loading performance. To provide a good user experience, LCP should occur within 2.5 seconds of when the page first starts loading.

- **FID (First Input Delay)**: Measures interactivity. To provide a good user experience, pages should have a FID of 100 milliseconds or less.

- **CLS (Cumulative Layout Shift)**: Measures visual stability. To provide a good user experience, pages should maintain a CLS of 0.1 or less.

- **FCP (First Contentful Paint)**: Measures when the browser renders the first bit of content from the DOM. A good FCP score is 1.8 seconds or less.

- **TTFB (Time to First Byte)**: Measures the time between the request for a resource and when the first byte of a response begins to arrive. A good TTFB score is 800 milliseconds or less.

- **INP (Interaction to Next Paint)**: Measures responsiveness. A good INP score is 200 milliseconds or less.

### Navigation Timing

- **pageLoadTime**: Time from navigation start to load event end.
- **domContentLoaded**: Time from navigation start to DOMContentLoaded event.
- **redirectTime**: Time spent in redirects.
- **dnsLookupTime**: Time spent in DNS lookup.
- **tcpConnectionTime**: Time spent establishing TCP connection.
- **tlsNegotiationTime**: Time spent in TLS negotiation.
- **serverResponseTime**: Time waiting for server response.
- **downloadTime**: Time spent downloading the document.
- **domProcessingTime**: Time spent processing the DOM.
- **resourceLoadTime**: Time spent loading resources.

### Resource Timing

- **count**: Number of resources of a specific type.
- **totalSize**: Total size of resources of a specific type.
- **averageSize**: Average size of resources of a specific type.
- **totalDuration**: Total loading duration of resources of a specific type.
- **averageDuration**: Average loading duration of resources of a specific type.
- **slowestResource**: URL of the slowest resource of a specific type.
- **largestResource**: URL of the largest resource of a specific type.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 