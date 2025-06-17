//
Cache
serializer
utility

import { CacheItem } from '../types';

/**
 * Serializer options
 */
export interface SerializerOptions {
  /**
   * Whether to pretty print JSON
   */
  pretty?: boolean;
  
  /**
   * Whether to handle special types like Date
   */
  handleSpecialTypes?: boolean;
}

/**
 * Serialize a cache item to JSON string
 * 
 * @param item - Cache item to serialize
 * @param options - Serializer options
 * @returns Serialized cache item
 * 
 * @example
 * ```ts
 * const serialized = serializeCacheItem({ value: { id: 1 }, timestamp: Date.now() });
 * ```
 */
export function serializeCacheItem<T>(
  item: CacheItem<T>,
  options: SerializerOptions = {}
): string {
  const { pretty = false, handleSpecialTypes = true } = options;
  
  // Clone the item to avoid modifying the original
  const clonedItem = { ...item };
  
  try {
    // Use custom replacer if handling special types
    if (handleSpecialTypes) {
      return JSON.stringify(clonedItem, replacer, pretty ? 2 : undefined);
    }
    
    // Otherwise use standard JSON.stringify
    return JSON.stringify(clonedItem, null, pretty ? 2 : undefined);
  } catch (error) {
    console.error('Error serializing cache item:', error);
    
    // Return a minimal serialized item on error
    return JSON.stringify({
      value: null,
      timestamp: clonedItem.timestamp,
      error: 'Serialization error',
    });
  }
}

/**
 * Deserialize a JSON string to a cache item
 * 
 * @param json - Serialized cache item
 * @param options - Serializer options
 * @returns Deserialized cache item
 * 
 * @example
 * ```ts
 * const item = deserializeCacheItem<User>(serialized);
 * ```
 */
export function deserializeCacheItem<T>(
  json: string,
  options: SerializerOptions = {}
): CacheItem<T> | null {
  const { handleSpecialTypes = true } = options;
  
  try {
    // Use custom reviver if handling special types
    if (handleSpecialTypes) {
      return JSON.parse(json, reviver) as CacheItem<T>;
    }
    
    // Otherwise use standard JSON.parse
    return JSON.parse(json) as CacheItem<T>;
  } catch (error) {
    console.error('Error deserializing cache item:', error);
    return null;
  }
}

/**
 * Custom replacer for JSON.stringify to handle special types
 */
function replacer(key: string, value: any): any {
  // Handle Date objects
  if (value instanceof Date) {
    return {
      __type: 'Date',
      value: value.toISOString(),
    };
  }
  
  // Handle RegExp objects
  if (value instanceof RegExp) {
    return {
      __type: 'RegExp',
      source: value.source,
      flags: value.flags,
    };
  }
  
  // Handle Map objects
  if (value instanceof Map) {
    return {
      __type: 'Map',
      value: Array.from(value.entries()),
    };
  }
  
  // Handle Set objects
  if (value instanceof Set) {
    return {
      __type: 'Set',
      value: Array.from(value.values()),
    };
  }
  
  // Handle Error objects
  if (value instanceof Error) {
    return {
      __type: 'Error',
      name: value.name,
      message: value.message,
      stack: value.stack,
    };
  }
  
  // Handle undefined
  if (value === undefined) {
    return { __type: 'undefined' };
  }
  
  // Return other values as is
  return value;
}

/**
 * Custom reviver for JSON.parse to handle special types
 */
function reviver(_key: string, value: any): any {
  // Skip non-objects or null
  if (!value || typeof value !== 'object' || !value.__type) {
    return value;
  }
  
  // Handle special types
  switch (value.__type) {
    case 'Date':
      return new Date(value.value);
      
    case 'RegExp':
      return new RegExp(value.source, value.flags);
      
    case 'Map':
      return new Map(value.value);
      
    case 'Set':
      return new Set(value.value);
      
    case 'Error':
      const error = new Error(value.message);
      error.name = value.name;
      error.stack = value.stack;
      return error;
      
    case 'undefined':
      return undefined;
      
    default:
      return value;
  }
}
