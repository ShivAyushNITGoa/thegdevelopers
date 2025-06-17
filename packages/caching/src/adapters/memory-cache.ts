import { LRUCache } from 'lru-cache';
import { CacheAdapter, CacheItem, CacheOptions } from '../types';

/**
 * Memory cache adapter configuration
 */
export interface MemoryCacheConfig {
  /**
   * Maximum number of items in the cache
   */
  maxItems?: number;
  
  /**
   * Default TTL in seconds
   */
  defaultTTL?: number;
  
  /**
   * Whether to update TTL on access
   */
  updateAgeOnGet?: boolean;
}

/**
 * Memory cache adapter using LRU cache
 * 
 * @example
 * ```ts
 * const cache = new MemoryCache({
 *   maxItems: 1000,
 *   defaultTTL: 3600,
 * });
 * 
 * await cache.set('key', 'value', { ttl: 60 });
 * const value = await cache.get('key');
 * ```
 */
export class MemoryCache implements CacheAdapter {
  private cache: LRUCache<string, CacheItem<any>>;
  private tagIndex: Map<string, Set<string>>;
  
  constructor(config: MemoryCacheConfig = {}) {
    const {
      maxItems = 1000,
      defaultTTL = 3600,
      updateAgeOnGet = true,
    } = config;
    
    this.cache = new LRUCache({
      max: maxItems,
      ttl: defaultTTL * 1000, // Convert to milliseconds
      updateAgeOnGet,
    });
    
    this.tagIndex = new Map();
  }
  
  /**
   * Get a value from the cache
   * 
   * @param key - Cache key
   * @returns The cached value or null if not found
   */
  async get<T>(key: string): Promise<CacheItem<T> | null> {
    const item = this.cache.get(key) as CacheItem<T> | undefined;
    
    if (!item) {
      return null;
    }
    
    // Check if the item has expired
    if (item.ttl && Date.now() - item.timestamp > item.ttl * 1000) {
      await this.delete(key);
      return null;
    }
    
    return item;
  }
  
  /**
   * Set a value in the cache
   * 
   * @param key - Cache key
   * @param value - Value to cache
   * @param options - Cache options
   */
  async set<T>(key: string, value: T, options: CacheOptions = {}): Promise<void> {
    const { ttl, tags = [] } = options;
    
    const item: CacheItem<T> = {
      value,
      timestamp: Date.now(),
      ttl,
      tags,
    };
    
    // Set the item in the cache
    this.cache.set(key, item as CacheItem<any>, {
      ttl: ttl ? ttl * 1000 : undefined, // Convert to milliseconds
    });
    
    // Update tag index
    for (const tag of tags) {
      if (!this.tagIndex.has(tag)) {
        this.tagIndex.set(tag, new Set());
      }
      this.tagIndex.get(tag)!.add(key);
    }
  }
  
  /**
   * Delete a value from the cache
   * 
   * @param key - Cache key
   */
  async delete(key: string): Promise<void> {
    const item = this.cache.get(key);
    
    if (item && item.tags) {
      // Remove key from tag index
      for (const tag of item.tags) {
        const keys = this.tagIndex.get(tag);
        if (keys) {
          keys.delete(key);
          if (keys.size === 0) {
            this.tagIndex.delete(tag);
          }
        }
      }
    }
    
    this.cache.delete(key);
  }
  
  /**
   * Clear the entire cache
   */
  async clear(): Promise<void> {
    this.cache.clear();
    this.tagIndex.clear();
  }
  
  /**
   * Invalidate cache items by tags
   * 
   * @param tags - Tags to invalidate
   */
  async invalidateByTags(tags: string[]): Promise<void> {
    const keysToDelete = new Set<string>();
    
    // Collect keys to delete
    for (const tag of tags) {
      const keys = this.tagIndex.get(tag);
      if (keys) {
        for (const key of keys) {
          keysToDelete.add(key);
        }
        this.tagIndex.delete(tag);
      }
    }
    
    // Delete collected keys
    for (const key of keysToDelete) {
      this.cache.delete(key);
    }
  }
  
  /**
   * Check if a key exists in the cache
   * 
   * @param key - Cache key
   * @returns Whether the key exists
   */
  async has(key: string): Promise<boolean> {
    return this.cache.has(key);
  }
  
  /**
   * Get multiple values from the cache
   * 
   * @param keys - Cache keys
   * @returns Map of keys to values
   */
  async getMany<T>(keys: string[]): Promise<Map<string, CacheItem<T>>> {
    const result = new Map<string, CacheItem<T>>();
    
    for (const key of keys) {
      const item = await this.get<T>(key);
      if (item) {
        result.set(key, item);
      }
    }
    
    return result;
  }
  
  /**
   * Set multiple values in the cache
   * 
   * @param items - Map of keys to values
   * @param options - Cache options
   */
  async setMany<T>(items: Map<string, T>, options: CacheOptions = {}): Promise<void> {
    for (const [key, value] of items.entries()) {
      await this.set(key, value, options);
    }
  }
  
  /**
   * Delete multiple values from the cache
   * 
   * @param keys - Cache keys
   */
  async deleteMany(keys: string[]): Promise<void> {
    for (const key of keys) {
      await this.delete(key);
    }
  }
} 