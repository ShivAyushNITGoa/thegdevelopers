'use client';
import React, { useState } from 'react';
// Fixing the import path for PerformanceMonitor
// Either import from the correct path or create a mock if component doesn't exist
// Removing the problematic import for now
import Button from '../../../components/Button';

// Mock performance data
const performanceData = {
  coreWebVitals: {
    lcp: { value: 2.1, unit: 's', status: 'good' },
    fid: { value: 35, unit: 'ms', status: 'good' },
    cls: { value: 0.08, unit: '', status: 'good' },
    inp: { value: 120, unit: 'ms', status: 'needs-improvement' }
  },
  resources: {
    total: 52,
    js: 18,
    css: 5,
    images: 24,
    fonts: 3,
    other: 2
  },
  metrics: {
    ttfb: { value: 180, unit: 'ms' },
    domContentLoaded: { value: 780, unit: 'ms' },
    windowLoad: { value: 1850, unit: 'ms' }
  },
  history: [
    { date: '2023-10-01', lcp: 2.3, fid: 40, cls: 0.09 },
    { date: '2023-10-08', lcp: 2.2, fid: 38, cls: 0.08 },
    { date: '2023-10-15', lcp: 2.0, fid: 35, cls: 0.08 },
    { date: '2023-10-22', lcp: 2.1, fid: 35, cls: 0.07 },
    { date: '2023-10-29', lcp: 1.9, fid: 32, cls: 0.06 }
  ]
};

export default function PerformancePage() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('month');

  // Helper function to render status indicator
  const renderStatusIndicator = (status: string) => {
    if (status === 'good') {
      return <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>;
    } else if (status === 'needs-improvement') {
      return <span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>;
    } else {
      return <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>;
    }
  };

  // Simplified chart component using divs
  const renderLineChart = () => {
    const maxLcp = Math.max(...performanceData.history.map(item => item.lcp)) * 1.2;

    return (
      <div className="h-64 relative mt-6">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="w-full h-px bg-gray-200 dark:bg-gray-700"></div>
          ))}
        </div>
        
        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 dark:text-gray-400">
          {performanceData.history.map((item, i) => (
            <div key={i} className="text-center">{item.date.split('-')[2]}</div>
          ))}
        </div>
        
        {/* Line for LCP */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d={`M 
              ${performanceData.history.map((item, i) => 
                `${i * (100 / (performanceData.history.length - 1))},${100 - (item.lcp / maxLcp) * 100}`
              ).join(' L ')}
            `}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          
          {/* Data points */}
          {performanceData.history.map((item, i) => (
            <circle 
              key={i}
              cx={`${i * (100 / (performanceData.history.length - 1))}`} 
              cy={`${100 - (item.lcp / maxLcp) * 100}`}
              r="3"
              fill="#3b82f6"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Performance Monitoring</h1>
            <p className="text-gray-600 dark:text-gray-300">Track and optimize your website's performance</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => setTimeRange('week')}
                className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                  timeRange === 'week'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                } border border-gray-300 dark:border-gray-600`}
              >
                Week
              </button>
              <button
                type="button"
                onClick={() => setTimeRange('month')}
                className={`px-4 py-2 text-sm font-medium ${
                  timeRange === 'month'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                } border-t border-b border-gray-300 dark:border-gray-600`}
              >
                Month
              </button>
              <button
                type="button"
                onClick={() => setTimeRange('quarter')}
                className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                  timeRange === 'quarter'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                } border border-gray-300 dark:border-gray-600`}
              >
                Quarter
              </button>
            </div>
            <Button
              variant="outline"
              size="md"
              className="ml-3"
              leftIcon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              }
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Core Web Vitals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">LCP</h3>
              <div className="flex items-center">
                {renderStatusIndicator(performanceData.coreWebVitals.lcp.status)}
                <span className={`text-sm font-medium ${
                  performanceData.coreWebVitals.lcp.status === 'good' 
                    ? 'text-green-700 dark:text-green-400' 
                    : performanceData.coreWebVitals.lcp.status === 'needs-improvement'
                    ? 'text-yellow-700 dark:text-yellow-400'
                    : 'text-red-700 dark:text-red-400'
                }`}>
                  {performanceData.coreWebVitals.lcp.status === 'good' ? 'Good' : 
                   performanceData.coreWebVitals.lcp.status === 'needs-improvement' ? 'Needs Improvement' : 'Poor'}
                </span>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {performanceData.coreWebVitals.lcp.value}{performanceData.coreWebVitals.lcp.unit}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Largest Contentful Paint
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">FID</h3>
              <div className="flex items-center">
                {renderStatusIndicator(performanceData.coreWebVitals.fid.status)}
                <span className={`text-sm font-medium ${
                  performanceData.coreWebVitals.fid.status === 'good' 
                    ? 'text-green-700 dark:text-green-400' 
                    : performanceData.coreWebVitals.fid.status === 'needs-improvement'
                    ? 'text-yellow-700 dark:text-yellow-400'
                    : 'text-red-700 dark:text-red-400'
                }`}>
                  {performanceData.coreWebVitals.fid.status === 'good' ? 'Good' : 
                   performanceData.coreWebVitals.fid.status === 'needs-improvement' ? 'Needs Improvement' : 'Poor'}
                </span>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {performanceData.coreWebVitals.fid.value}{performanceData.coreWebVitals.fid.unit}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              First Input Delay
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">CLS</h3>
              <div className="flex items-center">
                {renderStatusIndicator(performanceData.coreWebVitals.cls.status)}
                <span className={`text-sm font-medium ${
                  performanceData.coreWebVitals.cls.status === 'good' 
                    ? 'text-green-700 dark:text-green-400' 
                    : performanceData.coreWebVitals.cls.status === 'needs-improvement'
                    ? 'text-yellow-700 dark:text-yellow-400'
                    : 'text-red-700 dark:text-red-400'
                }`}>
                  {performanceData.coreWebVitals.cls.status === 'good' ? 'Good' : 
                   performanceData.coreWebVitals.cls.status === 'needs-improvement' ? 'Needs Improvement' : 'Poor'}
                </span>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {performanceData.coreWebVitals.cls.value}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Cumulative Layout Shift
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">INP</h3>
              <div className="flex items-center">
                {renderStatusIndicator(performanceData.coreWebVitals.inp.status)}
                <span className={`text-sm font-medium ${
                  performanceData.coreWebVitals.inp.status === 'good' 
                    ? 'text-green-700 dark:text-green-400' 
                    : performanceData.coreWebVitals.inp.status === 'needs-improvement'
                    ? 'text-yellow-700 dark:text-yellow-400'
                    : 'text-red-700 dark:text-red-400'
                }`}>
                  {performanceData.coreWebVitals.inp.status === 'good' ? 'Good' : 
                   performanceData.coreWebVitals.inp.status === 'needs-improvement' ? 'Needs Improvement' : 'Poor'}
                </span>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {performanceData.coreWebVitals.inp.value}{performanceData.coreWebVitals.inp.unit}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Interaction to Next Paint
            </p>
          </div>
        </div>

        {/* Trend Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">LCP Trend</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Largest Contentful Paint over time
            </p>
            {renderLineChart()}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Resource Breakdown</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Total resources: {performanceData.resources.total}
            </p>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">JavaScript</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {performanceData.resources.js} ({Math.round(performanceData.resources.js / performanceData.resources.total * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-yellow-500 h-2.5 rounded-full" 
                    style={{ width: `${(performanceData.resources.js / performanceData.resources.total) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">CSS</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {performanceData.resources.css} ({Math.round(performanceData.resources.css / performanceData.resources.total * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-blue-500 h-2.5 rounded-full" 
                    style={{ width: `${(performanceData.resources.css / performanceData.resources.total) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Images</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {performanceData.resources.images} ({Math.round(performanceData.resources.images / performanceData.resources.total * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-green-500 h-2.5 rounded-full" 
                    style={{ width: `${(performanceData.resources.images / performanceData.resources.total) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Fonts</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {performanceData.resources.fonts} ({Math.round(performanceData.resources.fonts / performanceData.resources.total * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-purple-500 h-2.5 rounded-full" 
                    style={{ width: `${(performanceData.resources.fonts / performanceData.resources.total) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Other</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {performanceData.resources.other} ({Math.round(performanceData.resources.other / performanceData.resources.total * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-gray-500 h-2.5 rounded-full" 
                    style={{ width: `${(performanceData.resources.other / performanceData.resources.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Load Metrics */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Page Load Metrics</h3>
          
          <div className="relative pt-8 pb-4">
            {/* Timeline */}
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 absolute top-4"></div>
            
            {/* TTFB marker */}
            <div className="absolute" style={{ left: `${(performanceData.metrics.ttfb.value / performanceData.metrics.windowLoad.value) * 100}%`, top: '0' }}>
              <div className="h-4 w-4 rounded-full bg-blue-500 relative left-0 -ml-2"></div>
              <div className="absolute top-6 transform -translate-x-1/2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded px-2 py-0.5">
                TTFB
              </div>
              <div className="absolute top-12 transform -translate-x-1/2 text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
                {performanceData.metrics.ttfb.value}{performanceData.metrics.ttfb.unit}
              </div>
            </div>
            
            {/* DCL marker */}
            <div className="absolute" style={{ left: `${(performanceData.metrics.domContentLoaded.value / performanceData.metrics.windowLoad.value) * 100}%`, top: '0' }}>
              <div className="h-4 w-4 rounded-full bg-green-500 relative left-0 -ml-2"></div>
              <div className="absolute top-6 transform -translate-x-1/2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded px-2 py-0.5">
                DOMContentLoaded
              </div>
              <div className="absolute top-12 transform -translate-x-1/2 text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
                {performanceData.metrics.domContentLoaded.value}{performanceData.metrics.domContentLoaded.unit}
              </div>
            </div>
            
            {/* Load marker */}
            <div className="absolute" style={{ left: `100%`, top: '0' }}>
              <div className="h-4 w-4 rounded-full bg-purple-500 relative left-0 -ml-2"></div>
              <div className="absolute top-6 transform -translate-x-1/2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded px-2 py-0.5">
                Window Load
              </div>
              <div className="absolute top-12 transform -translate-x-1/2 text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
                {performanceData.metrics.windowLoad.value}{performanceData.metrics.windowLoad.unit}
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recommendations</h3>
          
          <ul className="space-y-4">
            <li className="flex">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center text-yellow-600 dark:text-yellow-400 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="text-base font-medium text-gray-900 dark:text-white">Optimize Interaction to Next Paint</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Your INP is currently at 120ms which needs improvement. Consider optimizing event handlers and reducing JavaScript execution time.
                </p>
              </div>
            </li>
            
            <li className="flex">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="text-base font-medium text-gray-900 dark:text-white">Great LCP Performance</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Your Largest Contentful Paint is at 2.1s which is good. Keep maintaining this by optimizing critical rendering path.
                </p>
              </div>
            </li>
            
            <li className="flex">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="text-base font-medium text-gray-900 dark:text-white">Consider Image Optimization</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Images make up 46% of your resources. Consider using next-gen formats like WebP and implementing lazy loading for images below the fold.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}