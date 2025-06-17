//
Redis
cache
adapter

import { createClient, RedisClientType } from 'redis';
import { CacheAdapter, CacheItem, CacheOptions } from '../types';
import { deserializeCacheItem, serializeCacheItem } from '../utils/cache-serializer';

/**
 * Redis cache adapter configuration
 */
export interface RedisCacheConfig {
  /**
   * Redis URL
   */
  url?: string;
  
  /**
   * Redis host
   */
  host?: string;
  
  /**
   * Redis port
   */
  port?: number;
  
  /**
   * Redis password
   */
  password?: string;
  
  /**
   * Redis database
   */
  db?: number;
  
  /**
   * Key prefix
   */
  prefix?: string;
  
  /**
   * Default TTL in seconds
   */
  defaultTTL?: number;
  
  /**
   * Existing Redis client
   */
  client?: RedisClientType;
}

/**
 * Redis cache adapter
 * 
 * @example
 * ```ts
 * const cache = new RedisCache({
 *   url: 'redis://localhost:6379',
 *   prefix: 'app:cache:',
 *   defaultTTL: 3600,
 * });
 * 
 * await cache.set('key', 'value', { ttl: 60 });
 * const value = await cache.get('key');
 * ```
 */
export class RedisCache implements CacheAdapter {
  private client: RedisClientType;
  private prefix: string;
  private defaultTTL: number;
  private isConnected: boolean = false;
  private connecting: Promise<void> | null = null;
  
  constructor(config: RedisCacheConfig = {}) {
    const {
      url = 'redis://localhost:6379',
      host = 'localhost',
      port = 6379,
      password,
      db = 0,
      prefix = 'cache:',
      defaultTTL = 3600,
      client,
    } = config;
    
    this.prefix = prefix;
    this.defaultTTL = defaultTTL;
    
    // Use provided client or create a new one
    if (client) {
      this.client = client;
      this.isConnected = true;
    } else {
      this.client = createClient({
        url: url || `redis://${host}:${port}`,
        password,
        database: db,
      });
      
      // Set up event handlers
      this.client.on('error', (err) => {
        console.error('Redis cache error:', err);
      });
      
      this.client.on('connect', () => {
        this.isConnected = true;
      });
      
      this.client.on('end', () => {
        this.isConnected = false;
      });
    }
  }
  
  /**
   * Ensure the client is connected
   */
  private async ensureConnection(): Promise<void> {
    if (this.isConnected) {
      return;
    }
    
    if (this.connecting) {
      return this.connecting;
    }
    
    this.connecting = this.client.connect();
    await this.connecting;
    this.connecting = null;
  }
  
  /**
   * Get full key with prefix
   */
  private getFullKey(key: string): string {
    return `${this.prefix}${key}`;
  }
  
  /**
   * Get tag key
   */
  private getTagKey(tag: string): string {
    return `${this.prefix}tag:${tag}`;
  }
  
  /**
   * Get a value from the cache
   * 
   * @param key - Cache key
   * @returns The cached value or null if not found
   */
  async get<T>(key: string): Promise<CacheItem<T> | null> {
    try {
      await this.ensureConnection();
      
      const fullKey = this.getFullKey(key);
      const data = await this.client.get(fullKey);
      
      if (!data) {
        return null;
      }
      
      return deserializeCacheItem<T>(data);
    } catch (error) {
      console.error('Redis cache get error:', error);
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
    try {
      await this.ensureConnection();
      
      const { ttl = this.defaultTTL, tags = [] } = options;
      
      const fullKey = this.getFullKey(key);
      const item: CacheItem<T> = {
        value,
        timestamp: Date.now(),
        ttl,
        tags,
      };
      
      const serialized = serializeCacheItem(item);
      
      // Use multi to ensure atomic operations
      const multi = this.client.multi();
      
      // Set the value with TTL
      multi.set(fullKey, serialized);
      if (ttl) {
        multi.expire(fullKey, ttl);
      }
      
      // Add key to tag sets
      for (const tag of tags) {
        const tagKey = this.getTagKey(tag);
        multi.sAdd(tagKey, fullKey);
        
        // Set TTL on tag if not exists
        multi.expire(tagKey, ttl * 2); // Double TTL for tags to ensure they outlive the values
      }
      
      await multi.exec();
    } catch (error) {
      console.error('Redis cache set error:', error);
    }
  }
  
  /**
   * Delete a value from the cache
   * 
   * @param key - Cache key
   */
  async delete(key: string): Promise<void> {
    try {
      await this.ensureConnection();
      
      const fullKey = this.getFullKey(key);
      
      // Get item to check for tags
      const data = await this.client.get(fullKey);
      if (data) {
        const item = deserializeCacheItem(data);
        
        if (item && item.tags) {
          // Remove key from tag sets
          const multi = this.client.multi();
          
          for (const tag of item.tags) {
            const tagKey = this.getTagKey(tag);
            multi.sRem(tagKey, fullKey);
          }
          
          // Delete the key
          multi.del(fullKey);
          await multi.exec();
          return;
        }
      }
      
      // If no tags or item not found, just delete the key
      await this.client.del(fullKey);
    } catch (error) {
      console.error('Redis cache delete error:', error);
    }
  }
  
  /**
   * Clear the entire cache
   */
  async clear(): Promise<void> {
    try {
      await this.ensureConnection();
      
      // Get all keys with prefix
      const keys = await this.client.keys(`${this.prefix}*`);
      
      if (keys.length > 0) {
        await this.client.del(keys);
      }
    } catch (error) {
      console.error('Redis cache clear error:', error);
    }
  }
  
  /**
   * Invalidate cache items by tags
   * 
   * @param tags - Tags to invalidate
   */
  async invalidateByTags(tags: string[]): Promise<void> {
    try {
      await this.ensureConnection();
      
      // Use multi to ensure atomic operations
      const multi = this.client.multi();
      
      for (const tag of tags) {
        const tagKey = this.getTagKey(tag);
        
        // Get all keys for this tag
        const keys = await this.client.sMembers(tagKey);
        
        if (keys.length > 0) {
          // Delete all keys
          multi.del(keys);
        }
        
        // Delete the tag set
        multi.del(tagKey);
      }
      
      await multi.exec();
    } catch (error) {
      console.error('Redis cache invalidateByTags error:', error);
    }
  }
  
  /**
   * Check if a key exists in the cache
   * 
   * @param key - Cache key
   * @returns Whether the key exists
   */
  async has(key: string): Promise<boolean> {
    try {
      await this.ensureConnection();
      
      const fullKey = this.getFullKey(key);
      return (await this.client.exists(fullKey)) > 0;
    } catch (error) {
      console.error('Redis cache has error:', error);
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
    try {
      await this.ensureConnection();
      
      const fullKeys = keys.map(key => this.getFullKey(key));
      const results = await this.client.mGet(fullKeys);
      
      const map = new Map<string, CacheItem<T>>();
      
      for (let i = 0; i < keys.length; i++) {
        const data = results[i];
        if (data) {
          const item = deserializeCacheItem<T>(data);
          if (item) {
            map.set(keys[i], item);
          }
        }
      }
      
      return map;
    } catch (error) {
      console.error('Redis cache getMany error:', error);
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
    try {
      await this.ensureConnection();
      
      const { ttl = this.defaultTTL, tags = [] } = options;
      
      // Use multi to ensure atomic operations
      const multi = this.client.multi();
      
      for (const [key, value] of items.entries()) {
        const fullKey = this.getFullKey(key);
        const item: CacheItem<T> = {
          value,
          timestamp: Date.now(),
          ttl,
          tags,
        };
        
        const serialized = serializeCacheItem(item);
        
        // Set the value with TTL
        multi.set(fullKey, serialized);
        if (ttl) {
          multi.expire(fullKey, ttl);
        }
        
        // Add key to tag sets
        for (const tag of tags) {
          const tagKey = this.getTagKey(tag);
          multi.sAdd(tagKey, fullKey);
          
          // Set TTL on tag if not exists
          multi.expire(tagKey, ttl * 2); // Double TTL for tags to ensure they outlive the values
        }
      }
      
      await multi.exec();
    } catch (error) {
      console.error('Redis cache setMany error:', error);
    }
  }
  
  /**
   * Delete multiple values from the cache
   * 
   * @param keys - Cache keys
   */
  async deleteMany(keys: string[]): Promise<void> {
    try {
      await this.ensureConnection();
      
      const fullKeys = keys.map(key => this.getFullKey(key));
      
      // Get items to check for tags
      const results = await this.client.mGet(fullKeys);
      
      // Use multi to ensure atomic operations
      const multi = this.client.multi();
      
      for (let i = 0; i < fullKeys.length; i++) {
        const data = results[i];
        if (data) {
          const item = deserializeCacheItem(data);
          
          if (item && item.tags) {
            // Remove key from tag sets
            for (const tag of item.tags) {
              const tagKey = this.getTagKey(tag);
              multi.sRem(tagKey, fullKeys[i]);
            }
          }
        }
      }
      
      // Delete all keys
      if (fullKeys.length > 0) {
        multi.del(fullKeys);
      }
      
      await multi.exec();
    } catch (error) {
      console.error('Redis cache deleteMany error:', error);
    }
  }
  
  /**
   * Close the Redis connection
   */
  async close(): Promise<void> {
    if (this.isConnected) {
      await this.client.quit();
      this.isConnected = false;
    }
  }
}
