import React, { useEffect } from 'react';
import { useABTestContext } from '../context/ABTestProvider';
import { TrackingOptions } from '../types';

export interface ABTestProps {
  /**
   * Test ID
   */
  testId: string;
  
  /**
   * Default variant ID to show if no variant is assigned
   */
  defaultVariant?: string;
  
  /**
   * Whether to track exposure when the component mounts
   */
  trackExposure?: boolean;
  
  /**
   * Tracking options
   */
  trackingOptions?: TrackingOptions;
  
  /**
   * Render prop function
   */
  children: (variantId: string) => React.ReactNode;
}

/**
 * ABTest component for conditional rendering based on A/B test variant
 * 
 * @example
 * ```tsx
 * <ABTest testId="homepage-hero">
 *   {(variantId) => {
 *     if (variantId === 'variant-a') {
 *       return <HeroVariantA />;
 *     } else {
 *       return <HeroVariantB />;
 *     }
 *   }}
 * </ABTest>
 * ```
 */
export function ABTest({
  testId,
  defaultVariant = 'control',
  trackExposure = true,
  trackingOptions = {},
  children,
}: ABTestProps) {
  const { getVariant, trackEvent } = useABTestContext();
  const variantId = getVariant(testId) || defaultVariant;
  
  // Track exposure on mount
  useEffect(() => {
    if (trackExposure) {
      trackEvent({
        type: 'exposure',
        testId,
        variantId,
        metadata: trackingOptions.metadata,
      });
    }
  }, [testId, variantId, trackExposure, trackEvent, trackingOptions.metadata]);
  
  return <>{children(variantId)}</>;
} 