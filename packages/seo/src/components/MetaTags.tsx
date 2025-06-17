"use client";

import React from 'react';
import Head from 'next/head';
import { MetaTagsProps, MetaTag, LinkTag } from '../types';

/**
 * MetaTags component for managing SEO meta tags
 */
export const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  canonical,
  noindex = false,
  nofollow = false,
  openGraph,
  twitter,
  additionalMetaTags = [],
  additionalLinkTags = [],
}) => {
  // Build robots meta tag value
  const robotsParams = [];
  if (noindex) robotsParams.push('noindex');
  else robotsParams.push('index');
  if (nofollow) robotsParams.push('nofollow');
  else robotsParams.push('follow');
  
  const robotsContent = robotsParams.join(', ');

  // Build Open Graph meta tags
  const openGraphTags = openGraph
    ? [
        openGraph.title && { property: 'og:title', content: openGraph.title },
        openGraph.description && { property: 'og:description', content: openGraph.description },
        openGraph.url && { property: 'og:url', content: openGraph.url },
        openGraph.type && { property: 'og:type', content: openGraph.type },
        openGraph.site_name && { property: 'og:site_name', content: openGraph.site_name },
        openGraph.locale && { property: 'og:locale', content: openGraph.locale },
        ...(openGraph.images || []).map((image) => [
          { property: 'og:image', content: image.url },
          image.secureUrl && { property: 'og:image:secure_url', content: image.secureUrl },
          image.type && { property: 'og:image:type', content: image.type },
          image.width && { property: 'og:image:width', content: String(image.width) },
          image.height && { property: 'og:image:height', content: String(image.height) },
          image.alt && { property: 'og:image:alt', content: image.alt },
        ]).flat(),
        // Article specific tags
        openGraph.article?.publishedTime && { property: 'article:published_time', content: openGraph.article.publishedTime },
        openGraph.article?.modifiedTime && { property: 'article:modified_time', content: openGraph.article.modifiedTime },
        openGraph.article?.expirationTime && { property: 'article:expiration_time', content: openGraph.article.expirationTime },
        openGraph.article?.section && { property: 'article:section', content: openGraph.article.section },
        ...(openGraph.article?.authors || []).map((author) => ({ property: 'article:author', content: author })),
        ...(openGraph.article?.tags || []).map((tag) => ({ property: 'article:tag', content: tag })),
      ].filter(Boolean)
    : [];

  // Build Twitter Card meta tags
  const twitterTags = twitter
    ? [
        { name: 'twitter:card', content: twitter.cardType || 'summary' },
        twitter.site && { name: 'twitter:site', content: twitter.site },
        twitter.handle && { name: 'twitter:creator', content: twitter.handle },
        twitter.title && { name: 'twitter:title', content: twitter.title },
        twitter.description && { name: 'twitter:description', content: twitter.description },
        twitter.image && { name: 'twitter:image', content: twitter.image },
        twitter.imageAlt && { name: 'twitter:image:alt', content: twitter.imageAlt },
      ].filter(Boolean)
    : [];

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robotsContent} />
      
      {/* Canonical Link */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph Meta Tags */}
      {openGraphTags.map((tag: MetaTag, index) => (
        tag && tag.content && (
          <meta 
            key={`og-${index}`} 
            property={tag.property} 
            content={tag.content} 
          />
        )
      ))}
      
      {/* Twitter Card Meta Tags */}
      {twitterTags.map((tag: MetaTag, index) => (
        tag && tag.content && (
          <meta 
            key={`twitter-${index}`} 
            name={tag.name} 
            content={tag.content} 
          />
        )
      ))}
      
      {/* Additional Meta Tags */}
      {additionalMetaTags.map((tag: MetaTag, index) => (
        <meta
          key={`meta-${index}`}
          {...(tag.name && { name: tag.name })}
          {...(tag.property && { property: tag.property })}
          content={tag.content}
        />
      ))}
      
      {/* Additional Link Tags */}
      {additionalLinkTags.map((tag: LinkTag, index) => (
        <link
          key={`link-${index}`}
          rel={tag.rel}
          href={tag.href}
          {...(tag.sizes && { sizes: tag.sizes })}
          {...(tag.type && { type: tag.type })}
          {...(tag.color && { color: tag.color })}
          {...(tag.as && { as: tag.as })}
          {...(tag.crossOrigin && { crossOrigin: tag.crossOrigin })}
        />
      ))}
    </Head>
  );
}; 