import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { AccessibilitySetup } from "accessibility";
import { PerformanceMonitor } from "performance";
import { MetaTags } from "seo";
import { BlogJsonLd } from "seo";
import { ThemeProvider } from "ui";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Default metadata
export const metadata: Metadata = {
  title: {
    default: 'GDevelopers Blog',
    template: '%s | GDevelopers Blog',
  },
  description: 'The official blog of The GDevelopers Portal, featuring articles, tutorials, and updates.',
  metadataBase: new URL('https://gdevelopers.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gdevelopers.com/blog',
    siteName: 'GDevelopers Blog',
    title: 'GDevelopers Blog',
    description: 'The official blog of The GDevelopers Portal, featuring articles, tutorials, and updates.',
    images: [
      {
        url: 'https://gdevelopers.com/images/blog-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GDevelopers Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GDevelopers Blog',
    description: 'The official blog of The GDevelopers Portal, featuring articles, tutorials, and updates.',
    creator: '@gdevelopers',
    images: ['https://gdevelopers.com/images/blog-og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://gdevelopers.com/blog',
    types: {
      'application/rss+xml': 'https://gdevelopers.com/blog/rss.xml',
    },
  },
};

// SEO metadata
const seoMetadata = {
  title: "Blog | The GDevelopers Portal",
  description: "Latest articles, tutorials, and updates from The GDevelopers team",
  canonical: "https://gdevelopers.com/blog",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gdevelopers.com/blog",
    site_name: "The GDevelopers Portal - Blog",
    title: "Blog | The GDevelopers Portal",
    description: "Latest articles, tutorials, and updates from The GDevelopers team",
    images: [
      {
        url: "https://gdevelopers.com/images/blog-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The GDevelopers Blog",
      },
    ],
  },
  twitter: {
    cardType: "summary_large_image",
    site: "@gdevelopers",
    handle: "@gdevelopers",
    title: "Blog | The GDevelopers Portal",
    description: "Latest articles, tutorials, and updates from The GDevelopers team",
    image: "https://gdevelopers.com/images/blog-twitter-image.jpg",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        {/* SEO meta tags */}
        <MetaTags {...seoMetadata} />
        
        {/* Blog structured data */}
        <BlogJsonLd
          url="https://gdevelopers.com/blog"
          title="The GDevelopers Blog"
          images={[
            "https://gdevelopers.com/images/blog-og-image.jpg",
          ]}
          datePublished="2023-01-01T08:00:00+08:00"
          dateModified="2023-06-01T08:00:00+08:00"
          authorName="The GDevelopers Team"
          description="Latest articles, tutorials, and updates from The GDevelopers team"
        />
      </head>
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AccessibilitySetup
            skipLinks={[
              { id: 'main-content', label: 'Skip to main content' },
              { id: 'blog-navigation', label: 'Skip to blog navigation' },
            ]}
            developmentMode={process.env.NODE_ENV === 'development'}
          >
            <PerformanceMonitor 
              includeResourceTiming={true}
              includeNavigationTiming={true}
              debug={process.env.NODE_ENV === 'development'}
            >
              <header className="sticky top-0 z-10 bg-white dark:bg-gray-900">
                <nav id="blog-navigation" className="container mx-auto px-4 py-4">
                  {/* Blog navigation will go here */}
                </nav>
              </header>
              
              <main id="main-content" className="flex-grow container mx-auto px-4 py-8">
                {children}
              </main>
              
              <footer className="bg-gray-100 dark:bg-gray-800">
                <div className="container mx-auto px-4 py-8">
                  <p className="text-center text-gray-600 dark:text-gray-300">
                    © {new Date().getFullYear()} The GDevelopers Portal. All rights reserved.
                  </p>
                </div>
              </footer>
            </PerformanceMonitor>
          </AccessibilitySetup>
        </ThemeProvider>
      </body>
    </html>
  );
} 