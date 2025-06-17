// Export types
export * from './types';

// Export components
export * from './components';

// Export utilities
export * from './utils';

// Components
export { HomeStructuredData } from './components/HomeStructuredData';
export { FAQStructuredData } from './components/FAQStructuredData';
export { ProductStructuredData } from './components/ProductStructuredData';

// Re-export from next-seo
export {
  ArticleJsonLd,
  BlogJsonLd,
  BreadcrumbJsonLd,
  CourseJsonLd,
  FAQPageJsonLd,
  JobPostingJsonLd,
  LocalBusinessJsonLd,
  LogoJsonLd,
  ProductJsonLd,
  SocialProfileJsonLd,
  DefaultSeo,
  NextSeo,
} from 'next-seo';

// Types
export type { HomeStructuredDataProps } from './types';
export type { FAQItem, FAQStructuredDataProps } from './components/FAQStructuredData';
export type { ProductStructuredDataProps } from './components/ProductStructuredData'; 