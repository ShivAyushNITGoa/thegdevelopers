import Link from "next/link";
import { Button } from "ui";
import { notFound } from "next/navigation";

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
      <p>Next.js comes with several built-in features that make it a great choice for building modern web applications:</p>
      
      <h3>1. Server-Side Rendering (SSR)</h3>
      <p>Next.js allows you to render your React components on the server before sending them to the client. This improves performance and SEO by ensuring that the content is available as soon as the page loads.</p>
      
      <h3>2. Static Site Generation (SSG)</h3>
      <p>With Next.js, you can pre-render your pages at build time, which can further improve performance by serving static HTML files directly from a CDN.</p>
      
      <h3>3. API Routes</h3>
      <p>Next.js provides a simple way to create API endpoints as part of your application, allowing you to build full-stack applications without needing a separate backend server.</p>
      
      <h3>4. File-Based Routing</h3>
      <p>Next.js uses a file-based routing system, where each file in the pages directory becomes a route in your application. This makes it easy to organize your code and understand the structure of your application.</p>
      
      <h2>Conclusion</h2>
      <p>Next.js is a powerful framework that makes it easy to build fast, SEO-friendly React applications. Whether you're building a simple blog or a complex web application, Next.js provides the tools and features you need to succeed.</p>
    `,
    date: "2025-06-10",
    author: "Jane Smith",
    category: "Development",
    readTime: "5 min read",
    image: "🚀"
  },
  "mastering-tailwind-css": {
    title: "Mastering Tailwind CSS",
    content: `
      <p>Tailwind CSS has revolutionized the way developers approach styling in web applications. In this article, we'll explore how to master Tailwind CSS and use it effectively in your projects.</p>
      
      <h2>What is Tailwind CSS?</h2>
      <p>Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without ever leaving your HTML. Unlike traditional CSS frameworks like Bootstrap or Foundation, Tailwind doesn't provide pre-designed components. Instead, it provides low-level utility classes that you can combine to build any design.</p>
      
      <h2>Getting Started with Tailwind CSS</h2>
      <p>To get started with Tailwind CSS, you'll need to install it in your project:</p>
      <pre><code>npm install tailwindcss
npx tailwindcss init</code></pre>
      
      <p>This will create a tailwind.config.js file in your project root, which you can use to customize Tailwind's default configuration.</p>
      
      <h2>Building with Utility Classes</h2>
      <p>Tailwind's utility classes allow you to style elements directly in your HTML. For example, to create a button with a blue background, white text, and rounded corners, you would write:</p>
      <pre><code>&lt;button class="bg-blue-500 text-white px-4 py-2 rounded"&gt;
  Click me
&lt;/button&gt;</code></pre>
      
      <h2>Responsive Design with Tailwind</h2>
      <p>Tailwind makes it easy to create responsive designs using its built-in breakpoint prefixes. For example, to make an element display as a block on small screens and as a flex container on medium screens and up, you would write:</p>
      <pre><code>&lt;div class="block md:flex"&gt;
  &lt;!-- Content --&gt;
&lt;/div&gt;</code></pre>
      
      <h2>Customizing Tailwind</h2>
      <p>One of the strengths of Tailwind is its customizability. You can extend or override Tailwind's default configuration in your tailwind.config.js file:</p>
      <pre><code>module.exports = {
  theme: {
    extend: {
      colors: {
        'brand-blue': '#1992d4',
      },
    },
  },
  variants: {},
  plugins: [],
}</code></pre>
      
      <h2>Conclusion</h2>
      <p>Tailwind CSS provides a powerful and flexible approach to styling web applications. By mastering its utility classes and customization options, you can build beautiful, responsive designs more efficiently than ever before.</p>
    `,
    date: "2025-06-08",
    author: "John Doe",
    category: "Design",
    readTime: "8 min read",
    image: "🎨"
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

  return (
    <div className="bg-white dark:bg-gray-900">
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
                  <a href="#" className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400">
                    Twitter
                  </a>
                  <a href="#" className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400">
                    Facebook
                  </a>
                  <a href="#" className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400">
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