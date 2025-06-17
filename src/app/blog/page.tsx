import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Blog | GDevelopers',
  description: 'Latest news, articles, and insights from the GDevelopers team.'
};

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: 'The Future of Web Development: Trends to Watch in 2023',
    excerpt: 'Explore the upcoming trends in web development that are set to redefine the digital landscape in 2023 and beyond.',
    date: 'June 15, 2023',
    author: 'Alex Johnson',
    category: 'Web Development',
    readTime: '5 min read',
    slug: 'future-web-development-trends-2023'
  },
  {
    id: 2,
    title: 'Optimizing React Applications for Maximum Performance',
    excerpt: 'Learn essential techniques to improve the performance of your React applications and deliver a smoother user experience.',
    date: 'May 22, 2023',
    author: 'Sarah Chen',
    category: 'React',
    readTime: '8 min read',
    slug: 'optimizing-react-applications-performance'
  },
  {
    id: 3,
    title: 'Building Accessible Web Applications: A Complete Guide',
    excerpt: 'Discover how to create web applications that are accessible to all users, including those with disabilities.',
    date: 'April 10, 2023',
    author: 'Michael Rodriguez',
    category: 'Accessibility',
    readTime: '10 min read',
    slug: 'building-accessible-web-applications'
  },
  {
    id: 4,
    title: 'Getting Started with Next.js 13: Key Features and Benefits',
    excerpt: 'An in-depth look at Next.js 13 and how it can help you build better web applications with less effort.',
    date: 'March 5, 2023',
    author: 'Emma Wilson',
    category: 'Next.js',
    readTime: '7 min read',
    slug: 'getting-started-nextjs-13'
  },
  {
    id: 5,
    title: 'The Importance of Performance Monitoring in Modern Web Apps',
    excerpt: 'Why monitoring performance metrics is crucial for the success of your web application and how to implement it effectively.',
    date: 'February 18, 2023',
    author: 'David Kim',
    category: 'Performance',
    readTime: '6 min read',
    slug: 'importance-performance-monitoring'
  },
  {
    id: 6,
    title: 'Introduction to TypeScript for JavaScript Developers',
    excerpt: 'A beginner-friendly guide to TypeScript and how it can improve your JavaScript development workflow.',
    date: 'January 29, 2023',
    author: 'Priya Patel',
    category: 'TypeScript',
    readTime: '9 min read',
    slug: 'introduction-typescript-for-javascript-developers'
  }
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Stay updated with the latest insights, tutorials, and news from the GDevelopers team.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="p-6">
              <div className="flex items-center text-sm mb-2">
                <span className="text-blue-600 font-medium">{post.category}</span>
                <span className="mx-2">•</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-xl font-bold mb-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
                  <span className="text-sm">{post.author}</span>
                </div>
                <span className="text-sm text-gray-500">{post.date}</span>
              </div>
            </div>
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
              <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-6">Subscribe to Our Newsletter</h2>
        <p className="max-w-2xl mx-auto mb-6">
          Get the latest blog posts and news delivered to your inbox.
        </p>
        <form className="max-w-md mx-auto flex">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-grow px-4 py-2 rounded-l-md border border-r-0 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
} 