import React from 'react';
import { Organization, WebSite, WithContext } from 'schema-dts';

interface HomeStructuredDataProps {
  /**
   * The URL of the website
   */
  siteUrl: string;
  /**
   * The name of the organization
   */
  organizationName: string;
  /**
   * The logo URL of the organization
   */
  organizationLogo: string;
  /**
   * The name of the website
   */
  siteName: string;
  /**
   * The description of the website
   */
  siteDescription: string;
  /**
   * The search URL pattern of the website
   * Example: "https://example.com/search?q={search_term_string}"
   */
  searchUrl?: string;
}

/**
 * HomeStructuredData component for adding structured data to the homepage
 * 
 * This component adds JSON-LD structured data for:
 * - Organization information
 * - Website information
 * - Search action (if searchUrl is provided)
 * 
 * @example
 * ```tsx
 * <HomeStructuredData
 *   siteUrl="https://gdevelopers.com"
 *   organizationName="The GDevelopers"
 *   organizationLogo="https://gdevelopers.com/logo.png"
 *   siteName="The GDevelopers Portal"
 *   siteDescription="A platform for developers to share knowledge and collaborate"
 *   searchUrl="https://gdevelopers.com/search?q={search_term_string}"
 * />
 * ```
 */
export function HomeStructuredData({
  siteUrl,
  organizationName,
  organizationLogo,
  siteName,
  siteDescription,
  searchUrl,
}: HomeStructuredDataProps) {
  // Organization schema
  const organizationSchema: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: organizationName,
    url: siteUrl,
    logo: organizationLogo,
  };
  
  // Website schema
  const websiteSchema: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    ...(searchUrl && {
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: searchUrl,
        },
        'query-input': 'required name=search_term_string',
      },
    }),
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
} 