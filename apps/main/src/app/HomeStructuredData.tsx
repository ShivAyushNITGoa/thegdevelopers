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
        publisher: {
          "@type": "Organization",
          name: "GDevelopers",
          logo: {
            "@type": "ImageObject",
            url: "https://gdevelopers.com/logo.png",
          }
        }
      }}
    />
  );
}; 