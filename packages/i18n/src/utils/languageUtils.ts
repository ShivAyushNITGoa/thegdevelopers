//
Language
utilities

import { SupportedLanguage } from '../types';

/**
 * Get browser language
 * 
 * @returns Browser language code
 */
export function getBrowserLanguage(): string {
  if (typeof navigator === 'undefined') {
    return 'en';
  }
  
  return navigator.language.split('-')[0];
}

/**
 * Check if a language is RTL
 * 
 * @param language - Language code or language object
 * @returns Whether the language is RTL
 */
export function isRTL(language: string | SupportedLanguage): boolean {
  if (typeof language === 'string') {
    // Common RTL languages
    const rtlLanguages = ['ar', 'he', 'fa', 'ur', 'yi', 'dv', 'ha', 'khw', 'ks', 'ku', 'ps', 'sd', 'ug'];
    return rtlLanguages.includes(language);
  }
  
  return language.dir === 'rtl';
}

/**
 * Sort languages by name
 * 
 * @param languages - Languages to sort
 * @param locale - Locale to use for sorting
 * @returns Sorted languages
 */
export function sortLanguages(
  languages: SupportedLanguage[],
  locale: string = 'en'
): SupportedLanguage[] {
  return [...languages].sort((a, b) => {
    return a.name.localeCompare(b.name, locale);
  });
}

/**
 * Get language name in its native language
 * 
 * @param code - Language code
 * @returns Native language name
 */
export function getNativeLanguageName(code: string): string {
  const languageNames: Record<string, string> = {
    'en': 'English',
    'es': 'Español',
    'fr': 'Français',
    'de': 'Deutsch',
    'it': 'Italiano',
    'pt': 'Português',
    'ru': 'Русский',
    'zh': '中文',
    'ja': '日本語',
    'ko': '한국어',
    'ar': 'العربية',
    'hi': 'हिन्दी',
    'bn': 'বাংলা',
    'pa': 'ਪੰਜਾਬੀ',
    'jv': 'Basa Jawa',
    'tr': 'Türkçe',
    'vi': 'Tiếng Việt',
    'th': 'ไทย',
    'nl': 'Nederlands',
    'pl': 'Polski',
    'sv': 'Svenska',
    'uk': 'Українська',
    'ro': 'Română',
    'el': 'Ελληνικά',
    'cs': 'Čeština',
    'hu': 'Magyar',
    'fi': 'Suomi',
    'no': 'Norsk',
    'da': 'Dansk',
    'he': 'עברית',
  };
  
  return languageNames[code] || code;
}

/**
 * Get language flag emoji
 * 
 * @param code - Language code
 * @returns Flag emoji
 */
export function getLanguageFlag(code: string): string {
  const languageFlags: Record<string, string> = {
    'en': '🇺🇸',
    'es': '🇪🇸',
    'fr': '🇫🇷',
    'de': '🇩🇪',
    'it': '🇮🇹',
    'pt': '🇵🇹',
    'ru': '🇷🇺',
    'zh': '🇨🇳',
    'ja': '🇯🇵',
    'ko': '🇰🇷',
    'ar': '🇸🇦',
    'hi': '🇮🇳',
    'bn': '🇧🇩',
    'pa': '🇮🇳',
    'jv': '🇮🇩',
    'tr': '🇹🇷',
    'vi': '🇻🇳',
    'th': '🇹🇭',
    'nl': '🇳🇱',
    'pl': '🇵🇱',
    'sv': '🇸🇪',
    'uk': '🇺🇦',
    'ro': '🇷🇴',
    'el': '🇬🇷',
    'cs': '🇨🇿',
    'hu': '🇭🇺',
    'fi': '🇫🇮',
    'no': '🇳🇴',
    'da': '🇩🇰',
    'he': '🇮🇱',
  };
  
  return languageFlags[code] || '🌐';
}
