import { LocaleConfig } from '../types';

/**
 * Create a Next.js i18n configuration object
 * 
 * @param config - Locale configuration
 * @returns Next.js i18n configuration
 * 
 * @example
 * ```ts
 * // next.config.js
 * const { createNextI18nConfig } = require('i18n');
 * 
 * module.exports = {
 *   i18n: createNextI18nConfig({
 *     defaultLocale: 'en',
 *     locales: ['en', 'fr', 'es'],
 *   }),
 * };
 * ```
 */
export function createNextI18nConfig(config: Partial<LocaleConfig> = {}): any {
  const defaultConfig: LocaleConfig = {
    defaultLocale: 'en',
    locales: ['en'],
    supportedLanguages: [{ code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' }],
    namespaces: ['common'],
    defaultNamespace: 'common',
  };
  
  const mergedConfig = {
    ...defaultConfig,
    ...config,
  };
  
  return {
    defaultLocale: mergedConfig.defaultLocale,
    locales: mergedConfig.locales,
    localeDetection: true,
  };
}

/**
 * Create a next-i18next configuration object
 * 
 * @param config - Locale configuration
 * @returns next-i18next configuration
 * 
 * @example
 * ```ts
 * // next-i18next.config.js
 * const { createNextI18nextConfig } = require('i18n');
 * 
 * module.exports = createNextI18nextConfig({
 *   defaultLocale: 'en',
 *   locales: ['en', 'fr', 'es'],
 *   namespaces: ['common', 'home', 'blog'],
 * });
 * ```
 */
export function createNextI18nextConfig(config: Partial<LocaleConfig> = {}): any {
  const defaultConfig: LocaleConfig = {
    defaultLocale: 'en',
    locales: ['en'],
    supportedLanguages: [{ code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' }],
    namespaces: ['common'],
    defaultNamespace: 'common',
  };
  
  const mergedConfig = {
    ...defaultConfig,
    ...config,
  };
  
  return {
    i18n: {
      defaultLocale: mergedConfig.defaultLocale,
      locales: mergedConfig.locales,
    },
    defaultNS: mergedConfig.defaultNamespace,
    ns: mergedConfig.namespaces,
    localePath: './public/locales',
    reloadOnPrerender: process.env.NODE_ENV === 'development',
    react: {
      useSuspense: false,
    },
    detection: {
      order: ['path', 'cookie', 'navigator', 'htmlTag'],
      lookupFromPathIndex: 0,
      caches: ['cookie'],
    },
  };
} 