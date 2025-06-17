"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { posts, Post } from "../../data/posts";
import BlogSidebar from "../../components/BlogSidebar";
import SearchBar from "../../components/SearchBar";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchResults, setSearchResults] = useState<Post[]>([]);

  useEffect(() => {
    if (query) {
      const results = posts.filter((post) => {
        const searchContent = `${post.title} ${post.content} ${post.excerpt} ${post.categories.join(" ")} ${post.tags.join(" ")}`.toLowerCase();
        return searchContent.includes(query.toLowerCase());
      });
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Search Results</h1>
        
        <div className="mb-8">
          <SearchBar className="max-w-lg" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {query ? (
              <>
                <p className="mb-6 text-gray-600 dark:text-gray-400">
                  {searchResults.length === 0
                    ? `No results found for "${query}"`
                    : `Found ${searchResults.length} result${searchResults.length === 1 ? "" : "s"} for "${query}"`}
                </p>
                
                {searchResults.length > 0 && (
                  <div className="space-y-8">
                    {searchResults.map((post) => (
                      <article key={post.id} className="border-b border-gray-200 dark:border-gray-800 pb-8">
                        <Link href={`/posts/${post.slug}`} className="group">
                          <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {post.title}
                          </h2>
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.categories.map((category) => (
                            <Link
                              key={category}
                              href={`/categories/${encodeURIComponent(category.toLowerCase())}`}
                              className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide"
                            >
                              {category}
                            </Link>
                          ))}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <span>{post.date}</span>
                          <span className="mx-2">•</span>
                          <span>By {post.author.name}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                Enter a search term to find articles.
              </p>
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