'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ProjectAnalytics from '../../components/ProjectAnalytics';
import TaskManager from '../../components/TaskManager';
import Button from '../../components/Button';
import NotificationCenter from '../../components/NotificationCenter';

// Define types to match component props
interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignee: string;
  status: 'todo' | 'inProgress' | 'review' | 'done';
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  time: string;
  read: boolean;
}

// Mock data for dashboard
const projectStats = {
  totalProjects: 12,
  activeProjects: 5,
  completedProjects: 7,
  upcomingDeadlines: 3
};

const recentActivities = [
  { id: 1, action: 'Project update', project: 'E-commerce Platform', user: 'John Doe', time: '2 hours ago' },
  { id: 2, action: 'Comment added', project: 'Healthcare Portal', user: 'Jane Smith', time: '5 hours ago' },
  { id: 3, action: 'File uploaded', project: 'Real Estate App', user: 'Mike Johnson', time: '1 day ago' },
  { id: 4, action: 'Task completed', project: 'E-commerce Platform', user: 'Sarah Williams', time: '2 days ago' },
  { id: 5, action: 'New milestone', project: 'Healthcare Portal', user: 'John Doe', time: '3 days ago' }
];

const projects = [
  { 
    id: 1, 
    name: 'E-commerce Platform', 
    client: 'StyleShop Inc.', 
    progress: 75, 
    status: 'In Progress',
    deadline: 'Oct 15, 2023'
  },
  { 
    id: 2, 
    name: 'Healthcare Portal', 
    client: 'MediCare Group', 
    progress: 40, 
    status: 'In Progress',
    deadline: 'Nov 30, 2023'
  },
  { 
    id: 3, 
    name: 'Real Estate Application', 
    client: 'PropertyFinder LLC', 
    progress: 90, 
    status: 'In Review',
    deadline: 'Oct 5, 2023'
  },
  { 
    id: 4, 
    name: 'Financial Dashboard', 
    client: 'InvestSmart Co.', 
    progress: 100, 
    status: 'Completed',
    deadline: 'Sep 20, 2023'
  },
  { 
    id: 5, 
    name: 'Restaurant Ordering System', 
    client: 'FoodDelight Chain', 
    progress: 100, 
    status: 'Completed',
    deadline: 'Aug 30, 2023'
  }
];

// Mock analytics data
const analyticsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Completed Projects',
    data: [3, 2, 4, 3, 5, 4],
    backgroundColor: '#3b82f6'
  }]
};

// Mock task data
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Update homepage design',
    description: 'Redesign the hero section with new branding',
    priority: 'high',
    dueDate: '2023-10-25',
    assignee: 'Sarah Williams',
    status: 'todo'
  },
  {
    id: '2',
    title: 'Fix mobile navigation bug',
    description: "Menu doesn't close properly on iOS devices",
    priority: 'medium',
    dueDate: '2023-10-22',
    assignee: 'Mike Johnson',
    status: 'inProgress'
  },
  {
    id: '3',
    title: 'Implement search functionality',
    description: 'Add search to product listing page',
    priority: 'medium',
    dueDate: '2023-10-28',
    assignee: 'John Doe',
    status: 'inProgress'
  },
  {
    id: '4',
    title: 'Code review for payment gateway',
    description: 'Review the new payment processing integration',
    priority: 'high',
    dueDate: '2023-10-20',
    assignee: 'Jane Smith',
    status: 'review'
  },
  {
    id: '5',
    title: 'Write API documentation',
    description: 'Create docs for the new REST API endpoints',
    priority: 'low',
    dueDate: '2023-10-30',
    assignee: 'Mike Johnson',
    status: 'done'
  }
];

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New comment',
    message: 'Jane Smith commented on the Healthcare Portal project',
    type: 'info',
    time: '10 min ago',
    read: false
  },
  {
    id: '2',
    title: 'Task completed',
    message: 'Mike Johnson completed "Implement user authentication"',
    type: 'success',
    time: '1 hour ago',
    read: false
  },
  {
    id: '3',
    title: 'Approaching deadline',
    message: 'E-commerce Platform project due in 2 days',
    type: 'warning',
    time: '3 hours ago',
    read: true
  },
  {
    id: '4',
    title: 'Build failed',
    message: 'CI/CD pipeline failed for Financial Dashboard',
    type: 'error',
    time: '5 hours ago',
    read: true
  }
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('month');
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300">Welcome back! Here's an overview of your projects.</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <NotificationCenter notifications={mockNotifications} />
            <Button
              variant="primary"
              size="md"
              as="a"
              href="/dashboard/new-project"
              leftIcon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              }
            >
              New Project
            </Button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="flex space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'projects'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'tasks'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              Tasks
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'activity'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              Activity
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              Analytics
            </button>
            <Link 
              href="/dashboard/performance"
              className="py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 whitespace-nowrap"
            >
              Performance
            </Link>
          </nav>
        </div>
        
        {/* Overview Tab Content */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Total Projects</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{projectStats.totalProjects}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Active Projects</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{projectStats.activeProjects}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Completed Projects</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{projectStats.completedProjects}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Upcoming Deadlines</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{projectStats.upcomingDeadlines}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Analytics Section */}
            <div className="mb-8">
              <ProjectAnalytics 
                projectData={analyticsData} 
                timeRange={timeRange} 
                onTimeRangeChange={setTimeRange} 
              />
            </div>
            
            {/* Recent Projects */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-8">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Projects</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Project</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Client</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Progress</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Deadline</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {projects.slice(0, 3).map((project) => (
                      <tr key={project.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{project.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-300">{project.client}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full" 
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{project.progress}%</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            project.status === 'Completed' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                              : project.status === 'In Review'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                          }`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {project.deadline}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <Link href="/dashboard/projects" className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                  View all projects
                </Link>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h3>
              </div>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {recentActivities.slice(0, 4).map((activity) => (
                  <li key={activity.id} className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300">
                          {activity.user.split(' ').map(name => name[0]).join('')}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {activity.user} <span className="font-normal text-gray-500 dark:text-gray-400">{activity.action}</span> on {activity.project}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <Link href="/dashboard/activity" className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                  View all activity
                </Link>
              </div>
            </div>
          </div>
        )}
        
        {/* Projects Tab Content */}
        {activeTab === 'projects' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">All Projects</h3>
              <div className="flex space-x-2">
                <select className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2">
                  <option>All Status</option>
                  <option>In Progress</option>
                  <option>In Review</option>
                  <option>Completed</option>
                </select>
                <select className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2">
                  <option>Sort by: Newest</option>
                  <option>Sort by: Oldest</option>
                  <option>Sort by: Deadline</option>
                  <option>Sort by: Progress</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Project</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Client</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Progress</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Deadline</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {projects.map((project) => (
                    <tr key={project.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{project.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-300">{project.client}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{project.progress}%</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          project.status === 'Completed' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                            : project.status === 'In Review'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                        }`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {project.deadline}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`/dashboard/projects/${project.id}`} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4">
                          View
                        </Link>
                        <Link href={`/dashboard/projects/${project.id}/edit`} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Tasks Tab Content */}
        {activeTab === 'tasks' && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Task Management</h3>
              <Link href="/dashboard/tasks">
                <Button 
                  variant="outline" 
                  size="sm"
                  rightIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  }
                >
                  View All Tasks
                </Button>
              </Link>
            </div>
            <TaskManager initialTasks={mockTasks} />
          </div>
        )}
        
        {/* Activity Tab Content */}
        {activeTab === 'activity' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Activity Log</h3>
            </div>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentActivities.map((activity) => (
                <li key={activity.id} className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300">
                        {activity.user.split(' ').map(name => name[0]).join('')}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {activity.user} <span className="font-normal text-gray-500 dark:text-gray-400">{activity.action}</span> on {activity.project}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
              <button className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                Previous
              </button>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                Next
              </button>
            </div>
          </div>
        )}
        
        {/* Analytics Tab Content */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Project Analytics</h3>
              <Link href="/dashboard/performance">
                <Button 
                  variant="outline"
                  size="sm"
                  rightIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  }
                >
                  View Performance Dashboard
                </Button>
              </Link>
            </div>
            
            <ProjectAnalytics 
              projectData={analyticsData} 
              timeRange={timeRange} 
              onTimeRangeChange={setTimeRange} 
            />
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Project Performance</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Project</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Completion Rate</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Budget Usage</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Team Performance</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Client Satisfaction</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {projects.slice(0, 5).map((project) => (
                      <tr key={project.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{project.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-2 max-w-[100px]">
                              <div 
                                className={`h-2.5 rounded-full ${
                                  project.progress >= 90 ? 'bg-green-500' :
                                  project.progress >= 60 ? 'bg-blue-500' :
                                  project.progress >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                                }`} 
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{project.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {Math.floor(Math.random() * 30) + 70}% used
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg 
                                key={star} 
                                className={`h-4 w-4 ${star <= Math.floor(Math.random() * 2) + 3 ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {(Math.random() * 1.5 + 3.5).toFixed(1)}/5
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 