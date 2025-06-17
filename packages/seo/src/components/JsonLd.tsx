"use client";

import React from 'react';
import { JsonLdProps } from '../types';

/**
 * JsonLd component for adding structured data to pages
 */
export const JsonLd: React.FC<JsonLdProps> = ({ type, data }) => {
  // Create the JSON-LD schema
  const schema = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

/**
 * Article schema component
 */
export const ArticleJsonLd: React.FC<{
  url: string;
  title: string;
  images: string[];
  datePublished: string;
  dateModified?: string;
  authorName: string | string[];
  description: string;
  publisherName: string;
  publisherLogo: string;
}> = (props) => {
  const {
    url,
    title,
    images,
    datePublished,
    dateModified,
    authorName,
    description,
    publisherName,
    publisherLogo,
  } = props;

  const authorList = Array.isArray(authorName) ? authorName : [authorName];

  const data = {
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: title,
    image: images,
    datePublished,
    dateModified: dateModified || datePublished,
    author: authorList.map(name => ({
      '@type': 'Person',
      name,
    })),
    description,
    publisher: {
      '@type': 'Organization',
      name: publisherName,
      logo: {
        '@type': 'ImageObject',
        url: publisherLogo,
      },
    },
  };

  return <JsonLd type="Article" data={data} />;
};

/**
 * Product schema component
 */
export const ProductJsonLd: React.FC<{
  name: string;
  description: string;
  productId?: string;
  images?: string[];
  brand?: string;
  offers?: {
    price: number;
    priceCurrency: string;
    availability?: string;
    url?: string;
    seller?: {
      name: string;
    };
  };
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}> = (props) => {
  const {
    name,
    description,
    productId,
    images,
    brand,
    offers,
    aggregateRating,
  } = props;

  const data = {
    name,
    description,
    ...(productId && { productID: productId }),
    ...(images && { image: images }),
    ...(brand && { brand: { '@type': 'Brand', name: brand } }),
    ...(offers && {
      offers: {
        '@type': 'Offer',
        price: offers.price,
        priceCurrency: offers.priceCurrency,
        ...(offers.availability && { availability: offers.availability }),
        ...(offers.url && { url: offers.url }),
        ...(offers.seller && { seller: { '@type': 'Organization', name: offers.seller.name } }),
      },
    }),
    ...(aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: aggregateRating.ratingValue,
        reviewCount: aggregateRating.reviewCount,
      },
    }),
  };

  return <JsonLd type="Product" data={data} />;
};

/**
 * FAQPage schema component
 */
export const FAQPageJsonLd: React.FC<{
  questions: {
    question: string;
    answer: string;
  }[];
}> = ({ questions }) => {
  const data = {
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };

  return <JsonLd type="FAQPage" data={data} />;
}; 