import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
              GDevelopers
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-md">
              A modern multi-app portal built with Next.js, React, TypeScript, and Tailwind CSS.
              Designed for scalability and developer experience.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Platform
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/" className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Team
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Connect
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/contact" className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
          <p className="text-base text-gray-500 dark:text-gray-400 text-center">
            &copy; {new Date().getFullYear()} GDevelopers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}; 