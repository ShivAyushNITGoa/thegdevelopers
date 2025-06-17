// Accessibility Types

// Skip Link Types
export interface SkipLinkProps {
  mainContentId: string;
  label?: string;
  className?: string;
}

// Focus Trap Types
export interface FocusTrapProps {
  children: React.ReactNode;
  active?: boolean;
  initialFocus?: React.RefObject<HTMLElement>;
  returnFocus?: boolean;
  onEscape?: () => void;
}

// Announcement Types
export interface AnnouncementProps {
  message: string;
  politeness?: 'polite' | 'assertive';
  timeout?: number;
}

// Keyboard Navigation Types
export interface KeyboardNavigationProps {
  children: React.ReactNode;
  vertical?: boolean;
  horizontal?: boolean;
  loop?: boolean;
  homeEnd?: boolean;
  typeahead?: boolean;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

// Accessibility Provider Types
export interface AccessibilityContextType {
  announce: (message: string, politeness?: 'polite' | 'assertive') => void;
  reduceMotion: boolean;
  highContrast: boolean;
  largeText: boolean;
  screenReader: boolean;
  toggleReduceMotion: () => void;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  toggleScreenReader: () => void;
}

export interface AccessibilityProviderProps {
  children: React.ReactNode;
  initialState?: {
    reduceMotion?: boolean;
    highContrast?: boolean;
    largeText?: boolean;
    screenReader?: boolean;
  };
}

// Accessibility Checker Types
export interface AccessibilityViolation {
  id: string;
  impact: 'minor' | 'moderate' | 'serious' | 'critical';
  description: string;
  help: string;
  helpUrl: string;
  nodes: {
    html: string;
    target: string[];
  }[];
}

export interface AccessibilityCheckerProps {
  children: React.ReactNode;
  onViolation?: (violations: AccessibilityViolation[]) => void;
  active?: boolean;
}

// Accessibility Preferences Types
export interface AccessibilityPreferencesProps {
  className?: string;
} 