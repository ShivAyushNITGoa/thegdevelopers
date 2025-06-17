import React, { useEffect, useState } from 'react';
import { CoreWebVitalMetric } from '../utils/coreWebVitals';

interface PerformanceDashboardProps {
  endpoint?: string;
  refreshInterval?: number;
  className?: string;
}

interface MetricsData {
  coreWebVitals: CoreWebVitalMetric[];
  navigationTiming: any[];
  resourceTiming: any[];
  errors: any[];
  counts: {
    coreWebVitals: number;
    navigationTiming: number;
    resourceTiming: number;
    errors: number;
  };
}

/**
 * PerformanceDashboard component
 * 
 * This component fetches and displays performance metrics from the API endpoint.
 * It shows Core Web Vitals, Navigation Timing, and Resource Timing metrics.
 * 
 * Note: This is only available in development mode for security reasons.
 */
export function PerformanceDashboard({
  endpoint = '/api/performance',
  refreshInterval = 30000, // 30 seconds
  className = '',
}: PerformanceDashboardProps) {
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('core-web-vitals');
  
  // Fetch metrics from the API
  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch metrics: ${response.statusText}`);
      }
      
      const data = await response.json();
      setMetrics(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch metrics on mount and at regular intervals
  useEffect(() => {
    fetchMetrics();
    
    // Set up refresh interval
    const intervalId = setInterval(fetchMetrics, refreshInterval);
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [endpoint, refreshInterval]);
  
  // Clear all metrics
  const handleClearMetrics = async () => {
    try {
      const response = await fetch(endpoint, { method: 'DELETE' });
      
      if (!response.ok) {
        throw new Error(`Failed to clear metrics: ${response.statusText}`);
      }
      
      // Refetch metrics
      fetchMetrics();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };
  
  // Get rating color
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good':
        return 'bg-green-100 text-green-800';
      case 'needs-improvement':
        return 'bg-yellow-100 text-yellow-800';
      case 'poor':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Render Core Web Vitals metrics
  const renderCoreWebVitals = () => {
    if (!metrics?.coreWebVitals || metrics.coreWebVitals.length === 0) {
      return <p className="text-gray-500">No Core Web Vitals data available.</p>;
    }
    
    // Group metrics by name
    const groupedMetrics: Record<string, CoreWebVitalMetric[]> = {};
    metrics.coreWebVitals.forEach((metric) => {
      if (!groupedMetrics[metric.name]) {
        groupedMetrics[metric.name] = [];
      }
      groupedMetrics[metric.name].push(metric);
    });
    
    return (
      <div className="space-y-6">
        {Object.entries(groupedMetrics).map(([name, metrics]) => {
          // Calculate average value
          const avgValue = metrics.reduce((sum, m) => sum + m.value, 0) / metrics.length;
          // Get the most common rating
          const ratings = metrics.map(m => m.rating);
          const ratingCounts: Record<string, number> = {};
          ratings.forEach(r => {
            ratingCounts[r] = (ratingCounts[r] || 0) + 1;
          });
          const mostCommonRating = Object.entries(ratingCounts)
            .sort((a, b) => b[1] - a[1])[0][0];
          
          return (
            <div key={name} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{name}</h3>
                <span 
                  className={`px-2 py-1 rounded text-xs font-medium ${getRatingColor(mostCommonRating)}`}
                >
                  {mostCommonRating.toUpperCase()}
                </span>
              </div>
              <p className="text-2xl font-bold">
                {name === 'CLS' ? avgValue.toFixed(3) : Math.round(avgValue)}
                <span className="text-sm text-gray-500 ml-1">
                  {name === 'CLS' ? '' : 'ms'}
                </span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Average of {metrics.length} measurements
              </p>
            </div>
          );
        })}
      </div>
    );
  };
  
  // Render Navigation Timing metrics
  const renderNavigationTiming = () => {
    if (!metrics?.navigationTiming || metrics.navigationTiming.length === 0) {
      return <p className="text-gray-500">No Navigation Timing data available.</p>;
    }
    
    // Get the latest navigation timing data
    const latestData = metrics.navigationTiming[metrics.navigationTiming.length - 1];
    
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Navigation Timing</h3>
        <div className="space-y-2">
          {Object.entries(latestData.metrics).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-gray-600">{key}</span>
              <span className="font-medium">{typeof value === 'number' ? `${value}ms` : value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Render Resource Timing metrics
  const renderResourceTiming = () => {
    if (!metrics?.resourceTiming || metrics.resourceTiming.length === 0) {
      return <p className="text-gray-500">No Resource Timing data available.</p>;
    }
    
    // Get the latest resource timing data
    const latestData = metrics.resourceTiming[metrics.resourceTiming.length - 1];
    
    return (
      <div className="space-y-4">
        {Object.entries(latestData.groupedMetrics).map(([resourceType, resources]: [string, any]) => (
          <div key={resourceType} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">{resourceType}</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Count</span>
                <span className="font-medium">{resources.count}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Size</span>
                <span className="font-medium">{Math.round(resources.averageSize / 1024)} KB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Duration</span>
                <span className="font-medium">{Math.round(resources.averageDuration)}ms</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className={`performance-dashboard ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Performance Dashboard</h2>
        <div className="flex space-x-2">
          <button
            onClick={fetchMetrics}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
          <button
            onClick={handleClearMetrics}
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
            disabled={loading}
          >
            Clear All
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="flex border-b mb-4">
        <button
          className={`px-4 py-2 ${activeTab === 'core-web-vitals' ? 'border-b-2 border-blue-500 text-blue-500 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('core-web-vitals')}
        >
          Core Web Vitals
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'navigation-timing' ? 'border-b-2 border-blue-500 text-blue-500 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('navigation-timing')}
        >
          Navigation Timing
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'resource-timing' ? 'border-b-2 border-blue-500 text-blue-500 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('resource-timing')}
        >
          Resource Timing
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div>
          {activeTab === 'core-web-vitals' && renderCoreWebVitals()}
          {activeTab === 'navigation-timing' && renderNavigationTiming()}
          {activeTab === 'resource-timing' && renderResourceTiming()}
        </div>
      )}
      
      {metrics && (
        <div className="mt-4 text-sm text-gray-500">
          Total records: {metrics.counts.coreWebVitals + metrics.counts.navigationTiming + metrics.counts.resourceTiming}
        </div>
      )}
    </div>
  );
} 