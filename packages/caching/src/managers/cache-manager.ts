import { CacheAdapter, CacheItem, CacheManagerConfig, CacheOptions } from '../types';
import { buildCacheKey } from '../utils/cache-key-builder';

/**
 * Cache manager for handling multiple cache adapters
 * 
 * @example
 * ```ts
 * const memoryCache = new MemoryCache();
 * const redisCache = new RedisCache();
 * 
 * const cacheManager = new CacheManager({
 *   adapters: [memoryCache, redisCache],
 *   defaultTTL: 3600,
 * });
 * 
 * await cacheManager.set('key', 'value');
 * const value = await cacheManager.get('key');
 * ```
 */
export class CacheManager {
  private adapters: CacheAdapter[];
  private config: CacheManagerConfig;
  private warmupQueue: Map<string, Promise<any>>;
  
  constructor(
    adapters: CacheAdapter | CacheAdapter[],
    config: CacheManagerConfig = {}
  ) {
    this.adapters = Array.isArray(adapters) ? adapters : [adapters];
    this.config = {
      defaultTTL: 3600,
      enableStaleWhileRevalidate: true,
      defaultStaleWhileRevalidate: 300,
      enableWarmup: false,
      prefix: 'cache:',
      ...config,
    };
    this.warmupQueue = new Map();
  }
  
  /**
   * Get a value from the cache
   * 
   * @param key - Cache key or key builder parameters
   * @param fetchFn - Function to fetch data if not in cache
   * @param options - Cache options
   * @returns The cached or fetched value
   */
  async get<T>(
    key: string | Record<string, any>,
    fetchFn?: () => Promise<T>,
    options: CacheOptions = {}
  ): Promise<T | null> {
    const cacheKey = typeof key === 'string' ? key : buildCacheKey(key, {
      prefix: this.config.prefix,
    });
    
    const {
      skipCache = false,
      forceRefresh = false,
      ttl = this.config.defaultTTL,
      staleWhileRevalidate = this.config.defaultStaleWhileRevalidate,
    } = options;
    
    // Skip cache if requested
    if (skipCache && fetchFn) {
      const value = await fetchFn();
      return value;
    }
    
    // Try to get from cache
    if (!forceRefresh) {
      for (const adapter of this.adapters) {
        const cacheItem = await adapter.get<T>(cacheKey);
        
        if (cacheItem) {
          const now = Date.now();
          const age = now - cacheItem.timestamp;
          const isStale = ttl && age > ttl * 1000;
          
          // If stale but within stale-while-revalidate window, refresh in background
          if (
            isStale &&
            this.config.enableStaleWhileRevalidate &&
            staleWhileRevalidate &&
            age <= (ttl + staleWhileRevalidate) * 1000 &&
            fetchFn
          ) {
            this.refreshInBackground(cacheKey, fetchFn, options);
          }
          
          // Return cached value even if stale
          return cacheItem.value;
        }
      }
    }
    
    // If no cached value or force refresh, fetch and cache
    if (fetchFn) {
      return this.fetchAndCache(cacheKey, fetchFn, options);
    }
    
    return null;
  }
  
  /**
   * Set a value in the cache
   * 
   * @param key - Cache key or key builder parameters
   * @param value - Value to cache
   * @param options - Cache options
   */
  async set<T>(
    key: string | Record<string, any>,
    value: T,
    options: CacheOptions = {}
  ): Promise<void> {
    const cacheKey = typeof key === 'string' ? key : buildCacheKey(key, {
      prefix: this.config.prefix,
    });
    
    const {
      ttl = this.config.defaultTTL,
      tags = [],
    } = options;
    
    for (const adapter of this.adapters) {
      await adapter.set(cacheKey, value, { ttl, tags });
    }
  }
  
  /**
   * Delete a value from the cache
   * 
   * @param key - Cache key or key builder parameters
   */
  async delete(key: string | Record<string, any>): Promise<void> {
    const cacheKey = typeof key === 'string' ? key : buildCacheKey(key, {
      prefix: this.config.prefix,
    });
    
    for (const adapter of this.adapters) {
      await adapter.delete(cacheKey);
    }
  }
  
  /**
   * Clear the entire cache
   */
  async clear(): Promise<void> {
    for (const adapter of this.adapters) {
      await adapter.clear();
    }
  }
  
  /**
   * Invalidate cache items by tags
   * 
   * @param tags - Tags to invalidate
   */
  async invalidateByTags(tags: string[]): Promise<void> {
    for (const adapter of this.adapters) {
      await adapter.invalidateByTags(tags);
    }
  }
  
  /**
   * Check if a key exists in any cache
   * 
   * @param key - Cache key or key builder parameters
   * @returns Whether the key exists
   */
  async has(key: string | Record<string, any>): Promise<boolean> {
    const cacheKey = typeof key === 'string' ? key : buildCacheKey(key, {
      prefix: this.config.prefix,
    });
    
    for (const adapter of this.adapters) {
      if (await adapter.has(cacheKey)) {
        return true;
      }
    }
    
    return false;
  }
  
  /**
   * Fetch data and cache it
   * 
   * @param key - Cache key
   * @param fetchFn - Function to fetch data
   * @param options - Cache options
   * @returns The fetched value
   */
  private async fetchAndCache<T>(
    key: string,
    fetchFn: () => Promise<T>,
    options: CacheOptions = {}
  ): Promise<T> {
    // Check if there's already a fetch in progress for this key
    if (this.warmupQueue.has(key)) {
      return this.warmupQueue.get(key) as Promise<T>;
    }
    
    // Create a new fetch promise
    const fetchPromise = fetchFn().then(value => {
      // Cache the value
      this.set(key, value, options);
      
      // Remove from warmup queue
      this.warmupQueue.delete(key);
      
      return value;
    }).catch(error => {
      // Remove from warmup queue on error
      this.warmupQueue.delete(key);
      throw error;
    });
    
    // Add to warmup queue
    this.warmupQueue.set(key, fetchPromise);
    
    return fetchPromise;
  }
  
  /**
   * Refresh a cache item in the background
   * 
   * @param key - Cache key
   * @param fetchFn - Function to fetch data
   * @param options - Cache options
   */
  private refreshInBackground<T>(
    key: string,
    fetchFn: () => Promise<T>,
    options: CacheOptions = {}
  ): void {
    // Skip if already in warmup queue
    if (this.warmupQueue.has(key)) {
      return;
    }
    
    // Create a new fetch promise
    const fetchPromise = fetchFn().then(value => {
      // Cache the value
      this.set(key, value, options);
      
      // Remove from warmup queue
      this.warmupQueue.delete(key);
      
      return value;
    }).catch(error => {
      // Remove from warmup queue on error
      this.warmupQueue.delete(key);
      console.error(`Error refreshing cache for key ${key}:`, error);
    });
    
    // Add to warmup queue
    this.warmupQueue.set(key, fetchPromise);
  }
} 