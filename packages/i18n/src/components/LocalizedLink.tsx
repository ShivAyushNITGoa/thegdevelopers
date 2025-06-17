import React from 'react';
import Link from 'next/link';
import { useI18n } from '../context/I18nProvider';

export interface LocalizedLinkProps {
  /**
   * Link href
   */
  href: string;
  
  /**
   * Specific locale to use for this link
   */
  locale?: string;
  
  /**
   * Whether to preserve the current query parameters
   */
  preserveQuery?: boolean;
  
  /**
   * Children elements
   */
  children: React.ReactNode;
  
  /**
   * Additional props to pass to the Next.js Link component
   */
  [key: string]: any;
}

/**
 * Component for creating links with localization support
 * 
 * @example
 * ```tsx
 * <LocalizedLink href="/about">About Us</LocalizedLink>
 * ```
 */
export function LocalizedLink({
  href,
  locale: propLocale,
  preserveQuery = true,
  children,
  ...props
}: LocalizedLinkProps) {
  const { locale: contextLocale } = useI18n();
  
  // Use provided locale or fall back to context locale
  const locale = propLocale || contextLocale;
  
  // Build href with query parameters if needed
  let finalHref = href;
  if (preserveQuery && typeof window !== 'undefined') {
    const url = new URL(window.location.href);
    const query = url.search;
    
    if (query && !href.includes('?')) {
      finalHref = `${href}${query}`;
    }
  }
  
  return (
    <Link href={finalHref} locale={locale} {...props}>
      {children}
    </Link>
  );
}
