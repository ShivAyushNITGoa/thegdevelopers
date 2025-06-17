"use client";

import React from 'react';
import { MetaTags, ProductJsonLd } from 'seo';

// Mock product data - in a real app, this would come from an API or database
const getProductData = (id: string) => {
  return {
    id,
    name: `Product ${id}`,
    description: `This is product ${id}, a high-quality item from GDevelopers.`,
    price: 99.99,
    currency: 'USD',
    image: `https://gdevelopers.com/products/${id}/image.jpg`,
    category: 'Software',
    brand: 'GDevelopers',
    availability: 'InStock',
    reviewCount: 42,
    ratingValue: 4.5,
  };
};

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = getProductData(id);
  
  // SEO metadata for this specific product
  const seoMetadata = {
    title: `${product.name} | GDevelopers`,
    description: product.description,
    canonical: `https://gdevelopers.com/products/${id}`,
    openGraph: {
      type: 'product',
      url: `https://gdevelopers.com/products/${id}`,
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      site_name: 'GDevelopers',
    },
    twitter: {
      cardType: 'summary_large_image',
      site: '@gdevelopers',
      title: product.name,
      description: product.description,
      image: product.image,
    },
  };

  return (
    <div className="container mx-auto py-8">
      {/* Add MetaTags for this specific product page */}
      <MetaTags {...seoMetadata} />
      
      {/* Add ProductJsonLd structured data */}
      <ProductJsonLd
        name={product.name}
        description={product.description}
        productId={product.id}
        images={[product.image]}
        brand={product.brand}
        offers={{
          price: product.price,
          priceCurrency: product.currency,
          availability: `https://schema.org/${product.availability}`,
          url: `https://gdevelopers.com/products/${id}`,
          seller: {
            name: 'GDevelopers',
          },
        }}
        aggregateRating={{
          ratingValue: product.ratingValue,
          reviewCount: product.reviewCount,
        }}
      />
      
      {/* Product details UI */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="p-8 md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {product.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {product.description}
            </p>
            <div className="mt-4 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.ratingValue)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-300 ml-2">
                {product.ratingValue} ({product.reviewCount} reviews)
              </span>
            </div>
            <div className="mt-8">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ${product.price}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
                {product.currency}
              </span>
            </div>
            <div className="mt-8">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 