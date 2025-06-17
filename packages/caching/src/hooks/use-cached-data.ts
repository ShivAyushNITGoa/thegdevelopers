import { useCallback, useEffect, useState } from 'react';
import useSWR, { SWRConfiguration } from 'swr';
import { CacheManager } from '../managers/cache-manager';
import { CacheOptions } from '../types';
import { buildCacheKey } from '../utils/cache-key-builder';

// Default cache manager instance
let defaultCacheManager: CacheManager | null = null;

/**
 * Set the default cache manager
 * 
 * @param cacheManager - Cache manager instance
 */
export function setDefaultCacheManager(cacheManager: CacheManager): void {
  defaultCacheManager = cacheManager;
}

/**
 * Hook options
 */
export interface UseCachedDataOptions extends CacheOptions, SWRConfiguration {
  /**
   * Cache manager to use
   */
  cacheManager?: CacheManager;
  
  /**
   * Whether to use SWR for client-side caching
   */
  useSWR?: boolean;
  
  /**
   * Whether to skip the initial fetch
   */
  skipInitialFetch?: boolean;
}

/**
 * Hook for fetching and caching data
 * 
 * @param key - Cache key or key builder parameters
 * @param fetcher - Function to fetch data
 * @param options - Hook options
 * @returns The cached or fetched data, loading state, error, and refetch function
 * 
 * @example
 * ```tsx
 * const { data, loading, error, refetch } = useCachedData(
 *   { path: '/api/products', id: 123 },
 *   () => fetch('/api/products/123').then(res => res.json()),
 *   { ttl: 60, tags: ['products'] }
 * );
 * ```
 */
export function useCachedData<T>(
  key: string | Record<string, any>,
  fetcher: () => Promise<T>,
  options: UseCachedDataOptions = {}
) {
  const {
    cacheManager = defaultCacheManager,
    useSWR: useSWRFlag = true,
    skipInitialFetch = false,
    skipCache = false,
    forceRefresh = false,
    ttl,
    tags,
    staleWhileRevalidate,
    ...swrOptions
  } = options;
  
  // Ensure there's a cache manager
  if (!cacheManager) {
    throw new Error('No cache manager provided. Use setDefaultCacheManager or provide a cacheManager in options.');
  }
  
  // Generate cache key
  const cacheKey = typeof key === 'string' ? key : buildCacheKey(key);
  
  // State for non-SWR mode
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!skipInitialFetch);
  const [error, setError] = useState<Error | null>(null);
  
  // Fetch function that uses the cache manager
  const fetchWithCache = useCallback(async () => {
    return cacheManager!.get<T>(
      cacheKey,
      fetcher,
      { skipCache, forceRefresh, ttl, tags, staleWhileRevalidate }
    );
  }, [cacheManager, cacheKey, fetcher, skipCache, forceRefresh, ttl, tags, staleWhileRevalidate]);
  
  // Use SWR if enabled
  const swr = useSWR<T | null>(
    useSWRFlag ? cacheKey : null,
    fetchWithCache,
    swrOptions
  );
  
  // Manual fetch for non-SWR mode
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchWithCache();
      setData(result);
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchWithCache]);
  
  // Initial fetch for non-SWR mode
  useEffect(() => {
    if (!useSWRFlag && !skipInitialFetch) {
      fetchData().catch(console.error);
    }
  }, [useSWRFlag, skipInitialFetch, fetchData]);
  
  // Return appropriate values based on mode
  if (useSWRFlag) {
    return {
      data: swr.data,
      loading: swr.isValidating,
      error: swr.error,
      refetch: swr.mutate,
    };
  }
  
  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
} 