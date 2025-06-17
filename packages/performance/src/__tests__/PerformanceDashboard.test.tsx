import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PerformanceDashboard } from '../components/PerformanceDashboard';

// Mock fetch responses
const mockMetricsData = {
  metrics: {
    coreWebVitals: [
      { name: 'LCP', value: 2500, rating: 'good', timestamp: '2023-01-01T00:00:00.000Z' },
      { name: 'FID', value: 50, rating: 'good', timestamp: '2023-01-01T00:00:00.000Z' },
      { name: 'CLS', value: 0.05, rating: 'good', timestamp: '2023-01-01T00:00:00.000Z' },
    ],
    navigationTiming: [
      {
        metrics: {
          pageLoadTime: 1200,
          domContentLoaded: 800,
          redirectTime: 0,
          dnsLookupTime: 10,
          tcpConnectionTime: 20,
          tlsNegotiationTime: 30,
          serverResponseTime: 200,
          downloadTime: 300,
        },
        url: 'https://example.com',
        timestamp: '2023-01-01T00:00:00.000Z',
      },
    ],
    resourceTiming: [
      {
        groupedMetrics: {
          script: {
            count: 5,
            totalSize: 500000,
            averageSize: 100000,
            totalDuration: 1000,
            averageDuration: 200,
            slowestResource: 'https://example.com/script.js',
            slowestDuration: 300,
            largestResource: 'https://example.com/large-script.js',
            largestSize: 200000,
          },
          css: {
            count: 2,
            totalSize: 100000,
            averageSize: 50000,
            totalDuration: 400,
            averageDuration: 200,
            slowestResource: 'https://example.com/style.css',
            slowestDuration: 250,
            largestResource: 'https://example.com/style.css',
            largestSize: 60000,
          },
        },
        url: 'https://example.com',
        timestamp: '2023-01-01T00:00:00.000Z',
      },
    ],
    errors: [],
  },
  counts: {
    coreWebVitals: 3,
    navigationTiming: 1,
    resourceTiming: 1,
    errors: 0,
  },
};

// Mock fetch
global.fetch = jest.fn().mockImplementation(() => 
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockMetricsData),
  })
);

describe('PerformanceDashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders loading state initially', () => {
    render(<PerformanceDashboard />);
    
    // Check for loading indicator
    expect(screen.getByText('Performance Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  
  it('fetches and displays metrics', async () => {
    render(<PerformanceDashboard />);
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    
    // Check that Core Web Vitals are displayed
    expect(screen.getByText('LCP')).toBeInTheDocument();
    expect(screen.getByText('FID')).toBeInTheDocument();
    expect(screen.getByText('CLS')).toBeInTheDocument();
    
    // Check that fetch was called with the default endpoint
    expect(global.fetch).toHaveBeenCalledWith('/api/performance');
  });
  
  it('uses custom endpoint when provided', async () => {
    render(<PerformanceDashboard endpoint="/custom/endpoint" />);
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    
    // Check that fetch was called with the custom endpoint
    expect(global.fetch).toHaveBeenCalledWith('/custom/endpoint');
  });
  
  it('switches between tabs', async () => {
    render(<PerformanceDashboard />);
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    
    // Default tab should be Core Web Vitals
    expect(screen.getByText('LCP')).toBeInTheDocument();
    
    // Click on Navigation Timing tab
    fireEvent.click(screen.getByText('Navigation Timing'));
    
    // Should show Navigation Timing data
    expect(screen.getByText('Navigation Timing')).toBeInTheDocument();
    expect(screen.getByText('pageLoadTime')).toBeInTheDocument();
    
    // Click on Resource Timing tab
    fireEvent.click(screen.getByText('Resource Timing'));
    
    // Should show Resource Timing data
    expect(screen.getByText('script')).toBeInTheDocument();
    expect(screen.getByText('css')).toBeInTheDocument();
  });
  
  it('handles refresh button click', async () => {
    render(<PerformanceDashboard />);
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    
    // Clear fetch mock calls
    global.fetch.mockClear();
    
    // Click refresh button
    fireEvent.click(screen.getByText('Refresh'));
    
    // Should show loading state again
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    // Should fetch data again
    expect(global.fetch).toHaveBeenCalledWith('/api/performance');
    
    // Wait for data to load again
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });
  
  it('handles clear button click', async () => {
    render(<PerformanceDashboard />);
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    
    // Mock DELETE response
    global.fetch.mockImplementationOnce(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    );
    
    // Click clear button
    fireEvent.click(screen.getByText('Clear All'));
    
    // Should make DELETE request
    expect(global.fetch).toHaveBeenCalledWith('/api/performance', { method: 'DELETE' });
    
    // Should fetch data again after clearing
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/performance');
    });
  });
  
  it('handles API errors', async () => {
    // Mock error response
    global.fetch.mockImplementationOnce(() => 
      Promise.resolve({
        ok: false,
        statusText: 'Internal Server Error',
      })
    );
    
    render(<PerformanceDashboard />);
    
    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/failed to fetch metrics/i)).toBeInTheDocument();
    });
  });
}); 