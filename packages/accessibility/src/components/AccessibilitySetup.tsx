import React, { ReactNode } from 'react';
import { AccessibilityProvider } from '../context/AccessibilityProvider';
import { AccessibilityChecker } from './AccessibilityChecker';
import { SkipLink } from './SkipLink';

interface SkipLinkConfig {
  id: string;
  label: string;
}

interface AccessibilitySetupProps {
  children: ReactNode;
  skipLinks?: SkipLinkConfig[];
  enableChecker?: boolean;
  checkConfig?: {
    rules?: string[];
    exclude?: string[];
  };
}

/**
 * AccessibilitySetup component
 * 
 * This is a convenience component that combines multiple accessibility features:
 * - AccessibilityProvider for context management
 * - SkipLinks for keyboard navigation
 * - AccessibilityChecker for automated accessibility checking in dev mode
 *
 * Use this component near the root of your application to set up all accessibility features.
 */
export function AccessibilitySetup({
  children,
  skipLinks = [{ id: 'main-content', label: 'Skip to main content' }],
  enableChecker = process.env.NODE_ENV === 'development',
  checkConfig,
}: AccessibilitySetupProps) {
  return (
    <AccessibilityProvider>
      <div className="accessibility-setup">
        {skipLinks.map((link) => (
          <SkipLink key={link.id} id={link.id}>
            {link.label}
          </SkipLink>
        ))}
        
        <AccessibilityChecker
          enabled={enableChecker}
          config={checkConfig}
        >
          {children}
        </AccessibilityChecker>
      </div>
    </AccessibilityProvider>
  );
} 