"use client";

import Link from "next/link";
import { Button } from "ui";
import { notFound } from "next/navigation";
import { MetaTags, ArticleJsonLd } from "seo";

// Mock blog post data
const blogPosts = {
  "getting-started-with-nextjs": {
    title: "Getting Started with Next.js",
    content: `
      <p>Next.js is a powerful React framework that makes building web applications easier and more efficient. In this guide, we'll walk through the basics of setting up a Next.js project and explore its key features.</p>
      
      <h2>Setting Up Your First Next.js Project</h2>
      <p>To get started with Next.js, you'll need to have Node.js installed on your machine. Once you have Node.js, you can create a new Next.js project using the following command:</p>
      <pre><code>npx create-next-app@latest my-next-app</code></pre>
      
      <p>This command sets up a new Next.js project with all the necessary dependencies and configuration files. Once the installation is complete, you can navigate to the project directory and start the development server:</p>
      <pre><code>cd my-next-app
npm run dev</code></pre>

      <h2>Key Features of Next.js</h2>
      <p>Next.js comes with several built-in features that make it a great choice for building modern web applications.</p>
    `,
    excerpt: "Learn how to set up your first Next.js project and discover its key features for building modern web applications.",
    date: "2025-06-10",
    modifiedDate: "2025-06-12",
    author: "Jane Smith",
    authorUrl: "https://gdevelopers.com/team/jane-smith",
    category: "Development",
    tags: ["Next.js", "React", "JavaScript", "Web Development"],
    readTime: "5 min read",
    image: "🚀",
    featuredImage: "https://gdevelopers.com/images/blog/nextjs-featured.jpg"
  },
  "mastering-tailwind-css": {
    title: "Mastering Tailwind CSS",
    content: `
      <p>Tailwind CSS has revolutionized the way developers approach styling in web applications. In this article, we'll explore how to master Tailwind CSS and use it effectively in your projects.</p>
      
      <h2>What is Tailwind CSS?</h2>
      <p>Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without ever leaving your HTML. Unlike traditional CSS frameworks like Bootstrap or Foundation, Tailwind doesn't provide pre-designed components. Instead, it provides low-level utility classes that you can combine to build any design.</p>
    `,
    excerpt: "Discover how to effectively use Tailwind CSS's utility-first approach to build beautiful, responsive designs more efficiently.",
    date: "2025-06-08",
    modifiedDate: "2025-06-09",
    author: "John Doe",
    authorUrl: "https://gdevelopers.com/team/john-doe",
    category: "Design",
    tags: ["CSS", "Tailwind", "Web Design", "Frontend"],
    readTime: "8 min read",
    image: "🎨",
    featuredImage: "https://gdevelopers.com/images/blog/tailwind-featured.jpg"
  }
};

type Props = {
  params: {
    id: string;
  };
};

export default function BlogPostPage({ params }: Props) {
  const { id } = params;
  const post = blogPosts[id as keyof typeof blogPosts];

  if (!post) {
    notFound();
  }

  // Create excerpt from content if not provided
  const excerpt = post.excerpt || post.content.replace(/<[^>]*>/g, '').slice(0, 160).trim() + '...';
  
  // Base URL for canonical links and metadata
  const baseUrl = "https://gdevelopers.com";
  const postUrl = `${baseUrl}/blog/posts/${id}`;

  // SEO metadata for this specific blog post
  const seoMetadata = {
    title: `${post.title} | GDevelopers Blog`,
    description: excerpt,
    canonical: postUrl,
    openGraph: {
      type: "article",
      url: postUrl,
      title: post.title,
      description: excerpt,
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      site_name: "GDevelopers Blog",
      article: {
        publishedTime: post.date,
        modifiedTime: post.modifiedDate,
        authors: [post.authorUrl],
        section: post.category,
        tags: post.tags,
      },
    },
    twitter: {
      cardType: "summary_large_image",
      site: "@gdevelopers",
      handle: "@gdevelopers",
      title: post.title,
      description: excerpt,
      image: post.featuredImage,
    },
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Add SEO components */}
      <MetaTags {...seoMetadata} />
      
      <ArticleJsonLd
        url={postUrl}
        title={post.title}
        images={[post.featuredImage]}
        datePublished={post.date}
        dateModified={post.modifiedDate}
        authorName={post.author}
        description={excerpt}
        publisherName="GDevelopers"
        publisherLogo={`${baseUrl}/logo.png`}
      />

      {/* Hero Section */}
      <section className="py-16 bg-blue-50 dark:bg-blue-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8">
            <span className="text-6xl">{post.image}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900 dark:text-white mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center text-gray-600 dark:text-gray-300 space-x-4 mb-8">
            <div>{post.author}</div>
            <div>•</div>
            <div>{post.date}</div>
            <div>•</div>
            <div>{post.category}</div>
            <div>•</div>
            <div>{post.readTime}</div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {post.tags && post.tags.map(tag => (
              <span 
                key={tag} 
                className="inline-block bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 text-xs px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="mb-4 sm:mb-0">
                <span className="text-gray-600 dark:text-gray-300">Share this article:</span>
                <div className="flex space-x-4 mt-2">
                  <a 
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    Twitter
                  </a>
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    Facebook
                  </a>
                  <a 
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
              <Button variant="outline" asChild>
                <Link href="/blog">
                  Back to Blog
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Related Articles
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(blogPosts)
              .filter(([key]) => key !== id)
              .slice(0, 3)
              .map(([key, relatedPost]) => (
                <div 
                  key={key} 
                  className="bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-40 bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <span className="text-5xl">{relatedPost.image}</span>
                  </div>
                  <div className="p-6">
                    <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                      {relatedPost.category}
                    </div>
                    <Link 
                      href={`/blog/posts/${key}`}
                      className="block mt-2 text-xl font-semibold text-gray-900 dark:text-white hover:underline"
                    >
                      {relatedPost.title}
                    </Link>
                    <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>{relatedPost.author}</span>
                      <span className="mx-1">•</span>
                      <span>{relatedPost.date}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
} 