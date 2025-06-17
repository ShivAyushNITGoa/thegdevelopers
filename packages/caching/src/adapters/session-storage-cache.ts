//
SessionStorageCache
implementation

import { CacheAdapter, CacheItem, CacheOptions } from '../types';
import { deserializeCacheItem, serializeCacheItem } from '../utils/cache-serializer';

/**
 * SessionStorage cache adapter configuration
 */
export interface SessionStorageCacheConfig {
  /**
   * Key prefix
   */
  prefix?: string;
  
  /**
   * Default TTL in seconds
   */
  defaultTTL?: number;
  
  /**
   * Maximum number of items in the cache
   */
  maxItems?: number;
}

/**
 * SessionStorage cache adapter
 * 
 * @example
 * ```ts
 * const cache = new SessionStorageCache({
 *   prefix: 'app:cache:',
 *   defaultTTL: 3600,
 * });
 * 
 * await cache.set('key', 'value', { ttl: 60 });
 * const value = await cache.get('key');
 * ```
 */
export class SessionStorageCache implements CacheAdapter {
  private prefix: string;
  private defaultTTL: number;
  private maxItems: number;
  private tagIndex: Map<string, Set<string>>;
  
  constructor(config: SessionStorageCacheConfig = {}) {
    const {
      prefix = 'cache:',
      defaultTTL = 3600,
      maxItems = 100,
    } = config;
    
    this.prefix = prefix;
    this.defaultTTL = defaultTTL;
    this.maxItems = maxItems;
    this.tagIndex = new Map();
    
    // Initialize tag index from sessionStorage
    this.initTagIndex();
  }
  
  /**
   * Initialize tag index from sessionStorage
   */
  private initTagIndex(): void {
    if (typeof sessionStorage === 'undefined') {
      return;
    }
    
    try {
      // Scan sessionStorage for items with our prefix
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        
        if (key && key.startsWith(this.prefix)) {
          const data = sessionStorage.getItem(key);
          
          if (data) {
            const item = deserializeCacheItem(data);
            
            if (item && item.tags) {
              const itemKey = key.slice(this.prefix.length);
              
              // Add to tag index
              for (const tag of item.tags) {
                if (!this.tagIndex.has(tag)) {
                  this.tagIndex.set(tag, new Set());
                }
                
                this.tagIndex.get(tag)!.add(itemKey);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error initializing sessionStorage cache tag index:', error);
    }
  }
  
  /**
   * Get full key with prefix
   */
  private getFullKey(key: string): string {
    return `${this.prefix}${key}`;
  }
  
  /**
   * Check if an item has expired
   */
  private isExpired(item: CacheItem<any>): boolean {
    if (!item.ttl) {
      return false;
    }
    
    const now = Date.now();
    const expiresAt = item.timestamp + (item.ttl * 1000);
    
    return now > expiresAt;
  }
  
  /**
   * Enforce cache limits
   */
  private enforceLimits(): void {
    if (typeof sessionStorage === 'undefined') {
      return;
    }
    
    try {
      // Check if we're over the item limit
      const ourItems = Array.from({ length: sessionStorage.length })
        .map((_, i) => sessionStorage.key(i))
        .filter(key => key && key.startsWith(this.prefix)) as string[];
      
      if (ourItems.length > this.maxItems) {
        // Sort by timestamp (oldest first)
        const items = ourItems
          .map(key => {
            const data = sessionStorage.getItem(key);
            if (!data) return { key, timestamp: 0 };
            
            const item = deserializeCacheItem(data);
            return {
              key,
              timestamp: item?.timestamp || 0,
            };
          })
          .sort((a, b) => a.timestamp - b.timestamp);
        
        // Remove oldest items until we're under the limit
        const itemsToRemove = items.slice(0, items.length - this.maxItems);
        for (const { key } of itemsToRemove) {
          sessionStorage.removeItem(key);
        }
      }
    } catch (error) {
      console.error('Error enforcing sessionStorage cache limits:', error);
    }
  }
  
  /**
   * Get a value from the cache
   * 
   * @param key - Cache key
   * @returns The cached value or null if not found
   */
  async get<T>(key: string): Promise<CacheItem<T> | null> {
    if (typeof sessionStorage === 'undefined') {
      return null;
    }
    
    try {
      const fullKey = this.getFullKey(key);
      const data = sessionStorage.getItem(fullKey);
      
      if (!data) {
        return null;
      }
      
      const item = deserializeCacheItem<T>(data);
      
      if (!item) {
        return null;
      }
      
      // Check if the item has expired
      if (this.isExpired(item)) {
        await this.delete(key);
        return null;
      }
      
      return item;
    } catch (error) {
      console.error('sessionStorage cache get error:', error);
      return null;
    }
  }
  
  /**
   * Set a value in the cache
   * 
   * @param key - Cache key
   * @param value - Value to cache
   * @param options - Cache options
   */
  async set<T>(key: string, value: T, options: CacheOptions = {}): Promise<void> {
    if (typeof sessionStorage === 'undefined') {
      return;
    }
    
    try {
      const { ttl = this.defaultTTL, tags = [] } = options;
      
      const fullKey = this.getFullKey(key);
      const item: CacheItem<T> = {
        value,
        timestamp: Date.now(),
        ttl,
        tags,
      };
      
      const serialized = serializeCacheItem(item);
      
      // Remove from old tag index if exists
      const oldData = sessionStorage.getItem(fullKey);
      if (oldData) {
        const oldItem = deserializeCacheItem(oldData);
        
        if (oldItem && oldItem.tags) {
          for (const tag of oldItem.tags) {
            const tagSet = this.tagIndex.get(tag);
            
            if (tagSet) {
              tagSet.delete(key);
              
              if (tagSet.size === 0) {
                this.tagIndex.delete(tag);
              }
            }
          }
        }
      }
      
      // Set the value
      sessionStorage.setItem(fullKey, serialized);
      
      // Update tag index
      for (const tag of tags) {
        if (!this.tagIndex.has(tag)) {
          this.tagIndex.set(tag, new Set());
        }
        
        this.tagIndex.get(tag)!.add(key);
      }
      
      // Enforce cache limits
      this.enforceLimits();
    } catch (error) {
      console.error('sessionStorage cache set error:', error);
    }
  }
  
  /**
   * Delete a value from the cache
   * 
   * @param key - Cache key
   */
  async delete(key: string): Promise<void> {
    if (typeof sessionStorage === 'undefined') {
      return;
    }
    
    try {
      const fullKey = this.getFullKey(key);
      
      // Get item to check for tags
      const data = sessionStorage.getItem(fullKey);
      if (data) {
        const item = deserializeCacheItem(data);
        
        if (item && item.tags) {
          // Remove key from tag index
          for (const tag of item.tags) {
            const tagSet = this.tagIndex.get(tag);
            
            if (tagSet) {
              tagSet.delete(key);
              
              if (tagSet.size === 0) {
                this.tagIndex.delete(tag);
              }
            }
          }
        }
      }
      
      // Remove the item
      sessionStorage.removeItem(fullKey);
    } catch (error) {
      console.error('sessionStorage cache delete error:', error);
    }
  }
  
  /**
   * Clear the entire cache
   */
  async clear(): Promise<void> {
    if (typeof sessionStorage === 'undefined') {
      return;
    }
    
    try {
      // Get all keys with our prefix
      const keys: string[] = [];
      
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        
        if (key && key.startsWith(this.prefix)) {
          keys.push(key);
        }
      }
      
      // Remove all items
      for (const key of keys) {
        sessionStorage.removeItem(key);
      }
      
      // Clear tag index
      this.tagIndex.clear();
    } catch (error) {
      console.error('sessionStorage cache clear error:', error);
    }
  }
  
  /**
   * Invalidate cache items by tags
   * 
   * @param tags - Tags to invalidate
   */
  async invalidateByTags(tags: string[]): Promise<void> {
    if (typeof sessionStorage === 'undefined') {
      return;
    }
    
    try {
      const keysToDelete = new Set<string>();
      
      // Collect keys to delete
      for (const tag of tags) {
        const tagSet = this.tagIndex.get(tag);
        
        if (tagSet) {
          for (const key of tagSet) {
            keysToDelete.add(key);
          }
          
          // Remove tag from index
          this.tagIndex.delete(tag);
        }
      }
      
      // Delete collected keys
      for (const key of keysToDelete) {
        const fullKey = this.getFullKey(key);
        sessionStorage.removeItem(fullKey);
      }
    } catch (error) {
      console.error('sessionStorage cache invalidateByTags error:', error);
    }
  }
  
  /**
   * Check if a key exists in the cache
   * 
   * @param key - Cache key
   * @returns Whether the key exists
   */
  async has(key: string): Promise<boolean> {
    if (typeof sessionStorage === 'undefined') {
      return false;
    }
    
    try {
      const item = await this.get(key);
      return item !== null;
    } catch (error) {
      console.error('sessionStorage cache has error:', error);
      return false;
    }
  }
  
  /**
   * Get multiple values from the cache
   * 
   * @param keys - Cache keys
   * @returns Map of keys to values
   */
  async getMany<T>(keys: string[]): Promise<Map<string, CacheItem<T>>> {
    if (typeof sessionStorage === 'undefined') {
      return new Map();
    }
    
    try {
      const result = new Map<string, CacheItem<T>>();
      
      for (const key of keys) {
        const item = await this.get<T>(key);
        
        if (item) {
          result.set(key, item);
        }
      }
      
      return result;
    } catch (error) {
      console.error('sessionStorage cache getMany error:', error);
      return new Map();
    }
  }
  
  /**
   * Set multiple values in the cache
   * 
   * @param items - Map of keys to values
   * @param options - Cache options
   */
  async setMany<T>(items: Map<string, T>, options: CacheOptions = {}): Promise<void> {
    if (typeof sessionStorage === 'undefined') {
      return;
    }
    
    try {
      for (const [key, value] of items.entries()) {
        await this.set(key, value, options);
      }
    } catch (error) {
      console.error('sessionStorage cache setMany error:', error);
    }
  }
  
  /**
   * Delete multiple values from the cache
   * 
   * @param keys - Cache keys
   */
  async deleteMany(keys: string[]): Promise<void> {
    if (typeof sessionStorage === 'undefined') {
      return;
    }
    
    try {
      for (const key of keys) {
        await this.delete(key);
      }
    } catch (error) {
      console.error('sessionStorage cache deleteMany error:', error);
    }
  }
}
