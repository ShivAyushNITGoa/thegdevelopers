import { useI18n } from '../context/I18nProvider';

/**
 * Hook for accessing and changing the current locale
 * 
 * @returns Locale information and setter function
 * 
 * @example
 * ```tsx
 * const { locale, setLocale, dir } = useLocale();
 * ```
 */
export function useLocale() {
  const { locale, setLocale, dir, defaultLocale, languages } = useI18n();
  
  // Get current language object
  const currentLanguage = languages.find(lang => lang.code === locale) || 
    languages.find(lang => lang.code === defaultLocale) ||
    languages[0];
  
  return {
    // Current locale code
    locale,
    
    // Function to change locale
    setLocale,
    
    // Text direction (ltr or rtl)
    dir,
    
    // Default locale
    defaultLocale,
    
    // Current language object
    currentLanguage,
    
    // All supported languages
    languages,
    
    // Check if current locale is RTL
    isRTL: dir === 'rtl',
  };
}
