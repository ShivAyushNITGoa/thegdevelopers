import { CacheAdapter, CacheMiddlewareOptions } from '../types';
import { buildRequestCacheKey } from '../utils/cache-key-builder';

/**
 * Create a cache middleware for Express/Next.js API routes
 * 
 * @param cache - Cache adapter
 * @param options - Middleware options
 * @returns Middleware function
 * 
 * @example
 * ```ts
 * // Express
 * const cache = new MemoryCache();
 * app.use(createCacheMiddleware(cache, { ttl: 60 }));
 * 
 * // Next.js API route
 * export default async function handler(req, res) {
 *   const middleware = createCacheMiddleware(cache, { ttl: 60 });
 *   await middleware(req, res);
 *   
 *   if (res.headersSent) return;
 *   
 *   // Handle request normally if not cached
 *   res.status(200).json({ data: 'example' });
 * }
 * ```
 */
export function createCacheMiddleware(
  cache: CacheAdapter,
  options: CacheMiddlewareOptions = {}
) {
  const {
    ttl = 60,
    tags = [],
    skipCache = false,
    forceRefresh = false,
    keyBuilder,
    excludeRoutes = [],
    methods = ['GET', 'HEAD'],
    statusCodes = [200],
    varyByHeaders = [],
    varyByCookies = [],
  } = options;
  
  return async function cacheMiddleware(req: any, res: any, next?: Function) {
    // Skip if method is not cacheable
    if (!methods.includes(req.method)) {
      return next ? next() : undefined;
    }
    
    // Skip excluded routes
    const path = req.path || req.url || '/';
    if (excludeRoutes.some(route => {
      if (typeof route === 'string') {
        return path === route;
      }
      if (route instanceof RegExp) {
        return route.test(path);
      }
      return false;
    })) {
      return next ? next() : undefined;
    }
    
    // Skip if cache is disabled
    if (skipCache) {
      return next ? next() : undefined;
    }
    
    // Build cache key
    const baseKey = keyBuilder ? keyBuilder(req) : buildRequestCacheKey(req);
    
    // Add vary headers to key
    let varyParts = '';
    if (varyByHeaders.length > 0) {
      for (const header of varyByHeaders) {
        const value = req.headers[header.toLowerCase()];
        if (value) {
          varyParts += `:header.${header}=${value}`;
        }
      }
    }
    
    // Add vary cookies to key
    if (varyByCookies.length > 0) {
      const cookies = parseCookies(req.headers.cookie || '');
      for (const cookie of varyByCookies) {
        const value = cookies[cookie];
        if (value) {
          varyParts += `:cookie.${cookie}=${value}`;
        }
      }
    }
    
    const cacheKey = `${baseKey}${varyParts}`;
    
    // Try to get from cache
    if (!forceRefresh) {
      const cachedResponse = await cache.get(cacheKey);
      
      if (cachedResponse) {
        // Set cache hit header
        res.setHeader('X-Cache', 'HIT');
        
        // Set cached response
        res.status(cachedResponse.value.status);
        
        // Set headers
        for (const [key, value] of Object.entries(cachedResponse.value.headers)) {
          res.setHeader(key, value);
        }
        
        // Send cached body
        res.send(cachedResponse.value.body);
        return;
      }
    }
    
    // Set cache miss header
    res.setHeader('X-Cache', 'MISS');
    
    // Capture the response
    const originalSend = res.send;
    const originalJson = res.json;
    const originalEnd = res.end;
    
    let responseBody: any;
    
    // Override send method
    res.send = function(body: any) {
      responseBody = body;
      
      // Cache the response if status is cacheable
      if (statusCodes.includes(res.statusCode)) {
        const headers: Record<string, any> = {};
        
        // Get headers
        const headerNames = res.getHeaderNames();
        for (const name of headerNames) {
          headers[name] = res.getHeader(name);
        }
        
        // Store in cache
        cache.set(cacheKey, {
          status: res.statusCode,
          headers,
          body,
        }, { ttl, tags });
      }
      
      // Call original method
      return originalSend.call(this, body);
    };
    
    // Override json method
    res.json = function(body: any) {
      return res.send(JSON.stringify(body));
    };
    
    // Override end method
    res.end = function(chunk: any, encoding: string) {
      if (chunk && !responseBody) {
        responseBody = chunk;
        
        // Cache the response if status is cacheable
        if (statusCodes.includes(res.statusCode)) {
          const headers: Record<string, any> = {};
          
          // Get headers
          const headerNames = res.getHeaderNames();
          for (const name of headerNames) {
            headers[name] = res.getHeader(name);
          }
          
          // Store in cache
          cache.set(cacheKey, {
            status: res.statusCode,
            headers,
            body: chunk,
          }, { ttl, tags });
        }
      }
      
      // Call original method
      return originalEnd.call(this, chunk, encoding);
    };
    
    // Continue to next middleware
    if (next) {
      next();
    }
  };
}

/**
 * Parse cookies from a cookie header
 * 
 * @param cookieHeader - Cookie header string
 * @returns Parsed cookies
 */
function parseCookies(cookieHeader: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  
  if (!cookieHeader) {
    return cookies;
  }
  
  cookieHeader.split(';').forEach(cookie => {
    const parts = cookie.split('=');
    const name = parts[0].trim();
    const value = parts[1]?.trim() || '';
    cookies[name] = value;
  });
  
  return cookies;
} 