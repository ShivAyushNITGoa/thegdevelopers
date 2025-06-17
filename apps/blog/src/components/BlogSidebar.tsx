"use client";

import React from "react";
import Link from "next/link";
import { categories, tags } from "../data/posts";
import SearchBar from "./SearchBar";

export default function BlogSidebar() {
  return (
    <aside className="space-y-8">
      {/* Search Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Search
        </h3>
        <SearchBar />
      </div>
      
      {/* Categories Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Categories
        </h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category}>
              <Link
                href={`/categories/${encodeURIComponent(category.toLowerCase())}`}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Tags Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
              className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
} 