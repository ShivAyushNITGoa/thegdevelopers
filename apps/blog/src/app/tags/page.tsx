import React from "react";
import Link from "next/link";
import { tags } from "../../data/posts";
import BlogSidebar from "../../components/BlogSidebar";

export const metadata = {
  title: "Tags - The GDevelopers Blog",
  description: "Browse articles by tags on The GDevelopers Blog",
};

export default function TagsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">All Tags</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="flex flex-wrap gap-4">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
                  className="inline-block bg-gray-200 dark:bg-gray-700 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  <span className="text-lg font-medium">{tag}</span>
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <BlogSidebar />
          </div>
        </div>
      </div>
    </div>
  );
} 