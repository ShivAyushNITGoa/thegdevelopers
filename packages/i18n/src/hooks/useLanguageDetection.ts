//
useLanguageDetection
hook

import { useEffect } from 'react';
import { useI18n } from '../context/I18nProvider';

/**
 * Hook for detecting user's preferred language
 * 
 * @param options - Detection options
 * @returns The detected and current locale
 * 
 * @example
 * ```tsx
 * const { detectedLocale, currentLocale } = useLanguageDetection();
 * ```
 */
export function useLanguageDetection(options: {
  /**
   * Whether to automatically set the detected language
   */
  autoSet?: boolean;
  
  /**
   * Whether to use navigator language
   */
  useNavigator?: boolean;
  
  /**
   * Whether to use URL parameters
   */
  useUrlParams?: boolean;
  
  /**
   * Whether to use cookies
   */
  useCookies?: boolean;
  
  /**
   * URL parameter name for language
   */
  urlParamName?: string;
} = {}) {
  const {
    autoSet = false,
    useNavigator = true,
    useUrlParams = true,
    useCookies = true,
    urlParamName = 'lang',
  } = options;
  
  const { locale, setLocale, languages } = useI18n();
  
  // Detect language on mount
  useEffect(() => {
    // Don't auto-detect if autoSet is false
    if (!autoSet) {
      return;
    }
    
    let detectedLocale: string | null = null;
    
    // Check URL parameters
    if (useUrlParams && typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlLocale = params.get(urlParamName);
      
      if (urlLocale && languages.some(lang => lang.code === urlLocale)) {
        detectedLocale = urlLocale;
      }
    }
    
    // Check cookies
    if (!detectedLocale && useCookies && typeof document !== 'undefined') {
      const cookies = document.cookie.split(';');
      const localeCookie = cookies.find(cookie => cookie.trim().startsWith('NEXT_LOCALE='));
      
      if (localeCookie) {
        const cookieLocale = localeCookie.split('=')[1];
        
        if (cookieLocale && languages.some(lang => lang.code === cookieLocale)) {
          detectedLocale = cookieLocale;
        }
      }
    }
    
    // Check navigator language
    if (!detectedLocale && useNavigator && typeof navigator !== 'undefined') {
      const navigatorLocale = navigator.language.split('-')[0];
      
      if (navigatorLocale && languages.some(lang => lang.code === navigatorLocale)) {
        detectedLocale = navigatorLocale;
      }
    }
    
    // Set detected locale if different from current
    if (detectedLocale && detectedLocale !== locale) {
      setLocale(detectedLocale);
    }
  }, [autoSet, locale, languages, setLocale, useNavigator, useCookies, useUrlParams, urlParamName]);
  
  // Detect language on demand
  const detectLanguage = (): string | null => {
    // Check URL parameters
    if (useUrlParams && typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlLocale = params.get(urlParamName);
      
      if (urlLocale && languages.some(lang => lang.code === urlLocale)) {
        return urlLocale;
      }
    }
    
    // Check navigator language
    if (useNavigator && typeof navigator !== 'undefined') {
      const navigatorLocale = navigator.language.split('-')[0];
      
      if (navigatorLocale && languages.some(lang => lang.code === navigatorLocale)) {
        return navigatorLocale;
      }
    }
    
    return null;
  };
  
  return {
    // Currently active locale
    currentLocale: locale,
    
    // Detected locale (may be null)
    detectedLocale: detectLanguage(),
    
    // Function to manually detect language
    detectLanguage,
  };
}
