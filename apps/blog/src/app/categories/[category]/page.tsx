import React from "react";
import Link from "next/link";
import { getPostsByCategory } from "../../../data/posts";
import BlogSidebar from "../../../components/BlogSidebar";

export async function generateMetadata({ params }: { params: { category: string } }) {
  const category = decodeURIComponent(params.category);
  
  return {
    title: `${category} - The GDevelopers Blog`,
    description: `Articles about ${category} from The GDevelopers team`,
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = decodeURIComponent(params.category);
  const posts = getPostsByCategory(category);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Category: {category}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {posts.length > 0 ? (
              <div className="space-y-8">
                {posts.map((post) => (
                  <article key={post.id} className="border-b border-gray-200 dark:border-gray-800 pb-8">
                    <Link href={`/posts/${post.slug}`} className="group">
                      <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>By {post.author.name}</span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No posts found in this category.</p>
            )}
          </div>
          
          <div>
            <BlogSidebar />
          </div>
        </div>
      </div>
    </div>
  );
} 