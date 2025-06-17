//
Cache
invalidation
hook

import { useCallback } from 'react';
import { CacheAdapter } from '../types';

/**
 * Hook options
 */
export interface UseCacheInvalidationOptions {
  /**
   * Cache adapter to use
   */
  cacheAdapter: CacheAdapter;
  
  /**
   * Default tags to invalidate
   */
  defaultTags?: string[];
}

/**
 * Hook for invalidating cache entries
 * 
 * @param options - Hook options
 * @returns Functions for invalidating cache entries
 * 
 * @example
 * ```tsx
 * const { invalidateByTags, invalidateByKey, clearAll } = useCacheInvalidation({
 *   cacheAdapter: memoryCache,
 *   defaultTags: ['products'],
 * });
 * 
 * // Later in your code
 * invalidateByTags(['products']);
 * ```
 */
export function useCacheInvalidation(options: UseCacheInvalidationOptions) {
  const { cacheAdapter, defaultTags = [] } = options;
  
  /**
   * Invalidate cache entries by tags
   */
  const invalidateByTags = useCallback(
    async (tags: string[] = defaultTags) => {
      return cacheAdapter.invalidateByTags(tags);
    },
    [cacheAdapter, defaultTags]
  );
  
  /**
   * Invalidate a specific cache entry by key
   */
  const invalidateByKey = useCallback(
    async (key: string) => {
      return cacheAdapter.delete(key);
    },
    [cacheAdapter]
  );
  
  /**
   * Invalidate multiple cache entries by keys
   */
  const invalidateByKeys = useCallback(
    async (keys: string[]) => {
      return cacheAdapter.deleteMany(keys);
    },
    [cacheAdapter]
  );
  
  /**
   * Clear all cache entries
   */
  const clearAll = useCallback(
    async () => {
      return cacheAdapter.clear();
    },
    [cacheAdapter]
  );
  
  /**
   * Check if a key exists in the cache
   */
  const hasKey = useCallback(
    async (key: string) => {
      return cacheAdapter.has(key);
    },
    [cacheAdapter]
  );
  
  return {
    invalidateByTags,
    invalidateByKey,
    invalidateByKeys,
    clearAll,
    hasKey,
  };
}
