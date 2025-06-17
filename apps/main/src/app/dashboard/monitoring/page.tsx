'use client';

import React, { useState, useEffect } from 'react';
import { PerformanceDashboard } from 'performance';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'ui';
import { LineChart, BarChart, PieChart } from 'ui/charts';

/**
 * Real-time monitoring dashboard page
 */
export default function MonitoringDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshInterval, setRefreshInterval] = useState<number>(30); // seconds
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Fetch metrics from the API
  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/performance');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch metrics: ${response.statusText}`);
      }
      
      const data = await response.json();
      setMetrics(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error fetching metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle refresh button click
  const handleRefresh = () => {
    fetchMetrics();
  };

  // Handle clear button click
  const handleClear = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/performance', { method: 'DELETE' });
      
      if (!response.ok) {
        throw new Error(`Failed to clear metrics: ${response.statusText}`);
      }
      
      // Refetch metrics after clearing
      await fetchMetrics();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error clearing metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle refresh interval change
  const handleRefreshIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRefreshInterval(Number(e.target.value));
  };

  // Handle auto refresh toggle
  const handleAutoRefreshToggle = () => {
    setAutoRefresh(!autoRefresh);
  };

  // Set up auto-refresh
  useEffect(() => {
    // Fetch metrics on component mount
    fetchMetrics();
    
    // Set up auto-refresh if enabled
    let intervalId: NodeJS.Timeout | null = null;
    
    if (autoRefresh && refreshInterval > 0) {
      intervalId = setInterval(() => {
        fetchMetrics();
      }, refreshInterval * 1000);
    }
    
    // Clean up interval on component unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [autoRefresh, refreshInterval]);

  // Prepare chart data if metrics are available
  const prepareChartData = () => {
    if (!metrics || !metrics.metrics) return null;
    
    const webVitalsData = metrics.metrics.coreWebVitals || [];
    const navigationData = metrics.metrics.navigationTiming || [];
    
    // Prepare data for Core Web Vitals chart
    const webVitalsChartData = {
      labels: webVitalsData.slice(-10).map((item: any) => new Date(item.timestamp).toLocaleTimeString()),
      datasets: [
        {
          label: 'LCP',
          data: webVitalsData.slice(-10)
            .filter((item: any) => item.metric?.name === 'LCP')
            .map((item: any) => item.metric?.value),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'FID',
          data: webVitalsData.slice(-10)
            .filter((item: any) => item.metric?.name === 'FID')
            .map((item: any) => item.metric?.value),
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
        },
        {
          label: 'CLS',
          data: webVitalsData.slice(-10)
            .filter((item: any) => item.metric?.name === 'CLS')
            .map((item: any) => item.metric?.value),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
      ],
    };
    
    // Prepare data for Navigation Timing chart
    const navigationChartData = {
      labels: navigationData.slice(-10).map((item: any) => new Date(item.timestamp).toLocaleTimeString()),
      datasets: [
        {
          label: 'Page Load Time',
          data: navigationData.slice(-10).map((item: any) => item.metrics?.pageLoadTime),
          borderColor: 'rgb(255, 159, 64)',
          backgroundColor: 'rgba(255, 159, 64, 0.5)',
        },
        {
          label: 'DOM Content Loaded',
          data: navigationData.slice(-10).map((item: any) => item.metrics?.domContentLoaded),
          borderColor: 'rgb(153, 102, 255)',
          backgroundColor: 'rgba(153, 102, 255, 0.5)',
        },
      ],
    };
    
    return {
      webVitalsChartData,
      navigationChartData,
    };
  };

  const chartData = prepareChartData();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Real-Time Monitoring Dashboard</h1>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <label htmlFor="refresh-interval" className="mr-2 text-sm text-gray-600">
              Refresh every:
            </label>
            <select
              id="refresh-interval"
              value={refreshInterval}
              onChange={handleRefreshIntervalChange}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              disabled={!autoRefresh}
            >
              <option value="5">5s</option>
              <option value="10">10s</option>
              <option value="30">30s</option>
              <option value="60">1m</option>
              <option value="300">5m</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="auto-refresh"
              checked={autoRefresh}
              onChange={handleAutoRefreshToggle}
              className="mr-2"
            />
            <label htmlFor="auto-refresh" className="text-sm text-gray-600">
              Auto refresh
            </label>
          </div>
          
          <button
            onClick={handleRefresh}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Refresh
          </button>
          
          <button
            onClick={handleClear}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Clear All
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="web-vitals">Web Vitals</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="errors">Errors</TabsTrigger>
          <TabsTrigger value="raw-data">Raw Data</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4">
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Metrics summary cards */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Core Web Vitals</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Total Metrics</p>
                    <p className="text-2xl font-bold">{metrics?.counts?.coreWebVitals || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="text-sm">
                      {metrics?.metrics?.coreWebVitals?.[0]?.timestamp
                        ? new Date(metrics.metrics.coreWebVitals[0].timestamp).toLocaleString()
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Navigation Timing</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Total Metrics</p>
                    <p className="text-2xl font-bold">{metrics?.counts?.navigationTiming || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="text-sm">
                      {metrics?.metrics?.navigationTiming?.[0]?.timestamp
                        ? new Date(metrics.metrics.navigationTiming[0].timestamp).toLocaleString()
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Resource Timing</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Total Metrics</p>
                    <p className="text-2xl font-bold">{metrics?.counts?.resourceTiming || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="text-sm">
                      {metrics?.metrics?.resourceTiming?.[0]?.timestamp
                        ? new Date(metrics.metrics.resourceTiming[0].timestamp).toLocaleString()
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Charts */}
              {chartData && (
                <>
                  <div className="bg-white rounded-lg shadow p-6 col-span-1 md:col-span-2">
                    <h3 className="text-lg font-semibold mb-4">Core Web Vitals Trend</h3>
                    <div className="h-64">
                      <LineChart data={chartData.webVitalsChartData} />
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow p-6 col-span-1 md:col-span-1">
                    <h3 className="text-lg font-semibold mb-4">Navigation Timing Trend</h3>
                    <div className="h-64">
                      <LineChart data={chartData.navigationChartData} />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="web-vitals" className="mt-4">
          <PerformanceDashboard activeTab="core-web-vitals" />
        </TabsContent>
        
        <TabsContent value="navigation" className="mt-4">
          <PerformanceDashboard activeTab="navigation-timing" />
        </TabsContent>
        
        <TabsContent value="resources" className="mt-4">
          <PerformanceDashboard activeTab="resource-timing" />
        </TabsContent>
        
        <TabsContent value="errors" className="mt-4">
          <PerformanceDashboard activeTab="errors" />
        </TabsContent>
        
        <TabsContent value="raw-data" className="mt-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Raw Metrics Data</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
              {JSON.stringify(metrics, null, 2)}
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 