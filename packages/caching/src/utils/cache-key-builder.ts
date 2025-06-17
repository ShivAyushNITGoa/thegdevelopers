import { CacheKeyBuilderOptions } from '../types';

/**
 * Build a cache key from parameters
 * 
 * @param params - Parameters to include in the key
 * @param options - Key builder options
 * @returns The generated cache key
 * 
 * @example
 * ```ts
 * const key = buildCacheKey({
 *   path: '/api/products',
 *   id: 123,
 *   query: { sort: 'price', filter: 'active' },
 * });
 * // => "cache:path=/api/products:id=123:query.filter=active:query.sort=price"
 * ```
 */
export function buildCacheKey(
  params: Record<string, any>,
  options: CacheKeyBuilderOptions = {}
): string {
  const {
    prefix = 'cache:',
    includeQueryParams = true,
    excludeQueryParams = [],
    normalize = true,
  } = options;
  
  // Start with prefix
  let key = prefix;
  
  // Sort keys for consistent ordering
  const sortedKeys = Object.keys(params).sort();
  
  // Build key parts
  const parts: string[] = [];
  
  for (const k of sortedKeys) {
    const value = params[k];
    
    // Handle query parameters
    if (k === 'query' && typeof value === 'object' && includeQueryParams) {
      const queryKeys = Object.keys(value).sort();
      
      for (const qk of queryKeys) {
        // Skip excluded query params
        if (excludeQueryParams.includes(qk)) {
          continue;
        }
        
        const queryValue = value[qk];
        
        if (queryValue !== undefined && queryValue !== null) {
          parts.push(`query.${qk}=${serializeValue(queryValue)}`);
        }
      }
    }
    // Handle other parameters
    else if (value !== undefined && value !== null) {
      parts.push(`${k}=${serializeValue(value)}`);
    }
  }
  
  // Join parts
  key += parts.join(':');
  
  // Normalize if needed
  if (normalize) {
    key = normalizeKey(key);
  }
  
  return key;
}

/**
 * Build a cache key for a URL
 * 
 * @param url - URL to build a key for
 * @param options - Key builder options
 * @returns The generated cache key
 * 
 * @example
 * ```ts
 * const key = buildUrlCacheKey('/api/products?sort=price&filter=active');
 * // => "cache:path=/api/products:query.filter=active:query.sort=price"
 * ```
 */
export function buildUrlCacheKey(
  url: string | URL,
  options: CacheKeyBuilderOptions = {}
): string {
  // Parse URL
  const parsedUrl = typeof url === 'string' ? new URL(url, 'http://localhost') : url;
  
  // Extract path and query
  const path = parsedUrl.pathname;
  const query: Record<string, string> = {};
  
  // Parse query parameters
  for (const [key, value] of parsedUrl.searchParams.entries()) {
    // Skip excluded query params
    if (options.excludeQueryParams?.includes(key)) {
      continue;
    }
    
    query[key] = value;
  }
  
  // Build cache key
  return buildCacheKey({ path, query }, options);
}

/**
 * Build a cache key for a request
 * 
 * @param req - Request object
 * @param options - Key builder options
 * @returns The generated cache key
 */
export function buildRequestCacheKey(
  req: any,
  options: CacheKeyBuilderOptions = {}
): string {
  // Extract path
  const path = req.path || req.url || '/';
  
  // Extract query
  const query = req.query || {};
  
  // Extract method
  const method = req.method || 'GET';
  
  // Build cache key
  return buildCacheKey({ path, query, method }, options);
}

/**
 * Serialize a value for inclusion in a cache key
 * 
 * @param value - Value to serialize
 * @returns Serialized value
 */
function serializeValue(value: any): string {
  if (typeof value === 'string') {
    return value;
  }
  
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  
  if (Array.isArray(value)) {
    return value.map(serializeValue).join(',');
  }
  
  if (typeof value === 'object' && value !== null) {
    return JSON.stringify(value);
  }
  
  return String(value);
}

/**
 * Normalize a cache key
 * 
 * @param key - Key to normalize
 * @returns Normalized key
 */
function normalizeKey(key: string): string {
  // Replace multiple colons with a single colon
  key = key.replace(/:{2,}/g, ':');
  
  // Remove trailing colon
  key = key.replace(/:$/, '');
  
  // Replace invalid characters
  key = key.replace(/[^a-zA-Z0-9_:.-]/g, '_');
  
  return key;
} 