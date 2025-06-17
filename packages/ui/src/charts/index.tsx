'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Default chart options
const defaultLineOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  interaction: {
    mode: 'nearest' as const,
    axis: 'x' as const,
    intersect: false,
  },
};

const defaultBarOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const defaultPieOptions: ChartOptions<'pie'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

// Chart component props
interface ChartProps {
  data: ChartData<any, any, any>;
  options?: ChartOptions<any>;
  height?: number;
}

/**
 * Line Chart component
 */
export function LineChart({ data, options = {}, height }: ChartProps) {
  const mergedOptions = {
    ...defaultLineOptions,
    ...options,
  };
  
  return (
    <div style={{ height: height || '100%', width: '100%' }}>
      <Line data={data} options={mergedOptions} />
    </div>
  );
}

/**
 * Bar Chart component
 */
export function BarChart({ data, options = {}, height }: ChartProps) {
  const mergedOptions = {
    ...defaultBarOptions,
    ...options,
  };
  
  return (
    <div style={{ height: height || '100%', width: '100%' }}>
      <Bar data={data} options={mergedOptions} />
    </div>
  );
}

/**
 * Pie Chart component
 */
export function PieChart({ data, options = {}, height }: ChartProps) {
  const mergedOptions = {
    ...defaultPieOptions,
    ...options,
  };
  
  return (
    <div style={{ height: height || '100%', width: '100%' }}>
      <Pie data={data} options={mergedOptions} />
    </div>
  );
}

/**
 * Generate random colors for charts
 */
export function generateChartColors(count: number) {
  const colors = [];
  const backgroundColors = [];
  
  for (let i = 0; i < count; i++) {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    
    colors.push(`rgb(${r}, ${g}, ${b})`);
    backgroundColors.push(`rgba(${r}, ${g}, ${b}, 0.5)`);
  }
  
  return { colors, backgroundColors };
}

/**
 * Format large numbers for display
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

/**
 * Format bytes for display
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Format time in milliseconds for display
 */
export function formatTime(ms: number): string {
  if (ms >= 60000) {
    return (ms / 60000).toFixed(1) + ' min';
  }
  if (ms >= 1000) {
    return (ms / 1000).toFixed(1) + ' s';
  }
  return ms.toFixed(0) + ' ms';
} 