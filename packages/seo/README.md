# SEO Package

A comprehensive SEO package for The GDevelopers Portal, providing components and utilities to optimize your applications for search engines and social media sharing.

## Features

- **Structured Data**: JSON-LD components for various content types
- **Meta Tags**: Enhanced meta tags for better SEO
- **OpenGraph Support**: Optimized social media previews
- **Twitter Cards**: Twitter-specific preview optimization
- **Sitemap Generation**: Configuration for generating sitemaps
- **Robots.txt**: Configuration for search engine crawling

## Installation

```bash
npm install seo
```

## Usage

### Basic Setup

To set up basic SEO features, use the `DefaultSeo` component:

```tsx
import { DefaultSeo } from 'seo';

function App({ children }) {
  return (
    <>
      <DefaultSeo
        title="The GDevelopers Portal"
        description="A platform for developers to share knowledge and collaborate"
        canonical="https://gdevelopers.com"
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: 'https://gdevelopers.com',
          siteName: 'The GDevelopers Portal',
          title: 'The GDevelopers Portal',
          description: 'A platform for developers to share knowledge and collaborate',
          images: [
            {
              url: 'https://gdevelopers.com/og-image.jpg',
              width: 1200,
              height: 630,
              alt: 'The GDevelopers Portal',
            },
          ],
        }}
        twitter={{
          handle: '@gdevelopers',
          site: '@gdevelopers',
          cardType: 'summary_large_image',
        }}
      />
      {children}
    </>
  );
}
```

### Page-Specific SEO

For page-specific SEO, use the `NextSeo` component:

```tsx
import { NextSeo } from 'seo';

function AboutPage() {
  return (
    <>
      <NextSeo
        title="About Us | The GDevelopers Portal"
        description="Learn more about The GDevelopers Portal team and our mission"
        canonical="https://gdevelopers.com/about"
        openGraph={{
          url: 'https://gdevelopers.com/about',
          title: 'About Us | The GDevelopers Portal',
          description: 'Learn more about The GDevelopers Portal team and our mission',
        }}
      />
      <h1>About Us</h1>
      {/* Page content */}
    </>
  );
}
```

### Structured Data

#### HomeStructuredData

Add structured data to your homepage:

```tsx
import { HomeStructuredData } from 'seo';

function HomePage() {
  return (
    <>
      <HomeStructuredData
        siteUrl="https://gdevelopers.com"
        organizationName="The GDevelopers"
        organizationLogo="https://gdevelopers.com/logo.png"
        siteName="The GDevelopers Portal"
        siteDescription="A platform for developers to share knowledge and collaborate"
        searchUrl="https://gdevelopers.com/search?q={search_term_string}"
      />
      <h1>Welcome to The GDevelopers Portal</h1>
      {/* Page content */}
    </>
  );
}
```

#### ArticleJsonLd

Add structured data to your blog posts:

```tsx
import { ArticleJsonLd } from 'seo';

function BlogPostPage({ post }) {
  return (
    <>
      <ArticleJsonLd
        url={`https://gdevelopers.com/blog/${post.slug}`}
        title={post.title}
        images={[post.coverImage]}
        datePublished={post.publishedAt}
        dateModified={post.updatedAt}
        authorName={post.author.name}
        description={post.description}
        publisherName="The GDevelopers"
        publisherLogo="https://gdevelopers.com/logo.png"
      />
      <h1>{post.title}</h1>
      {/* Post content */}
    </>
  );
}
```

#### BlogJsonLd

Add structured data to your blog listing page:

```tsx
import { BlogJsonLd } from 'seo';

function BlogIndexPage() {
  return (
    <>
      <BlogJsonLd
        url="https://gdevelopers.com/blog"
        title="The GDevelopers Blog"
        images={['https://gdevelopers.com/blog/og-image.jpg']}
        datePublished="2023-01-01T00:00:00.000Z"
        dateModified="2023-06-01T00:00:00.000Z"
        authorName="The GDevelopers Team"
        description="Latest articles, tutorials, and updates from The GDevelopers team"
      />
      <h1>Blog</h1>
      {/* Blog posts listing */}
    </>
  );
}
```

#### FAQStructuredData

Add structured data to your FAQ page:

```tsx
import { FAQStructuredData } from 'seo';

function FAQPage() {
  const faqItems = [
    {
      question: "What is The GDevelopers Portal?",
      answer: "The GDevelopers Portal is a platform for developers to share knowledge and collaborate."
    },
    {
      question: "How do I get started?",
      answer: "You can get started by signing up for an account and exploring the documentation."
    },
  ];
  
  return (
    <>
      <FAQStructuredData items={faqItems} />
      <h1>Frequently Asked Questions</h1>
      {/* FAQ content */}
    </>
  );
}
```

#### ProductStructuredData

Add structured data to your product pages:

```tsx
import { ProductStructuredData } from 'seo';

function ProductPage({ product }) {
  return (
    <>
      <ProductStructuredData
        name={product.name}
        description={product.description}
        productUrl={`https://gdevelopers.com/products/${product.slug}`}
        images={[product.image]}
        brand="GDevelopers"
        sku={product.sku}
        price={product.price}
        priceCurrency="USD"
        availability={product.inStock ? 'InStock' : 'OutOfStock'}
        rating={product.rating && {
          ratingValue: product.rating.average,
          bestRating: 5,
          reviewCount: product.rating.count,
        }}
      />
      <h1>{product.name}</h1>
      {/* Product content */}
    </>
  );
}
```

### Sitemap Generation

Create a `next-sitemap.config.js` file in your project root:

```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://gdevelopers.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    additionalSitemaps: [
      'https://gdevelopers.com/blog/sitemap.xml',
      'https://gdevelopers.com/products/sitemap.xml',
    ],
  },
  exclude: ['/admin/*', '/api/*'],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  generateIndexSitemap: true,
  outDir: 'public',
  transform: async (config, path) => {
    // Custom transform function
    if (path.startsWith('/blog/')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }
    
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
```

Then, add the sitemap generation script to your `package.json`:

```json
{
  "scripts": {
    "postbuild": "next-sitemap"
  }
}
```

## API Reference

### HomeStructuredData

| Prop | Type | Description |
|------|------|-------------|
| siteUrl | string | The URL of the website |
| organizationName | string | The name of the organization |
| organizationLogo | string | The logo URL of the organization |
| siteName | string | The name of the website |
| siteDescription | string | The description of the website |
| searchUrl | string (optional) | The search URL pattern of the website |

### FAQStructuredData

| Prop | Type | Description |
|------|------|-------------|
| items | FAQItem[] | Array of FAQ items with questions and answers |
| mainEntity | string (optional) | Optional main entity of the page |

### ProductStructuredData

| Prop | Type | Description |
|------|------|-------------|
| name | string | The name of the product |
| description | string | The description of the product |
| productUrl | string | The URL of the product page |
| images | string[] | The images of the product |
| brand | string | The brand of the product |
| sku | string (optional) | The SKU of the product |
| mpn | string (optional) | The MPN of the product |
| price | number (optional) | The price of the product |
| priceCurrency | string (optional) | The currency of the price |
| availability | 'InStock' \| 'OutOfStock' \| 'PreOrder' (optional) | The availability status |
| rating | object (optional) | The rating of the product |

### DefaultSeo

See [next-seo documentation](https://github.com/garmeeh/next-seo#default-seo-configuration) for full API reference.

### NextSeo

See [next-seo documentation](https://github.com/garmeeh/next-seo#nextseo-options) for full API reference.

## Best Practices

1. **Use descriptive titles and meta descriptions** that accurately reflect the content of the page.

2. **Add structured data** to help search engines understand your content better.

3. **Optimize for social sharing** with OpenGraph and Twitter Card meta tags.

4. **Create a sitemap** to help search engines discover and index your pages.

5. **Use canonical URLs** to avoid duplicate content issues.

6. **Implement proper heading structure** with H1, H2, H3, etc.

7. **Optimize images** with descriptive alt text and appropriate file sizes.

8. **Make your site mobile-friendly** as mobile-friendliness is a ranking factor.

9. **Improve page speed** as it affects both user experience and search rankings.

10. **Monitor your SEO performance** using tools like Google Search Console.

## SEO Checklist

- [ ] Page has a unique, descriptive title (50-60 characters)
- [ ] Page has a meta description (150-160 characters)
- [ ] Page has appropriate structured data
- [ ] Page has OpenGraph and Twitter Card meta tags
- [ ] Page has a canonical URL
- [ ] Page has proper heading structure (H1, H2, H3, etc.)
- [ ] Images have descriptive alt text
- [ ] Page is mobile-friendly
- [ ] Page loads quickly
- [ ] Page is included in the sitemap
- [ ] Page is not blocked by robots.txt

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 