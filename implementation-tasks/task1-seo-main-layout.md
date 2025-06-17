# Task 1: Implement SEO in Main App Layout

## Objective
Integrate the SEO package into the main app layout to improve search engine visibility and social sharing.

## Prerequisites
- SEO package (`packages/seo`) is available and fully implemented
- Access to the main app layout file (`apps/main/src/app/layout.tsx`)

## Implementation Steps

### 1. Import Required Components
Update the layout file to import the `MetaTags` component from the SEO package:

```tsx
import { MetaTags } from 'seo';
```

### 2. Define SEO Metadata
Define a comprehensive SEO metadata object with all necessary properties:

```tsx
const seoMetadata = {
  title: "The GDevelopers Portal",
  description: "A modern multi-app portal built with Next.js, React, TypeScript, and Tailwind CSS",
  canonical: "https://gdevelopers.com",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gdevelopers.com",
    site_name: "The GDevelopers Portal",
    title: "The GDevelopers Portal",
    description: "A modern multi-app portal built with Next.js, React, TypeScript, and Tailwind CSS",
    images: [
      {
        url: "https://gdevelopers.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The GDevelopers Portal",
      },
    ],
  },
  twitter: {
    cardType: "summary_large_image",
    site: "@gdevelopers",
    handle: "@gdevelopers",
    title: "The GDevelopers Portal",
    description: "A modern multi-app portal built with Next.js, React, TypeScript, and Tailwind CSS",
    image: "https://gdevelopers.com/twitter-image.jpg",
  },
  additionalMetaTags: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      name: "theme-color",
      content: "#ffffff",
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
      sizes: "180x180",
    },
  ],
};
```

### 3. Add MetaTags to Layout
Add the `MetaTags` component to the layout, just inside the `<body>` tag:

```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

### 4. Configure JSON-LD Structured Data
For the homepage, add appropriate JSON-LD structured data. Create a new component for the homepage:

```tsx
// apps/main/src/app/HomeStructuredData.tsx
"use client";

import { JsonLd } from 'seo';

export const HomeStructuredData = () => {
  return (
    <JsonLd
      type="WebSite"
      data={{
        name: "The GDevelopers Portal",
        url: "https://gdevelopers.com",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://gdevelopers.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
};
```

Then import and use this component in the homepage component:

```tsx
// apps/main/src/app/page.tsx
import { HomeStructuredData } from './HomeStructuredData';

export default function HomePage() {
  return (
    <>
      <HomeStructuredData />
      {/* Rest of the homepage content */}
    </>
  );
}
```

### 5. Configure Sitemap Generation
Create a `next-sitemap.config.js` file in the main app root:

```js
// apps/main/next-sitemap.config.js
import { generateSitemapConfig } from 'seo';

const config = generateSitemapConfig({
  siteUrl: 'https://gdevelopers.com',
  generateRobotsTxt: true,
  outDir: 'public',
  exclude: ['/api/*', '/private/*'],
  priority: 0.7,
  changefreq: 'weekly',
});

module.exports = config;
```

### 6. Update package.json for Sitemap Generation
Add sitemap generation to the build script in `apps/main/package.json`:

```json
{
  "scripts": {
    "build": "next build",
    "postbuild": "next-sitemap"
  }
}
```

## Testing
- Verify meta tags using browser developer tools
- Test structured data using Google's Rich Results Test (https://search.google.com/test/rich-results)
- Test OpenGraph tags using Facebook Sharing Debugger (https://developers.facebook.com/tools/debug/)
- Test Twitter Cards using Twitter Card Validator (https://cards-dev.twitter.com/validator)

## Acceptance Criteria
- All meta tags are correctly rendered in the HTML
- Structured data validates without errors
- OpenGraph and Twitter Card previews display correctly
- Sitemap generation works properly
- Robots.txt is correctly configured

## Resources
- SEO package documentation: `packages/seo/README.md`
- SEO integration guide: `packages/seo/integration-guide.md`
- Main app layout: `apps/main/src/app/layout.tsx` 