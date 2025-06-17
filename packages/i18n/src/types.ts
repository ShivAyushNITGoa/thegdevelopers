/**
 * Supported language configuration
 */
export interface SupportedLanguage {
  /**
   * Language code (e.g., 'en', 'fr')
   */
  code: string;
  
  /**
   * Display name of the language
   */
  name: string;
  
  /**
   * Flag emoji for the language
   */
  flag: string;
  
  /**
   * Text direction ('ltr' or 'rtl')
   */
  dir: 'ltr' | 'rtl';
}

/**
 * Locale configuration
 */
export interface LocaleConfig {
  /**
   * Default locale code
   */
  defaultLocale: string;
  
  /**
   * List of supported locale codes
   */
  locales: string[];
  
  /**
   * List of supported languages with metadata
   */
  supportedLanguages: SupportedLanguage[];
  
  /**
   * List of translation namespaces
   */
  namespaces: string[];
  
  /**
   * Default namespace
   */
  defaultNamespace: string;
}

/**
 * Format options for date formatting
 */
export interface DateFormatOptions {
  /**
   * Date format style
   */
  dateStyle?: 'full' | 'long' | 'medium' | 'short';
  
  /**
   * Time format style
   */
  timeStyle?: 'full' | 'long' | 'medium' | 'short';
  
  /**
   * Whether to use 24-hour time
   */
  hour12?: boolean;
}

/**
 * Format options for number formatting
 */
export interface NumberFormatOptions {
  /**
   * Style of the number
   */
  style?: 'decimal' | 'currency' | 'percent' | 'unit';
  
  /**
   * Currency code (e.g., 'USD', 'EUR')
   */
  currency?: string;
  
  /**
   * Minimum number of integer digits
   */
  minimumIntegerDigits?: number;
  
  /**
   * Minimum number of fraction digits
   */
  minimumFractionDigits?: number;
  
  /**
   * Maximum number of fraction digits
   */
  maximumFractionDigits?: number;
} 