import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header';

// Resources data
const blogPosts = [
  {
    id: 1,
    title: 'The Future of Web Development: Trends to Watch in 2023',
    excerpt: 'Explore the emerging technologies and methodologies that are shaping the future of web development.',
    image: 'https://via.placeholder.com/800x400',
    date: 'October 15, 2023',
    author: 'John Doe',
    category: 'Trends',
    link: '/blog/future-web-development-trends'
  },
  {
    id: 2,
    title: 'Optimizing Website Performance: A Comprehensive Guide',
    excerpt: 'Learn how to improve your website\'s loading speed and overall performance for better user experience and SEO.',
    image: 'https://via.placeholder.com/800x400',
    date: 'October 8, 2023',
    author: 'Jane Smith',
    category: 'Performance',
    link: '/blog/optimizing-website-performance'
  },
  {
    id: 3,
    title: 'Accessibility in Web Design: Best Practices',
    excerpt: 'Discover how to make your websites accessible to all users, including those with disabilities.',
    image: 'https://via.placeholder.com/800x400',
    date: 'September 30, 2023',
    author: 'Mike Johnson',
    category: 'Accessibility',
    link: '/blog/accessibility-best-practices'
  }
];

const guides = [
  {
    id: 1,
    title: 'Getting Started with Next.js',
    description: 'A beginner-friendly guide to building modern web applications with Next.js.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    link: '/resources/guides/nextjs-getting-started'
  },
  {
    id: 2,
    title: 'Responsive Design Fundamentals',
    description: 'Learn the core principles of creating websites that work well on all devices.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    link: '/resources/guides/responsive-design'
  },
  {
    id: 3,
    title: 'API Integration Strategies',
    description: 'Best practices for integrating third-party APIs into your web applications.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    link: '/resources/guides/api-integration'
  },
  {
    id: 4,
    title: 'SEO for Developers',
    description: 'Technical SEO implementation guide for web developers to improve search rankings.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    link: '/resources/guides/seo-for-developers'
  },
  {
    id: 5,
    title: 'Web Security Essentials',
    description: 'Protect your web applications from common security vulnerabilities with this guide.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    link: '/resources/guides/web-security'
  },
  {
    id: 6,
    title: 'Performance Optimization Techniques',
    description: 'Advanced strategies to make your web applications faster and more efficient.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    link: '/resources/guides/performance-optimization'
  }
];

const downloads = [
  {
    id: 1,
    title: 'Website Project Checklist',
    description: 'A comprehensive checklist for planning and executing web development projects.',
    fileType: 'PDF',
    fileSize: '1.2 MB',
    link: '/resources/downloads/website-project-checklist.pdf'
  },
  {
    id: 2,
    title: 'Responsive Design Templates',
    description: 'Starter templates for responsive web design projects using HTML, CSS, and JavaScript.',
    fileType: 'ZIP',
    fileSize: '3.5 MB',
    link: '/resources/downloads/responsive-templates.zip'
  },
  {
    id: 3,
    title: 'Web Accessibility Audit Tool',
    description: 'A tool to help you identify and fix accessibility issues on your website.',
    fileType: 'ZIP',
    fileSize: '2.8 MB',
    link: '/resources/downloads/accessibility-audit-tool.zip'
  },
  {
    id: 4,
    title: 'SEO Strategy Workbook',
    description: 'A workbook to help you develop and implement an effective SEO strategy.',
    fileType: 'PDF',
    fileSize: '1.5 MB',
    link: '/resources/downloads/seo-strategy-workbook.pdf'
  }
];

export const metadata = {
  title: 'Resources | GDevelopers',
  description: 'Access free web development resources, guides, and tools to help you build better websites and applications.'
};

export default function ResourcesPage() {
  return (
    <>
      <Header 
        title="Resources & Learning" 
        subtitle="Free guides, articles, and tools to help you build better web experiences" 
        height="small"
      />
      
      <div className="container mx-auto px-4 py-16">
        {/* Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            We've compiled a collection of resources to help you stay up-to-date with the latest web development 
            trends and best practices. Browse our articles, guides, and downloadable resources to enhance your skills 
            and deliver exceptional web experiences.
          </p>
        </div>
        
        {/* Latest Articles */}
        <div className="mb-24">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Latest Articles</h2>
            <Link href="/blog" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium">
              View all articles
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400">{post.category}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">By {post.author}</span>
                    <Link 
                      href={post.link} 
                      className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium"
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Guides & Tutorials */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Guides & Tutorials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <Link 
                key={guide.id} 
                href={guide.link}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex items-start"
              >
                <div className="flex-shrink-0 mr-4 text-blue-600 dark:text-blue-400">
                  {guide.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{guide.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{guide.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Downloadable Resources */}
        <div className="mb-24 bg-gray-50 dark:bg-gray-900 py-16 px-4 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Free Downloads</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {downloads.map((download) => (
              <div key={download.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{download.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{download.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{download.fileType} • {download.fileSize}</span>
                    </div>
                    <Link 
                      href={download.link} 
                      className="inline-flex items-center text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium"
                    >
                      Download
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Newsletter Signup */}
        <div className="max-w-4xl mx-auto bg-blue-600 rounded-xl overflow-hidden shadow-xl">
          <div className="px-6 py-12 md:p-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-blue-100 mb-8">
                Get the latest web development resources, tips, and tutorials delivered straight to your inbox.
              </p>
              <form className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-grow px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-600"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-blue-100 mt-4">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 