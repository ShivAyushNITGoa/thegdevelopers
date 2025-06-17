"use client";

import React, { useEffect, useState } from 'react';

interface AccessibilityCheckerProps {
  enabled?: boolean;
  config?: {
    rules?: string[];
    exclude?: string[];
    includeFrames?: boolean;
    elementRef?: React.RefObject<HTMLElement>;
  };
  onViolationsFound?: (violations: any[]) => void;
  children?: React.ReactNode;
}

/**
 * AccessibilityChecker component for automated accessibility checking
 * 
 * This component uses axe-core to check for accessibility violations in the DOM.
 * It only runs in development mode and logs violations to the console.
 * Can be configured to check specific rules or exclude rules.
 */
export function AccessibilityChecker({
  enabled = process.env.NODE_ENV === 'development',
  config = {},
  onViolationsFound,
  children,
}: AccessibilityCheckerProps) {
  const [violations, setViolations] = useState<any[]>([]);
  
  useEffect(() => {
    // Only run in development mode and if enabled
    if (!enabled || process.env.NODE_ENV !== 'development') {
      return;
    }
    
    // Wait for component to mount and DOM to stabilize
    const timeoutId = setTimeout(() => {
      // Dynamically import axe-core to avoid including it in production bundle
      import('axe-core').then((axe) => {
        const context = config.elementRef?.current || document;
        const axeConfig = {
          rules: config.rules ? config.rules.reduce((acc: any, rule: string) => {
            acc[rule] = { enabled: true };
            return acc;
          }, {}) : undefined,
          exclude: config.exclude || undefined,
        };
        
        // Run the accessibility check
        axe.default.run(context, { 
          ...axeConfig,
          selectors: true,
          frameWaitTime: 20,
          runOnly: config.rules ? { type: 'rule', values: config.rules } : undefined,
        })
        .then((results: any) => {
          if (results.violations.length > 0) {
            const filteredViolations = results.violations;
            
            // Group violations by impact
            const violationsByImpact = {
              critical: filteredViolations.filter((v: any) => v.impact === 'critical'),
              serious: filteredViolations.filter((v: any) => v.impact === 'serious'),
              moderate: filteredViolations.filter((v: any) => v.impact === 'moderate'),
              minor: filteredViolations.filter((v: any) => v.impact === 'minor'),
            };
            
            // Log violations to console
            console.group('Accessibility Violations Found');
            console.log(`Total: ${filteredViolations.length} (${violationsByImpact.critical.length} critical, ${violationsByImpact.serious.length} serious)`);
            
            violationsByImpact.critical.forEach((v: any) => {
              console.groupCollapsed(`%c ${v.id}: ${v.help} - Critical`, 'color: #f00; font-weight: bold');
              console.log('Description:', v.description);
              console.log('Elements:', v.nodes.map((n: any) => n.html));
              console.log('Help URL:', v.helpUrl);
              console.groupEnd();
            });
            
            violationsByImpact.serious.forEach((v: any) => {
              console.groupCollapsed(`%c ${v.id}: ${v.help} - Serious`, 'color: #f90; font-weight: bold');
              console.log('Description:', v.description);
              console.log('Elements:', v.nodes.map((n: any) => n.html));
              console.log('Help URL:', v.helpUrl);
              console.groupEnd();
            });
            
            if (violationsByImpact.moderate.length > 0) {
              console.groupCollapsed(`${violationsByImpact.moderate.length} moderate violations (click to expand)`);
              violationsByImpact.moderate.forEach((v: any) => {
                console.groupCollapsed(`${v.id}: ${v.help}`);
                console.log('Description:', v.description);
                console.log('Help URL:', v.helpUrl);
                console.groupEnd();
              });
              console.groupEnd();
            }
            
            console.groupEnd();
            
            setViolations(filteredViolations);
            
            if (onViolationsFound) {
              onViolationsFound(filteredViolations);
            }
          }
        })
        .catch((error: Error) => {
          console.error('Error running accessibility check:', error);
        });
      }).catch((error) => {
        console.error('Error loading axe-core:', error);
      });
    }, 1000); // Delay to ensure DOM is stable
    
    return () => clearTimeout(timeoutId);
  }, [enabled, config, onViolationsFound]);
  
  // This component doesn't render anything visible
  return <>{children}</>;
} 