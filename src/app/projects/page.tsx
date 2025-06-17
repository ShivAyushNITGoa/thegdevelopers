import React from 'react';
import Link from 'next/link';

// Sample project data
const projects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce solution with product management, cart, and checkout functionality.',
    tech: ['React', 'Node.js', 'MongoDB'],
    image: '/images/projects/ecommerce.jpg',
    status: 'Completed',
  },
  {
    id: 2,
    title: 'Healthcare Dashboard',
    description: 'Analytics dashboard for healthcare providers to monitor patient data and outcomes.',
    tech: ['Vue', 'Express', 'PostgreSQL'],
    image: '/images/projects/healthcare.jpg',
    status: 'In Progress',
  },
  {
    id: 3,
    title: 'Learning Management System',
    description: 'Platform for creating and delivering online courses with progress tracking.',
    tech: ['Angular', 'Django', 'MySQL'],
    image: '/images/projects/lms.jpg',
    status: 'Planning',
  },
  {
    id: 4,
    title: 'Social Media App',
    description: 'Mobile-first social networking application with real-time messaging.',
    tech: ['React Native', 'Firebase', 'GraphQL'],
    image: '/images/projects/social.jpg',
    status: 'Completed',
  },
  {
    id: 5,
    title: 'Task Management Tool',
    description: 'Collaborative project management solution for teams with Kanban boards.',
    tech: ['Next.js', 'Prisma', 'PostgreSQL'],
    image: '/images/projects/task.jpg',
    status: 'In Progress',
  },
  {
    id: 6,
    title: 'Financial Analytics Tool',
    description: 'Data visualization platform for financial metrics and investment analysis.',
    tech: ['D3.js', 'Python', 'TensorFlow'],
    image: '/images/projects/finance.jpg',
    status: 'Planning',
  },
];

// Define status badge colors
const statusColors: Record<string, string> = {
  'Completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'Planning': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
};

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Our Projects</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Explore our portfolio of successful projects and ongoing initiatives
          </p>
        </div>
        <Link
          href="/dashboard/new-project"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Create New Project
        </Link>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex items-center space-x-2">
          <label htmlFor="status-filter" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Status:
          </label>
          <select
            id="status-filter"
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            defaultValue="all"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="planning">Planning</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="tech-filter" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Technology:
          </label>
          <select
            id="tech-filter"
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            defaultValue="all"
          >
            <option value="all">All Technologies</option>
            <option value="react">React</option>
            <option value="angular">Angular</option>
            <option value="vue">Vue</option>
            <option value="node">Node.js</option>
          </select>
        </div>

        <div className="flex-grow"></div>

        <div className="flex items-center space-x-2">
          <label htmlFor="sort-by" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Sort by:
          </label>
          <select
            id="sort-by"
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            defaultValue="newest"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
              <div className="absolute top-4 right-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                  {project.status}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{project.title}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((tech, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex justify-between items-center">
                <Link
                  href={`/projects/${project.id}`}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                >
                  View Details
                </Link>
                <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex justify-center">
        <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <a
            href="#"
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <span className="sr-only">Previous</span>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </a>
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            1
          </a>
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 dark:bg-blue-900 text-sm font-medium text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800"
          >
            2
          </a>
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            3
          </a>
          <a
            href="#"
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <span className="sr-only">Next</span>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </a>
        </nav>
      </div>
    </div>
  );
}
