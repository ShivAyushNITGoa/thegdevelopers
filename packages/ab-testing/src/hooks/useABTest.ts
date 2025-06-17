import { useEffect } from 'react';
import { useABTestContext } from '../context/ABTestProvider';
import { TrackingOptions } from '../types';

/**
 * Hook for using A/B tests in functional components
 * 
 * @param testId - Test ID
 * @param defaultVariant - Default variant ID to use if no variant is assigned
 * @param trackExposure - Whether to track exposure when the hook is called
 * @param trackingOptions - Tracking options
 * @returns The assigned variant ID
 * 
 * @example
 * ```tsx
 * const variantId = useABTest('homepage-hero');
 * 
 * if (variantId === 'variant-a') {
 *   return <HeroVariantA />;
 * } else {
 *   return <HeroVariantB />;
 * }
 * ```
 */
export function useABTest(
  testId: string,
  defaultVariant: string = 'control',
  trackExposure: boolean = true,
  trackingOptions: TrackingOptions = {}
): string {
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
  
  return variantId;
} 