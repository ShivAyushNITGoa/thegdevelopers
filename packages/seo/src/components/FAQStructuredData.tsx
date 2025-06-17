import React from 'react';
import { FAQPage, WithContext } from 'schema-dts';

export interface FAQItem {
  /**
   * The question text
   */
  question: string;
  /**
   * The answer text (can include HTML)
   */
  answer: string;
}

export interface FAQStructuredDataProps {
  /**
   * Array of FAQ items with questions and answers
   */
  items: FAQItem[];
  /**
   * Optional main entity of the page
   */
  mainEntity?: string;
}

/**
 * FAQStructuredData component for adding FAQ structured data to pages
 * 
 * This component adds JSON-LD structured data for FAQ pages, which can
 * help display FAQ content in Google search results.
 * 
 * @example
 * ```tsx
 * <FAQStructuredData
 *   items={[
 *     {
 *       question: "What is The GDevelopers Portal?",
 *       answer: "The GDevelopers Portal is a platform for developers to share knowledge and collaborate."
 *     },
 *     {
 *       question: "How do I get started?",
 *       answer: "You can get started by signing up for an account and exploring the documentation."
 *     }
 *   ]}
 * />
 * ```
 */
export function FAQStructuredData({ items, mainEntity }: FAQStructuredDataProps) {
  // Create FAQ schema
  const faqSchema: WithContext<FAQPage> = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
} 