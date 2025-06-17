/**
 * A/B test variant
 */
export interface ABVariant {
  /**
   * Variant ID
   */
  id: string;
  
  /**
   * Variant name
   */
  name: string;
  
  /**
   * Weight of the variant (0-100)
   */
  weight: number;
}

/**
 * A/B test configuration
 */
export interface ABTest {
  /**
   * Test ID
   */
  id: string;
  
  /**
   * Test name
   */
  name: string;
  
  /**
   * Test variants
   */
  variants: ABVariant[];
  
  /**
   * Whether the test is active
   */
  active: boolean;
  
  /**
   * Test start date
   */
  startDate?: Date;
  
  /**
   * Test end date
   */
  endDate?: Date;
}

/**
 * A/B test assignment
 */
export interface ABTestAssignment {
  /**
   * Test ID
   */
  testId: string;
  
  /**
   * Variant ID
   */
  variantId: string;
  
  /**
   * Assignment timestamp
   */
  timestamp: number;
}

/**
 * A/B test tracking event
 */
export interface ABTestEvent {
  /**
   * Event type
   */
  type: 'exposure' | 'conversion' | 'custom';
  
  /**
   * Test ID
   */
  testId: string;
  
  /**
   * Variant ID
   */
  variantId: string;
  
  /**
   * Event name (for custom events)
   */
  name?: string;
  
  /**
   * Event value (for conversion events)
   */
  value?: number;
  
  /**
   * Event metadata
   */
  metadata?: Record<string, any>;
  
  /**
   * Event timestamp
   */
  timestamp: number;
}

/**
 * A/B test tracking options
 */
export interface TrackingOptions {
  /**
   * Whether to track the event
   */
  track?: boolean;
  
  /**
   * Event metadata
   */
  metadata?: Record<string, any>;
}

/**
 * A/B test context
 */
export interface ABTestContextType {
  /**
   * Get the assigned variant for a test
   */
  getVariant: (testId: string) => string | null;
  
  /**
   * Track an A/B test event
   */
  trackEvent: (event: Omit<ABTestEvent, 'timestamp'>) => void;
  
  /**
   * Get all A/B tests
   */
  tests: ABTest[];
  
  /**
   * Get all test assignments
   */
  assignments: ABTestAssignment[];
  
  /**
   * Whether debug mode is enabled
   */
  debug: boolean;
  
  /**
   * Toggle debug mode
   */
  toggleDebug: () => void;
} 