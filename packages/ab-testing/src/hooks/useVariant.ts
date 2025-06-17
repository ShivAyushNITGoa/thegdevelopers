import { useABTestContext } from '../context/ABTestProvider';

/**
 * Hook to check if a specific variant is active
 * 
 * @param testId - Test ID
 * @param variantId - Variant ID to check
 * @returns Whether the specified variant is active
 * 
 * @example
 * ```tsx
 * const isVariantA = useVariant('homepage-hero', 'variant-a');
 * 
 * if (isVariantA) {
 *   return <HeroVariantA />;
 * } else {
 *   return <HeroVariantB />;
 * }
 * ```
 */
export function useVariant(testId: string, variantId: string): boolean {
  const { getVariant } = useABTestContext();
  const activeVariant = getVariant(testId);
  
  return activeVariant === variantId;
} 