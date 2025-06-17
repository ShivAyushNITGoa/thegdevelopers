import Cookies from 'js-cookie';
import { ABTestAssignment } from '../types';

// Storage keys
const ASSIGNMENTS_KEY = 'ab_test_assignments';
const DEBUG_MODE_KEY = 'ab_test_debug';

// Cookie expiration (30 days)
const COOKIE_EXPIRATION = 30;

/**
 * Get stored A/B test assignments
 * 
 * @returns Array of stored assignments
 */
export function getStoredAssignments(): ABTestAssignment[] {
  try {
    // Try to get from localStorage first
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(ASSIGNMENTS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    }
    
    // Fall back to cookies
    const cookieValue = Cookies.get(ASSIGNMENTS_KEY);
    if (cookieValue) {
      return JSON.parse(cookieValue);
    }
  } catch (error) {
    console.error('Error getting stored A/B test assignments:', error);
  }
  
  return [];
}

/**
 * Store an A/B test assignment
 * 
 * @param assignment - Assignment to store
 */
export function storeAssignment(assignment: ABTestAssignment): void {
  try {
    // Get existing assignments
    const assignments = getStoredAssignments();
    
    // Check if assignment already exists
    const existingIndex = assignments.findIndex(a => a.testId === assignment.testId);
    if (existingIndex >= 0) {
      assignments[existingIndex] = assignment;
    } else {
      assignments.push(assignment);
    }
    
    // Store in localStorage if available
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(assignments));
    }
    
    // Also store in cookie for cross-domain support
    Cookies.set(ASSIGNMENTS_KEY, JSON.stringify(assignments), {
      expires: COOKIE_EXPIRATION,
      path: '/',
      sameSite: 'lax',
    });
  } catch (error) {
    console.error('Error storing A/B test assignment:', error);
  }
}

/**
 * Clear all stored A/B test assignments
 */
export function clearAssignments(): void {
  try {
    // Clear from localStorage if available
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(ASSIGNMENTS_KEY);
    }
    
    // Clear from cookies
    Cookies.remove(ASSIGNMENTS_KEY, { path: '/' });
  } catch (error) {
    console.error('Error clearing A/B test assignments:', error);
  }
}

/**
 * Get debug mode state
 * 
 * @returns Whether debug mode is enabled
 */
export function getDebugMode(): boolean | null {
  try {
    // Try to get from localStorage first
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(DEBUG_MODE_KEY);
      if (stored !== null) {
        return stored === 'true';
      }
    }
    
    // Fall back to cookies
    const cookieValue = Cookies.get(DEBUG_MODE_KEY);
    if (cookieValue) {
      return cookieValue === 'true';
    }
  } catch (error) {
    console.error('Error getting A/B test debug mode:', error);
  }
  
  return null;
}

/**
 * Set debug mode state
 * 
 * @param enabled - Whether debug mode is enabled
 */
export function setDebugMode(enabled: boolean): void {
  try {
    // Store in localStorage if available
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(DEBUG_MODE_KEY, String(enabled));
    }
    
    // Also store in cookie
    Cookies.set(DEBUG_MODE_KEY, String(enabled), {
      expires: COOKIE_EXPIRATION,
      path: '/',
      sameSite: 'lax',
    });
  } catch (error) {
    console.error('Error setting A/B test debug mode:', error);
  }
} 