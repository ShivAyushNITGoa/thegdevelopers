//
useTranslation
hook

import { useTranslation as useTranslationOriginal } from 'react-i18next';
import { useI18n } from '../context/I18nProvider';

/**
 * Enhanced translation hook that combines react-i18next with our I18n context
 * 
 * @param namespace - Translation namespace
 * @returns Translation functions and i18n context
 * 
 * @example
 * ```tsx
 * const { t, locale, setLocale } = useTranslation('common');
 * return <p>{t('greeting')}</p>;
 * ```
 */
export function useTranslation(namespace?: string) {
  // Get original translation functions
  const { t, i18n } = useTranslationOriginal(namespace);
  
  // Get our i18n context
  const i18nContext = useI18n();
  
  return {
    // Original translation function
    t,
    i18n,
    
    // Additional context values
    ...i18nContext,
  };
}
