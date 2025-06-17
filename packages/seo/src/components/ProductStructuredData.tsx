import React from 'react';
import { Product, AggregateRating, Offer, WithContext } from 'schema-dts';

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
   * The currency of the price (ISO 4217 format)
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

/**
 * ProductStructuredData component for adding product structured data to pages
 * 
 * This component adds JSON-LD structured data for products, which can
 * help display product information in Google search results.
 * 
 * @example
 * ```tsx
 * <ProductStructuredData
 *   name="GDevelopers Pro Subscription"
 *   description="Premium access to all GDevelopers features and resources."
 *   productUrl="https://gdevelopers.com/products/pro-subscription"
 *   images={["https://gdevelopers.com/images/products/pro-subscription.jpg"]}
 *   brand="GDevelopers"
 *   sku="GD-PRO-001"
 *   price={99.99}
 *   priceCurrency="USD"
 *   availability="InStock"
 *   rating={{
 *     ratingValue: 4.8,
 *     bestRating: 5,
 *     reviewCount: 427
 *   }}
 * />
 * ```
 */
export function ProductStructuredData({
  name,
  description,
  productUrl,
  images,
  brand,
  sku,
  mpn,
  price,
  priceCurrency,
  availability,
  rating,
}: ProductStructuredDataProps) {
  // Create product schema
  const productSchema: WithContext<Product> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: images,
    url: productUrl,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
  };
  
  // Add SKU if provided
  if (sku) {
    productSchema.sku = sku;
  }
  
  // Add MPN if provided
  if (mpn) {
    productSchema.mpn = mpn;
  }
  
  // Add offer if price is provided
  if (price !== undefined && priceCurrency) {
    const offer: Offer = {
      '@type': 'Offer',
      price: price.toString(),
      priceCurrency,
    };
    
    // Add availability if provided
    if (availability) {
      offer.availability = `https://schema.org/${availability}`;
    }
    
    productSchema.offers = offer;
  }
  
  // Add rating if provided
  if (rating) {
    const aggregateRating: AggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: rating.ratingValue.toString(),
      bestRating: rating.bestRating.toString(),
      reviewCount: rating.reviewCount,
    };
    
    productSchema.aggregateRating = aggregateRating;
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
    />
  );
} 