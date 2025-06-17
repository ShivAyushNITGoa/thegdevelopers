import { SitemapConfig, AlternateRef } from '../types';

/**
 * Generates a sitemap configuration for next-sitemap
 */
export const generateSitemapConfig = (config: SitemapConfig): Record<string, any> => {
  const {
    siteUrl,
    generateRobotsTxt = true,
    outDir = 'public',
    exclude = [],
    alternateRefs = [],
    priority = 0.7,
    changefreq = 'weekly',
  } = config;

  return {
    siteUrl,
    generateRobotsTxt,
    outDir,
    exclude,
    alternateRefs,
    priority,
    changefreq,
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
    },
  };
};

/**
 * Creates alternate language references for a sitemap
 */
export const createAlternateRefs = (
  baseUrl: string,
  languages: { code: string; path: string }[]
): AlternateRef[] => {
  return languages.map(({ code, path }) => ({
    href: `${baseUrl}${path}`,
    hreflang: code,
  }));
};

/**
 * Generates an array of URLs for the sitemap
 */
export const generateUrlList = (
  baseUrl: string,
  paths: string[],
  options: {
    priority?: number;
    changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    alternateRefs?: AlternateRef[];
    lastmod?: string;
  } = {}
): any[] => {
  const { priority, changefreq, alternateRefs, lastmod } = options;
  
  return paths.map((path) => ({
    loc: `${baseUrl}${path}`,
    changefreq: changefreq || 'weekly',
    priority: priority || 0.7,
    ...(alternateRefs ? { alternateRefs } : {}),
    ...(lastmod ? { lastmod } : {}),
  }));
};

/**
 * Creates a robots.txt configuration
 */
export const createRobotsTxtConfig = (
  siteUrl: string,
  policies: Array<{
    userAgent: string;
    allow?: string[];
    disallow?: string[];
  }> = [],
  additionalSitemaps: string[] = []
): any => {
  return {
    policies: policies.length > 0
      ? policies
      : [
          {
            userAgent: '*',
            allow: '/',
          },
        ],
    additionalSitemaps: [
      `${siteUrl}/sitemap.xml`,
      ...additionalSitemaps,
    ],
  };
}; 