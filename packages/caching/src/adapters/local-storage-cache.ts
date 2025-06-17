//
localStorage
cache
adapter

import { CacheAdapter, CacheItem, CacheOptions } from '../types';
import { deserializeCacheItem, serializeCacheItem } from '../utils/cache-serializer';

/**
 * localStorage cache adapter configuration
 */
export interface LocalStorageCacheConfig {
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
  
  /**
   * Maximum size of the cache in bytes
   */
  maxSize?: number;
}

/**
 * localStorage cache adapter
 * 
 * @example
 * ```ts
 * const cache = new LocalStorageCache({
 *   prefix: 'app:cache:',
 *   defaultTTL: 3600,
 * });
 * 
 * await cache.set('key', 'value', { ttl: 60 });
 * const value = await cache.get('key');
 * ```
 */
export class LocalStorageCache implements CacheAdapter {
  private prefix: string;
  private defaultTTL: number;
  private maxItems: number;
  private maxSize: number;
  private tagIndex: Map<string, Set<string>>;
  
  constructor(config: LocalStorageCacheConfig = {}) {
    const {
      prefix = 'cache:',
      defaultTTL = 3600,
      maxItems = 100,
      maxSize = 5 * 1024 * 1024, // 5MB
    } = config;
    
    this.prefix = prefix;
    this.defaultTTL = defaultTTL;
    this.maxItems = maxItems;
    this.maxSize = maxSize;
    this.tagIndex = new Map();
    
    // Initialize tag index from localStorage
    this.initTagIndex();
  }
  
  /**
   * Initialize tag index from localStorage
   */
  private initTagIndex(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }
    
    try {
      // Scan localStorage for items with our prefix
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        
        if (key && key.startsWith(this.prefix)) {
          const data = localStorage.getItem(key);
          
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
      console.error('Error initializing localStorage cache tag index:', error);
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
    if (typeof localStorage === 'undefined') {
      return;
    }
    
    try {
      // Check if we're over the item limit
      const ourItems = Array.from({ length: localStorage.length })
        .map((_, i) => localStorage.key(i))
        .filter(key => key && key.startsWith(this.prefix)) as string[];
      
      if (ourItems.length > this.maxItems) {
        // Sort by timestamp (oldest first)
        const items = ourItems
          .map(key => {
            const data = localStorage.getItem(key);
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
          localStorage.removeItem(key);
        }
      }
      
      // Check if we're over the size limit
      let totalSize = 0;
      const sizeItems: { key: string; size: number; timestamp: number }[] = [];
      
      for (const key of ourItems) {
        const data = localStorage.getItem(key);
        if (data) {
          const size = new Blob([data]).size;
          totalSize += size;
          
          const item = deserializeCacheItem(data);
          sizeItems.push({
            key,
            size,
            timestamp: item?.timestamp || 0,
          });
        }
      }
      
      if (totalSize > this.maxSize) {
        // Sort by timestamp (oldest first)
        sizeItems.sort((a, b) => a.timestamp - b.timestamp);
        
        // Remove oldest items until we're under the limit
        let currentSize = totalSize;
        for (const { key, size } of sizeItems) {
          if (currentSize <= this.maxSize) {
            break;
          }
          
          localStorage.removeItem(key);
          currentSize -= size;
        }
      }
    } catch (error) {
      console.error('Error enforcing localStorage cache limits:', error);
    }
  }
  
  /**
   * Get a value from the cache
   * 
   * @param key - Cache key
   * @returns The cached value or null if not found
   */
  async get<T>(key: string): Promise<CacheItem<T> | null> {
    if (typeof localStorage === 'undefined') {
      return null;
    }
    
    try {
      const fullKey = this.getFullKey(key);
      const data = localStorage.getItem(fullKey);
      
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
      console.error('localStorage cache get error:', error);
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
    if (typeof localStorage === 'undefined') {
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
      const oldData = localStorage.getItem(fullKey);
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
      localStorage.setItem(fullKey, serialized);
      
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
      console.error('localStorage cache set error:', error);
      
      // If we get a quota error, try to clear some space
      if (error instanceof DOMException && (
        error.name === 'QuotaExceededError' ||
        error.name === 'NS_ERROR_DOM_QUOTA_REACHED'
      )) {
        try {
          // Remove expired items
          if (typeof localStorage !== 'undefined') {
            for (let i = 0; i < localStorage.length; i++) {
              const key = localStorage.key(i);
              
              if (key && key.startsWith(this.prefix)) {
                const data = localStorage.getItem(key);
                
                if (data) {
                  const item = deserializeCacheItem(data);
                  
                  if (item && this.isExpired(item)) {
                    localStorage.removeItem(key);
                  }
                }
              }
            }
          }
        } catch (clearError) {
          console.error('Error clearing expired localStorage items:', clearError);
        }
      }
    }
  }
  
  /**
   * Delete a value from the cache
   * 
   * @param key - Cache key
   */
  async delete(key: string): Promise<void> {
    if (typeof localStorage === 'undefined') {
      return;
    }
    
    try {
      const fullKey = this.getFullKey(key);
      
      // Get item to check for tags
      const data = localStorage.getItem(fullKey);
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
      localStorage.removeItem(fullKey);
    } catch (error) {
      console.error('localStorage cache delete error:', error);
    }
  }
  
  /**
   * Clear the entire cache
   */
  async clear(): Promise<void> {
    if (typeof localStorage === 'undefined') {
      return;
    }
    
    try {
      // Get all keys with our prefix
      const keys: string[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        
        if (key && key.startsWith(this.prefix)) {
          keys.push(key);
        }
      }
      
      // Remove all items
      for (const key of keys) {
        localStorage.removeItem(key);
      }
      
      // Clear tag index
      this.tagIndex.clear();
    } catch (error) {
      console.error('localStorage cache clear error:', error);
    }
  }
  
  /**
   * Invalidate cache items by tags
   * 
   * @param tags - Tags to invalidate
   */
  async invalidateByTags(tags: string[]): Promise<void> {
    if (typeof localStorage === 'undefined') {
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
        localStorage.removeItem(fullKey);
      }
    } catch (error) {
      console.error('localStorage cache invalidateByTags error:', error);
    }
  }
  
  /**
   * Check if a key exists in the cache
   * 
   * @param key - Cache key
   * @returns Whether the key exists
   */
  async has(key: string): Promise<boolean> {
    if (typeof localStorage === 'undefined') {
      return false;
    }
    
    try {
      const item = await this.get(key);
      return item !== null;
    } catch (error) {
      console.error('localStorage cache has error:', error);
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
    if (typeof localStorage === 'undefined') {
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
      console.error('localStorage cache getMany error:', error);
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
    if (typeof localStorage === 'undefined') {
      return;
    }
    
    try {
      for (const [key, value] of items.entries()) {
        await this.set(key, value, options);
      }
    } catch (error) {
      console.error('localStorage cache setMany error:', error);
    }
  }
  
  /**
   * Delete multiple values from the cache
   * 
   * @param keys - Cache keys
   */
  async deleteMany(keys: string[]): Promise<void> {
    if (typeof localStorage === 'undefined') {
      return;
    }
    
    try {
      for (const key of keys) {
        await this.delete(key);
      }
    } catch (error) {
      console.error('localStorage cache deleteMany error:', error);
    }
  }
}
