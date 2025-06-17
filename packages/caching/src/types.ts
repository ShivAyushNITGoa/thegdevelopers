/**
 * Cache item with metadata
 */
export interface CacheItem<T> {
  /**
   * The cached value
   */
  value: T;
  
  /**
   * Timestamp when the item was cached
   */
  timestamp: number;
  
  /**
   * Cache tags for invalidation
   */
  tags?: string[];
  
  /**
   * Time-to-live in seconds
   */
  ttl?: number;
}

/**
 * Cache options
 */
export interface CacheOptions {
  /**
   * Time-to-live in seconds
   */
  ttl?: number;
  
  /**
   * Cache tags for invalidation
   */
  tags?: string[];
  
  /**
   * Whether to skip the cache
   */
  skipCache?: boolean;
  
  /**
   * Whether to force a cache refresh
   */
  forceRefresh?: boolean;
  
  /**
   * Stale-while-revalidate time in seconds
   */
  staleWhileRevalidate?: number;
}

/**
 * Cache adapter interface
 */
export interface CacheAdapter {
  /**
   * Get a value from the cache
   * 
   * @param key - Cache key
   * @returns The cached value or null if not found
   */
  get<T>(key: string): Promise<CacheItem<T> | null>;
  
  /**
   * Set a value in the cache
   * 
   * @param key - Cache key
   * @param value - Value to cache
   * @param options - Cache options
   */
  set<T>(key: string, value: T, options?: CacheOptions): Promise<void>;
  
  /**
   * Delete a value from the cache
   * 
   * @param key - Cache key
   */
  delete(key: string): Promise<void>;
  
  /**
   * Clear the entire cache
   */
  clear(): Promise<void>;
  
  /**
   * Invalidate cache items by tags
   * 
   * @param tags - Tags to invalidate
   */
  invalidateByTags(tags: string[]): Promise<void>;
  
  /**
   * Check if a key exists in the cache
   * 
   * @param key - Cache key
   * @returns Whether the key exists
   */
  has(key: string): Promise<boolean>;
  
  /**
   * Get multiple values from the cache
   * 
   * @param keys - Cache keys
   * @returns Map of keys to values
   */
  getMany<T>(keys: string[]): Promise<Map<string, CacheItem<T>>>;
  
  /**
   * Set multiple values in the cache
   * 
   * @param items - Map of keys to values
   * @param options - Cache options
   */
  setMany<T>(items: Map<string, T>, options?: CacheOptions): Promise<void>;
  
  /**
   * Delete multiple values from the cache
   * 
   * @param keys - Cache keys
   */
  deleteMany(keys: string[]): Promise<void>;
}

/**
 * Cache manager configuration
 */
export interface CacheManagerConfig {
  /**
   * Default TTL in seconds
   */
  defaultTTL?: number;
  
  /**
   * Whether to enable stale-while-revalidate
   */
  enableStaleWhileRevalidate?: boolean;
  
  /**
   * Default stale-while-revalidate time in seconds
   */
  defaultStaleWhileRevalidate?: number;
  
  /**
   * Whether to enable cache warmup
   */
  enableWarmup?: boolean;
  
  /**
   * Cache prefix
   */
  prefix?: string;
}

/**
 * Cache key builder options
 */
export interface CacheKeyBuilderOptions {
  /**
   * Cache prefix
   */
  prefix?: string;
  
  /**
   * Whether to include query parameters
   */
  includeQueryParams?: boolean;
  
  /**
   * Query parameters to exclude
   */
  excludeQueryParams?: string[];
  
  /**
   * Whether to normalize the key
   */
  normalize?: boolean;
}

/**
 * Cache middleware options
 */
export interface CacheMiddlewareOptions extends CacheOptions {
  /**
   * Custom key builder function
   */
  keyBuilder?: (req: any) => string;
  
  /**
   * Routes to exclude from caching
   */
  excludeRoutes?: string[];
  
  /**
   * HTTP methods to cache
   */
  methods?: string[];
  
  /**
   * Status codes to cache
   */
  statusCodes?: number[];
  
  /**
   * Headers to include in the cache key
   */
  varyByHeaders?: string[];
  
  /**
   * Cookies to include in the cache key
   */
  varyByCookies?: string[];
} 