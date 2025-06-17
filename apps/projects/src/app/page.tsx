import React from "react";
import Link from "next/link";
import { Button } from "ui";

// Sample project data
const projects = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform built with Next.js, React, and Stripe.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3",
    category: "Web Development",
    technologies: ["Next.js", "React", "TypeScript", "Stripe", "Tailwind CSS"],
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b",
    category: "Web Application",
    technologies: ["React", "Firebase", "Material UI", "Redux"],
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: "3",
    title: "Mobile Fitness Tracker",
    description: "A cross-platform mobile app for tracking workouts and nutrition.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211",
    category: "Mobile Development",
    technologies: ["React Native", "Expo", "Firebase", "Redux"],
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: "4",
    title: "AI Content Generator",
    description: "An AI-powered tool for generating marketing content and blog posts.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    category: "AI/ML",
    technologies: ["Python", "TensorFlow", "OpenAI API", "Flask"],
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: "5",
    title: "Real Estate Marketplace",
    description: "A platform for buying, selling, and renting properties with virtual tours.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
    category: "Web Development",
    technologies: ["Next.js", "MongoDB", "Express", "Three.js"],
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: "6",
    title: "Social Media Dashboard",
    description: "A dashboard for managing and analyzing social media accounts.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7",
    category: "Data Visualization",
    technologies: ["React", "D3.js", "Node.js", "Social Media APIs"],
    demoUrl: "#",
    repoUrl: "#",
  },
];

// Project categories
const categories = Array.from(new Set(projects.map((project) => project.category)));

export default function ProjectsPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              Our Projects
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Explore the innovative projects created by The GDevelopers team.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            <button className="px-4 py-2 rounded-full text-sm font-medium bg-blue-600 text-white">
              All
            </button>
            {categories.map((category, index) => (
              <button
                key={index}
                className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                    {project.category}
                  </div>
                  <Link
                    href={`/projects/${project.id}`}
                    className="block mt-2 text-xl font-semibold text-gray-900 dark:text-white hover:underline"
                  >
                    {project.title}
                  </Link>
                  <p className="mt-3 text-gray-500 dark:text-gray-300 text-sm">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="inline-block bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 text-xs text-gray-700 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="inline-block bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 text-xs text-gray-700 dark:text-gray-300">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="mt-6 flex space-x-2">
                    <Button variant="primary" size="sm" asChild>
                      <Link href={project.demoUrl}>View Demo</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={project.repoUrl}>Source Code</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              Have a project in mind?
            </h2>
            <p className="mt-4 text-xl text-blue-100">
              Let's work together to bring your ideas to life.
            </p>
            <div className="mt-8">
              <Button variant="white" size="lg" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 