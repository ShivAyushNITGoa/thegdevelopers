import React from 'react';
import Link from "next/link";
import { Button } from "ui";
import { posts, categories, tags } from "../data/posts";
import BlogSidebar from "../components/BlogSidebar";
import { BlogJsonLd } from 'next-seo';

export default function BlogPage() {
  // Sort posts by date (newest first)
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const featuredPost = sortedPosts[0];
  const latestPosts = sortedPosts.slice(1);

  const websiteUrl = 'https://gdevelopers.com';
  const blogUrl = `${websiteUrl}/blog`;
  
  return (
    <>
      {/* JSON-LD structured data for the blog */}
      <BlogJsonLd
        url={blogUrl}
        title="GDevelopers Blog"
        images={[
          'https://gdevelopers.com/images/blog-og-image.jpg',
        ]}
        datePublished={featuredPost.date}
        dateModified={featuredPost.date}
        authorName={featuredPost.author.name}
        description={featuredPost.excerpt}
      />
      
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Hero Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                The GDevelopers Blog
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Insights, tutorials, and updates from our team of developers and designers.
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-2">
              <Link
                href="/blog"
                className="px-4 py-2 rounded-full text-sm font-medium bg-blue-600 text-white"
              >
                All
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/categories/${encodeURIComponent(category.toLowerCase())}`}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Blog Posts */}
              <div className="lg:col-span-2">
                {/* Featured Post */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
                  <div className="md:flex">
                    <div className="md:shrink-0 flex items-center justify-center p-8 bg-blue-100 dark:bg-blue-900 md:w-48 lg:w-64">
                      <img 
                        src={featuredPost.coverImage} 
                        alt={featuredPost.title}
                        className="h-48 w-full object-cover md:h-full md:w-48"
                      />
                    </div>
                    <div className="p-8">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {featuredPost.categories.map((category) => (
                          <Link
                            key={category}
                            href={`/categories/${encodeURIComponent(category.toLowerCase())}`}
                            className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide"
                          >
                            {category}
                          </Link>
                        ))}
                      </div>
                      <Link 
                        href={`/posts/${featuredPost.slug}`}
                        className="block mt-1 text-2xl leading-tight font-bold text-gray-900 dark:text-white hover:underline"
                      >
                        {featuredPost.title}
                      </Link>
                      <p className="mt-2 text-gray-500 dark:text-gray-300">
                        {featuredPost.excerpt}
                      </p>
                      <div className="mt-4 flex items-center">
                        <img 
                          src={featuredPost.author.avatar} 
                          alt={featuredPost.author.name}
                          className="h-8 w-8 rounded-full mr-2"
                        />
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          <span>{featuredPost.author.name}</span>
                          <span className="mx-1">•</span>
                          <span>{featuredPost.date}</span>
                        </div>
                      </div>
                      <div className="mt-6">
                        <Button variant="primary" size="sm" asChild>
                          <Link href={`/posts/${featuredPost.slug}`}>
                            Read Article
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Latest Posts Grid */}
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                  Latest Articles
                </h2>
                <div className="grid gap-8 md:grid-cols-2">
                  {latestPosts.map((post) => (
                    <div 
                      key={post.id} 
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="h-40 overflow-hidden">
                        <img 
                          src={post.coverImage} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex flex-wrap gap-2 mb-2">
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
                        <Link 
                          href={`/posts/${post.slug}`}
                          className="block mt-2 text-xl font-semibold text-gray-900 dark:text-white hover:underline"
                        >
                          {post.title}
                        </Link>
                        <p className="mt-3 text-gray-500 dark:text-gray-300 text-sm">
                          {post.excerpt}
                        </p>
                        <div className="mt-4 flex items-center">
                          <img 
                            src={post.author.avatar} 
                            alt={post.author.name}
                            className="h-6 w-6 rounded-full mr-2"
                          />
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            <span>{post.author.name}</span>
                            <span className="mx-1">•</span>
                            <span>{post.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <BlogSidebar />
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">
                Subscribe to our newsletter
              </h2>
              <p className="mt-4 text-xl text-blue-100">
                Get the latest articles and insights delivered to your inbox.
              </p>
              <div className="mt-8 max-w-md mx-auto">
                <form className="sm:flex">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full px-5 py-3 placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white focus:border-white sm:max-w-xs rounded-md"
                    placeholder="Enter your email"
                  />
                  <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
                <p className="mt-3 text-sm text-blue-100">
                  We care about your data. Read our{" "}
                  <Link href="/privacy" className="font-medium text-white underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
} 