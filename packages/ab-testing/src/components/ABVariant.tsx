import React from 'react';
import { useABTestContext } from '../context/ABTestProvider';

export interface ABVariantProps {
  /**
   * Test ID
   */
  testId: string;
  
  /**
   * Variant ID
   */
  variantId: string;
  
  /**
   * Children to render if this variant is active
   */
  children: React.ReactNode;
  
  /**
   * Fallback to render if this variant is not active
   */
  fallback?: React.ReactNode;
}

/**
 * ABVariant component for conditional rendering of a specific variant
 * 
 * @example
 * ```tsx
 * <ABVariant testId="homepage-hero" variantId="variant-a">
 *   <HeroVariantA />
 * </ABVariant>
 * ```
 */
export function ABVariant({
  testId,
  variantId,
  children,
  fallback = null,
}: ABVariantProps) {
  const { getVariant } = useABTestContext();
  const activeVariant = getVariant(testId);
  
  // If this variant is active, render children
  if (activeVariant === variantId) {
    return <>{children}</>;
  }
  
  // Otherwise, render fallback
  return <>{fallback}</>;
} 