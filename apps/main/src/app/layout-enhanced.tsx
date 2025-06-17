import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header, Footer, ThemeProvider } from "ui";
import { MetaTags } from "seo";
import { AccessibilityProvider, SkipLink } from "accessibility";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Next.js metadata (will still be used for static generation)
export const metadata: Metadata = {
  title: "The GDevelopers Portal",
  description: "A modern multi-app portal built with Next.js, React, TypeScript, and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // More comprehensive SEO metadata
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

  // For development mode only
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col`}>
        {/* Add enhanced SEO meta tags */}
        <MetaTags {...seoMetadata} />
        
        {/* Add accessibility features */}
        <AccessibilityProvider>
          {/* Skip link for keyboard users */}
          <SkipLink href="#main-content" label="Skip to main content" />
          
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex flex-col min-h-screen">
              <Header />
              {/* Add id for skip link target */}
              <main id="main-content" className="flex-grow">
                {children}
                
                {/* Add accessibility checker in development mode */}
                {isDevelopment && (
                  <div className="fixed bottom-4 right-4">
                    {/* Placeholder for AccessibilityChecker component */}
                    {/* <AccessibilityChecker /> */}
                  </div>
                )}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
} 