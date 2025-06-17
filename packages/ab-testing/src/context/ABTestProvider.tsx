import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ABTest, ABTestAssignment, ABTestContextType, ABTestEvent } from '../types';
import { getStoredAssignments, storeAssignment, getDebugMode, setDebugMode } from '../utils/storage';
import { trackExposure, trackConversion, trackCustomEvent } from '../utils/tracking';

// Create context
const ABTestContext = createContext<ABTestContextType | undefined>(undefined);

// Provider props
interface ABTestProviderProps {
  /**
   * A/B tests to run
   */
  tests: ABTest[];
  
  /**
   * User ID for consistent assignments
   */
  userId?: string;
  
  /**
   * Children components
   */
  children: React.ReactNode;
  
  /**
   * Whether to enable debug mode
   */
  initialDebug?: boolean;
  
  /**
   * Custom tracking function
   */
  onTrack?: (event: ABTestEvent) => void;
}

/**
 * A/B test provider component
 * 
 * @example
 * ```tsx
 * <ABTestProvider tests={tests}>
 *   <App />
 * </ABTestProvider>
 * ```
 */
export function ABTestProvider({
  tests,
  userId = uuidv4(),
  children,
  initialDebug = false,
  onTrack,
}: ABTestProviderProps) {
  // State
  const [assignments, setAssignments] = useState<ABTestAssignment[]>([]);
  const [debug, setDebug] = useState(initialDebug);
  
  // Load assignments on mount
  useEffect(() => {
    const storedAssignments = getStoredAssignments();
    setAssignments(storedAssignments);
    
    // Load debug mode
    const storedDebug = getDebugMode();
    if (storedDebug !== null) {
      setDebug(storedDebug);
    }
  }, []);
  
  // Assign variants for tests
  useEffect(() => {
    const newAssignments: ABTestAssignment[] = [];
    
    // Process each active test
    tests.filter(test => test.active).forEach(test => {
      // Check if already assigned
      const existingAssignment = assignments.find(a => a.testId === test.id);
      if (existingAssignment) {
        newAssignments.push(existingAssignment);
        return;
      }
      
      // Assign new variant
      const variantId = assignVariant(test, userId);
      const assignment: ABTestAssignment = {
        testId: test.id,
        variantId,
        timestamp: Date.now(),
      };
      
      newAssignments.push(assignment);
      storeAssignment(assignment);
      
      // Track exposure
      trackExposure({
        testId: test.id,
        variantId,
        timestamp: Date.now(),
      }, onTrack);
    });
    
    if (newAssignments.length > 0) {
      setAssignments(prev => [...prev, ...newAssignments]);
    }
  }, [tests, userId, assignments, onTrack]);
  
  // Get variant for a test
  const getVariant = (testId: string): string | null => {
    const assignment = assignments.find(a => a.testId === testId);
    return assignment ? assignment.variantId : null;
  };
  
  // Track event
  const trackEvent = (event: Omit<ABTestEvent, 'timestamp'>) => {
    const fullEvent: ABTestEvent = {
      ...event,
      timestamp: Date.now(),
    };
    
    switch (event.type) {
      case 'exposure':
        trackExposure(fullEvent, onTrack);
        break;
      case 'conversion':
        trackConversion(fullEvent, onTrack);
        break;
      case 'custom':
        trackCustomEvent(fullEvent, onTrack);
        break;
    }
  };
  
  // Toggle debug mode
  const toggleDebug = () => {
    const newDebug = !debug;
    setDebug(newDebug);
    setDebugMode(newDebug);
  };
  
  // Context value
  const value: ABTestContextType = {
    getVariant,
    trackEvent,
    tests,
    assignments,
    debug,
    toggleDebug,
  };
  
  return (
    <ABTestContext.Provider value={value}>
      {children}
    </ABTestContext.Provider>
  );
}

/**
 * Assign a variant for a test
 */
function assignVariant(test: ABTest, userId: string): string {
  // If in debug mode and URL has variant, use that
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const debugVariant = params.get(`ab_${test.id}`);
    if (debugVariant) {
      const variant = test.variants.find(v => v.id === debugVariant || v.name === debugVariant);
      if (variant) {
        return variant.id;
      }
    }
  }
  
  // Calculate total weight
  const totalWeight = test.variants.reduce((sum, variant) => sum + variant.weight, 0);
  
  // If total weight is 0, use first variant
  if (totalWeight === 0) {
    return test.variants[0]?.id || 'control';
  }
  
  // Generate a random number based on user ID and test ID for consistency
  const seed = `${userId}-${test.id}`;
  const hash = hashString(seed);
  const random = (hash % 100) / 100;
  
  // Distribute based on weights
  let cumulativeWeight = 0;
  for (const variant of test.variants) {
    cumulativeWeight += variant.weight / totalWeight;
    if (random < cumulativeWeight) {
      return variant.id;
    }
  }
  
  // Fallback to first variant
  return test.variants[0]?.id || 'control';
}

/**
 * Simple string hash function
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Hook to use the A/B test context
 * 
 * @returns The A/B test context
 * 
 * @example
 * ```tsx
 * const { getVariant, trackEvent } = useABTestContext();
 * ```
 */
export function useABTestContext(): ABTestContextType {
  const context = useContext(ABTestContext);
  if (context === undefined) {
    throw new Error('useABTestContext must be used within an ABTestProvider');
  }
  return context;
} 