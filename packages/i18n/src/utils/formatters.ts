import { DateFormatOptions, NumberFormatOptions } from '../types';

/**
 * Format a date according to the locale
 * 
 * @param date - Date to format
 * @param locale - Locale to use for formatting
 * @param options - Formatting options
 * @returns Formatted date string
 * 
 * @example
 * ```ts
 * formatDate(new Date(), 'en', { dateStyle: 'full' });
 * // => "Tuesday, September 12, 2023"
 * ```
 */
export function formatDate(
  date: Date | number,
  locale: string,
  options: DateFormatOptions = { dateStyle: 'medium' }
): string {
  const dateObj = typeof date === 'number' ? new Date(date) : date;
  
  try {
    return new Intl.DateTimeFormat(locale, options as Intl.DateTimeFormatOptions).format(dateObj);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateObj.toLocaleDateString(locale);
  }
}

/**
 * Format a number according to the locale
 * 
 * @param number - Number to format
 * @param locale - Locale to use for formatting
 * @param options - Formatting options
 * @returns Formatted number string
 * 
 * @example
 * ```ts
 * formatNumber(1234.56, 'en', { style: 'currency', currency: 'USD' });
 * // => "$1,234.56"
 * ```
 */
export function formatNumber(
  number: number,
  locale: string,
  options: NumberFormatOptions = {}
): string {
  try {
    return new Intl.NumberFormat(locale, options as Intl.NumberFormatOptions).format(number);
  } catch (error) {
    console.error('Error formatting number:', error);
    return number.toString();
  }
}

/**
 * Format a currency amount according to the locale
 * 
 * @param amount - Amount to format
 * @param locale - Locale to use for formatting
 * @param currency - Currency code (e.g., 'USD', 'EUR')
 * @returns Formatted currency string
 * 
 * @example
 * ```ts
 * formatCurrency(1234.56, 'en', 'USD');
 * // => "$1,234.56"
 * ```
 */
export function formatCurrency(
  amount: number,
  locale: string,
  currency: string
): string {
  return formatNumber(amount, locale, {
    style: 'currency',
    currency,
  });
}

/**
 * Format a percentage according to the locale
 * 
 * @param value - Value to format (0-1)
 * @param locale - Locale to use for formatting
 * @param digits - Number of decimal places
 * @returns Formatted percentage string
 * 
 * @example
 * ```ts
 * formatPercent(0.1234, 'en', 2);
 * // => "12.34%"
 * ```
 */
export function formatPercent(
  value: number,
  locale: string,
  digits: number = 2
): string {
  return formatNumber(value, locale, {
    style: 'percent',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

/**
 * Format a relative time according to the locale
 * 
 * @param value - Value to format
 * @param unit - Time unit
 * @param locale - Locale to use for formatting
 * @returns Formatted relative time string
 * 
 * @example
 * ```ts
 * formatRelativeTime(-1, 'day', 'en');
 * // => "yesterday"
 * ```
 */
export function formatRelativeTime(
  value: number,
  unit: Intl.RelativeTimeFormatUnit,
  locale: string
): string {
  try {
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
    return rtf.format(value, unit);
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return `${value} ${unit}${Math.abs(value) !== 1 ? 's' : ''}`;
  }
} 