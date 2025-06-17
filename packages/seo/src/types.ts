// SEO Types

// Meta Tags Types
export interface MetaTagsProps {
  title: string;
  description: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  openGraph?: OpenGraphProps;
  twitter?: TwitterCardProps;
  additionalMetaTags?: MetaTag[];
  additionalLinkTags?: LinkTag[];
}

export interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}

export interface LinkTag {
  rel: string;
  href: string;
  sizes?: string;
  type?: string;
  color?: string;
  as?: string;
  crossOrigin?: string;
}

// Open Graph Types
export interface OpenGraphProps {
  url?: string;
  type?: string;
  title?: string;
  description?: string;
  images?: OpenGraphImage[];
  site_name?: string;
  locale?: string;
  profile?: OpenGraphProfile;
  book?: OpenGraphBook;
  article?: OpenGraphArticle;
  video?: OpenGraphVideo;
}

export interface OpenGraphImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  secureUrl?: string;
  type?: string;
}

export interface OpenGraphProfile {
  firstName?: string;
  lastName?: string;
  username?: string;
  gender?: string;
}

export interface OpenGraphBook {
  authors?: string[];
  isbn?: string;
  releaseDate?: string;
  tags?: string[];
}

export interface OpenGraphArticle {
  publishedTime?: string;
  modifiedTime?: string;
  expirationTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
}

export interface OpenGraphVideo {
  actors?: OpenGraphVideoActor[];
  directors?: string[];
  writers?: string[];
  duration?: number;
  releaseDate?: string;
  tags?: string[];
}

export interface OpenGraphVideoActor {
  profile: string;
  role?: string;
}

// Twitter Card Types
export interface TwitterCardProps {
  cardType?: 'summary' | 'summary_large_image' | 'app' | 'player';
  site?: string;
  handle?: string;
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
}

// JSON-LD Types
export interface JsonLdProps {
  type: 'Article' | 'BreadcrumbList' | 'FAQPage' | 'Event' | 'JobPosting' | 'LocalBusiness' | 'Organization' | 'Person' | 'Product' | 'Recipe' | 'WebPage' | 'WebSite';
  data: any;
}

// Sitemap Types
export interface SitemapConfig {
  siteUrl: string;
  generateRobotsTxt?: boolean;
  outDir?: string;
  exclude?: string[];
  alternateRefs?: AlternateRef[];
  priority?: number;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

export interface AlternateRef {
  href: string;
  hreflang: string;
}

// Robots.txt Types
export interface RobotsTxtConfig {
  policies?: RobotsPolicy[];
  additionalSitemaps?: string[];
}

export interface RobotsPolicy {
  userAgent: string;
  allow?: string[];
  disallow?: string[];
}

// Canonical URL Types
export interface CanonicalProps {
  url: string;
}

// Structured Data Types
export interface StructuredDataProps {
  data: any;
}

/**
 * Props for the HomeStructuredData component
 */
export interface HomeStructuredDataProps {
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
 * Props for the ArticleStructuredData component
 */
export interface ArticleStructuredDataProps {
  /**
   * The URL of the article
   */
  url: string;
  /**
   * The title of the article
   */
  title: string;
  /**
   * The images associated with the article
   */
  images: string[];
  /**
   * The date the article was published
   */
  datePublished: string;
  /**
   * The date the article was last modified
   */
  dateModified: string;
  /**
   * The name of the author
   */
  authorName: string;
  /**
   * The description of the article
   */
  description: string;
  /**
   * The name of the publisher
   */
  publisherName: string;
  /**
   * The logo URL of the publisher
   */
  publisherLogo: string;
}

/**
 * Props for the BreadcrumbStructuredData component
 */
export interface BreadcrumbStructuredDataProps {
  /**
   * The list of breadcrumb items
   */
  itemListElements: Array<{
    /**
     * The position of the item in the breadcrumb trail
     */
    position: number;
    /**
     * The name of the item
     */
    name: string;
    /**
     * The URL of the item
     */
    item: string;
  }>;
}

/**
 * Props for the ProductStructuredData component
 */
export interface ProductStructuredDataProps {
  /**
   * The name of the product
   */
  name: string;
  /**
   * The description of the product
   */
  description: string;
  /**
   * The URL of the product page
   */
  productUrl: string;
  /**
   * The images of the product
   */
  images: string[];
  /**
   * The brand of the product
   */
  brand: string;
  /**
   * The SKU of the product
   */
  sku?: string;
  /**
   * The MPN (Manufacturer Part Number) of the product
   */
  mpn?: string;
  /**
   * The price of the product
   */
  price?: number;
  /**
   * The currency of the price
   */
  priceCurrency?: string;
  /**
   * The availability status of the product
   */
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  /**
   * The rating of the product
   */
  rating?: {
    /**
     * The value of the rating
     */
    ratingValue: number;
    /**
     * The best rating possible
     */
    bestRating: number;
    /**
     * The number of reviews
     */
    reviewCount: number;
  };
} 