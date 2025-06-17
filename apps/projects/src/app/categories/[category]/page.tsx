import React from "react";
import Link from "next/link";
import { Button } from "ui";
import { getProjectsByCategory, categories } from "../../../data/projects";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const decodedCategory = decodeURIComponent(params.category);
  
  // Check if the category exists
  if (!categories.some(cat => cat.toLowerCase() === decodedCategory.toLowerCase())) {
    notFound();
  }
  
  const projects = await getProjectsByCategory(decodedCategory);
  const matchedCategory = categories.find(
    cat => cat.toLowerCase() === decodedCategory.toLowerCase()
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              {matchedCategory} Projects
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Explore our {matchedCategory.toLowerCase()} projects created by The GDevelopers team.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            <Link href="/projects" className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600">
              All
            </Link>
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/categories/${encodeURIComponent(category.toLowerCase())}`}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  category.toLowerCase() === decodedCategory.toLowerCase()
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                No projects found in this category.
              </h2>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Check back later or explore other categories.
              </p>
              <div className="mt-8">
                <Button variant="primary" asChild>
                  <Link href="/projects">View All Projects</Link>
                </Button>
              </div>
            </div>
          ) : (
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
                        <Link href={`/projects/${project.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 