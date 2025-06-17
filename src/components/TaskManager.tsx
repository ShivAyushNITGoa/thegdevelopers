'use client';

import React, { useState } from 'react';
import Button from './Button';

// Task types
interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignee: string;
  status: 'todo' | 'inProgress' | 'review' | 'done';
}

// Column interfaces
interface Column {
  id: 'todo' | 'inProgress' | 'review' | 'done';
  title: string;
  tasks: Task[];
}

interface TaskManagerProps {
  initialTasks?: Task[];
}

/**
 * A Kanban board for managing tasks.
 * 
 * @prop {Task[]} initialTasks - Initial tasks to display on the board.
 * 
 * @returns A Kanban board component.
 */
const TaskManager: React.FC<TaskManagerProps> = ({ initialTasks = [] }) => {
  // Initialize columns with tasks
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'todo',
      title: 'To Do',
      tasks: initialTasks.filter(task => task.status === 'todo') || []
    },
    {
      id: 'inProgress',
      title: 'In Progress',
      tasks: initialTasks.filter(task => task.status === 'inProgress') || []
    },
    {
      id: 'review',
      title: 'Review',
      tasks: initialTasks.filter(task => task.status === 'review') || []
    },
    {
      id: 'done',
      title: 'Done',
      tasks: initialTasks.filter(task => task.status === 'done') || []
    }
  ]);

  // Add task form state
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    assignee: '',
    status: 'todo'
  });

  // Dragging state
  const [dragging, setDragging] = useState<Task | null>(null);

  // Handle adding a new task
  const handleAddTask = () => {
    if (!newTask.title) return;
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title || '',
      description: newTask.description || '',
      priority: newTask.priority || 'medium',
      dueDate: newTask.dueDate || new Date().toISOString().split('T')[0],
      assignee: newTask.assignee || '',
      status: newTask.status || 'todo'
    };
    
    setColumns(columns.map(column => {
      if (column.id === task.status) {
        return {
          ...column,
          tasks: [...column.tasks, task]
        };
      }
      return column;
    }));
    
    // Reset form
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      assignee: '',
      status: 'todo'
    });
    setShowAddTask(false);
  };

  // Handle drag start
  const handleDragStart = (task: Task) => {
    setDragging(task);
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Handle drop
  const handleDrop = (columnId: Column['id']) => {
    if (!dragging) return;
    
    // Remove task from source column
    const sourceColumn = columns.find(col => 
      col.tasks.some(task => task.id === dragging.id)
    );
    
    if (!sourceColumn) return;
    
    // Update columns
    setColumns(columns.map(column => {
      // Remove from source
      if (column.id === sourceColumn.id) {
        return {
          ...column,
          tasks: column.tasks.filter(task => task.id !== dragging.id)
        };
      }
      
      // Add to target
      if (column.id === columnId) {
        const updatedTask = { ...dragging, status: columnId };
        return {
          ...column,
          tasks: [...column.tasks, updatedTask]
        };
      }
      
      return column;
    }));
    
    setDragging(null);
  };

  // Task card component
  const TaskCard = ({ task }: { task: Task }) => {
    const priorityClasses = {
      low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };

    return (
      <div 
        draggable
        onDragStart={() => handleDragStart(task)}
        className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm mb-3 cursor-move border-l-4 border-blue-500 hover:shadow-md transition-shadow"
      >
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium text-gray-900 dark:text-white">{task.title}</h4>
          <span className={`text-xs px-2 py-1 rounded-full ${priorityClasses[task.priority]}`}>
            {task.priority}
          </span>
        </div>
        {task.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{task.description}</p>
        )}
        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <div>{task.dueDate}</div>
          {task.assignee && <div>{task.assignee}</div>}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 sm:mb-0">Task Manager</h3>
        <Button 
          variant="primary" 
          size="md" 
          onClick={() => setShowAddTask(true)}
          leftIcon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          }
        >
          Add Task
        </Button>
      </div>

      {/* Add Task Form */}
      {showAddTask && (
        <div className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900">
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Add New Task</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Task title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Assignee</label>
              <input
                type="text"
                value={newTask.assignee}
                onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Assignee name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({...newTask, priority: e.target.value as 'low' | 'medium' | 'high'})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Task description"
                rows={3}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowAddTask(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddTask}>Save Task</Button>
          </div>
        </div>
      )}

      {/* Task Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map(column => (
          <div 
            key={column.id}
            className="bg-gray-100 dark:bg-gray-700 rounded-md p-4"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(column.id)}
          >
            <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center">
              {column.title}
              <span className="ml-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
                {column.tasks.length}
              </span>
            </h3>
            
            <div className="min-h-[200px]">
              {column.tasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
              
              {column.tasks.length === 0 && (
                <div className="h-20 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm">
                  Drop tasks here
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { TaskManager };
export default TaskManager; 