'use client';

import React from 'react';

interface ProjectAnalyticsProps {
  projectData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string;
      borderColor?: string;
    }[];
  };
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
}

const ProjectAnalytics: React.FC<ProjectAnalyticsProps> = ({ 
  projectData, 
  timeRange, 
  onTimeRangeChange 
}) => {
  // Mock chart rendering with divs (would use Chart.js or similar in real app)
  const renderMockBarChart = () => {
    const maxValue = Math.max(...projectData.datasets[0].data);
    
    return (
      <div className="h-64 flex items-end space-x-2 pb-4 pt-6">
        {projectData.labels.map((label, index) => {
          const value = projectData.datasets[0].data[index];
          const height = (value / maxValue) * 100;
          
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="w-full bg-blue-500 dark:bg-blue-600 rounded-t"
                style={{ height: `${height}%` }}
              ></div>
              <div className="text-xs mt-2 text-gray-600 dark:text-gray-400 text-center">{label}</div>
            </div>
          );
        })}
      </div>
    );
  };

  // Mock line chart for trends
  const renderMockLineChart = () => {
    return (
      <div className="h-64 relative">
        {/* Mock line path */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-px bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div className="absolute inset-0 flex items-center" style={{ top: '25%' }}>
          <div className="w-full h-px bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div className="absolute inset-0 flex items-center" style={{ top: '50%' }}>
          <div className="w-full h-px bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div className="absolute inset-0 flex items-center" style={{ top: '75%' }}>
          <div className="w-full h-px bg-gray-200 dark:bg-gray-700"></div>
        </div>
        
        {/* Line */}
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M0,50 L10,45 L20,60 L30,40 L40,45 L50,30 L60,35 L70,25 L80,40 L90,20 L100,30"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-blue-500 dark:text-blue-400"
          />
        </svg>
        
        {/* Axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-600 dark:text-gray-400">
          {projectData.labels.map((label, i) => (
            <div key={i} className="text-center" style={{ width: `${100 / projectData.labels.length}%` }}>
              {label}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 sm:mb-0">Project Analytics</h3>
        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            onClick={() => onTimeRangeChange('week')}
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
            onClick={() => onTimeRangeChange('month')}
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
            onClick={() => onTimeRangeChange('year')}
            className={`px-4 py-2 text-sm font-medium rounded-r-md ${
              timeRange === 'year'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            } border border-gray-300 dark:border-gray-600`}
          >
            Year
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Project Completion</h4>
          {renderMockBarChart()}
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Progress Trends</h4>
          {renderMockLineChart()}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Performance Metrics</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">On-time Delivery</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">92%</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Budget Compliance</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">87%</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Client Satisfaction</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">4.8/5</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Team Velocity</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">+12%</p>
          </div>
        </div>
      </div>

      <div className="mt-4 text-right">
        <button
          className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium"
        >
          View detailed reports →
        </button>
      </div>
    </div>
  );
};

export default ProjectAnalytics; 