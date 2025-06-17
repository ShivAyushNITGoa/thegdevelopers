import React, { useState } from 'react';
import { useI18n } from '../context/I18nProvider';

export interface LanguageSwitcherProps {
  /**
   * CSS class name for the component
   */
  className?: string;
  
  /**
   * Whether to display language flags
   */
  showFlags?: boolean;
  
  /**
   * Whether to display language names
   */
  showNames?: boolean;
  
  /**
   * Whether to use a dropdown menu
   */
  dropdown?: boolean;
  
  /**
   * Callback when language changes
   */
  onLanguageChange?: (locale: string) => void;
}

/**
 * LanguageSwitcher component for switching between languages
 * 
 * @example
 * ```tsx
 * <LanguageSwitcher showFlags showNames dropdown />
 * ```
 */
export function LanguageSwitcher({
  className = '',
  showFlags = true,
  showNames = true,
  dropdown = true,
  onLanguageChange,
}: LanguageSwitcherProps) {
  const { locale, setLocale, languages } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  
  // Find current language
  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];
  
  // Handle language change
  const handleLanguageChange = (code: string) => {
    setLocale(code);
    setIsOpen(false);
    if (onLanguageChange) {
      onLanguageChange(code);
    }
  };
  
  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  // Render as dropdown
  if (dropdown) {
    return (
      <div className={`language-switcher ${className}`}>
        <button
          className="language-switcher__button"
          onClick={toggleDropdown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label="Select language"
        >
          {showFlags && <span className="language-switcher__flag">{currentLanguage.flag}</span>}
          {showNames && <span className="language-switcher__name">{currentLanguage.name}</span>}
          <span className="language-switcher__arrow">▼</span>
        </button>
        
        {isOpen && (
          <ul
            className="language-switcher__dropdown"
            role="listbox"
            aria-label="Languages"
          >
            {languages.map(language => (
              <li
                key={language.code}
                className={`language-switcher__item ${language.code === locale ? 'language-switcher__item--active' : ''}`}
                role="option"
                aria-selected={language.code === locale}
              >
                <button
                  className="language-switcher__option"
                  onClick={() => handleLanguageChange(language.code)}
                >
                  {showFlags && <span className="language-switcher__flag">{language.flag}</span>}
                  {showNames && <span className="language-switcher__name">{language.name}</span>}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  
  // Render as buttons
  return (
    <div className={`language-switcher ${className}`}>
      {languages.map(language => (
        <button
          key={language.code}
          className={`language-switcher__button ${language.code === locale ? 'language-switcher__button--active' : ''}`}
          onClick={() => handleLanguageChange(language.code)}
          aria-pressed={language.code === locale}
        >
          {showFlags && <span className="language-switcher__flag">{language.flag}</span>}
          {showNames && <span className="language-switcher__name">{language.name}</span>}
        </button>
      ))}
    </div>
  );
} 