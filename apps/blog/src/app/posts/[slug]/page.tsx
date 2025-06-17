import type { Metadata } from 'next';
import { ArticleJsonLd } from 'seo';
import { MetaTags } from 'seo';

interface BlogPostParams {
  params: {
    slug: string;
  };
}

// This would typically come from a CMS or API
const getBlogPost = async (slug: string) => {
  // Mock data for demonstration
  return {
    title: `Blog Post: ${slug}`,
    description: `This is a sample blog post about ${slug}`,
    content: `<p>This is the content of the blog post about ${slug}. It would typically be much longer and contain rich text content.</p>`,
    author: {
      name: 'John Doe',
      image: 'https://gdevelopers.com/images/authors/john-doe.jpg',
    },
    image: 'https://gdevelopers.com/images/blog/post-image.jpg',
    date: '2023-06-01T09:00:00.000Z',
    updatedAt: '2023-06-02T10:00:00.000Z',
    tags: ['web development', 'next.js', 'react'],
    category: 'Web Development',
  };
};

// Generate metadata for the page
export async function generateMetadata({ params }: BlogPostParams): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  
  return {
    title: `${post.title} | The GDevelopers Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default async function BlogPost({ params }: BlogPostParams) {
  const post = await getBlogPost(params.slug);
  const postUrl = `https://gdevelopers.com/blog/posts/${params.slug}`;
  
  const seoMetadata = {
    title: `${post.title} | The GDevelopers Blog`,
    description: post.description,
    canonical: postUrl,
    openGraph: {
      type: "article",
      locale: "en_US",
      url: postUrl,
      title: post.title,
      description: post.description,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
      modifiedTime: post.updatedAt,
      section: post.category,
      tags: post.tags,
      authors: [post.author.name],
    },
    twitter: {
      cardType: "summary_large_image",
      site: "@gdevelopers",
      handle: "@gdevelopers",
      title: post.title,
      description: post.description,
      image: post.image,
    },
  };
  
  return (
    <>
      {/* Client-side SEO - supplements server-side metadata */}
      <MetaTags {...seoMetadata} />
      
      {/* Article structured data for rich search results */}
      <ArticleJsonLd
        type="BlogPosting"
        url={postUrl}
        title={post.title}
        images={[post.image]}
        datePublished={post.date}
        dateModified={post.updatedAt}
        authorName={[post.author.name]}
        publisherName="The GDevelopers"
        publisherLogo="https://gdevelopers.com/images/logo.png"
        description={post.description}
      />
      
      <article className="prose dark:prose-invert lg:prose-xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          
          <div className="flex items-center mb-4">
            <img 
              src={post.author.image} 
              alt={post.author.name}
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <p className="font-medium">{post.author.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-auto rounded-lg"
          />
        </header>
        
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        
        <footer className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last updated on {new Date(post.updatedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </footer>
 