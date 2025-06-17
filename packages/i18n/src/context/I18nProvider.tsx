import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import i18n from 'i18next';
import { initReactI18next, useTranslation as useTranslationOriginal } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { LocaleConfig, SupportedLanguage } from '../types';

// Default supported languages
const DEFAULT_LANGUAGES: SupportedLanguage[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'es', name: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', dir: 'ltr' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
];

// Default locale configuration
const DEFAULT_CONFIG: LocaleConfig = {
  defaultLocale: 'en',
  locales: DEFAULT_LANGUAGES.map(lang => lang.code),
  supportedLanguages: DEFAULT_LANGUAGES,
  namespaces: ['common', 'home', 'blog', 'docs'],
  defaultNamespace: 'common',
};

// Create the context
interface I18nContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string, options?: any) => string;
  dir: string;
  languages: SupportedLanguage[];
  defaultLocale: string;
  config: LocaleConfig;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Provider props
interface I18nProviderProps {
  children: React.ReactNode;
  config?: Partial<LocaleConfig>;
}

/**
 * I18nProvider component for managing internationalization
 * 
 * @example
 * ```tsx
 * <I18nProvider>
 *   <App />
 * </I18nProvider>
 * ```
 */
export function I18nProvider({ children, config = {} }: I18nProviderProps) {
  const mergedConfig: LocaleConfig = {
    ...DEFAULT_CONFIG,
    ...config,
    supportedLanguages: config.supportedLanguages || DEFAULT_CONFIG.supportedLanguages,
  };
  
  const router = useRouter();
  const [locale, setLocaleState] = useState(mergedConfig.defaultLocale);
  const [dir, setDir] = useState('ltr');
  
  // Initialize i18next
  useEffect(() => {
    i18n
      .use(Backend)
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        lng: locale,
        fallbackLng: mergedConfig.defaultLocale,
        supportedLngs: mergedConfig.locales,
        ns: mergedConfig.namespaces,
        defaultNS: mergedConfig.defaultNamespace,
        interpolation: {
          escapeValue: false,
        },
        detection: {
          order: ['path', 'cookie', 'navigator', 'htmlTag'],
          lookupFromPathIndex: 0,
          caches: ['cookie'],
        },
        backend: {
          loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        react: {
          useSuspense: false,
        },
      });
  }, [locale, mergedConfig]);
  
  // Update locale and direction
  const setLocale = (newLocale: string) => {
    if (mergedConfig.locales.includes(newLocale)) {
      setLocaleState(newLocale);
      
      // Set direction based on language
      const language = mergedConfig.supportedLanguages.find(lang => lang.code === newLocale);
      if (language) {
        setDir(language.dir || 'ltr');
        document.documentElement.dir = language.dir || 'ltr';
        document.documentElement.lang = newLocale;
      }
      
      // Update URL if using Next.js router
      if (router) {
        const { pathname, asPath, query } = router;
        router.push({ pathname, query }, asPath, { locale: newLocale });
      }
      
      // Set cookie for persistence
      document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;
    }
  };
  
  // Use the original useTranslation hook
  const { t } = useTranslationOriginal();
  
  // Context value
  const value = {
    locale,
    setLocale,
    t,
    dir,
    languages: mergedConfig.supportedLanguages,
    defaultLocale: mergedConfig.defaultLocale,
    config: mergedConfig,
  };
  
  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

/**
 * Hook to use the I18n context
 * 
 * @returns The I18n context value
 * 
 * @example
 * ```tsx
 * const { locale, setLocale, t } = useI18n();
 * ```
 */
export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
} 