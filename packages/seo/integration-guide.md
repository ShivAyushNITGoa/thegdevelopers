# SEO Package Integration Guide

This guide explains how to integrate the SEO package into your Next.js applications for better search engine visibility and social media sharing.

## Prerequisites

- Next.js 14+ application
- Access to the SEO package in the monorepo

## Integration Steps

### 1. Add MetaTags to Layout

First, enhance your app's layout with the `MetaTags` component:

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header, Footer, ThemeProvider } from "ui";
import { MetaTags } from "seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Default metadata (used by Next.js)
export const metadata: Metadata = {
  title: "Your App Title",
  description: "Your app description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // SEO metadata (more extensive than Next.js metadata)
  const seoMetadata = {
    title: "Your App Title",
    description: "Your app description",
    canonical: "https://yoursite.com",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://yoursite.com",
      site_name: "Your Site Name",
      title: "Your App Title",
      description: "Your app description",
      images: [
        {
          url: "https://yoursite.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Your Site Name",
        },
      ],
    },
    twitter: {
      cardType: "summary_large_image",
      site: "@yoursitehandle",
      handle: "@yoursitehandle",
      title: "Your App Title",
      description: "Your app description",
      image: "https://yoursite.com/twitter-image.jpg",
    },
  };

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col`}>
        {/* Add the MetaTags component for enhanced SEO */}
        <MetaTags {...seoMetadata} />
        
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 2. Add Structured Data to Pages

Add appropriate JSON-LD structured data to your pages:

#### For Blog Posts

```tsx
// app/blog/posts/[id]/page.tsx
"use client";

import { MetaTags, ArticleJsonLd } from "seo";

export default function BlogPostPage({ params }) {
  const { id } = params;
  const post = getPostData(id); // Your function to get post data
  
  const postUrl = `https://yoursite.com/blog/posts/${id}`;
  
  return (
    <>
      <MetaTags
        title={`${post.title} | Your Blog`}
        description={post.excerpt}
        canonical={postUrl}
        openGraph={{
          type: "article",
          url: postUrl,
          title: post.title,
          description: post.excerpt,
          images: [{ url: post.featuredImage }],
          article: {
            publishedTime: post.date,
            modifiedTime: post.modifiedDate,
            authors: [post.authorUrl],
            section: post.category,
            tags: post.tags,
          },
        }}
        twitter={{
          cardType: "summary_large_image",
          title: post.title,
          description: post.excerpt,
          image: post.featuredImage,
        }}
      />
      
      <ArticleJsonLd
        url={postUrl}
        title={post.title}
        images={[post.featuredImage]}
        datePublished={post.date}
        dateModified={post.modifiedDate}
        authorName={post.author}
        description={post.excerpt}
        publisherName="Your Blog"
        publisherLogo="https://yoursite.com/logo.png"
      />
      
      {/* Your blog post content */}
    </>
  );
}
```

#### For Product Pages

```tsx
// app/products/[id]/page.tsx
"use client";

import { MetaTags, ProductJsonLd } from "seo";

export default function ProductPage({ params }) {
  const { id } = params;
  const product = getProductData(id); // Your function to get product data
  
  const productUrl = `https://yoursite.com/products/${id}`;
  
  return (
    <>
      <MetaTags
        title={`${product.name} | Your Store`}
        description={product.description}
        canonical={productUrl}
        openGraph={{
          type: "product",
          url: productUrl,
          title: product.name,
          description: product.description,
          images: [{ url: product.image }],
        }}
        twitter={{
          cardType: "summary_large_image",
          title: product.name,
          description: product.description,
          image: product.image,
        }}
      />
      
      <ProductJsonLd
        name={product.name}
        description={product.description}
        productId={product.id}
        images={[product.image]}
        brand={product.brand}
        offers={{
          price: product.price,
          priceCurrency: product.currency,
          availability: `https://schema.org/${product.availability}`,
          url: productUrl,
          seller: {
            name: "Your Store",
          },
        }}
        aggregateRating={{
          ratingValue: product.ratingValue,
          reviewCount: product.reviewCount,
        }}
      />
      
      {/* Your product page content */}
    </>
  );
}
```

### 3. Configure Sitemap Generation

Create a `next-sitemap.config.js` file in your app root:

```js
// next-sitemap.config.js
import { generateSitemapConfig } from "seo";

const config = generateSitemapConfig({
  siteUrl: "https://yoursite.com",
  generateRobotsTxt: true,
  outDir: "public",
  exclude: ["/admin/*", "/private/*"],
  priority: 0.7,
  changefreq: "weekly",
});

module.exports = config;
```

Add sitemap generation to your build script in `package.json`:

```json
{
  "scripts": {
    "build": "next build",
    "postbuild": "next-sitemap"
  }
}
```

### 4. Create Custom URLs for the Sitemap

For dynamic routes, you can generate URLs for the sitemap:

```js
// scripts/generate-sitemap-urls.js
import fs from 'fs';
import path from 'path';
import { generateUrlList } from 'seo';

async function generateSitemapUrls() {
  // Get your dynamic data
  const posts = await fetchAllBlogPosts();
  const products = await fetchAllProducts();
  
  // Generate URL lists
  const blogUrls = posts.map(post => `/blog/posts/${post.id}`);
  const productUrls = products.map(product => `/products/${product.id}`);
  
  // Create sitemap entries
  const urlList = generateUrlList(
    'https://yoursite.com',
    [
      '/',
      '/about',
      '/contact',
      '/blog',
      ...blogUrls,
      '/products',
      ...productUrls,
    ],
    {
      changefreq: 'weekly',
      priority: 0.7,
    }
  );
  
  // Write to a file that next-sitemap can use
  fs.writeFileSync(
    path.join(process.cwd(), 'public', 'sitemap-urls.json'),
    JSON.stringify(urlList)
  );
}

generateSitemapUrls();
```

## Testing SEO Implementation

After integrating the SEO package, test your implementation with these tools:

1. **Google's Rich Results Test**: https://search.google.com/test/rich-results
2. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
3. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
4. **Structured Data Testing Tool**: https://validator.schema.org/
5. **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly

## Best Practices

1. **Be specific with titles and descriptions**: Each page should have a unique, descriptive title and meta description.
2. **Use canonical URLs**: Always specify canonical URLs to avoid duplicate content issues.
3. **Optimize for social sharing**: Include Open Graph and Twitter Card metadata for better social media previews.
4. **Add structured data**: Use JSON-LD components for rich search results.
5. **Keep sitemaps updated**: Regularly update your sitemap with new content.
6. **Monitor performance**: Use Google Search Console to monitor your site's search performance.

## Troubleshooting

- **Metadata not showing in search results**: It can take time for search engines to index your changes. Use the Google Search Console URL inspection tool to request indexing.
- **Open Graph data not showing in social media previews**: Use the Facebook Sharing Debugger to fetch the latest version of your page.
- **Structured data not recognized**: Verify your structured data with Google's Rich Results Test and make necessary corrections.

## Advanced Configurations

For more advanced SEO configurations, refer to the SEO package documentation in the README.md file. 