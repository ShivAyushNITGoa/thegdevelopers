import React from "react";
import Link from "next/link";
import { Button } from "ui";
import { notFound } from "next/navigation";

// Sample project data (would typically come from a database or API)
const projects = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform built with Next.js, React, and Stripe.",
    fullDescription: `
      This comprehensive e-commerce platform provides businesses with a complete solution for selling products online. 
      
      Key features include:
      • Responsive product catalog with advanced filtering
      • Secure checkout process with Stripe integration
      • User authentication and account management
      • Order tracking and history
      • Admin dashboard for inventory management
      • Analytics and reporting tools
      
      The platform is built with performance and scalability in mind, utilizing Next.js for server-side rendering and optimized client-side navigation. The codebase follows best practices for maintainability and extensibility.
    `,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3",
    gallery: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
      "https://images.unsplash.com/photo-1556740758-90de374c12ad",
    ],
    category: "Web Development",
    technologies: ["Next.js", "React", "TypeScript", "Stripe", "Tailwind CSS", "MongoDB", "Redux"],
    features: [
      "Responsive design",
      "Server-side rendering",
      "Secure payment processing",
      "User authentication",
      "Product search and filtering",
      "Admin dashboard",
    ],
    demoUrl: "#",
    repoUrl: "#",
    clientName: "RetailTech Inc.",
    completionDate: "March 2023",
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates.",
    fullDescription: `
      This collaborative task management application helps teams organize and track their work efficiently. The app features real-time updates, allowing team members to see changes as they happen.
      
      Key features include:
      • Task creation, assignment, and tracking
      • Project organization with boards and lists
      • Real-time collaboration and updates
      • File attachments and comments
      • Due date reminders and notifications
      • Time tracking and reporting
      
      Built with React and Firebase, the application provides a smooth and responsive user experience with instant data synchronization across devices.
    `,
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b",
    gallery: [
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b",
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d",
      "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23",
    ],
    category: "Web Application",
    technologies: ["React", "Firebase", "Material UI", "Redux", "Node.js", "Express"],
    features: [
      "Drag-and-drop interface",
      "Real-time updates",
      "User permissions",
      "File attachments",
      "Activity tracking",
      "Mobile responsive design",
    ],
    demoUrl: "#",
    repoUrl: "#",
    clientName: "ProductivityPro LLC",
    completionDate: "November 2022",
  },
  // Additional projects would be defined here
];

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                {project.category}
              </div>
              <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                {project.title}
              </h1>
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
                {project.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 text-sm text-gray-700 dark:text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex space-x-4">
                <Button variant="primary" size="lg" asChild>
                  <Link href={project.demoUrl}>View Demo</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href={project.repoUrl}>Source Code</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Project Overview
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {project.fullDescription.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-600 dark:text-gray-300">
                    {paragraph}
                  </p>
                ))}
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
                Key Features
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-3 text-gray-600 dark:text-gray-300"
                  >
                    <svg
                      className="h-5 w-5 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
                Gallery
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {project.gallery.map((image, index) => (
                  <div key={index} className="rounded-lg overflow-hidden shadow-md">
                    <img
                      src={image}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Project Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Client
                    </h4>
                    <p className="text-base text-gray-900 dark:text-white">
                      {project.clientName}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Completion Date
                    </h4>
                    <p className="text-base text-gray-900 dark:text-white">
                      {project.completionDate}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Category
                    </h4>
                    <p className="text-base text-gray-900 dark:text-white">
                      {project.category}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="inline-block bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 text-xs text-gray-700 dark:text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Interested in this project?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Contact us to learn more about how we can help with your next project.
                </p>
                <Button variant="primary" className="w-full" asChild>
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Related Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects
              .filter((p) => p.id !== project.id)
              .slice(0, 3)
              .map((relatedProject) => (
                <div
                  key={relatedProject.id}
                  className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={relatedProject.image}
                      alt={relatedProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                      {relatedProject.category}
                    </div>
                    <Link
                      href={`/projects/${relatedProject.id}`}
                      className="block mt-2 text-xl font-semibold text-gray-900 dark:text-white hover:underline"
                    >
                      {relatedProject.title}
                    </Link>
                    <p className="mt-3 text-gray-500 dark:text-gray-300 text-sm">
                      {relatedProject.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
} 