import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <h1 className="text-9xl font-bold text-blue-600 dark:text-blue-400">404</h1>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Return Home
          </Link>
          <Link
            href="/contact"
            className="bg-white hover:bg-gray-100 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white font-medium py-2 px-4 rounded-md border border-gray-300 dark:border-gray-600 transition-colors"
          >
            Contact Support
          </Link>
        </div>
        <div className="mt-12">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Looking for something specific? Try one of these popular pages:
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Link
              href="/services"
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 text-sm"
            >
              Services
            </Link>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <Link
              href="/portfolio"
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 text-sm"
            >
              Portfolio
            </Link>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <Link
              href="/resources"
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 text-sm"
            >
              Resources
            </Link>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <Link
              href="/blog"
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 text-sm"
            >
              Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 