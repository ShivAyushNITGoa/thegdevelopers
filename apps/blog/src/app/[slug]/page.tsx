import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleJsonLd } from 'next-seo';

// Mock blog post data - in a real app, this would come from a CMS or API
const blogPosts = [
  {
    slug: 'getting-started',
    title: 'Getting Started with The GDevelopers Portal',
    description: 'Learn how to get started with The GDevelopers Portal and make the most of its features.',
    content: 'This is the content of the blog post...',
    publishedAt: '2023-05-15T10:00:00.000Z',
    updatedAt: '2023-05-16T14:30:00.000Z',
    author: {
      name: 'GDevelopers Team',
      url: 'https://gdevelopers.com/team',
    },
    coverImage: 'https://gdevelopers.com/images/blog/getting-started.jpg',
    tags: ['tutorial', 'beginners'],
  },
  {
    slug: 'advanced-features',
    title: 'Advanced Features of The GDevelopers Portal',
    description: 'Discover the advanced features of The GDevelopers Portal and how to use them effectively.',
    content: 'This is the content of the blog post...',
    publishedAt: '2023-06-20T09:30:00.000Z',
    updatedAt: '2023-06-21T11:45:00.000Z',
    author: {
      name: 'GDevelopers Team',
      url: 'https://gdevelopers.com/team',
    },
    coverImage: 'https://gdevelopers.com/images/blog/advanced-features.jpg',
    tags: ['advanced', 'features'],
  },
];

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((post) => post.slug === params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
  
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.url],
      tags: post.tags,
      images: [
        {
          url: post.coverImage,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.coverImage],
    },
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((post) => post.slug === params.slug);
  
  // If post not found, return 404
  if (!post) {
    notFound();
  }
  
  const websiteUrl = 'https://gdevelopers.com';
  const postUrl = `${websiteUrl}/blog/${post.slug}`;
  
  return (
    <>
      {/* JSON-LD structured data for the article */}
      <ArticleJsonLd
        type="BlogPosting"
        url={postUrl}
        title={post.title}
        images={[post.coverImage]}
        datePublished={post.publishedAt}
        dateModified={post.updatedAt}
        authorName={post.author.name}
        description={post.description}
        publisherName="The GDevelopers"
        publisherLogo="https://gdevelopers.com/logo.png"
      />
      
      <article className="blog-post">
        <header>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center text-gray-600 mb-6">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span className="mx-2">•</span>
            <span>By {post.author.name}</span>
          </div>
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        </header>
        
        <div className="prose max-w-none">
          {post.content}
        </div>
        
        <footer className="mt-8 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </footer>
      </article>
    </>
  );
} 