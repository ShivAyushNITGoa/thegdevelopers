import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

export interface TranslatedTextProps {
  /**
   * Translation key
   */
  i18nKey: string;
  
  /**
   * Translation namespace
   */
  ns?: string;
  
  /**
   * Values to interpolate into the translation
   */
  values?: Record<string, any>;
  
  /**
   * Default text to show if translation is missing
   */
  defaultText?: string;
  
  /**
   * HTML tag to use for the text
   */
  as?: keyof JSX.IntrinsicElements;
  
  /**
   * Additional props to pass to the HTML element
   */
  [key: string]: any;
}

/**
 * Component for rendering translated text
 * 
 * @example
 * ```tsx
 * <TranslatedText i18nKey="greeting" ns="common" values={{ name: "John" }} />
 * ```
 */
export function TranslatedText({
  i18nKey,
  ns,
  values = {},
  defaultText = '',
  as: Tag = 'span',
  ...props
}: TranslatedTextProps) {
  const { t } = useTranslation(ns);
  
  // Get translated text
  const translatedText = t(i18nKey, { ...values, defaultValue: defaultText });
  
  // Render with the specified tag
  return <Tag {...props}>{translatedText}</Tag>;
}
