"use client";

import React, { useRef, useEffect } from 'react';
import { FocusTrapProps } from '../types';

/**
 * FocusTrap component for accessibility
 * 
 * This component traps focus within modal dialogs and other overlay UI elements
 * to ensure keyboard navigation remains within the component until it is closed.
 * This is a WCAG requirement for modal interfaces.
 */
export function FocusTrap({
  children,
  isActive = true,
  focusFirst = true,
  returnFocusOnDeactivate = true,
  className = '',
}: FocusTrapProps) {
  const trapRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  
  // Store the previously focused element when the trap becomes active
  useEffect(() => {
    if (isActive && returnFocusOnDeactivate) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }
  }, [isActive, returnFocusOnDeactivate]);
  
  // Handle focus on activation/deactivation
  useEffect(() => {
    if (!isActive || !trapRef.current) return;
    
    // Get all focusable elements
    const focusableElements = trapRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    // Focus the first element when trap is activated
    if (focusFirst) {
      focusableElements[0].focus();
    }
    
    // Return function to restore focus when trap is deactivated
    return () => {
      if (returnFocusOnDeactivate && previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [isActive, focusFirst, returnFocusOnDeactivate]);
  
  // Handle keyboard navigation (tab/shift+tab)
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isActive || !trapRef.current || event.key !== 'Tab') return;
    
    // Get all focusable elements
    const focusableElements = Array.from(
      trapRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
    
    if (focusableElements.length === 0) return;
    
    // Get the first and last focusable elements
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // Check if the active element is one of the focusable elements
    const activeElementIndex = focusableElements.indexOf(document.activeElement as HTMLElement);
    
    // Handle Shift+Tab navigation (backward)
    if (event.shiftKey) {
      // If at the first element or before the trap, go to the last element
      if (activeElementIndex <= 0) {
        event.preventDefault();
        lastElement.focus();
      }
    } 
    // Handle Tab navigation (forward)
    else {
      // If at the last element, cycle back to the first element
      if (activeElementIndex === focusableElements.length - 1) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };
  
  // If not active, just render the children
  if (!isActive) {
    return <>{children}</>;
  }
  
  return (
    <div 
      ref={trapRef} 
      onKeyDown={handleKeyDown}
      className={className}
      style={{ outline: 'none' }}
      tabIndex={-1}
    >
      {children}
    </div>
  );
} 