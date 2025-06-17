'use client';

import React, { useState } from 'react';
import { TaskManager } from '../../../components/TaskManager';
import Button from '../../../components/Button';

// Task status options
const STATUS_OPTIONS = ['Todo', 'In Progress', 'Review', 'Done'];

// Task priority options with colors
const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' },
  { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' },
  { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' }
];

// Sample task data
const INITIAL_TASKS = [
  {
    id: 't1',
    title: 'Implement dark mode',
    description: 'Add dark mode support to all components',
    status: 'Done',
    priority: 'high',
    assignee: 'Alex Kim',
    dueDate: '2023-10-15',
    tags: ['UI', 'Accessibility']
  },
  {
    id: 't2',
    title: 'Fix navigation menu on mobile',
    description: 'The dropdown menu is not working correctly on mobile devices',
    status: 'In Progress',
    priority: 'medium',
    assignee: 'Jordan Lee',
    dueDate: '2023-10-18',
    tags: ['Bug', 'Mobile']
  },
  {
    id: 't3',
    title: 'Create documentation',
    description: 'Write usage documentation for all components',
    status: 'Todo',
    priority: 'low',
    assignee: 'Taylor Smith',
    dueDate: '2023-10-25',
    tags: ['Documentation']
  },
  {
    id: 't4',
    title: 'Optimize image loading',
    description: 'Implement lazy loading for images to improve performance',
    status: 'Review',
    priority: 'medium',
    assignee: 'Morgan Chen',
    dueDate: '2023-10-20',
    tags: ['Performance']
  },
  {
    id: 't5',
    title: 'Security audit',
    description: 'Perform security audit on authentication flow',
    status: 'Todo',
    priority: 'urgent',
    assignee: 'Casey Jones',
    dueDate: '2023-10-17',
    tags: ['Security']
  },
  {
    id: 't6',
    title: 'Update API endpoints',
    description: 'Update API to match new backend changes',
    status: 'In Progress',
    priority: 'high',
    assignee: 'Alex Kim',
    dueDate: '2023-10-19',
    tags: ['Backend', 'API']
  }
];

// Sample team members
const TEAM_MEMBERS = [
  { id: 'tm1', name: 'Alex Kim', avatar: '👩‍💻' },
  { id: 'tm2', name: 'Jordan Lee', avatar: '👨‍💻' },
  { id: 'tm3', name: 'Taylor Smith', avatar: '👩‍💻' },
  { id: 'tm4', name: 'Morgan Chen', avatar: '👨‍💻' },
  { id: 'tm5', name: 'Casey Jones', avatar: '👩‍💻' }
];

// Map status to TaskManager expected format
const mapStatus = (status: string) => {
  const statusMap: Record<string, 'todo' | 'inProgress' | 'review' | 'done'> = {
    'Todo': 'todo',
    'In Progress': 'inProgress',
    'Review': 'review',
    'Done': 'done'
  };
  return statusMap[status] || 'todo';
};

// Map priority to TaskManager expected format
const mapPriority = (priority: string): 'low' | 'medium' | 'high' => {
  if (priority === 'urgent') return 'high';
  return priority as 'low' | 'medium' | 'high';
};

export default function TasksPage() {
  // State for view mode
  const [viewMode, setViewMode] = useState<'board' | 'list'>('board');
  
  // State for filters
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    assignee: '',
    tag: ''
  });
  
  // Get unique tags from all tasks
  const allTags = Array.from(
    new Set(INITIAL_TASKS.flatMap(task => task.tags))
  ).sort();
  
  // Filter tasks based on current filters
  const filteredTasks = INITIAL_TASKS.filter(task => {
    if (filters.status && task.status !== filters.status) return false;
    if (filters.priority && task.priority !== filters.priority) return false;
    if (filters.assignee && task.assignee !== filters.assignee) return false;
    if (filters.tag && !task.tags.includes(filters.tag)) return false;
    return true;
  });
  
  // Map tasks to TaskManager format
  const mappedTasks = filteredTasks.map(task => ({
    id: task.id,
    title: task.title,
    description: task.description,
    status: mapStatus(task.status),
    priority: mapPriority(task.priority),
    assignee: task.assignee,
    dueDate: task.dueDate
  }));
  
  // Calculate task statistics
  const taskStats = {
    total: INITIAL_TASKS.length,
    completed: INITIAL_TASKS.filter(t => t.status === 'Done').length,
    inProgress: INITIAL_TASKS.filter(t => t.status === 'In Progress').length,
    todo: INITIAL_TASKS.filter(t => t.status === 'Todo').length,
    review: INITIAL_TASKS.filter(t => t.status === 'Review').length,
    urgent: INITIAL_TASKS.filter(t => t.priority === 'urgent').length
  };
  
  // Reset all filters
  const resetFilters = () => {
    setFilters({
      status: '',
      priority: '',
      assignee: '',
      tag: ''
    });
  };
  
  // Render task list view
  const renderListView = () => {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Task
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Priority
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Assignee
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Due Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Tags
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredTasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{task.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    task.status === 'Todo' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' :
                    task.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                    task.status === 'Review' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                  }`}>
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    PRIORITY_OPTIONS.find(p => p.value === task.priority)?.color
                  }`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200">
                      {TEAM_MEMBERS.find(tm => tm.name === task.assignee)?.avatar || '👤'}
                    </div>
                    <div className="ml-3 text-sm text-gray-900 dark:text-white">{task.assignee}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {new Date(task.dueDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {task.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 text-xs rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Task Management</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage and track your team's tasks</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button 
              variant="primary"
              size="md"
              leftIcon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              }
            >
              New Task
            </Button>
          </div>
        </div>
        
        {/* Task Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Tasks</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{taskStats.total}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{taskStats.completed}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">In Progress</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{taskStats.inProgress}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">To Do</p>
            <p className="text-2xl font-bold text-gray-600 dark:text-gray-400 mt-1">{taskStats.todo}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">In Review</p>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">{taskStats.review}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Urgent</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">{taskStats.urgent}</p>
          </div>
        </div>
        
        {/* Filters and View Toggles */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 md:mb-0">Filters</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('board')}
                className={`p-2 rounded ${
                  viewMode === 'board' 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                }`}
                aria-label="Board view"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list' 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                }`}
                aria-label="List view"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                id="status-filter"
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-700 dark:text-gray-200 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={filters.status}
                onChange={e => setFilters({...filters, status: e.target.value})}
              >
                <option value="">All</option>
                {STATUS_OPTIONS.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="priority-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Priority
              </label>
              <select
                id="priority-filter"
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-700 dark:text-gray-200 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={filters.priority}
                onChange={e => setFilters({...filters, priority: e.target.value})}
              >
                <option value="">All</option>
                {PRIORITY_OPTIONS.map(priority => (
                  <option key={priority.value} value={priority.value}>{priority.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="assignee-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Assignee
              </label>
              <select
                id="assignee-filter"
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-700 dark:text-gray-200 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={filters.assignee}
                onChange={e => setFilters({...filters, assignee: e.target.value})}
              >
                <option value="">All</option>
                {TEAM_MEMBERS.map(member => (
                  <option key={member.id} value={member.name}>{member.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="tag-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tag
              </label>
              <select
                id="tag-filter"
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-700 dark:text-gray-200 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={filters.tag}
                onChange={e => setFilters({...filters, tag: e.target.value})}
              >
                <option value="">All</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button 
              variant="outline" 
              size="sm"
              onClick={resetFilters}
            >
              Reset Filters
            </Button>
          </div>
        </div>
        
        {/* Task View (Board or List) */}
        {viewMode === 'board' ? (
          <TaskManager initialTasks={mappedTasks} />
        ) : (
          renderListView()
        )}
      </div>
    </div>
  );
}